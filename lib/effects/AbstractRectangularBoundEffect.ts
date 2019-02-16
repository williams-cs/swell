import { Effect } from "./Effect";
import { EffectUtils } from "./EffectUtils";

export abstract class AbstractRectangularBoundEffect<T> extends Effect<T> {

    private _guideSize: number = 7;
    private _prevX: number;
    private _prevY: number;

    /**
     * Draws the bounding rectangle and guides for the object when the object is selected
     * If one of the guides is selected, it colors that guide blue
     * @param x the x coordinate for where the rectangle will originate from (top left corner)
     * @param y the y coordinate for where the rectangle will originate from (top left corner)
     * @param w the width of the bounding rectangle
     * @param h the height of the bounding rectangle
     * @param corner the corner to be colored blue
     */
    abstract drawGuides(x: number, y: number, w: number, h: number, corner: EffectUtils.RECT_GUIDE): void;

    abstract guideContains(mx: number, my: number): EffectUtils.RECT_GUIDE;

    modifyDrag(event: MouseEvent): void {
        this.x = this.prevX + this.mouse.x - this.prevMouse.x;
        this.y = this.prevY + this.mouse.y - this.prevMouse.y;
    }

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

    get guideSize(): number {
        return this._guideSize;
    }
}
