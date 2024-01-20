import React, { useEffect, useRef, useState } from "react";
import Editor, { Monaco } from "@monaco-editor/react";
import { RunLevel } from "../";
import { autosaveHandler, resetCode } from "../autosave";
import FeatherIcon from "feather-icons-react";
import { set } from "date-fns";
import log from "@/components/logger";
import { useTheme } from "next-themes";
import ButtonCloud from "./ButtonCloud";
import {
    grabCanvasHandler,
    handleDocClick,
    initResizer,
    initScaler,
} from "./handlers";

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

    useEffect(() => {
        initResizer(c);

        if (c.graphicspanelRef && c.graphicspanelRef.current) {
            initScaler(c);
        }
        document.addEventListener("mousedown", (e) =>
            handleDocClick(e, c, setRedo)
        );

        return () => {
            document.removeEventListener("mousedown", (e) =>
                handleDocClick(e, c, setRedo)
            );
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
        editor.onDidChangeModelContent(() => autosaveHandler(c));
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
                <FeatherIcon size="16" icon="pause" />
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
        c.autosaveCounterRef.current = 0;
        setUndo(false);
        setRedo(false);
    };

    return (
        <div
            className={
                fullscreen ? "turtlewrapper fullscreen" : "turtlewrapper"
            }
            ref={c.wrapperRef}
        >
            <div className="row">
                <div
                    className="monacoeditor panel relative"
                    ref={c.editorPanelRef}
                >
                    <Editor
                        // height="90vh"
                        defaultLanguage="python"
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
                            automaticLayout: true,
                        }}
                    />
                    <div
                        className="absolute right-5 bottom-2 z-10 flex space-x-1 items-center text-2xl"
                        ref={c.codeControlRef}
                    >
                        {process.env.NEXT_PUBLIC_LOG_LEVEL == "DEBUG" && (
                            <a
                                title="Resetall"
                                className="cursor-pointer"
                                onClick={() => {
                                    if (undoBool) resetall(c);
                                }}
                            >
                                <FeatherIcon size="16" icon="x-circle" />
                            </a>
                        )}
                        {process.env.NEXT_PUBLIC_LOG_LEVEL == "DEBUG" && (
                            <ButtonCloud c={c} />
                        )}
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
                </div>
                <div className="resizerH" ref={c.resizerHRef}></div>

                <div className="graphicspanel panel" ref={c.graphicspanelRef}>
                    <div
                        className="graphicswrapper"
                        ref={c.graphicswrapperRef}
                        onMouseDown={(e) =>
                            grabCanvasHandler(e, c, setPosition)
                        }
                        style={{
                            position: "absolute",
                            top: position.top,
                            left: position.left,
                        }}
                    ></div>

                    <button
                        className="fullscreen-button absolute right-2 top-2 p-1 text-2x1"
                        type="button"
                        onClick={() => {
                            document.body.classList.toggle(
                                "fullscreen",
                                !fullscreen
                            );
                            setFullscreen(!fullscreen);
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
            <div className="row output">
                <pre className="outputpre">
                    {output.map(([msg, errorlevel], index) => (
                        <span key={index} className={errorlevel}>
                            {msg}
                        </span>
                    ))}
                </pre>
            </div>
        </div>
    );
}
