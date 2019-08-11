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
     * Linear transformation that rotates a vector about the origin (0,0) by angle theta
     * @param x x-coodinate of point to be rotated
     * @param y y-coordinate of point to be rotated
     * @param theta the angle to rotate coordinate to (in degree) (counter-clockwise)
     */
    protected changeCoordinate(x : number, y : number, theta : number) : [number, number] {
        let cos = Math.cos((Math.PI / 180) * theta);
        let sin = Math.sin((Math.PI / 180) * theta);
        let nx = cos * x + sin * y;
        let ny = cos * y - sin * x;
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
