import type { TurtleConfigType } from '../types/TurtleTypes'
import { autosaveHandler } from './autosave'

/**
 * Event handler to grab the canvas in the graphics panel and move it around
 * @param e Event
 * @param c Main config object
 * @param setPosition State function to set the position of the canvas
 */
export const grabCanvasHandler = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    c: TurtleConfigType,
    setPosition: (position: { top: number; left: number }) => void
) => {
    e.preventDefault()

    // get the starting position of the cursor
    let startPosX = e.clientX
    let startPosY = e.clientY
    const mouseMoveHandler = (e: MouseEvent) => {
        // calculate the new position
        const newPosX = startPosX - e.clientX
        const newPosY = startPosY - e.clientY

        // with each move we also want to update the start X and Y
        startPosX = e.clientX
        startPosY = e.clientY
        if (c.graphicswrapperRef.current) {
            setPosition({
                top: c.graphicswrapperRef.current.offsetTop - newPosY,
                left: c.graphicswrapperRef.current.offsetLeft - newPosX
            })
        }
    }
    document.addEventListener('mousemove', mouseMoveHandler)
    document.addEventListener('mouseup', () => {
        document.removeEventListener('mousemove', mouseMoveHandler)
    })
}

/**
 * Touch event handler to drag the canvas with single finger
 * @param e Touch event
 * @param c Main config object
 * @param setPosition State function to set the position of the canvas
 */
export const grabCanvasTouchHandler = (
    e: React.TouchEvent<HTMLDivElement>,
    c: TurtleConfigType,
    setPosition: (position: { top: number; left: number }) => void
) => {
    // Only handle single-finger touch for dragging
    if (e.touches.length !== 1) return

    const touch = e.touches[0]
    if (!touch) return
    let startPosX = touch.clientX
    let startPosY = touch.clientY

    const touchMoveHandler = (e: TouchEvent) => {
        if (e.touches.length !== 1) return

        const touch = e.touches[0]
        if (!touch) return
        const newPosX = startPosX - touch.clientX
        const newPosY = startPosY - touch.clientY

        startPosX = touch.clientX
        startPosY = touch.clientY

        if (c.graphicswrapperRef.current) {
            setPosition({
                top: c.graphicswrapperRef.current.offsetTop - newPosY,
                left: c.graphicswrapperRef.current.offsetLeft - newPosX
            })
        }
    }

    const touchEndHandler = () => {
        document.removeEventListener('touchmove', touchMoveHandler)
        document.removeEventListener('touchend', touchEndHandler)
    }

    document.addEventListener('touchmove', touchMoveHandler, { passive: true })
    document.addEventListener('touchend', touchEndHandler)
}

/**
 * Initializes the event listener to zoom in the graphics panel (wheel + pinch)
 * @param c Main config object
 */
export const initScaler = (c: TurtleConfigType) => {
    let canvasScale = 1

    // Mouse wheel zoom
    const zoomCanvasFnc = (e: WheelEvent) => {
        e.preventDefault()
        canvasScale += canvasScale * e.deltaY * 0.001
        if (c.graphicswrapperRef.current)
            c.graphicswrapperRef.current.style.transform = `translate(-50%, -50%) scale(${canvasScale}, ${canvasScale})`
    }

    // Pinch-to-zoom for touch devices
    let initialPinchDistance: number | null = null

    const getDistance = (touches: TouchList) => {
        const t0 = touches[0]
        const t1 = touches[1]
        if (!t0 || !t1) return 0
        const dx = t0.clientX - t1.clientX
        const dy = t0.clientY - t1.clientY
        return Math.sqrt(dx * dx + dy * dy)
    }

    const handleTouchStart = (e: TouchEvent) => {
        if (e.touches.length === 2) {
            e.preventDefault()
            initialPinchDistance = getDistance(e.touches)
        }
    }

    const handleTouchMove = (e: TouchEvent) => {
        if (e.touches.length === 2 && initialPinchDistance !== null) {
            e.preventDefault()
            const currentDistance = getDistance(e.touches)
            const scaleFactor = currentDistance / initialPinchDistance

            // Apply scale change relative to current scale
            const newScale = canvasScale * scaleFactor
            canvasScale = newScale
            initialPinchDistance = currentDistance

            if (c.graphicswrapperRef.current) {
                c.graphicswrapperRef.current.style.transform = `translate(-50%, -50%) scale(${canvasScale}, ${canvasScale})`
            }
        }
    }

    const handleTouchEnd = () => {
        initialPinchDistance = null
    }

    if (c.graphicspanelRef.current) {
        c.graphicspanelRef.current.addEventListener('wheel', zoomCanvasFnc, {
            passive: false
        })
        c.graphicspanelRef.current.addEventListener('touchstart', handleTouchStart, {
            passive: false
        })
        c.graphicspanelRef.current.addEventListener('touchmove', handleTouchMove, {
            passive: false
        })
        c.graphicspanelRef.current.addEventListener('touchend', handleTouchEnd)
    }
}

/**
 * Resets the history index and autosaves the code upon clicking outside of the code editor
 * @param e Event
 * @param c Main config object
 * @param setRedo setRedo button state
 */
export const handleDocClick = (
    e: MouseEvent,
    c: TurtleConfigType,
    setRedo: React.Dispatch<React.SetStateAction<boolean>>
) => {
    if (
        c.codeControlRef.current &&
        c.historyIndexRef.current !== -1 &&
        !c.codeControlRef.current.contains(e.target as Node)
    ) {
        c.historyIndexRef.current = -1
        autosaveHandler(c)
        setRedo(false)
    }
}

/**
 * Attaches the necessary event listeners to resize the panels (mouse + touch)
 * @param c The main config object
 */
export const initHResizer = (c: TurtleConfigType) => {
    const resizeByX = (x: number) => {
        if (
            c.wrapperRef.current &&
            c.editorPanelRef.current &&
            c.graphicspanelRef.current
        ) {
            const parentRect = c.wrapperRef.current.getBoundingClientRect()
            const newLeftWidth = x - parentRect.left
            const newRightWidth = parentRect.right - x
            c.editorPanelRef.current.style.width = `${newLeftWidth}px`
            c.graphicspanelRef.current.style.width = `${newRightWidth}px`
        }
    }

    // Mouse handlers
    const resize = (e: MouseEvent) => resizeByX(e.clientX)
    const stopResize = () => {
        window.removeEventListener('mousemove', resize)
        window.removeEventListener('mouseup', stopResize)
    }

    // Touch handlers
    const resizeTouch = (e: TouchEvent) => {
        const touch = e.touches[0]
        if (touch) resizeByX(touch.clientX)
    }
    const stopResizeTouch = () => {
        window.removeEventListener('touchmove', resizeTouch)
        window.removeEventListener('touchend', stopResizeTouch)
    }

    c.resizerHRef.current!.addEventListener('mousedown', () => {
        window.addEventListener('mousemove', resize)
        window.addEventListener('mouseup', stopResize)
    })

    c.resizerHRef.current!.addEventListener('touchstart', (e: TouchEvent) => {
        e.preventDefault() // Prevent scrolling while dragging
        window.addEventListener('touchmove', resizeTouch)
        window.addEventListener('touchend', stopResizeTouch)
    })
}
