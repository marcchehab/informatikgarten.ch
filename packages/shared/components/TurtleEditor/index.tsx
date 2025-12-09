"use client"

import { logger, sanitizeIdString } from '../../utils'
import type { editor as EditorType } from 'monaco-editor'
import { useSession } from 'next-auth/react'
import { useTheme } from 'next-themes'
import { usePathname } from 'next/navigation'
import { useContext, useEffect, useRef, useState } from 'react'
import { TurtleContext } from './TurtleContext'
import {
    errorlevel,
    HistoryEntry,
    outputElement,
    RunLevel,
    TurtleConfigType
} from './types/TurtleTypes'
import UserInterface from './UserInterface'
import {
    loadFromRemote,
    restoreHandler,
    saveBeforeUnload
} from './utils/autosave'
import { loadScript } from './utils/loadScript'
// TODO: Add back when feedback is added
// import { isTeacherCS } from '../../utils'
// import { Feedback } from './Feedback'

declare let Sk: any

export const TurtleEditor = ({
    id,
    children,
    height,
    className,
    theme: themeProp,
    hideCanvasButtons = false,
    hideEditorId = false
}: {
    id: string
    children: string
    height?: string
    className?: string
    theme?: 'dark' | 'light'
    hideCanvasButtons?: boolean
    hideEditorId?: boolean
}) => {
    // State
    const [currentRunLevel, setCurrentRunLevel] = useState(RunLevel.stopped)
    const [output, setOutput] = useState<outputElement[]>([])

    // Refs
    const configRef = useRef<TurtleConfigType | null>(null)
    const path = usePathname()
    const idRef = useRef<string>('')
    const { data: session } = useSession()
    const sessionRef = useRef(session)
    const historyRef = useRef([] as HistoryEntry[])
    const historyIndexRef = useRef<number>(-1)
    const codeeditorRef = useRef<EditorType.IStandaloneCodeEditor | null>(null)
    const graphicswrapperRef = useRef<HTMLDivElement | null>(null)
    const wrapperRef = useRef(null)

    // Context
    const { registerTurtleEditor, unregisterTurtleEditor } =
        useContext(TurtleContext)

    useEffect(() => {
        if (!configRef.current) return

        // Register the turtle editor
        const editorNr = registerTurtleEditor(configRef as React.RefObject<TurtleConfigType>)
        idRef.current = sanitizeIdString(id ?? path + '-' + editorNr)

        // Restore
        restoreHandler(configRef.current)
        // Load skulpt and skulpt-stdlib
        loadScript('/js/skulpt.min.js', true)
            .then(() => {
                loadScript('/js/skulpt-stdlib.js', true).catch(() => {
                    logger.error('Script loading skulpt-stdlib.js failed!')
                })
            })
            .catch(() => {
                logger.error('Script loading skulpt.min.js failed!')
            })

        // Function to handle the beforeunload event
        function handleBeforeUnload() {
            if (!configRef.current) return
            saveBeforeUnload(configRef.current)
        }

        window.addEventListener('beforeunload', handleBeforeUnload)
        return () => {
            if (!configRef.current) return
            saveBeforeUnload(configRef.current)
            unregisterTurtleEditor(configRef as React.RefObject<TurtleConfigType>)
            window.removeEventListener('beforeunload', handleBeforeUnload)
        }
    }, [])

    // Handling of the runlevel
    useEffect(() => {
        if (typeof Sk !== 'undefined') {
            if (currentRunLevel == RunLevel.stopped) {
                Sk.execLimit = 1
            } else if (currentRunLevel == RunLevel.running) {
                const codeEditorValue = (
                    codeeditorRef.current as any
                )?.getValue?.()
                if (codeEditorValue) {
                    runPythonCode(codeEditorValue)
                }
                Sk.execLimit = Number.POSITIVE_INFINITY
            }
        }
    }, [currentRunLevel])

    interface SkulptError {
        tp$name: string
        toString(): string
    }

    function runPythonCode(pythonCode: string) {
        const canvas = graphicswrapperRef.current
        if (Sk && canvas) {
            Sk.configure({
                output: (out: string) =>
                    setOutput(output => [...output, [out, errorlevel.output]]),
                inputfunTakesPrompt: true,
                __future__: Sk.python3,
                python3: true,
                execLimit: Number.POSITIVE_INFINITY
            })
                ; (Sk.TurtleGraphics ||= {
                    width: canvas.clientWidth,
                    height: canvas.clientHeight
                }).target = canvas
            const myPromise = Sk.misceval.asyncToPromise(() => {
                return Sk.importMainWithBody('<stdin>', false, pythonCode, true)
            })
            myPromise.then(
                (_mod: string) => {
                    logger.info('Turtle was a success')
                    setCurrentRunLevel(RunLevel.stopped)
                },
                (err: SkulptError) => {
                    setCurrentRunLevel(RunLevel.stopped)
                    if (err.tp$name === 'TimeoutError' && Sk.execLimit == 1) {
                        setOutput([
                            ...output,
                            ['Abgebrochen', errorlevel.warning]
                        ])
                    } else {
                        setOutput([
                            ...output,
                            [err.toString(), errorlevel.error]
                        ])
                    }
                }
            )
        }
    }

    const { resolvedTheme } = useTheme()
    const theme = themeProp ?? resolvedTheme ?? 'dark'
    configRef.current = {
        // Main
        idRef,
        sessionRef,
        theme,
        wrapperRef,
        resizerHRef: useRef(null),
        // Code editor
        codeeditorRef,
        editorPanelRef: useRef(null),
        graphicswrapperRef,
        graphicspanelRef: useRef(null),
        historyRef,
        historyIndexRef,
        // Code
        initCode: children ?? '',
        runPythonCode,
        autosaveCounterRef: useRef(0),
        codeControlRef: useRef(null),
        // lastTimestampPromiseRef: lastTimestampPromiseRef,
        remoteTimestampsRef: useRef(new Set())
    }
    // Todo: Persist editor user settings in localstorage

    useEffect(() => {
        if (session && configRef.current) {
            logger.info('Logged in!')
            sessionRef.current = session
            loadFromRemote(configRef.current)
        }
    }, [session])

    return (
        <div>
            <UserInterface
                configRef={configRef}
                outputState={[output, setOutput]}
                runlevel={[currentRunLevel, setCurrentRunLevel]}
                height={height}
                className={className}
                hideCanvasButtons={hideCanvasButtons}
                hideEditorId={hideEditorId}
            />
            {/* TODO: Add feedback component again
            {isTeacherCS() && <Feedback c={configRef.current} />} */}
        </div>
    )
}
