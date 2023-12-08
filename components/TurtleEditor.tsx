import React, { useRef, useState, useEffect } from "react";
import type { AppProps } from "next/app";
import { NavItem, NavGroup } from "@portaljs/core";
// import TurtleOutput from "./TurtleEditor/TurtleOutput.ts.bak";
import UserInterface from "./TurtleEditor/UserInterface";
import useEditor from "./TurtleEditor/useEditor";
import { set } from "date-fns";
import { wrap } from "module";

declare global {
    interface Window {
        pyodide: any;
        loadPyodide: any;
        basthonKernel: any;
        skulptKernel: any;
    }
}
declare var Sk: any;
enum errorlevel {
    output = "output",
    warning = "warning",
    error = "error",
}

export enum RunLevel {
    stopped = "▶️ Play",
    running = "⛔ Stop",
}

type outputElement = [string | null, errorlevel | null];

function loadScript(scriptUrl, defer = false) {
    const script = document.createElement("script");
    script.src = scriptUrl;
    script.defer = defer;
    document.head.appendChild(script);

    return new Promise((res, rej) => {
        script.onload = function () {
            res(self);
        };
        script.onerror = function () {
            rej(self);
        };
    });
}

function TurtleEditor({ children, ...props }) {
    
    const [currentRunLevel, setCurrentRunLevel] = useState(RunLevel.stopped);
    const initCode = children.props.children;
    const codeeditor = useRef(null);
    const graphicswrapperRef = useRef(null);
    const startstopRef = useRef(null);
    const wrapperRef = useRef(null);

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
    useEffect(() => {
        loadScript("/skulpt.min.js", true)
            .then(() => {
                loadScript("/skulpt-stdlib.js", true).catch(() => {
                    console.error(
                        "Script loading skulpt-stdlib.min.js failed!"
                    );
                });
            })
            .catch(() => {
                console.error("Script loading skulpt.min.js failed!");
            });
    }, []);

    // Handling of the runlevel
    useEffect(() => {
        console.log("useEffect");
        if (typeof Sk !== 'undefined') {
            console.log("Sk is defined");
            if (currentRunLevel == RunLevel.stopped) {
                Sk.execLimit = 1;
            } else if (currentRunLevel == RunLevel.running) {
                runPythonCode(config.codeeditor.current.getValue());
                Sk.execLimit = Number.POSITIVE_INFINITY;
            }
        }
    }, [currentRunLevel]);

    const resetcodehandler = () => {
        config.codeeditor.current.setValue(initCode);
    };

    function runPythonCode(pythonCode: string) {
        if (Sk) {
            const canvas = graphicswrapperRef.current;
            const startstop = startstopRef.current;
            // Sk.pre = this.hash + "_turtleoutput";
            Sk.configure({
                output: (out) => setOutput((output) => [...output, [out, errorlevel.output]]),
                // read: this.builtinRead.bind(this),
                inputfunTakesPrompt: true,
                __future__: Sk.python3,
                python3: true,
                execLimit: Number.POSITIVE_INFINITY,
            });
            (
                Sk.TurtleGraphics ||
                (Sk.TurtleGraphics = {
                    width: canvas.width,
                    height: canvas.height,
                })
            ).target = canvas;
            var myPromise = Sk.misceval.asyncToPromise(function () {
                return Sk.importMainWithBody(
                    "<stdin>",
                    false,
                    codeeditor.current.getValue(),
                    true
                );
            });
            myPromise.then(
                function (mod) {
                    console.log("Turtle was a success", mod);
                    setCurrentRunLevel(RunLevel.stopped);
                },
                function (err) {
                    console.log(err.toString());
                    setCurrentRunLevel(RunLevel.stopped);
                    if (err.tp$name === "TimeoutError" && Sk.execLimit == 1) {
                        setOutput([...output, ["Abgebrochen", errorlevel.warning]]);
                    } else {
                        setOutput([...output, [err.toString(), errorlevel.error]]);
                    }
                }
            );
        }
    }

    const [config, setConfig] = useEditor({
        id: useRef(props["id"] ?? Math.random().toString(36).substring(7)),
        vstheme: "vs-dark",
        codeeditor: codeeditor,
        initCode: initCode,
        wrapperRef: wrapperRef,
        graphicswrapperRef: graphicswrapperRef,
        runPythonCode: runPythonCode,
    });

    return (
        <div>
            <UserInterface configState={[config, setConfig]} output={output} runlevel={[currentRunLevel, setCurrentRunLevel]}/>
        </div>
    );
}

export default TurtleEditor;
