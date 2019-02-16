// ---------- Utilities for Effects -----------

export namespace EffectUtils {

    // Enums for keyboard's key code
    export enum KEYBOARD {
        ARROW_LEFT = 37,
        ARROW_RIGHT = 39,
        BACKSPACE = 8,
        DELETE = 46,
    }

    // Enums for rectangular bounding box's corners
    export enum RECT_GUIDE {
        NONE = 0,
        TOP_LEFT = 1,
        TOP_MID = 2,
        TOP_RIGHT = 3,
        MID_LEFT = 4,
        MID_RIGHT = 5,
        BOTTOM_LEFT = 6,
        BOTTOM_MID = 7,
        BOTTOM_RIGHT = 8,
    }

    export function isRectGuideCorner(corner: RECT_GUIDE): boolean {
        switch (corner) {
            case RECT_GUIDE.TOP_LEFT:
            case RECT_GUIDE.TOP_RIGHT:
            case RECT_GUIDE.BOTTOM_LEFT:
            case RECT_GUIDE.BOTTOM_RIGHT:
                return true;
            default:
                return false;
        }
    }

    export function isRectGuideSide(corner: RECT_GUIDE): boolean {
        switch (corner) {
            case RECT_GUIDE.TOP_MID:
            case RECT_GUIDE.BOTTOM_MID:
            case RECT_GUIDE.MID_LEFT:
            case RECT_GUIDE.MID_RIGHT:
                return true;
            default:
                return false;
        }
    }

    /**
     * Get's the mouse x and y coordinates in relation to the canvas
     * @param canvas the canvas object
     * @param event the mousemove event
     */
    export function getMouseCanvasPos(canvas: HTMLCanvasElement, event: MouseEvent): {x: number, y: number} {
        let rect = canvas.getBoundingClientRect();
        return {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top
        };
    }
}
