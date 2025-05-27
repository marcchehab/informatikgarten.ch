/* eslint-disable tailwindcss/no-custom-classname */
import cn from 'clsx'
import FeatherIcon from 'feather-icons-react'
import { useEffect, useState, JSX, useRef } from 'react' // Added useRef
import { EditorState } from '@codemirror/state';
import { EditorView, keymap } from '@codemirror/view';
import { defaultKeymap, history, historyKeymap, undo, redo as cmRedo } from '@codemirror/commands'; // aliased redo to cmRedo
import { python } from '@codemirror/lang-python';
import { oneDark } from '@codemirror/theme-one-dark';
import { basicSetup } from 'codemirror';
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
    const [position, setPosition] = useState({
        top: undefined as number | undefined,
        left: undefined as number | undefined
    })
    const [fullscreen, setFullscreen] = useState(false)
    const [undoBool, setUndo] = useState(false)
    c.setUndo = setUndo
    const [redoBool, setRedo] = useState(false)
    c.setRedo = setRedo
    const editorContainerRef = useRef<HTMLDivElement | null>(null); // Ref for CodeMirror container

    const hasTurtle = c.initCode.includes('turtle')

    useEffect(() => {
        initHResizer(c)

        if (c.graphicspanelRef?.current) {
            initScaler(c)
        }
        // Removed handleDocClick for now as it was tied to Monaco's setRedo
        // document.addEventListener('mousedown', e =>
        //     handleDocClick(e, c, setRedo)
        // )

        // Initialize CodeMirror Editor
        if (editorContainerRef.current && !c.codeeditorRef.current) {
            const extensions = [
                basicSetup,
                keymap.of([...defaultKeymap, ...historyKeymap]),
                history(),
                python(),
                EditorView.updateListener.of(update => {
                    if (update.docChanged) {
                        autosaveHandler(c); // Call your existing autosave handler
                        // Update undo/redo buttons based on CodeMirror's history
                        const editorView = c.codeeditorRef.current;
                        if (editorView) {
                            const historyState = editorView.state.field(historyKeymap[0].value); // Access history state
                            setUndo(historyState.undoDepth > 0);
                            setRedo(historyState.redoDepth > 0);
                        }
                    }
                })
            ];

            if (c.theme === 'dark') {
                extensions.push(oneDark);
            }

            const startState = EditorState.create({
                doc: c.initCode, // c.initCode is the initial code
                extensions: extensions
            });

            const view = new EditorView({
                state: startState,
                parent: editorContainerRef.current
            });
            c.codeeditorRef.current = view;

            // Restore code from history (if any) - this might need adjustment
            // For now, CodeMirror starts with initCode. Autosave will handle further changes.
            // The old historyRef might not be directly compatible.
            // if (c.historyRef.current[0] !== undefined) {
            //     view.dispatch({
            //         changes: { from: 0, to: view.state.doc.length, insert: c.historyRef.current[0].code }
            //     });
            // }
             // Update initial undo/redo state
            const historyState = view.state.field(historyKeymap[0].value);
            setUndo(historyState.undoDepth > 0);
            setRedo(historyState.redoDepth > 0);
        }

        return () => {
            // Removed handleDocClick listener
            // document.removeEventListener('mousedown', e =>
            //     handleDocClick(e, c, setRedo)
            // )
            if (c.codeeditorRef.current) {
                c.codeeditorRef.current.destroy();
                c.codeeditorRef.current = null;
            }
        }
    }, [c]) // Ensure c is stable or list specific dependencies from c if needed

    // const handleEditorDidMount = (editor: EditorType.IStandaloneCodeEditor) => {
    //     c.codeeditorRef.current = editor

    //     // Restore code from history
    //     const localHistory = c.historyRef.current // Renamed to avoid conflict

    //     if (localHistory[0] !== undefined) {
    //         editor.setValue(localHistory[0].code)
    //     }
    //     if (localHistory.length > 1) {
    //         setUndo(true)
    //     }

    //     // Autosave to local storage
    //     editor.onDidChangeModelContent(() => autosaveHandler(c))
    // }

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
        >
            <span className="absolute bottom-2 left-1/2 -translate-x-1/2 text-xs italic text-gray-500 opacity-60 pointer-events-none select-none z-40">
                {c.idRef.current}
            </span>
            <div className={s.turtlerow}>
                <div
                    className={cn(s.panel, s.monacoeditor)} // s.monacoeditor might need to be renamed or restyled
                    ref={c.editorPanelRef}
                >
                    {/* CodeMirror editor container */}
                    <div ref={editorContainerRef} className={s.codemirrorContainer} /> 
                    <div
                        className={cn(s.turtleeditorcontrols, s.right)}
                        ref={c.codeControlRef}
                    >
                        <a
                            title="Undo"
                            className={cn(
                                s.turtlebutton,
                                !undoBool && s.inactive
                            )}
                            onClick={() => {
                                if (undoBool && c.codeeditorRef.current) {
                                    undo(c.codeeditorRef.current);
                                }
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
                                if (redoBool && c.codeeditorRef.current) {
                                    cmRedo(c.codeeditorRef.current);
                                }
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
