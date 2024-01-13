import React, { useEffect, useRef, useState } from "react";
import Editor, { Monaco } from "@monaco-editor/react";
import { RunLevel } from "./";
import { autosaveHandler, saveToRemote, resetCode } from "./autosave";
import FeatherIcon from "feather-icons-react";
import { set } from "date-fns";
import log from "../logger";
import { useTheme } from "next-themes";

export default function UserInterface(props: any) {
    const c = props.configRef.current;
    c.theme = useTheme().theme;
    const [output, setOutput] = props.outputState;
    const [currentRunLevel, setCurrentRunLevel] = props.runlevel;
    const [position, setPosition] = useState({ top: null, left: null });
    const [fullscreen, setFullscreen] = useState(false);
    const [undoBool, setUndo] = useState(false);
    c.setUndo = setUndo;
    const [redoBool, setRedo] = useState(false);
    c.setRedo = setRedo;
    const codeControlRef = useRef(null);
    const resizerHRef = useRef(null);
    let resizer_x = 0;
    let resizer_y = 0;
    let resizecontroller;
    const codeHistory = [];

    let newPosX = 0,
        newPosY = 0,
        startPosX = 0,
        startPosY = 0,
        canvasScale = 1;

    const editorpanel = useRef(null);
    const updateDimensions = () => {
        if (
            editorpanel.current === undefined ||
            c.codeeditorRef.current === null
        ) {
            return;
        }
        const width = editorpanel.current.clientWidth - 10;
        const contentHeight = Math.min(
            1000,
            c.codeeditorRef.current.getContentHeight() + 50
        );
        editorpanel.current.style.width = `${width}px`;
    };

    const fullScreenHandler = () => {
        setFullscreen(!fullscreen);
        // c.graphicswrapperRef.current.style.removeProperty("top");
        // c.graphicswrapperRef.current.style.removeProperty("left");
        // updateDimensions();
    };

    const initResizer = () => {
        resizer_x = 0;
        resizer_y = 0;
        resizerHRef.current.addEventListener("mousedown", (e) => {
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
        const rightPanel = c.graphicspanelRef.current;
        const parentoffset = c.wrapperRef.current.offsetWidth;
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
                top: c.graphicswrapperRef.current.offsetTop - newPosY,
                left: c.graphicswrapperRef.current.offsetLeft - newPosX,
            });
        };
        document.addEventListener("mousemove", mouseMoveHandler);

        document.addEventListener("mouseup", function () {
            document.removeEventListener("mousemove", mouseMoveHandler);
        });
    };

    const zoomCanvasFnc = (e) => {
        console.log(e.deltaY);
        e.preventDefault();
        canvasScale += canvasScale * e.deltaY * 0.001;
        // canvasScale = Math.min(Math.max(0.125, canvasScale), 4);
        c.graphicswrapperRef.current.style.transform = `translate(-50%, -50%) scale(${canvasScale}, ${canvasScale})`;
    };

    const handleDocClick = (e) => {
        if (
            codeControlRef &&
            codeControlRef.current &&
            c.historyIndexRef.current !== -1 &&
            !codeControlRef.current.contains(e.target)
        ) {
            c.historyIndexRef.current = -1;
            autosaveHandler(c);
            setRedo(true);
        }
    };

    useEffect(() => {
        updateDimensions();
        initResizer();

        if (c.graphicspanelRef && c.graphicspanelRef.current) {
            c.graphicspanelRef.current.addEventListener(
                "wheel",
                zoomCanvasFnc
            );
        }
        document.addEventListener("mousedown", handleDocClick);

        return () => {
            if (c.graphicspanelRef && c.graphicspanelRef.current) {
                c.graphicspanelRef.current.removeEventListener(
                    "wheel",
                    zoomCanvasFnc
                );
            }
            document.removeEventListener("mousedown", handleDocClick);
        };
    }, []);

    const handleEditorDidMount = (editor: any) => {
        c.codeeditorRef.current = editor;

        // Restore code from history
        const history = c.historyRef.current;

        if (history[0] !== undefined) {
            editor.setValue(history[0].code);
        }
        if (history.length > 1) {
            setUndo(true);
        }

        // Autosave to local storage
        editor.onDidChangeModelContent(() => {
            autosaveHandler(c);
        });
    };

    const RunLevelIcons = {
        [RunLevel.stopped]: (
            <div className="bg-gray-200 bg-opacity-10 hover:bg-opacity-25 rounded-full border border-gray-300 flex items-center justify-center p-1">
                <FeatherIcon size="16" icon="play" />
                <span className="text-xs mx-1">Run</span>
            </div>
        ),
        [RunLevel.running]: (
            <div className="bg-gray-200 bg-opacity-10 hover:bg-opacity-25 rounded-full border border-gray-300 flex items-center justify-center p-1">
                <FeatherIcon
                    size="16"
                    icon="pause"
                />
                <span className="text-xs mx-1">Pause</span>
            </div>
        ),
    };

    const browseHistory = (c, delta: number) => {
        const history = c.historyRef.current;
        if (history.length <= 1) {
            setUndo(false);
            setRedo(false);
            return;
        }
        const newIndex = Math.max(c.historyIndexRef.current, 0) + delta;
        log(
            "DEBUG",
            `Browsing history to ${newIndex} of ${history.length - 1}`
        );

        if (newIndex >= 0 && newIndex < history.length) {
            c.historyIndexRef.current = newIndex;
            c.codeeditorRef.current.setValue(history[newIndex].code);
        }
        setUndo(newIndex < c.historyRef.current.length - 1);
        setRedo(newIndex > 0);
    };

    const resetall = (c) => {
        log("INFO", "Resetting all");
        c.historyRef.current = [];
        c.historyIndexRef.current = -1;
        c.codeeditorRef.current.setValue(c.initCode);
        localStorage.removeItem(c.idRef.current);
        setUndo(false);
        setRedo(false);
    };

    return (
        <div>
            <div
                className={
                    fullscreen ? "turtlewrapper fullscreen" : "turtlewrapper"
                }
                ref={c.wrapperRef}
            >
                <pre className="monacoeditor panel relative" ref={editorpanel}>
                    <Editor
                        // height="90vh"
                        defaultLanguage="python"
                        automatic-layout="true"
                        onMount={handleEditorDidMount}
                        theme={c.theme == "dark" ? "vs-dark" : "vs"}
                        defaultValue={c.initCode}
                        options={{
                            minimap: { enabled: false },
                            scrollbar: { horizontal: "hidden" },
                            overviewRulerLanes: 0,
                            // scrollBeyondLastLine: false,
                            wordWrap: "on",
                            // quickSuggestions: false,
                            wrappingStrategy: "advanced",
                        }}
                    />
                    <div
                        className="absolute right-5 bottom-2 z-10 flex space-x-1 items-center text-2xl"
                        ref={codeControlRef}
                    >
                        <a
                            title="Undo"
                            className={
                                undoBool ? "cursor-pointer" : "opacity-50"
                            }
                            onClick={() => {
                                if (undoBool) browseHistory(c, 1);
                            }}
                        >
                            <FeatherIcon size="16" icon="chevron-left" />
                        </a>
                        <a
                            title="Redo"
                            className={
                                redoBool ? "cursor-pointer" : "opacity-50"
                            }
                            onClick={() => {
                                if (redoBool) browseHistory(c, -1);
                            }}
                        >
                            <FeatherIcon size="16" icon="chevron-right" />
                        </a>
                        <a
                            className="cursor-pointer"
                            title="Reset Code"
                            onClick={() => resetCode(c)}
                        >
                            <FeatherIcon size="16" icon="rotate-ccw" />
                        </a>
                    </div>
                </pre>
                <div className="resizerH" ref={resizerHRef}></div>

                <div className="graphicspanel panel" ref={c.graphicspanelRef}>
                    <div
                        className="graphicswrapper"
                        ref={c.graphicswrapperRef}
                        onMouseDown={grabCanvasHandler}
                        style={{
                            position: "absolute",
                            top: position.top,
                            left: position.left,
                        }}
                    ></div>
                </div>

                <a
                    className="absolute left-4 bottom-2 z-10 cursor-pointer text-2xl"
                    onClick={() => {
                        setOutput([]);
                        setCurrentRunLevel(
                            currentRunLevel === RunLevel.stopped
                                ? RunLevel.running
                                : RunLevel.stopped
                        );
                    }}
                    ref={c.startstopRef}
                >
                    {RunLevelIcons[currentRunLevel]}
                </a>

                <button
                    className="fullscreen-button absolute right-2 top-2 p-1 text-2x1"
                    type="button"
                    onClick={fullScreenHandler}
                >
                    {fullscreen ? (
                        <FeatherIcon size="16" icon="minimize-2" />
                    ) : (
                        <FeatherIcon size="16" icon="maximize-2" />
                    )}
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
