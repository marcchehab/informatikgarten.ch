import React, { useRef, useState, useEffect } from "react";
import { useRouter } from "next/router";
import UserInterface from "./ui";
import { saveBeforeUnload, restoreHandler, loadFromRemote } from "./autosave";
import log from "../logger";
import { useSession } from "next-auth/react";

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
    const { data: session } = useSession();
    const sessionRef = useRef(session);
    // Is refreshed below

    const initCode = typeof children === "string" ? children : "invalid code";
    const historyRef = useRef(null);
    const historyIndexRef = useRef(-1);

    const codeeditorRef = useRef(null);
    const graphicswrapperRef = useRef(null);
    const startstopRef = useRef(null);
    const wrapperRef = useRef(null);

    const [output, setOutput] = useState<outputElement[]>([]);

    useEffect(() => {
        // Restore
        restoreHandler(configRef.current);
        // Load skulpt and skulpt-stdlib
        loadScript("/skulpt.min.js", true)
            .then(() => {
                loadScript("/skulpt-stdlib.js", true).catch(() => {
                    log("ERROR", "Script loading skulpt-stdlib.js failed!");
                });
            })
            .catch(() => {
                log("ERROR", "Script loading skulpt.min.js failed!");
            });

        // Function to handle the beforeunload event
        function handleBeforeUnload() {
            saveBeforeUnload(configRef.current);
        }

        // Add event listener when the component mounts
        window.addEventListener("beforeunload", handleBeforeUnload);
        router.events.on("routeChangeStart", handleBeforeUnload);

        // Return a function to be run when the component unmounts
        return () => {
            // Remove event listener when the component unmounts
            window.removeEventListener("beforeunload", handleBeforeUnload);
            router.events.off("routeChangeStart", handleBeforeUnload);
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
                    log("INFO", "Turtle was a success");
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
        // Main
        idRef: idRef,
        sessionRef: sessionRef,
        theme: "dark",
        wrapperRef: wrapperRef,
        resizerHRef: useRef(null),
        // Code editor
        codeeditorRef: codeeditorRef,
        editorPanelRef: useRef(null),
        graphicswrapperRef: graphicswrapperRef,
        graphicspanelRef: useRef(null),
        historyRef: historyRef,
        historyIndexRef: historyIndexRef,
        // Code
        initCode: initCode,
        runPythonCode: runPythonCode,
        autosaveCounterRef: useRef(0),
        codeControlRef: useRef(null),
        // lastTimestampPromiseRef: lastTimestampPromiseRef,
        remoteTimestampsRef: useRef(new Set()),
    };

    useEffect(() => {
        if (session) {
            log("INFO", "Logged in!");
            configRef.current.sessionRef.current = session;
            loadFromRemote(configRef.current);
        }
    }, [session]);

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
