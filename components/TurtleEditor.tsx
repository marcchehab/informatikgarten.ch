import Editor, { Monaco } from "@monaco-editor/react";
import React, { useRef, useState, useEffect } from "react";
import type { AppProps } from "next/app";
import { NavItem, NavGroup } from "@portaljs/core";
import { set } from "date-fns";
import { error } from "console";

let SkLoaded = false;
const svgFullscreen =
  '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M2 7V2H7" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/> <path d="M22 7V2H17" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/> <path d="M7 22L2 22L2 17" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/> <path d="M17 22L22 22L22 17" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/> </svg>';
const svgCollapsescreen =
  '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrows-angle-contract" viewBox="0 0 16 16"> <path fill-rule="evenodd" d="M.172 15.828a.5.5 0 0 0 .707 0l4.096-4.096V14.5a.5.5 0 1 0 1 0v-3.975a.5.5 0 0 0-.5-.5H1.5a.5.5 0 0 0 0 1h2.768L.172 15.121a.5.5 0 0 0 0 .707zM15.828.172a.5.5 0 0 0-.707 0l-4.096 4.096V1.5a.5.5 0 1 0-1 0v3.975a.5.5 0 0 0 .5.5H14.5a.5.5 0 0 0 0-1h-2.768L15.828.879a.5.5 0 0 0 0-.707z"/> </svg>';
let newPosX = 0,
  newPosY = 0,
  startPosX = 0,
  startPosY = 0;

interface TurtleWrapper extends HTMLElement {
  turtlesceneobj: Turtlescene;
}
interface CanvasContainer extends HTMLElement {
  x: number;
  y: number;
}

interface Turtlescene extends HTMLElement {
  wrapper: TurtleWrapper;
  id: string;
  RUNNING: boolean;

  // Monaco editor & code
  editordiv: HTMLElement;
  initcode: String;
  savetimeout: ReturnType<typeof setTimeout> | undefined;
  editor: any;

  // Convas stuff
  canvasdiv: HTMLElement;
  canvascontainer: CanvasContainer;
  canvasScale: number;
  resizer: HTMLElement;

  // Controls & Output
  outputpre: HTMLElement;
  startstop: HTMLElement;
  resetcode: HTMLElement;
  fullscreenbutton: HTMLElement;
  ignoreEvent: boolean;
  resizecontroller: AbortController;
  resizer_x: number;
  resizer_y: number;
}
class Turtlescene {
  constructor(wrapper) {
    this.wrapper = wrapper;
    this.id = wrapper.id;
    this.RUNNING = false;
    this.savetimeout = undefined;
    this.editordiv = this.wrapper.getElementsByClassName(
      "monacoeditor"
    )[0] as HTMLElement;
    this.initcode = this.editordiv.innerText;
    this.canvasdiv = document.getElementById(this.id + "_turtlecanvas");
    this.canvascontainer = document.getElementById(
      this.id + "_canvascontainer"
    ) as CanvasContainer;
    this.canvascontainer.addEventListener("mousedown", (e) =>
      this.grabCanvasHandler.bind(this)
    );
    this.canvasdiv.addEventListener("wheel", (e) => this.zoomCanvas.bind(this));
    this.canvasScale = 1;
    this.resizer = this.wrapper.getElementsByClassName(
      "resizer"
    )[0] as HTMLElement;
    this.outputpre = document.getElementById(this.id + "_outputpre");
    this.startstop = document.getElementById(this.id + "_startstop");
    // this.startstop.addEventListener("click", (e) => this.starthandler());
    this.resetcode = document.getElementById(this.id + "_resetcode");
    this.resetcode.addEventListener("click", (e) => this.resetcodehandler());
    this.fullscreenbutton = document.getElementById(this.id + "_fullscreen");
    this.fullscreenbutton.innerHTML = svgFullscreen;
    this.fullscreenbutton.addEventListener("click", (e) =>
      this.fullScreenHandler()
    );
    this.ignoreEvent = false;

    // Initialize functions
    this.initResizer();
  }

  autosave() {
    if (this.savetimeout !== undefined) {
      clearTimeout(this.savetimeout);
    }
    this.savetimeout = setTimeout(() => {
      const code = this.editor.getValue();
      localStorage[this.id] = this.editor.getValue();
      console.log("Autosaved code to localstorage, you're welcome 👍");
    }, 1000);
  }
  resetcodehandler() {
    this.editor.setValue(this.initcode);
  }
  // Update the dimensions of the editor
  updateDimensions() {
    if (this.editordiv === undefined) {
      return;
    }
    const width = this.editordiv.clientWidth - 10;
    const contentHeight = Math.min(1000, this.editor.getContentHeight() + 50);
    this.editordiv.style.width = `${width}px`;
    //this.editordiv.style.height = `${contentHeight}px`;
    //this.editordiv.style.padding = 0;
    //this.editordiv.style.border = 0;
  }
  fullScreenHandler() {
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
  }
  // Run the turtle code
  // outf(text, errorlevel = "output") {
  //     var mypre = this.outputpre;
  //     mypre.innerHTML = mypre.innerHTML + "<span class=\""+errorlevel+"\">"+text+"</span>";
  // }
  // builtinRead(x) {
  //     if (Sk.builtinFiles === undefined || Sk.builtinFiles["files"][x] === undefined)
  //             throw "File not found: '" + x + "'";
  //     return Sk.builtinFiles["files"][x];
  // }
  // runpython() {
  //     const code = this.editor.getValue();
  //     const mypre = this.outputpre;
  //     Sk.execLimit = Number.POSITIVE_INFINITY;
  //     mypre.innerHTML = '';
  //     Sk.pre = this.id+"_turtleoutput";
  //     Sk.configure({
  //         output:this.outf.bind(this),
  //         read:this.builtinRead.bind(this),
  //         inputfunTakesPrompt: true,
  //         __future__: Sk.python3,
  //         python3: true,
  //         execLimit: Number.POSITIVE_INFINITY
  //     });
  //     (Sk.TurtleGraphics || (Sk.TurtleGraphics = {
  //         width: 2000,
  //         height: 2000
  //     })).target = this.id+"_canvascontainer";
  //     var myPromise = Sk.misceval.asyncToPromise(function() {
  //         return Sk.importMainWithBody("<stdin>", false, code, true);
  //     });
  //     myPromise.then(function(mod) {
  //         console.log('Turtle was a success');
  //         this.startstophandler(true);
  //     }.bind(this),
  //         function(err) {
  //             console.log(err.toString());
  //             this.startstophandler(true);
  //             if (err.tp$name === "TimeoutError" && Sk.execLimit == 1) {
  //                 mypre.innerHTML = mypre.innerHTML + "<span class=\"warning\">Abgebrochen</span>";
  //             } else {
  //                 mypre.innerHTML = mypre.innerHTML + "<span class=\"error\">"+err.toString()+"</span>";
  //             }
  //     }.bind(this));
  //  }

  // Initialize the resizer for a given turtlewrapper
  initResizer() {
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
  }
  resize(e) {
    const dx = e.clientX - this.resizer_x;
    const dy = e.clientY - this.resizer_y;
    const leftPanel = this.editordiv;
    const rightPanel = this.canvasdiv;
    const parent = this.resizer.parentNode as HTMLElement;
    const newLeftWidth =
      ((leftPanel.offsetWidth + dx) * 100) / parent.offsetWidth;
    const newRightWidth =
      ((rightPanel.offsetWidth - dx) * 100) / parent.offsetWidth;
    leftPanel.style.width = `${newLeftWidth}%`;
    rightPanel.style.width = `${newRightWidth}%`;
    this.resizer_x = e.clientX;
    this.resizer_y = e.clientY;
  }

  stopResize() {
    this.resizecontroller.abort();
    this.updateDimensions();
    // window.removeEventListener('mousemove', this.resize);
    // window.removeEventListener('mouseup', this.stopResize);
  }

  // Expectes a Turtlescene-object and can have boolean RESETFLAG
  // startstophandler(RESETFLAG = false) {
  //     if (this.RUNNING || RESETFLAG) {
  //         this.startstop.innerHTML = "▶️ Start";
  //         this.RUNNING = false;
  //         Sk.execLimit = 1;
  //     } else {
  //         if (!SkLoaded) { loadSkulpt(this.starthandler, this); return; }
  //         this.starthandler();
  //     }
  // }
  // starthandler (obj = this) {
  //   console.log("Starting Turtle");
  //     obj.startstop.innerHTML = "⛔ Stop";
  //     obj.RUNNING = true;
  //     obj.runpython();
  // }

  zoomCanvas(e) {
    e.preventDefault();

    // Scale the canvas container
    this.canvasScale += e.deltaY * -0.001;
    this.canvascontainer.style.transform = `translate(-50%, -50%) scale(${this.canvasScale}, ${this.canvasScale})`;

    // const zoom = canvas.style.zoom || 1;
    // canvas.style.zoom = +zoom + delta;
  }

  grabCanvasHandler(e) {
    e.preventDefault();

    // get the starting position of the cursor
    startPosX = e.clientX;
    startPosY = e.clientY;
    const mouseMoveHandler = (e) => this.canvasMove(e);
    document.addEventListener("mousemove", mouseMoveHandler);

    document.addEventListener("mouseup", function () {
      document.removeEventListener("mousemove", mouseMoveHandler);
    });
  }

  canvasMove(e) {
    // calculate the new position
    newPosX = startPosX - e.clientX;
    newPosY = startPosY - e.clientY;

    // with each move we also want to update the start X and Y
    startPosX = e.clientX;
    startPosY = e.clientY;

    // set the element's new position:
    this.canvascontainer.style.top =
      this.canvascontainer.offsetTop - newPosY + "px";
    this.canvascontainer.style.left =
      this.canvascontainer.offsetLeft - newPosX + "px";
  }
}

export interface CustomAppProps {
  meta: {
    showToc: boolean;
    showEditLink: boolean;
    showSidebar: boolean;
    showComments: boolean;
    urlPath: string; // not sure what's this for
    editUrl?: string;
    [key: string]: any;
  };
  siteMap?: Array<NavItem | NavGroup>;
  [key: string]: any;
}
declare global {
  interface Window {
    pyodide: any;
    loadPyodide: any;
  }
}
enum errorlevel {
  output = "output",
  warning = "warning",
  error = "error",
}
type outputElement = [errorlevel | null, string | null];
function TurtleEditor(props) {
  const [output, setOutput] = useState([] as outputElement[]);
  const editorRef = useRef(null);
  const id = useRef(props["id"] ?? Math.random().toString(36).substring(7));
  function handleEditorDidMount(editor: any, monaco: Monaco) {
    editorRef.current = editor;
  }
  const vstheme = "vs-dark"; // document.body.classList.contains('dark') ? "vs-dark" : "vs";
  async function starthandler(obj = this) {
    if (editorRef.current) {
      const code = editorRef.current.getValue();
      runPythonCode(code);
    }
  }
  useEffect(() => {
    if (!window.pyodide) {
      const loadPyodide = async () => {
        await window
          //reroute stderr
          .loadPyodide({
            stdout: (msg: string) => {
              if (msg.trim() !== '') {
                setOutput((output) => [...output, [errorlevel.output, msg]]);
              }
            },
            stderr: (msg: string) => {
              if (msg.trim() !== '') {
                setOutput((output) => [...output, [errorlevel.error, msg]]);
              }
            },
          })
          .then((pyodide: any) => {
            window.pyodide = pyodide;
            (async () => {
              await pyodide.loadPackage("micropip").then(() => {
                const micropip = pyodide.pyimport("micropip");
                micropip.install("/turtle-0.0.1-py3-none-any.whl");
              });
            })();
          });
      };
      loadPyodide();
    }
  }, []);

  const runPythonCode = (pythonCode: string) => {
    if (window.pyodide) {
      setOutput([]);
      try {
        window.pyodide.runPython(pythonCode);
      } catch (e) {
        console.log(e.message);
        const lineregex = /^\s+File "<exec>"/g;
        e = e.message.split("\n");
        const index = e.findIndex((value) => lineregex.test(value));
        if (index) {
          e = e.slice(index);
          e[0] = e[0].replace('  File "<exec>", ', "Error on ");
        }
        // Create list of output elements
        e = e.map((value) => [errorlevel.error, value]);
        setOutput((output) => [...output, ...e]);
      }
    }
  };
  return (
    <div>
      <div id={id.current} className="turtlewrapper">
        <pre className="monacoeditor panel">
          <Editor
            height="90vh"
            defaultLanguage="python"
            automatic-layout="true"
            onMount={handleEditorDidMount}
            theme={vstheme}
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
        <div className="resizer"></div>
        <div id={`${id.current}_turtlecanvas`} className="turtlecanvas panel">
          <div
            id={`${id.current}_canvascontainer`}
            className="canvascontainer"
          ></div>
        </div>
        <a
          id={`${id.current}_startstop`}
          className="startstop"
          onClick={starthandler}
        >
          ▶️ Start
        </a>
        <a id={`${id.current}_resetcode`} className="resetcode">
          Reset Code
        </a>
        <button
          id={`${id.current}_fullscreen`}
          className="fullscreen-button"
          type="button"
        ></button>
      </div>
      <pre id={`${id.current}_outputpre`} className="outputpre">
        {output.map(([errorlevel, msg]) => (
          <span key={msg} className={errorlevel}>{msg}</span>
        ))}
      </pre>
    </div>
  );
}

export default TurtleEditor;
