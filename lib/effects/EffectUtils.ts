// ---------- Utilities for Effects -----------

export namespace EffectUtils {

    // Enums for keyboard's key code
    export enum KEYBOARD {
        ARROW_LEFT = 37,
        ARROW_RIGHT = 39,
        BACKSPACE = 8,
        DELETE = 46,
    }

    // Enums for guides
    export enum GUIDE {
        NONE = 0,
        RECT_TOP_LEFT = 1,
        RECT_TOP_MID = 2,
        RECT_TOP_RIGHT = 3,
        RECT_MID_LEFT = 4,
        RECT_MID_RIGHT = 5,
        RECT_BOTTOM_LEFT = 6,
        RECT_BOTTOM_MID = 7,
        RECT_BOTTOM_RIGHT = 8,
        LINE_START = 9,
        LINE_END = 10,
        ROTATE = 11,
    }

    export function isRectGuideCorner(corner: GUIDE): boolean {
        switch (corner) {
            case GUIDE.RECT_TOP_LEFT:
            case GUIDE.RECT_TOP_RIGHT:
            case GUIDE.RECT_BOTTOM_LEFT:
            case GUIDE.RECT_BOTTOM_RIGHT:
                return true;
            default:
                return false;
        }
    }

    export function isRectGuideSide(corner: GUIDE): boolean {
        switch (corner) {
            case GUIDE.RECT_TOP_MID:
            case GUIDE.RECT_BOTTOM_MID:
            case GUIDE.RECT_MID_LEFT:
            case GUIDE.RECT_MID_RIGHT:
                return true;
            default:
                return false;
        }
    }
}
