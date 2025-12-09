/* eslint-disable tailwindcss/no-custom-classname */
import Editor from '@monaco-editor/react'
import cn from 'clsx'
import FeatherIcon from 'feather-icons-react'
import type { editor as EditorType } from 'monaco-editor'
import { useEffect, useState, JSX } from 'react'
import s from './style/turtle-editor.module.css'
import { RunLevel } from './types/TurtleTypes'
import { autosaveHandler, resetCode } from './utils/autosave'
import { browseHistory } from './utils/browseHistory'
import {
    grabCanvasHandler,
    handleDocClick,
    initHResizer,
    initScaler
} from './utils/handlers'
import { downloadScreenshot } from './utils/screenshotTurtle'

export default function UserInterface(props: any) {
    const c = props.configRef.current
    const [output, setOutput] = props.outputState
    const [currentRunLevel, setCurrentRunLevel] = props.runlevel
    const height = props.height
    const hideCanvasButtons = props.hideCanvasButtons
    const hideEditorId = props.hideEditorId
    const [position, setPosition] = useState({
        top: undefined as number | undefined,
        left: undefined as number | undefined
    })
    const [fullscreen, setFullscreen] = useState(false)
    const [undoBool, setUndo] = useState(false)
    c.setUndo = setUndo
    const [redoBool, setRedo] = useState(false)
    c.setRedo = setRedo
    const [fontSize, setFontSize] = useState(14)
    const [copied, setCopied] = useState(false)

    const hasTurtle = c.initCode.includes('turtle')

    useEffect(() => {
        initHResizer(c)

        if (c.graphicspanelRef?.current) {
            initScaler(c)
        }
        document.addEventListener('mousedown', e =>
            handleDocClick(e, c, setRedo)
        )

        return () => {
            document.removeEventListener('mousedown', e =>
                handleDocClick(e, c, setRedo)
            )
        }
    }, [c])

    const handleEditorDidMount = (editor: EditorType.IStandaloneCodeEditor) => {
        c.codeeditorRef.current = editor

        // Restore code from history
        const history = c.historyRef.current

        if (history[0] !== undefined) {
            editor.setValue(history[0].code)
        }
        if (history.length > 1) {
            setUndo(true)
        }

        // Autosave to local storage
        editor.onDidChangeModelContent(() => autosaveHandler(c))
    }

    const RunLevelIcons: { [key: string]: JSX.Element } = {
        [RunLevel.stopped]: (
            <div className={cn(s.turtleicon, s.turtlebutton)}>
                <FeatherIcon size="16" icon="play" />
                <span>Run</span>
            </div>
        ),
        [RunLevel.running]: (
            <div className={cn(s.turtleicon, s.turtlebutton)}>
                <FeatherIcon size="16" icon="pause" />
                <span>Pause</span>
            </div>
        )
    }

    // const resetall = (c: TurtleConfig) => {
    //     logger.info('Resetting all')
    //     c.historyRef.current = []
    //     c.historyIndexRef.current = -1
    //     c.codeeditorRef.current?.setValue(c.initCode)
    //     if (c.idRef.current) {
    //         localStorage.removeItem(c.idRef.current)
    //     }
    //     c.autosaveCounterRef.current = 0
    //     setUndo(false)
    //     setRedo(false)
    // }
    return (
        <div
            className={cn(s.turtlewrapper, fullscreen && s.fullscreen)}
            // {
            //     fullscreen ? 'turtlewrapper fullscreen' : 'turtlewrapper'
            // }
            ref={c.wrapperRef}
            id={c.idRef.current}
            style={height ? { height, marginTop: 0 } : undefined}
        >
            <div className={s.turtlerow}>
                <div
                    className={cn(s.panel, s.monacoeditor)}
                    ref={c.editorPanelRef}
                >
                    <Editor
                        defaultLanguage="python"
                        onMount={handleEditorDidMount}
                        theme={c.theme == 'dark' ? 'vs-dark' : 'vs'}
                        defaultValue={c.initCode}
                        options={{
                            minimap: { enabled: false },
                            scrollbar: { horizontal: 'hidden' },
                            overviewRulerLanes: 0,
                            // scrollBeyondLastLine: false,
                            wordWrap: 'on',
                            // quickSuggestions: false,
                            wrappingStrategy: 'advanced',
                            automaticLayout: true,
                            fontSize: fontSize
                            // Todo: editor.contrib.ShowKeyboardWidget
                        }}
                    />
                    <div className={cn(s.fontsizecontrols)}>
                        <a
                            title="Copy Code"
                            className={cn(s.turtlebutton)}
                            onClick={() => {
                                const code = c.codeeditorRef.current?.getValue() || ''
                                navigator.clipboard.writeText(code).then(() => {
                                    setCopied(true)
                                    setTimeout(() => setCopied(false), 2000)
                                })
                            }}
                        >
                            <FeatherIcon size="16" icon={copied ? "check" : "copy"} />
                        </a>
                        <a
                            title="Decrease Font Size"
                            className={cn(
                                s.turtlebutton,
                                fontSize <= 8 && s.inactive
                            )}
                            onClick={() => {
                                if (fontSize > 8) {
                                    setFontSize(fontSize - 2)
                                }
                            }}
                        >
                            <FeatherIcon size="16" icon="minus" />
                        </a>
                        <a
                            title="Increase Font Size"
                            className={cn(
                                s.turtlebutton,
                                fontSize >= 32 && s.inactive
                            )}
                            onClick={() => {
                                if (fontSize < 32) {
                                    setFontSize(fontSize + 2)
                                }
                            }}
                        >
                            <FeatherIcon size="16" icon="plus" />
                        </a>
                    </div>
                    <div
                        className={cn(s.turtleeditorcontrols, s.right)}
                        ref={c.codeControlRef}
                    >
                        {!hideEditorId && (
                            <span className="text-xs italic text-gray-500 opacity-60 pointer-events-none select-none z-40">
                                {c.idRef.current}
                            </span>
                        )}
                        <a
                            title="Undo"
                            className={cn(
                                s.turtlebutton,
                                !undoBool && s.inactive
                            )}
                            onClick={() => {
                                if (undoBool) browseHistory(c, 1)
                            }}
                        >
                            <FeatherIcon size="16" icon="chevron-left" />
                        </a>
                        <a
                            title="Redo"
                            className={cn(
                                s.turtlebutton,
                                !redoBool && s.inactive
                            )}
                            onClick={() => {
                                if (redoBool) browseHistory(c, -1)
                            }}
                        >
                            <FeatherIcon size="16" icon="chevron-right" />
                        </a>
                        <a
                            className={cn(s.turtlebutton)}
                            title="Reset Code"
                            onClick={() => resetCode(c)}
                        >
                            <FeatherIcon size="16" icon="rotate-ccw" />
                        </a>
                    </div>

                    <a
                        className={cn(s.turtleeditorcontrols, s.left)}
                        onClick={() => {
                            setOutput([])
                            setCurrentRunLevel(
                                currentRunLevel === RunLevel.stopped
                                    ? RunLevel.running
                                    : RunLevel.stopped
                            )
                        }}
                        ref={c.startstopRef}
                    >
                        {RunLevelIcons[currentRunLevel]}
                    </a>
                </div>
                <div className={s.resizerH} ref={c.resizerHRef} />

                <div
                    className={cn(
                        s.panel,
                        s.graphicspanel,
                        !hasTurtle && s.hasturtle
                    )}
                    ref={c.graphicspanelRef}
                >
                    <div
                        className={s.graphicswrapper}
                        ref={c.graphicswrapperRef}
                        onMouseDown={(
                            e: React.MouseEvent<HTMLDivElement, MouseEvent>
                        ) => grabCanvasHandler(e, c, setPosition)}
                        style={{
                            position: 'absolute',
                            top: position.top,
                            left: position.left
                        }}
                    />
                    {!hideCanvasButtons && (
                        <div className={s.canvasButtons}>
                            <button
                                type="button"
                                onClick={() =>
                                    downloadScreenshot(c.graphicswrapperRef.current)
                                }
                            >
                                <FeatherIcon size="16" icon="aperture" />
                            </button>

                            <button
                                type="button"
                                onClick={() => {
                                    // document.body.classList.toggle(
                                    //     'fullscreen',
                                    //     !fullscreen
                                    // )
                                    setFullscreen(!fullscreen)
                                }}
                            >
                                {fullscreen ? (
                                    <FeatherIcon size="16" icon="minimize-2" />
                                ) : (
                                    <FeatherIcon size="16" icon="maximize-2" />
                                )}
                            </button>
                        </div>
                    )}
                </div>
            </div>
            <div className={cn(s.turtlerow, s.output)}>
                <pre className={cn(s.outputpre)}>
                    {output.map(
                        (
                            [msg, errorlevel]: [string, string],
                            index: number
                        ) => (
                            <span key={index} className={errorlevel}>
                                {msg}
                            </span>
                        )
                    )}
                </pre>
            </div>
        </div>
    )
}
