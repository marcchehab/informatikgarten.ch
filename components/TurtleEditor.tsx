import React, { useRef, useState, useEffect } from "react";
import type { AppProps } from "next/app";
import { NavItem, NavGroup } from "@portaljs/core";
// import TurtleOutput from "./TurtleEditor/TurtleOutput.ts.bak";
import UserInterface from "./TurtleEditor/UserInterface";
import useEditor from "./TurtleEditor/useEditor";

declare global {
    interface Window {
        pyodide: any;
        loadPyodide: any;
        pykernel: any;
    }
}
enum errorlevel {
    output = "output",
    warning = "warning",
    error = "error",
}

type outputElement = [errorlevel | null, string | null];

function TurtleEditor({ children, ...props }) {
    const initCode = children.props.children;
    const codeeditor = useRef(null);

    let newPosX = 0,
        newPosY = 0,
        startPosX = 0,
        startPosY = 0;

    let savetimeout = undefined;
    const [output, setOutput] = useState([] as outputElement[]);

    const autosave = () => {
        if (savetimeout !== undefined) {
            clearTimeout(savetimeout);
        }
        savetimeout = setTimeout(() => {
            const code = config.codeeditor.current.getValue();
            localStorage[config.id.current] =
                config.codeeditor.current.getValue();
            console.log("Autosaved code to localstorage, you're welcome 👍");
        }, 1000);
    };
    const resetcodehandler = () => {
        config.codeeditor.current.setValue(initCode);
    };

    function runPythonCode (pythonCode: string) {
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
    

    const [config, setConfig] = useEditor({
        id: useRef(props["id"] ?? Math.random().toString(36).substring(7)),
        vstheme: "vs-dark",
        codeeditor: codeeditor,
        initCode: initCode,
        runPythonCode: runPythonCode,
    });

    return (
        <div>
            <UserInterface configState={[config, setConfig]} output={output} />
        </div>
    );
}

export default TurtleEditor;
