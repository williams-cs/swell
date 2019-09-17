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

    modifyKeyDrag(event : KeyboardEvent) : void {
        if (!this.isSelected) return;
        switch (event.keyCode) {
            case KEYBOARD.ARROW_LEFT:
                if (this.delta < 5) {
                    --this.x;
                    this.delta++;
                } else {
                    this.x -= 3;
                }
                break;
            case KEYBOARD.ARROW_RIGHT:
                if (this.delta < 5) {
                    ++this.x;
                    this.delta++;
                } else {
                    this.x += 3;
                }
                break;
            case KEYBOARD.ARROW_UP:
                if (this.delta < 5) {
                    --this.y;
                    this.delta++;
                } else {
                    this.y -= 3;
                }
                break;
            case KEYBOARD.ARROW_DOWN:
                if (this.delta < 5) {
                    ++this.y;
                    this.delta++;
                } else {
                    this.y += 3;
                }
                break;
        }
    }

     /**
     * Method that draws the rotation guide for rectangular bound objects
     * @param x x-coordinate for the top-mid guide of object
     * @param y y-coordinate for the top-mid guide of object
     */
    drawRotationGuide(x : number, y : number) {
        // line from top-mid guide to rotation guide
        this.ctx.beginPath();
        this.ctx.moveTo(x, y);
        this.ctx.lineTo(x, y - 10);
        this.ctx.stroke();
        // rotation guide circles
        this.ctx.fillStyle = this.corner == GUIDE.ROTATE ? "blue" : "white";
        this.ctx.beginPath();
        this.ctx.arc(x, y - 16, 6, 0, 2 * Math.PI);
        this.ctx.fill();
        this.ctx.stroke();
        this.ctx.beginPath();
        this.ctx.arc(x, y - 16, 3, 0.5* Math.PI, 2 * Math.PI);
        this.ctx.stroke();
        // rotation guide arrows
        let headlen = 2; // length of arrow head in pixels
        let angle = 5 * Math.PI / 4; //angle of arrow
        this.ctx.beginPath();
        this.ctx.moveTo(x + 3 + headlen * Math.cos(angle + Math.PI / 6), y - 16 + headlen * Math.sin(angle + Math.PI / 6));
        this.ctx.lineTo(x + 3, y - 16);
        this.ctx.lineTo(x + 3 + headlen * Math.cos(angle - Math.PI / 6), y - 16 + headlen * Math.sin(angle - Math.PI / 6));
        this.ctx.stroke();
    }

    /**
     * Translate and rotate canvas 
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

    onKeyDown(event: KeyboardEvent) {
        this.modifyKeyDrag(event);
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
}
