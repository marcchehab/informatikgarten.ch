import React, { useEffect, useRef } from "react";
import Editor, { Monaco } from "@monaco-editor/react";
/*
This class contains all things related to HTML user interface.
*/

const svgFullscreen =
    '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M2 7V2H7" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/> <path d="M22 7V2H17" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/> <path d="M7 22L2 22L2 17" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/> <path d="M17 22L22 22L22 17" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/> </svg>';
const svgCollapsescreen =
    '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrows-angle-contract" viewBox="0 0 16 16"> <path fill-rule="evenodd" d="M.172 15.828a.5.5 0 0 0 .707 0l4.096-4.096V14.5a.5.5 0 1 0 1 0v-3.975a.5.5 0 0 0-.5-.5H1.5a.5.5 0 0 0 0 1h2.768L.172 15.121a.5.5 0 0 0 0 .707zM15.828.172a.5.5 0 0 0-.707 0l-4.096 4.096V1.5a.5.5 0 1 0-1 0v3.975a.5.5 0 0 0 .5.5H14.5a.5.5 0 0 0 0-1h-2.768L15.828.879a.5.5 0 0 0 0-.707z"/> </svg>';

// this.GraphicsWrapper.addEventListener("mousedown", (e) =>
// this.grabCanvasHandler.bind(this)
// );
// this.canvasdiv.addEventListener("wheel", (e) => this.zoomCanvas.bind(this));
// this.canvasScale = 1;
// this.resizer = wrapperRef.current.getElementsByClassName(
// "resizer"
// )[0] as HTMLElement;
// this.outputpre = document.getElementById(this.id + "_outputpre");
// this.startstop = document.getElementById(this.id + "_startstop");
// // this.startstop.addEventListener("click", (e) => this.starthandler());
// this.resetcode = document.getElementById(this.id + "_resetcode");
// this.resetcode.addEventListener("click", (e) => this.resetcodehandler());
// fullscreenbuttonRef.current = document.getElementById(this.id + "_fullscreen");
// fullscreenbuttonRef.current.innerHTML = svgFullscreen;
// fullscreenbuttonRef.current.addEventListener("click", (e) =>
// this.fullScreenHandler()
// );
// this.ignoreEvent = false;

export default function UserInterface(props: any) {
    const output = props.output;
    const wrapperRef = useRef(null);
    const runPythonCode = props.runPythonCode;
    const fullscreenbuttonRef = useRef(null);
    const graphicswrapperRef = useRef(null);
    const graphicspanelRef = useRef(null);
    const resizerRef = useRef(null);
    let resizer_x = 0;
    let resizer_y = 0;
    let resizecontroller;

    const [config, setConfig] = props.configState;
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
        //editorpanel.current.style.height = `${contentHeight}px`;
        //editorpanel.current.style.padding = 0;
        //editorpanel.current.style.border = 0;
    };

    const fullScreenHandler = () => {
        if (wrapperRef.current.classList.contains("fullscreen")) {
            wrapperRef.current.classList.remove("fullscreen");
            fullscreenbuttonRef.current.innerHTML = svgFullscreen;
        } else {
            wrapperRef.current.classList.add("fullscreen");
            fullscreenbuttonRef.current.innerHTML = svgCollapsescreen;
        }
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
        resizecontroller.abort();
        updateDimensions();
        // window.removeEventListener('mousemove', this.resize);
        // window.removeEventListener('mouseup', this.stopResize);
    };

    useEffect(() => {
        return () => {
            window.removeEventListener("mousemove", resize);
            window.removeEventListener("mouseup", stopResize);
        };
    }, [resize, stopResize]);

    useEffect(() => {
        updateDimensions();
        fullScreenHandler();
        initResizer();
    }, []);

    function handleEditorDidMount(editor: any, monaco: Monaco) {
        config.codeeditor.current = editor;
    }
    async function starthandler(obj = this) {
        if (config.codeeditor.current) {
            const code = config.codeeditor.current.getValue();
            runPythonCode(code);
        }
    }
    return (
        <div>
            <div className="turtlewrapper" ref={wrapperRef}>
                <pre className="monacoeditor panel" ref={editorpanel}>
                    <Editor
                        height="90vh"
                        defaultLanguage="python"
                        automatic-layout="true"
                        onMount={handleEditorDidMount}
                        theme={config.vstheme}
                        defaultValue={props.children}
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
                <div className="resizer" ref={resizerRef}> </div>
                <div className="graphicspanel panel" ref={graphicspanelRef}>
                    <div
                        className="graphicswrapper"
                        ref={graphicswrapperRef}
                    ></div>
                </div>
                <a className="startstop" onClick={starthandler}>
                    ▶️ Start
                </a>
                <a className="resetcode">Reset Code</a>
                <button
                    className="fullscreen-button"
                    type="button"
                    ref={fullscreenbuttonRef}
                ></button>
            </div>
            <pre className="outputpre">
                {output.map(([errorlevel, msg]) => (
                    <span key={msg} className={errorlevel}>
                        {msg}
                    </span>
                ))}
            </pre>
        </div>
    );
}
