import { autosaveHandler } from "../autosave";
import log from "@/components/logger";


/**
 * Event handler to grab the canvas in the graphics panel and move it around
 * @param e Event
 * @param c Main config object
 * @param setPosition State function to set the position of the canvas
 */
export const grabCanvasHandler = (e, c, setPosition) => {
    e.preventDefault();

    // get the starting position of the cursor
    let startPosX = e.clientX;
    let startPosY = e.clientY;
    const mouseMoveHandler = (e) => {
        // calculate the new position
        const newPosX = startPosX - e.clientX;
        const newPosY = startPosY - e.clientY;

        // with each move we also want to update the start X and Y
        startPosX = e.clientX;
        startPosY = e.clientY;
        setPosition({
            top: c.graphicswrapperRef.current.offsetTop - newPosY,
            left: c.graphicswrapperRef.current.offsetLeft - newPosX,
        });
    };
    document.addEventListener("mousemove", mouseMoveHandler);
    document.addEventListener("mouseup", function () {
        document.removeEventListener("mousemove", mouseMoveHandler);
    });
};

/**
 * Initializes the event listener to zoom in the graphics panel
 * @param c Main config object
 */
export const initScaler = (c) => {
    let canvasScale = 1;
    const zoomCanvasFnc = (e) => {
        e.preventDefault();
        canvasScale += canvasScale * e.deltaY * 0.001;
        // canvasScale = Math.min(Math.max(0.125, canvasScale), 4);
        c.graphicswrapperRef.current.style.transform = `translate(-50%, -50%) scale(${canvasScale}, ${canvasScale})`;
    };
    c.graphicspanelRef.current.addEventListener("wheel", zoomCanvasFnc);
}

/**
 * Resets the history index and autosaves the code upon clicking outside of the code editor
 * @param e Event
 * @param c Main config object
 * @param setRedo setRedo button state
 */
export const handleDocClick = (e, c, setRedo) => {
    if (
        c.codeControlRef &&
        c.codeControlRef.current &&
        c.historyIndexRef.current !== -1 &&
        !c.codeControlRef.current.contains(e.target)
    ) {
        c.historyIndexRef.current = -1;
        autosaveHandler(c);
        setRedo(false);
    }
};

/**
 * Attaches the necessary event listeners to resize the panels
 * @param c The main config object
 */
export const initResizer = (c) => {

    let resizer_x = 0;
    let resizer_y = 0;
    let resizecontroller = new AbortController();
    const resize = (e) => {
        const dx = e.clientX - resizer_x;
        const parentoffset = c.wrapperRef.current.offsetWidth;
        const newLeftWidth = ((c.editorPanelRef.current.offsetWidth + dx) * 100) / parentoffset;
        const newRightWidth = ((c.graphicspanelRef.current.offsetWidth - dx) * 100) / parentoffset;
        c.editorPanelRef.current.style.width = `${newLeftWidth}%`;
        c.graphicspanelRef.current.style.width = `${newRightWidth}%`;
        resizer_x = e.clientX;
        resizer_y = e.clientY;
    };
    const stopResize = (e) => {
        window.removeEventListener("mousemove", resize);
        window.removeEventListener("mouseup", stopResize);
        resizecontroller.abort();
    };
    c.resizerHRef.current.addEventListener("mousedown", (e) => {
        resizer_x = e.clientX;
        resizer_y = e.clientY;
        window.addEventListener("mousemove", resize);
        window.addEventListener("mouseup", stopResize);
    });
};
