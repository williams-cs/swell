import { Effect } from "./Effect";

export abstract class AbstractRectangularBoundEffect<T> extends Effect<T> {

    private _prevX: number;
    private _prevY: number;

    /**
     * Draws the bounding rectangle and guides for the object when the object is selected
     * If one of the guides is selected, it colors that guide blue
     * @param x the x coordinate for where the rectangle will originate from (top left corner)
     * @param y the y coordinate for where the rectangle will originate from (top left corner)
     * @param w the width of the bounding rectangle
     * @param h the height of the bounding rectangle
     * @param corner the number of the corner (1-8) to be colored blue (if any at all, if 0, all are white)
     */
    abstract drawGuides(x: number, y: number, w: number, h: number, corner: number): void;

    modifyDrag(): void {
        this.x = this.mouse.x - this.dragOffX;
        this.y = this.mouse.y - this.dragOffY;
    }

    get x(): number {
        return this.aes.x.eval(this.scope).val;
    }

    set x(val: number) {
        this.aes.x.eval(this.scope).val = val;
    }

    get y(): number {
        return this.aes.y.eval(this.scope).val;
    }

    set y(val: number) {
        this.aes.y.eval(this.scope).val = val;
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
