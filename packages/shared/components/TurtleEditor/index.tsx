"use client"

import { logger, sanitizeIdString } from '../../utils'
import type { EditorView } from '@codemirror/view';
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

function elementFromProps(map: Map<string, any>): Node {
    const tag = map.get("tag");
    if (!tag) {
        return document.createTextNode(map.get("text") || ''); // Ensure text is not undefined
    }

    const node = document.createElementNS("http://www.w3.org/2000/svg", tag); // Use SVG namespace

    const props = map.get("props");
    if (props) {
        for (const [key, value] of props) {
            (node as SVGElement).setAttribute(key, value);
        }
    }

    const children = map.get("children");
    if (children) {
        for (const childProps of children) {
            node.appendChild(elementFromProps(childProps));
        }
    }
    return node;
}

export const TurtleEditor = ({
    id,
    children
}: {
    id: string
    children: string
}) => {
    // State
    const [currentRunLevel, setCurrentRunLevel] = useState(RunLevel.stopped)
    const [output, setOutput] = useState<outputElement[]>([])
    const [pyodide, setPyodide] = useState<any>(null);

    // Refs
    const configRef = useRef<TurtleConfigType | null>(null)
    const path = usePathname()
    const idRef = useRef<string>('')
    const { data: session } = useSession()
    const sessionRef = useRef(session)
    const historyRef = useRef([] as HistoryEntry[])
    const historyIndexRef = useRef<number>(-1)
    const codeeditorRef = useRef<EditorView | null>(null)
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

        // Load Pyodide
        loadScript('https://cdn.jsdelivr.net/pyodide/v0.25.0/full/pyodide.js', true)
            .then(() => {
                async function mainPyodide() {
                    try {
                        const pyodideInstance = await (window as any).loadPyodide({
                            indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.25.0/full/'
                        });
                        setPyodide(pyodideInstance);
                        logger.info('Pyodide loaded successfully');

                        if (pyodideInstance) {
                            pyodideInstance.setStdout({
                                batched: (msg: string) => {
                                    setOutput(prevOutput => [...prevOutput, [msg, errorlevel.output]]);
                                }
                            });
                            pyodideInstance.setStderr({
                                batched: (msg: string) => {
                                    setOutput(prevOutput => [...prevOutput, [msg, errorlevel.error]]);
                                }
                            });

                            logger.info('Loading micropip...');
                            try {
                                await pyodideInstance.loadPackage('micropip');
                                const micropip = pyodideInstance.pyimport('micropip');
                                logger.info('Installing RPF turtle module wheel...');
                                await micropip.install('https://raw.githubusercontent.com/RaspberryPiFoundation/turtle/main/turtle-0.0.1-py3-none-any.whl');
                                logger.info('RPF turtle module wheel installed successfully.');

                                // Test import (optional, for immediate feedback)
                                // await pyodideInstance.runPythonAsync(`
                                //     import turtle
                                //     print("RPF turtle module imported successfully via micropip")
                                // `);

                            } catch (micropipError) {
                                logger.error('Error installing RPF turtle module:', micropipError);
                                // Optionally, inform the user via setOutput
                                setOutput(prevOutput => [...prevOutput, ['Failed to load RPF turtle module.', errorlevel.error]]);
                            }

                            const fakeBasthonPackage = {
                                kernel: {
                                    display_event: (e: any) => { // Pyodide passes a PyProxy here
                                        const eventData = e.toJs(); // Convert PyProxy to JS object
                                        const content = eventData.get("content");
                                        if (graphicswrapperRef.current && content) {
                                            // Clear previous SVG
                                            graphicswrapperRef.current.innerHTML = '';
                                            const svgElement = elementFromProps(content);
                                            graphicswrapperRef.current.appendChild(svgElement);
                                        }
                                        e.destroy(); // Important to destroy PyProxy
                                    },
                                    display_matplotlib_plot: (base64Image: string) => {
                                        if (graphicswrapperRef.current && base64Image) {
                                            graphicswrapperRef.current.innerHTML = ''; // Clear previous content
                                            const img = document.createElement('img');
                                            img.src = `data:image/png;base64,${base64Image}`;
                                            img.style.maxWidth = '100%'; // Optional: for basic styling
                                            img.style.maxHeight = '100%';
                                            graphicswrapperRef.current.appendChild(img);
                                            logger.info('Matplotlib plot displayed.');
                                        } else {
                                            logger.warn('Matplotlib display event called without image data or graphics wrapper.');
                                        }
                                    }
                                },
                            };
                            pyodideInstance.registerJsModule("basthon", fakeBasthonPackage);
                            logger.info('fakeBasthonPackage registered with Pyodide with Matplotlib support');

                            // Install additional scientific modules
                            try {
                                logger.info('Loading built-in sqlite3 module...');
                                await pyodideInstance.loadPackage('sqlite3');
                                logger.info('sqlite3 loaded.');

                                // micropip should already be loaded from RPF turtle installation
                                const micropip = pyodideInstance.pyimport('micropip'); 

                                logger.info('Installing pandas...');
                                await micropip.install('pandas');
                                logger.info('pandas installed.');

                                logger.info('Installing matplotlib...');
                                await micropip.install('matplotlib');
                                logger.info('matplotlib installed.');

                                // Test imports (optional, for immediate feedback)
                                // This will print to the browser console via Pyodide's stdout
                                // await pyodideInstance.runPythonAsync(`
                                //     import sqlite3
                                //     print("sqlite3 imported successfully")
                                //     import pandas
                                //     print("pandas imported successfully")
                                //     import matplotlib
                                //     print("matplotlib imported successfully")
                                // `);

                            } catch (sciPyError) {
                                logger.error('Error installing additional Python modules (pandas, matplotlib, sqlite3):', sciPyError);
                                setOutput(prevOutput => [...prevOutput, ['Failed to load one or more Python scientific modules.', errorlevel.error]]);
                            }
                        }
                    } catch (error) {
                        logger.error('Error loading Pyodide:', error);
                    }
                }
                mainPyodide();
            })
            .catch((error: any) => {
                logger.error('Failed to load Pyodide script:', error);
            });

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
        if (pyodide && currentRunLevel === RunLevel.running) {
            const codeEditorValue = codeeditorRef.current?.state.doc.toString();
            if (codeEditorValue) {
                runPythonCode(codeEditorValue);
            }
            // We'll handle execution limits or interruption later if needed
        }
        // If you need to do something when stopping, add it here.
        // For now, stopping doesn't need to interact with Pyodide directly in this step.
    }, [currentRunLevel, pyodide]) // Add pyodide to dependency array

    async function runPythonCode(pythonCode: string) {
        if (!pyodide) {
            setOutput(prevOutput => [...prevOutput, ["Pyodide is not yet loaded.", errorlevel.error]]);
            setCurrentRunLevel(RunLevel.stopped);
            return;
        }

        // Optional: Clear previous output if desired
        // setOutput([]); 

        try {
            // setCurrentRunLevel(RunLevel.running) is handled by the calling useEffect
            await pyodide.runPythonAsync(pythonCode);
            // Successful execution output is handled by pyodide.setStdout/setStderr
            // logger.info('Python code executed successfully by Pyodide.');

            if (pyodide) { // Check pyodide again just in case
                await pyodide.runPythonAsync(`
import turtle
import basthon

# Ensure the screen is initialized if user code didn't do it.
# This might need adjustment if user code explicitly creates/manages screens.
screen = turtle.Screen()

# Get the SVG representation
svg_dict = screen.show_scene()

# Send it to our JS display_event
if svg_dict: # Make sure svg_dict is not null or empty
    basthon.kernel.display_event({ "display_type": "turtle", "content": svg_dict })

# Restart turtle for next run (clears drawings and resets state)
turtle.restart()
                `);
                logger.info('Turtle SVG scene processed.');
            }

            if (pyodide) { // Process Matplotlib plot
                try {
                    // logger.info('Processing potential Matplotlib plot...');
                    await pyodide.runPythonAsync(`
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import io
import base64

if plt.get_fignums(): # Check if there is an active figure
    try:
        buf = io.BytesIO()
        plt.savefig(buf, format='png')
        buf.seek(0)
        img_base64 = base64.b64encode(buf.read()).decode('UTF-8')
        buf.close()
        
        import basthon
        basthon.kernel.display_matplotlib_plot(img_base64)
        
        plt.clf() # Clear the current figure for the next plot
    except Exception as e:
        # Log errors to the Python console within Pyodide (seen in browser dev tools)
        print(f"Error processing Matplotlib plot: {e}")
else:
    # This case is normal if no plot was made.
    # print("No active Matplotlib plot to display.") # For debugging
                    `);
                    // logger.info('Matplotlib processing complete.');
                } catch (mplErr) {
                    // This catch is for errors in pyodide.runPythonAsync itself for this block
                    logger.error("Error in Pyodide execution for Matplotlib:", mplErr);
                }
            }
        } catch (err: any) { // This is the outer catch for the user's main code execution
            logger.error("Error executing Python code with Pyodide:", err);
            let errorMsg = "An error occurred during execution.";
            if (err instanceof Error) {
                errorMsg = err.message;
            } else if (typeof err === 'string') {
                errorMsg = err;
            }
            // Fallback error message if not caught by pyodide.setStderr
            setOutput(prevOutput => [...prevOutput, [errorMsg, errorlevel.error]]);
        } finally {
            setCurrentRunLevel(RunLevel.stopped);
        }
    }

    const { resolvedTheme } = useTheme()
    configRef.current = {
        // Main
        idRef,
        sessionRef,
        theme: resolvedTheme ?? 'dark',
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
            />
            {/* TODO: Add feedback component again
            {isTeacherCS() && <Feedback c={configRef.current} />} */}
        </div>
    )
}
