import { AbstractLineNode } from "../shapes/AbstractLineNode"
import { Effect } from "./Effect";
import { EffectUtils } from "./EffectUtils";
import { LogEvent } from "../logging/LogEvent";
import { PaintEvent } from "../logging/PaintEvent";
import { ResizeEvent } from "../logging/ResizeEvent";
import { ClickEvent } from "../logging/ClickEvent";
import GUIDE = EffectUtils.GUIDE;

export abstract class AbstractLineEffect<T extends AbstractLineNode<T, E>, E extends AbstractLineEffect<T, E>> extends Effect<T> {

    private _prevX1: number;
    private _prevY1: number;
    private _prevX2: number;
    private _prevY2: number;

    drawGuides(): void {
        let halfSize: number = this.guideSize/2;
        this.drawSingleGuide(this.x1 - halfSize, this.y1 - halfSize, GUIDE.LINE_START);
        this.drawSingleGuide(this.x2 - halfSize, this.y2 - halfSize, GUIDE.LINE_END);
    };

    guideContains(): GUIDE {
        let mx: number = this.mouse.x;
        let my: number = this.mouse.y;
        let halfSize: number = this.guideSize/2;
        if (Math.abs(mx - this.x1) <= halfSize && Math.abs(my - this.y1) <= halfSize) {
            return GUIDE.LINE_START;
        }
        if (Math.abs(mx - this.x2) <= halfSize && Math.abs(my - this.y2) <= halfSize) {
            return GUIDE.LINE_END;
        }
        return GUIDE.NONE
    };

    contains(): boolean {
        let mx: number = this.mouse.x;
        let my: number = this.mouse.y;
        let x1: number = this.x1;
        let y1: number = this.y1;
        let x2: number = this.x2;
        let y2: number = this.y2;
        let xDiff = x2 - x1;
        let yDiff = y2 - y1;
        let dist: number = Math.abs(yDiff * mx - xDiff * my + x2 * y1 - y2 * x1)/Math.sqrt(xDiff*xDiff + yDiff*yDiff)
        return ((Math.abs(xDiff) <= 10 || mx >= Math.min(x1, x2) && mx <= Math.max(x1, x2)) && dist <= 10);
    }

    // Event listener functions
    onKeyDown(event: KeyboardEvent): void { }

    // Modification functions

    modifyDrag(event: MouseEvent): void {
        let xDiff: number = this.mouse.x - this.prevMouse.x;
        let yDiff: number = this.mouse.y - this.prevMouse.y;
        this.x1 = this.prevX1 + xDiff;
        this.y1 = this.prevY1 + yDiff;
        this.x2 = this.prevX2 + xDiff;
        this.y2 = this.prevY2 + yDiff;
    }

    modifyResize(event: MouseEvent): void {
        let corner: GUIDE = this.corner;
        if (corner == GUIDE.NONE) {
            return;
        }
        let xDiff: number = this.mouse.x - this.prevMouse.x;
        let yDiff: number = this.mouse.y - this.prevMouse.y;
        if (corner == GUIDE.LINE_START) {
            this.x1 = this.prevX1 + xDiff;
            this.y1 = this.prevY1 + yDiff;
        } else if (corner == GUIDE.LINE_END) {
            this.x2 = this.prevX2 + xDiff;
            this.y2 = this.prevY2 + yDiff;
        }
    }

    modifyState(event: MouseEvent): void {
        let guideContains: GUIDE = this.guideContains();
        let contains: boolean = this.contains();
        this.corner = guideContains;
        this.prevX1 = this.x1;
        this.prevY1 = this.y1;
        this.prevX2 = this.x2;
        this.prevY2 = this.y2;

        if (event.shiftKey) { //prepares the object for dragging whether it is actually selected or not
            if (contains) {
                this.isSelected = true;
            }
            this.isDragging = true;
            
            return;

        } else if ((guideContains == GUIDE.NONE && !contains) || this.isOverlapped()) {
            this.isSelected = false;
            this.isDragging = false;

            return;
        }

        this.isSelected = true;
        this.scope.eventLog.push(this.logClick());
        if (guideContains != GUIDE.NONE) { //resizing
            this.isResizing = true;
        } else if (contains) { // dragging
            this.isDragging = true;
        }
    }

    modifyReset(): void {
        if (!this.isSelected) {
            return;
        }
        this.isDragging = false;
        this.isResizing = false;
        this.corner = GUIDE.NONE;
    }

    // Logging functions - Need updating

    logPaint(): LogEvent<any> {
        return new PaintEvent(`${this.name} with ID ${this.id}`, this.x1, this.y1);
    }

    logResize(): LogEvent<any> {
        return new ResizeEvent(this);
    }

    logClick(): LogEvent<any> {
        return new ClickEvent(`${this.name} with ID ${this.id}`, this.x1, this.y1);
    }

    toSelString(): string {
        return ` ${this.name} with ID ${this.id} at ${this.x1}, ${this.y1}`;
    }

    toDragString(): string {
        return `${this.name} with ID ${this.id} from ${this.prevX1}, ${this.prevY1} to ${this.x1}, ${this.y1}`;
    }

    toIDString(): string {
        return `${this.id} to ${this.name} at ${this.x1}, ${this.y1}`;
    }

    // Getters and Setters

    get x1(): number {
        return this.node.getX1(this.scope);
    }

    set x1(val: number) {
        this.node.setX1(this.scope, val);
    }

    get y1(): number {
        return this.node.getY1(this.scope);
    }

    set y1(val: number) {
        this.node.setY1(this.scope, val);
    }

    get x2(): number {
        return this.node.getX2(this.scope);
    }

    set x2(val: number) {
        this.node.setX2(this.scope, val);
    }

    get y2(): number {
        return this.node.getY2(this.scope);
    }

    set y2(val: number) {
        this.node.setY2(this.scope, val);
    }

    get prevX1(): number {
        return this._prevX1;
    }

    set prevX1(val: number) {
        this._prevX1 = val;
    }

    get prevY1(): number {
        return this._prevY1;
    }

    set prevY1(val: number) {
        this._prevY1 = val;
    }

    get prevX2(): number {
        return this._prevX2;
    }

    set prevX2(val: number) {
        this._prevX2 = val;
    }

    get prevY2(): number {
        return this._prevY2;
    }

    set prevY2(val: number) {
        this._prevY2 = val;
    }
}
