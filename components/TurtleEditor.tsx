import React, { useRef, useState, useEffect } from "react";
import { useRouter } from "next/router";
import type { AppProps } from "next/app";
import { NavItem, NavGroup } from "@portaljs/core";
// import TurtleOutput from "./TurtleEditor/TurtleOutput.ts.bak";
import UserInterface from "./TurtleEditor/UserInterface";
import useEditor from "./TurtleEditor/useEditor";
import { set } from "date-fns";
import { wrap } from "module";
import { url } from "inspector";

// TODO switch to signals https://www.youtube.com/watch?v=SO8lBVWF2Y8

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

export type outputElement = [string | null, errorlevel | null];

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

let turtleCounter = 0;

function TurtleEditor({ children, ...props }) {
    const url = useRouter().asPath;
    const idRef = useRef(props["id"] ?? url + "-" + turtleCounter);
    turtleCounter += 1;
    useRouter().events.on('routeChangeStart', () => turtleCounter = 0);

    const [currentRunLevel, setCurrentRunLevel] = useState(RunLevel.stopped);

    const initCode = typeof children === "string" ? children : "invalid code";

    const codeeditorRef = useRef(null);
    const graphicswrapperRef = useRef(null);
    const startstopRef = useRef(null);
    const wrapperRef = useRef(null);

    const [output, setOutput] = useState([] as outputElement[]);

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
        if (typeof Sk !== "undefined") {
            if (currentRunLevel == RunLevel.stopped) {
                Sk.execLimit = 1;
            } else if (currentRunLevel == RunLevel.running) {
                runPythonCode(codeeditorRef.current.getValue());
                Sk.execLimit = Number.POSITIVE_INFINITY;
            }
        }
    }, [currentRunLevel]);

    const resetcodehandler = () => {
        codeeditorRef.current.setValue(initCode);
    };

    function runPythonCode(pythonCode: string) {
        if (Sk) {
            const canvas = graphicswrapperRef.current;
            const startstop = startstopRef.current;
            Sk.configure({
                output: (out) =>
                    setOutput((output) => [
                        ...output,
                        [out, errorlevel.output],
                    ]),
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
                    codeeditorRef.current.getValue(),
                    true
                );
            });
            myPromise.then(
                function (mod) {
                    console.log("Turtle was a success");
                    setCurrentRunLevel(RunLevel.stopped);
                },
                function (err) {
                    setCurrentRunLevel(RunLevel.stopped);
                    if (err.tp$name === "TimeoutError" && Sk.execLimit == 1) {
                        setOutput([
                            ...output,
                            ["Abgebrochen", errorlevel.warning],
                        ]);
                    } else {
                        setOutput([
                            ...output,
                            [err.toString(), errorlevel.error],
                        ]);
                    }
                }
            );
        }
    }

    const [config, setConfig] = useEditor({
        idRef: idRef,
        vstheme: "vs-dark",
        codeeditorRef: codeeditorRef,
        initCode: initCode,
        wrapperRef: wrapperRef,
        graphicswrapperRef: graphicswrapperRef,
        runPythonCode: runPythonCode,
    });

    return (
        <div>
            <UserInterface
                configState={[config, setConfig]}
                outputState={[output, setOutput]}
                runlevel={[currentRunLevel, setCurrentRunLevel]}
            />
        </div>
    );
}

export default TurtleEditor;
