import React, { useEffect, useRef, useState } from "react";
import Editor, { Monaco } from "@monaco-editor/react";
import { RunLevel } from "../TurtleEditor";
import { SvgCollapsescreen, SvgFullscreen } from "./UIelements";

export default function UserInterface(props: any) {
    const output = props.output;
    const [currentRunLevel, setCurrentRunLevel] = props.runlevel;
    const [position, setPosition] = useState({ top: 0, left: 0 });
    const [fullscreen, setFullscreen] = useState(false);
    const graphicspanelRef = useRef(null);
    const resizerRef = useRef(null);
    let resizer_x = 0;
    let resizer_y = 0;
    let resizecontroller;

    let newPosX = 0,
        newPosY = 0,
        startPosX = 0,
        startPosY = 0,
        canvasScale = 1;

    const [config, setConfig] = props.configState;
    const initCode = config.initCode;
    const wrapperRef = config.wrapperRef;
    const graphicswrapperRef = config.graphicswrapperRef;
    const startstopRef = config.startstopRef;
    const editorpanel = useRef(null);
    const updateDimensions = () => {
        if (
            editorpanel.current === undefined ||
            config.codeeditor.current === null
        ) {
            return;
        }
        const width = editorpanel.current.clientWidth - 10;
        const contentHeight = Math.min(
            1000,
            config.codeeditor.current.getContentHeight() + 50
        );
        editorpanel.current.style.width = `${width}px`;
    };

    const fullScreenHandler = () => {
        setFullscreen(!fullscreen);
        console.log(fullscreen);
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

    useEffect(() => {
        updateDimensions();
        initResizer();
        if (graphicswrapperRef.current) {
            const zoomCanvas = (e) => {
                e.preventDefault();
                canvasScale += e.deltaY * -0.001;
                graphicswrapperRef.current.style.transform = `translate(-50%, -50%) scale(${canvasScale}, ${canvasScale})`;
            };
            graphicswrapperRef.current.addEventListener("wheel", zoomCanvas);

            return () => {
                if (graphicswrapperRef.current) {
                    graphicswrapperRef.current.removeEventListener(
                        "wheel",
                        zoomCanvas
                    );
                }
            };
        }
    }, []);

    function handleEditorDidMount(editor: any, monaco: Monaco) {
        config.codeeditor.current = editor;
    }
    // async function starthandler(obj = this) {
    //     console.log("start");
    //     if (config.codeeditor.current) {
    //         setCurrentRunLevel(RunLevel.running);
    //     }
    // }
    return (
        <div>
            <div
                className={
                    fullscreen ? "turtlewrapper fullscreen" : "turtlewrapper"
                }
                ref={wrapperRef}
            >
                <pre className="monacoeditor panel" ref={editorpanel}>
                    <Editor
                        height="90vh"
                        defaultLanguage="python"
                        automatic-layout="true"
                        onMount={handleEditorDidMount}
                        theme={config.vstheme}
                        defaultValue={initCode}
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
                    className="startstop"
                    onClick={() =>
                        setCurrentRunLevel(
                            currentRunLevel === RunLevel.stopped
                                ? RunLevel.running
                                : RunLevel.stopped
                        )
                    }
                    ref={startstopRef}
                >
                    {currentRunLevel}
                </a>
                <a className="resetcode">Reset Code</a>
                <button
                    className="fullscreen-button"
                    type="button"
                    onClick={fullScreenHandler}
                >
                    {fullscreen ? <SvgCollapsescreen /> : <SvgFullscreen />}
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
