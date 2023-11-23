import React, { useRef, useState, useEffect } from "react";
import type { AppProps } from "next/app";
import { NavItem, NavGroup } from "@portaljs/core";
import { GUIBase, GUIOptions } from "@basthon/gui-base";
// import TurtleOutput from "./TurtleEditor/TurtleOutput.ts.bak";
import UserInterface from "./TurtleEditor/UserInterface";
import useEditor from "./TurtleEditor/useEditor";

// const gui = new GUI({
//   kernelOptions: {
//     rootPath: window.basthonRoot,
//     language: window.basthonLanguage,
//   },
// });
// gui.init();


interface GraphicsWrapper extends HTMLElement {
    x: number;
    y: number;
}

interface TurtleEditor extends HTMLElement {
    wrapper: HTMLElement;
    config: {};
    id: string;
    RUNNING: boolean;

    // Monaco editor & code
    editordiv: HTMLElement;
    initcode: String;
    savetimeout: ReturnType<typeof setTimeout> | undefined;
    editor: any;

    // Convas stuff
    canvasdiv: HTMLElement;
    GraphicsWrapper: GraphicsWrapper;
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

function TurtleEditor({ children, ...props }) {

    const savetimeout = undefined;
    const initCode = children.props.children;
    const [output, setOutput] = useState([] as outputElement[]);

    const autosave = () => {
        if (this.savetimeout !== undefined) {
            clearTimeout(this.savetimeout);
        }
        this.savetimeout = setTimeout(() => {
            const code = this.editor.getValue();
            localStorage[this.id] = this.editor.getValue();
            console.log("Autosaved code to localstorage, you're welcome 👍");
        }, 1000);
    };
    const resetcodehandler = () => {
        this.editor.setValue(this.initcode);
    };
    let newPosX = 0,
        newPosY = 0,
        startPosX = 0,
        startPosY = 0;

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
    
    const [config, setConfig] = useEditor({
      vstheme: "vs-dark",
      CodeEditorScript: useRef(null),
      run: runPythonCode,
      codeeditor: useRef(null),
      initCode: initCode
  });
    const id = useRef(props["id"] ?? Math.random().toString(36).substring(7)); // document.body.classList.contains('dark') ? "vs-dark" : "vs";
    useEffect(() => {
        if (!window.pyodide) {
            const loadPyodide = async () => {
                await window
                    //reroute stderr
                    .loadPyodide({
                        stdout: (msg: string) => {
                            if (msg.trim() !== "") {
                                setOutput((output) => [
                                    ...output,
                                    [errorlevel.output, msg],
                                ]);
                            }
                        },
                        stderr: (msg: string) => {
                            if (msg.trim() !== "") {
                                setOutput((output) => [
                                    ...output,
                                    [errorlevel.error, msg],
                                ]);
                            }
                        },
                    })
                    .then((pyodide: any) => {
                        window.pyodide = pyodide;
                        (async () => {
                            await pyodide.loadPackage("micropip").then(() => {
                                const micropip = pyodide.pyimport("micropip");
                                micropip.install(
                                    "/turtle-0.0.1-py3-none-any.whl"
                                );
                            });
                        })();
                    });
            };
            loadPyodide();
        }
    }, []);
    return (
        <div>
            <UserInterface configState={[config, setConfig]} output={output} />
        </div>
    );
}

export default TurtleEditor;
