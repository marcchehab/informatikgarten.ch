import React, { useEffect, useRef, useState } from "react";
import Editor, { Monaco } from "@monaco-editor/react";
import { RunLevel } from "./";
import { autosaveHandler, saveToCloud } from "./autosave";
import FeatherIcon from "feather-icons-react";

export default function UserInterface(props: any) {
    const [output, setOutput] = props.outputState;
    const [currentRunLevel, setCurrentRunLevel] = props.runlevel;
    const [position, setPosition] = useState({ top: null, left: null });
    const [fullscreen, setFullscreen] = useState(false);
    const [undoDisabled, setUndoDisabled] = useState(true);
    const [redoDisabled, setRedoDisabled] = useState(true);
    const codeControlRef = useRef(null);
    const graphicspanelRef = useRef(null);
    const resizerRef = useRef(null);
    let resizer_x = 0;
    let resizer_y = 0;
    let resizecontroller;
    const codeHistory = [];

    let newPosX = 0,
        newPosY = 0,
        startPosX = 0,
        startPosY = 0,
        canvasScale = 1;

    const configRef = props.configRef;
    const wrapperRef = configRef.current.wrapperRef;
    const graphicswrapperRef = configRef.current.graphicswrapperRef;
    const startstopRef = configRef.current.startstopRef;
    const editorpanel = useRef(null);
    const updateDimensions = () => {
        if (
            editorpanel.current === undefined ||
            configRef.current.codeeditorRef.current === null
        ) {
            return;
        }
        const width = editorpanel.current.clientWidth - 10;
        const contentHeight = Math.min(
            1000,
            configRef.current.codeeditorRef.current.getContentHeight() + 50
        );
        editorpanel.current.style.width = `${width}px`;
    };

    const fullScreenHandler = () => {
        setFullscreen(!fullscreen);
        graphicswrapperRef.current.style.removeProperty("top");
        graphicswrapperRef.current.style.removeProperty("left");
        updateDimensions();
    };

    const initResizer = () => {
        resizer_x = 0;
        resizer_y = 0;
        resizerRef.current.addEventListener("mousedown", (e) => {
            resizecontroller = new AbortController();
            resizer_x = e.clientX;
            resizer_y = e.clientY;
            window.addEventListener("mousemove", resize);
            window.addEventListener("mouseup", stopResize);
        });
    };
    const resize = (e) => {
        const dx = e.clientX - resizer_x;
        const dy = e.clientY - resizer_y;
        const leftPanel = editorpanel.current;
        const rightPanel = graphicspanelRef.current;
        const parentoffset = wrapperRef.current.offsetWidth;
        const newLeftWidth =
            ((leftPanel.offsetWidth + dx) * 100) / parentoffset;
        const newRightWidth =
            ((rightPanel.offsetWidth - dx) * 100) / parentoffset;
        leftPanel.style.width = `${newLeftWidth}%`;
        rightPanel.style.width = `${newRightWidth}%`;
        resizer_x = e.clientX;
        resizer_y = e.clientY;
    };

    const stopResize = (e) => {
        window.removeEventListener("mousemove", resize);
        window.removeEventListener("mouseup", stopResize);
        resizecontroller.abort();
        updateDimensions();
    };

    const grabCanvasHandler = (e) => {
        e.preventDefault();

        // get the starting position of the cursor
        startPosX = e.clientX;
        startPosY = e.clientY;
        const mouseMoveHandler = (e) => {
            // calculate the new position
            newPosX = startPosX - e.clientX;
            newPosY = startPosY - e.clientY;

            // with each move we also want to update the start X and Y
            startPosX = e.clientX;
            startPosY = e.clientY;
            setPosition({
                top: graphicswrapperRef.current.offsetTop - newPosY,
                left: graphicswrapperRef.current.offsetLeft - newPosX,
            });
        };
        document.addEventListener("mousemove", mouseMoveHandler);

        document.addEventListener("mouseup", function () {
            document.removeEventListener("mousemove", mouseMoveHandler);
        });
    };

    const zoomCanvasFnc = (e) => {
        e.preventDefault();
        canvasScale += e.deltaY * -0.001;
        graphicswrapperRef.current.style.transform = `translate(-50%, -50%) scale(${canvasScale}, ${canvasScale})`;
    };

    const handleDocClick = (e) => {
        if (
            codeControlRef &&
            codeControlRef.current &&
            configRef.current.historyIndexRef.current !== -1 &&
            !codeControlRef.current.contains(e.target)
        ) {
            configRef.current.historyIndexRef.current = -1;
            autosaveHandler(configRef);
            setRedoDisabled(true);
        }
    };

    useEffect(() => {
        updateDimensions();
        initResizer();

        if (graphicswrapperRef && graphicswrapperRef.current) {
            graphicswrapperRef.current.addEventListener("wheel", zoomCanvasFnc);
        }
        document.addEventListener("mousedown", handleDocClick);

        return () => {
            if (graphicswrapperRef && graphicswrapperRef.current) {
                graphicswrapperRef.current.removeEventListener(
                    "wheel",
                    zoomCanvasFnc
                );
            }
            document.removeEventListener("mousedown", handleDocClick);
        };
    }, []);

    const handleEditorDidMount = (editor: any) => {
        configRef.current.codeeditorRef.current = editor;

        // Restore code from history
        const history = configRef.current.historyRef.current;
        
        if (history[0] !== undefined) {
            editor.setValue(history[0].code);
        }
        if (history.length > 1) {
            setUndoDisabled(false);
        }

        // Autosave to local storage
        editor.onDidChangeModelContent(() => {
            autosaveHandler(configRef);
        });
    };

    // Reset code to original
    const resetCode = () => {
        if (configRef.current.codeeditorRef.current) {
            configRef.current.codeeditorRef.current.setValue(
                configRef.current.initCode
            );
        }
    };

    const RunLevelIcons = {
        [RunLevel.stopped]: <FeatherIcon size="16" icon="play" />,
        [RunLevel.running]: <FeatherIcon size="16" icon="pause" fill="red" />,
    };

    const browseHistory = (config, delta: number) => {
        const history = configRef.current.historyRef.current;
        const newIndex =
            Math.max(configRef.current.historyIndexRef.current, 0) + delta;
        // console.log(`browsing history to ${newIndex}`);

        if (newIndex >= 0 && newIndex < history.length - 1) {
            configRef.current.historyIndexRef.current = newIndex;
            configRef.current.codeeditorRef.current.setValue(history[newIndex].code);
        }
        setUndoDisabled(
            configRef.current.historyIndexRef.current >=
                configRef.current.historyRef.current.length - 1
        );
        setRedoDisabled(configRef.current.historyIndexRef.current <= 0);
    };

    const resetall = (config) => {
        configRef.current.historyRef.current = [];
        configRef.current.historyIndexRef.current = -1;
        configRef.current.codeeditorRef.current.setValue(
            configRef.current.initCode
        );
        localStorage.removeItem(configRef.current.idRef.current);
    }

    return (
        <div>
            <div
                className={
                    fullscreen ? "turtlewrapper fullscreen" : "turtlewrapper"
                }
                ref={wrapperRef}
            >
                <pre className="monacoeditor panel relative" ref={editorpanel}>
                    <Editor
                        height="90vh"
                        defaultLanguage="python"
                        automatic-layout="true"
                        onMount={handleEditorDidMount}
                        theme={configRef.current.vstheme}
                        defaultValue={configRef.current.initCode}
                        options={{
                            minimap: { enabled: false },
                            scrollbar: { horizontal: "hidden" },
                            overviewRulerLanes: 0,
                            scrollBeyondLastLine: false,
                            wordWrap: "on",
                            quickSuggestions: false,
                            // wrappingStrategy: 'advanced',
                        }}
                    />
                    <div
                        className="absolute right-2 bottom-2 z-10 flex space-x-1 items-center text-2xl"
                        ref={codeControlRef}
                    >
                        <a title="Reset all" onClick={() => resetall(configRef)}><FeatherIcon size="16" icon="x-square" /></a>
                        <a title="Save" onClick={() => saveToCloud(configRef)}><FeatherIcon size="16" icon="upload-cloud" /></a>
                        <a
                            title="Undo"
                            className={
                                undoDisabled ? "opacity-50" : "cursor-pointer"
                            }
                            onClick={() => browseHistory(configRef, 1)}
                        >
                            <FeatherIcon size="16" icon="chevron-left" />
                        </a>
                        <a
                            title="Redo"
                            className={
                                redoDisabled ? "opacity-50" : "cursor-pointer"
                            }
                            onClick={() => browseHistory(configRef, -1)}
                        >
                            <FeatherIcon size="16" icon="chevron-right" />
                        </a>
                        <a
                            className="cursor-pointer"
                            title="Reset Code"
                            onClick={resetCode}
                        >
                            <FeatherIcon size="16" icon="rotate-ccw" />
                        </a>
                    </div>
                </pre>
                <div className="resizer" ref={resizerRef}>
                    {" "}
                </div>

                <div className="graphicspanel panel" ref={graphicspanelRef}>
                    <div
                        className="graphicswrapper"
                        ref={graphicswrapperRef}
                        onMouseDown={grabCanvasHandler}
                        style={{
                            position: "absolute",
                            top: position.top,
                            left: position.left,
                        }}
                    ></div>
                </div>

                <a
                    className="absolute left-2 bottom-2 z-10 cursor-pointer text-2xl"
                    onClick={() => {
                        setOutput([]);
                        setCurrentRunLevel(
                            currentRunLevel === RunLevel.stopped
                                ? RunLevel.running
                                : RunLevel.stopped
                        );
                    }}
                    ref={startstopRef}
                >
                    {RunLevelIcons[currentRunLevel]}
                </a>

                <button
                    className="fullscreen-button absolute right-2 top-2 p-1 text-2x1"
                    type="button"
                    onClick={fullScreenHandler}
                >
                    {fullscreen ? <FeatherIcon size="16" icon="minimize-2" /> : <FeatherIcon size="16" icon="maximize-2" />}
                </button>
            </div>
            <pre className="outputpre">
                {output.map(([msg, errorlevel], index) => (
                    <span key={index} className={errorlevel}>
                        {msg}
                    </span>
                ))}
            </pre>
        </div>
    );
}
