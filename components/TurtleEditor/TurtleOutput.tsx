import TurtleEditor from "../TurtleEditor";
import { useEffect } from "react";

function GraphicsOutput({ data }) {
    useEffect(() => {
        if (window.pyodide) {
            console.log(window.pyodide);
            // Use window.pyodide here
            // window.pyodide.addEventListener("eval.display", (data) =>
            // display(data)
            // );
        }

        // this._gui.kernelLoader.kernelAvailable().then(() => {
        //   this._gui.kernel?.addEventListener("eval.display", (data) =>
        //     this.display(data)
        //   );
        // });
    }, []);

    const display = (data) => {
        console.log(data);
    };

    return <div></div>;
}

export default GraphicsOutput;
