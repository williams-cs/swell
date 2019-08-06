import { Effect } from "./Effect";
import { EffectUtils } from "./EffectUtils";
import KEYBOARD = EffectUtils.KEYBOARD;
import GUIDE = EffectUtils.GUIDE;

export abstract class AbstractRectangularBoundEffect<T> extends Effect<T> {

    private _prevX: number;
    private _prevY: number;

    modifyDrag(event: MouseEvent): void {
        this.x = this.prevX + this.mouse.x - this.prevMouse.x;
        this.y = this.prevY + this.mouse.y - this.prevMouse.y;
    }

    // Modifying cursors function

    changeResizeCursor(corner : GUIDE) : void {
        if (this.isSelected) {
            switch (corner) {
                case GUIDE.RECT_TOP_LEFT:
                case GUIDE.RECT_BOTTOM_RIGHT:
                    this.canvas.style.cursor = "nwse-resize";
                    this.cursorOwnerID = this.id;
                    break;
                case GUIDE.RECT_TOP_RIGHT:
                case GUIDE.RECT_BOTTOM_LEFT:
                    this.canvas.style.cursor = "nesw-resize";
                    this.cursorOwnerID = this.id;
                    break;
                case GUIDE.RECT_TOP_MID:
                case GUIDE.RECT_BOTTOM_MID:
                    this.canvas.style.cursor = "ns-resize";
                    this.cursorOwnerID = this.id;
                    break;
                case GUIDE.RECT_MID_LEFT:
                case GUIDE.RECT_MID_RIGHT:
                    this.canvas.style.cursor = "ew-resize";
                    this.cursorOwnerID = this.id;
                    break;
                // case GUIDE.ROTATE:
                //     this.canvas.style.cursor = "zoom-in";
                //     this.cursorOwnerID = this.id;
                //     break;
                default:
                    if (!this.isResizing) {
                        this.canvas.style.cursor = "auto";
                        this.cursorOwnerID = undefined;
                    }
                    break;
            }
        }
    }

    // Event listeners

    onKeyDown(event: KeyboardEvent) {}

    get x(): number {
        return this.aes.getX(this.scope);
    }

    set x(val: number) {
        this.aes.setX(this.scope, val);
    }

    get y(): number {
        return this.aes.getY(this.scope);
    }

    set y(val: number) {
        this.aes.setY(this.scope, val);
    }

    get prevX(): number {
        return this._prevX;
    }

    set prevX(val: number) {
        this._prevX = val;
    }

    get prevY(): number {
        return this._prevY;
    }

    set prevY(val: number) {
        this._prevY = val;
    }
}
