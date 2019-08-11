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

    abstract modifyRotate() : void;

    /**
     * 
     * @param cx x coordinate to translate canvas to
     * @param cy y coordinate to translate canvas to
     */
    protected prepareCanvas(cx : number, cy : number) {
        this.ctx.save();
        this.ctx.translate(cx, cy);
        this.ctx.rotate(this.rotate * Math.PI / 180);
    }

    protected restoreCanvas() {
        this.ctx.restore();
    }

    /**
     * 
     * @param x x-coordinate of center point
     * @param y y-coordinate of center point
     * @param mx x-coodinate of mouse pos
     * @param my y-coordinate of mouse pos
     * @param angle the angle to rotate mouse pos to (counter-clockwise)
     */
    protected prepareMouse(x : number, y : number, mx : number, my : number, angle : number) : [number, number] {
        let cos = Math.cos((Math.PI / 180) * angle);
        let sin = Math.sin((Math.PI / 180) * angle);
        let nx = x + (cos * (mx - x)) + (sin * (my - y));
        let ny = y + (cos * (my - y)) - (sin * (mx - x));
        return [nx, ny];
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
