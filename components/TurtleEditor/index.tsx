import React, { useRef, useState, useEffect } from "react";
import { useRouter } from "next/router";
import UserInterface from "./UI";
import { saveBeforeUnload, restoreHandler } from "./autosave";

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
    stopped,
    running,
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
    const router = useRouter();
    const url = router.asPath;
    const idRef = useRef(props["id"] ?? url + "-" + turtleCounter);
    const configRef = useRef(null);
    turtleCounter += 1;
    useRouter().events.on("routeChangeStart", () => (turtleCounter = 0));

    const [currentRunLevel, setCurrentRunLevel] = useState(RunLevel.stopped);

    const initCode = typeof children === "string" ? children : "invalid code";
    const historyRef = useRef(null);
    const historyIndexRef = useRef(-1);

    const codeeditorRef = useRef(null);
    const graphicswrapperRef = useRef(null);
    const startstopRef = useRef(null);
    const wrapperRef = useRef(null);

    const [output, setOutput] = useState([] as outputElement[]);

    useEffect(() => {
        // Restore
        historyRef.current = restoreHandler(configRef);
        // Load skulpt and skulpt-stdlib
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

        // Function to handle the beforeunload event
        function handleBeforeUnload() {
            saveBeforeUnload(configRef);
        }

        // Add event listener when the component mounts
        window.addEventListener("beforeunload", handleBeforeUnload);
        router.events.on('routeChangeStart', handleBeforeUnload);

        // Return a function to be run when the component unmounts
        return () => {
            // Remove event listener when the component unmounts
            window.removeEventListener("beforeunload", handleBeforeUnload);
            router.events.off('routeChangeStart', handleBeforeUnload);
        };
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

    configRef.current = {
        idRef: idRef,
        vstheme: "vs-dark",
        codeeditorRef: codeeditorRef,
        initCode: initCode,
        wrapperRef: wrapperRef,
        historyRef: historyRef,
        historyIndexRef: historyIndexRef,
        graphicswrapperRef: graphicswrapperRef,
        runPythonCode: runPythonCode,
        autosaveCounterRef: useRef(0),
    };

    return (
        <div>
            <UserInterface
                configRef={configRef}
                outputState={[output, setOutput]}
                runlevel={[currentRunLevel, setCurrentRunLevel]}
            />
        </div>
    );
}

export default TurtleEditor;