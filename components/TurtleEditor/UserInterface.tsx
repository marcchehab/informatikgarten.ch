import React, { useEffect, useRef } from "react";
import { runPythonCode } from "../TurtleEditor";
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
// this.resizer = this.wrapper.getElementsByClassName(
// "resizer"
// )[0] as HTMLElement;
// this.outputpre = document.getElementById(this.id + "_outputpre");
// this.startstop = document.getElementById(this.id + "_startstop");
// // this.startstop.addEventListener("click", (e) => this.starthandler());
// this.resetcode = document.getElementById(this.id + "_resetcode");
// this.resetcode.addEventListener("click", (e) => this.resetcodehandler());
// this.fullscreenbutton = document.getElementById(this.id + "_fullscreen");
// this.fullscreenbutton.innerHTML = svgFullscreen;
// this.fullscreenbutton.addEventListener("click", (e) =>
// this.fullScreenHandler()
// );
// this.ignoreEvent = false;

export default function UserInterface(props: any) {
    const output = props.output;
    const [config, setConfig] = props.configState;
    const updateDimensions = () => {
        if (this.editordiv === undefined) {
          return;
        }
        const width = this.editordiv.clientWidth - 10;
        const contentHeight = Math.min(1000, this.editor.getContentHeight() + 50);
        this.editordiv.style.width = `${width}px`;
        //this.editordiv.style.height = `${contentHeight}px`;
        //this.editordiv.style.padding = 0;
        //this.editordiv.style.border = 0;
    };

    const fullScreenHandler = () => {
        if (this.wrapper.classList.contains("fullscreen")) {
          this.wrapper.classList.remove("fullscreen");
          this.fullscreenbutton.innerHTML = svgFullscreen;
        } else {
          this.wrapper.classList.add("fullscreen");
          this.fullscreenbutton.innerHTML = svgCollapsescreen;
        }
        this.canvascontainer.style.removeProperty("top");
        this.canvascontainer.style.removeProperty("left");
        this.updateDimensions();
    };

    const initResizer = () => {
        this.resizer_x = 0;
        this.resizer_y = 0;
        this.resizer.addEventListener("mousedown", (e) => {
          this.resizecontroller = new AbortController();
          this.resizer_x = e.clientX;
          this.resizer_y = e.clientY;
          window.addEventListener("mousemove", this.resize.bind(this), {
            signal: this.resizecontroller.signal,
          });
          window.addEventListener("mouseup", this.stopResize.bind(this), {
            signal: this.resizecontroller.signal,
          });
        });
    };

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
            <div className="turtlewrapper">
                <pre className="monacoeditor panel">
                    <Editor
                        height="90vh"
                        defaultLanguage="python"
                        automatic-layout="true"
                        onMount={handleEditorDidMount}
                        theme={config.vstheme}
                        defaultValue={props.children.props.children}
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
                <div className="resizer"> </div>
                <div className="graphicspanel panel">
                    <div className="GraphicsWrapper"></div>
                </div>
                <a className="startstop" onClick={starthandler}>
                    ▶️ Start
                </a>
                <a className="resetcode">Reset Code</a>
                <button className="fullscreen-button" type="button"></button>
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
