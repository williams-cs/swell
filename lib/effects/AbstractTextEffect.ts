import { AbstractRectangularBoundEffect } from "./AbstractRectangularBoundEffect";
import { AbstractTypeableNode } from "../prims/AbstractTypeableNode";
import { Effect } from "./Effect";
import { EffectUtils } from "./EffectUtils";
import { Expression } from "../Expression";
import { PaintEvent } from "../logging/PaintEvent";
import { DragEvent } from "../logging/DragEvent";
import { ResizeEvent } from "../logging/ResizeEvent";
import { LogEvent } from "../logging/LogEvent";
import { ClickEvent } from "../logging/ClickEvent";
import { SelectEvent } from "../logging/SelectEvent";
import { PrintNode } from "../structural/PrintNode";
import { Scope } from "../structural/Scope";
import RECT_GUIDE = EffectUtils.RECT_GUIDE;

export abstract class AbstractTextEffect<T extends AbstractTypeableNode<T, V, E>, V, E extends AbstractTextEffect<T, V, E>> extends AbstractRectangularBoundEffect<T> {

    private _prevFontSize: number;
    private _isEditing: boolean = false;
    private _isListening: boolean = false;
    private _cursorPos: number = 0;
    private _cursorTime: number = 90;
    private _cursorTimeCurrent: number = 90;
    private _isCursorDisplayed: boolean = true;

    update(): void {
        this.ctx.font = this.fontSize + "px Courier New";
        this.ctx.fillStyle = this.color;
        this.ctx.fillText(this.text, this.x, this.y);
        if (this.isSelected) {
            this.drawGuides(this.x, this.y - this.fontSize, this.width, this.fontSize, this.corner);
            if (this.isEditing) {
                this.drawCursor();
            }
        }
    }

    guideContains(mx: number, my: number): number {
        let xDiff = mx - (this.x + this.width);
        let yDiff = my - (this.y - this.fontSize);
        if (Math.abs(xDiff) <= 5 && Math.abs(yDiff) <= 5) {
            this.isEditing = false;
            return RECT_GUIDE.TOP_RIGHT;
        }
        return RECT_GUIDE.NONE;
    }

    contains(mx: number, my: number): boolean {
        return (this.x <= mx) && (this.x + this.width >= mx) &&
            (this.y - this.fontSize <= my) && (this.y >= my);
    }

    drawGuides(x: number, y: number, w: number, h: number, corner: number) { //corner is 2 or 0
        this.ctx.beginPath();
        this.ctx.rect(x, y, w, h);
        this.ctx.strokeStyle = 'gray';
        this.ctx.stroke();
        switch (corner) {
            case RECT_GUIDE.NONE:
                this.drawSquare(x + w - 2.5, y - 2.5, 5, 5, 'white');
                break;
            case RECT_GUIDE.TOP_RIGHT:
                this.drawSquare(x + w - 2.5, y - 2.5, 5, 5, 'blue');
                break;
        }
    }

    drawCursor(): void {
        if (this.cursorTimeCurrent <= 0) {
            this.cursorTimeCurrent = this.cursorTime;
            this.isCursorDisplayed = !this.isCursorDisplayed;
        } else {
            this.cursorTimeCurrent -= 1;
        }
        if (!this.isCursorDisplayed) {
            return;
        }
        let cursorX: number = this.x + this.cursorPos * this.interval;
        this.ctx.moveTo(cursorX, this.y - this.fontSize);
        this.ctx.lineTo(cursorX, this.y);
        this.ctx.strokeStyle = "grey";
        this.ctx.stroke();
    }

    /* Event listener functions */

    onMouseMove(event: any): void {
        this.getMousePosition(event);
        if (this.isSelected && this.isDragging) {
            this.modifyDrag();
        } else if (this.isResizing && this.isSelected) {
            this.modifyResize();
        }
    }

    onMouseDown(event: any): void {
        if (!this.isSelectingMultiple && this.isSelected && this.contains(this.mouse.x, this.mouse.y)) { //text editing
            if (!this.isListening) {
                window.addEventListener('keydown', this.modifyText.bind(this));
            }
            this.isListening = true;
            this.isEditing = true;
            this.isDragging = false;
            this.updateCursorPosFromMouse();
        } else if (!this.isSelectingMultiple) {
            this.isSelected = false;
            this.isEditing = false;
        } else {
            this.isEditing = false;
        }
        this.modifyState();
    }

    /* Modification funcions */

    modifyChangeDims(): void { }

    updateCursorPos(delta_pos: number): void {
        let newPos: number = this.cursorPos + Math.round(delta_pos);
        newPos = Math.max(newPos, 0);
        newPos = Math.min(newPos, this.text.length);
        this.cursorPos = newPos;
        this.resetCursorStatus();
    }

    updateCursorPosFromMouse(): void {
        let xDiff: number = this.mouse.x - this.x;
        let interval: number = this.interval;
        let newPos: number = Math.round(interval != 0 ? xDiff/interval : 0);
        newPos = Math.max(newPos, 0);
        newPos = Math.min(newPos, this.text.length);
        this.cursorPos = newPos;
        this.resetCursorStatus();
    }

    resetCursorStatus(): void {
        this.cursorTimeCurrent = this.cursorTime;
        this.isCursorDisplayed = true;
    }

    modifyText(event: any): void {
        if (!this.isEditing) {
            return;
        }
        let firstHalf: string = this.text.substring(0, this.cursorPos);
        let secondHalf: string = this.text.substring(this.cursorPos);

        switch (event.keyCode) {
            case 37: // Arrow left
                this.updateCursorPos(-1);
                break;
            case 39: // Arrow right
                this.updateCursorPos(1);
                break;
            case 8: // Backspace
                firstHalf = firstHalf.substring(0, firstHalf.length - 1);
                this.node.val = this.convertStrToNodeVal(firstHalf + secondHalf);
                this.updateCursorPos(-1);
                event.preventDefault(); // Backspacing on Firefox will go back to a previous page
                break;
            case 46: // Del
                secondHalf = secondHalf.substring(1, secondHalf.length);
                this.node.val = this.convertStrToNodeVal(firstHalf + secondHalf);
                break;
            default:
                let keyName = event.key;
                if (keyName.length != 1) {
                    return;
                }
                firstHalf += keyName;
                try {
                    this.node.val = this.convertStrToNodeVal(firstHalf + secondHalf);
                } catch (e) {
                    return;
                }
                this.updateCursorPos(1);
        }
    }

    modifyResize(): void {
        this.fontSize = Math.max(5, this.fontSize);
        let newDistance = EffectUtils.calcDistance(this.mouse.x, this.mouse.y, this.dragOffX, this.dragOffY);
        this.fontSize += Math.round((newDistance - this.initDistance) * 0.2);
        this.initDistance = newDistance;
    }

    modifyState(): void {
        let guideContains: boolean = this.guideContains(this.mouse.x, this.mouse.y) == RECT_GUIDE.TOP_RIGHT;
        let contains: boolean = this.contains(this.mouse.x, this.mouse.y);
        this.justDragged = false;
        this.justResized = false;

        if (this.isSelectingMultiple) { // prepares the object for dragging whether it is personally selected or not
            if (contains) {
                this.prevX = this.x;
                this.prevY = this.y;
                this.isSelected = true;
            }
            this.dragOffX = this.mouse.x - this.x;
            this.dragOffY = this.mouse.y - this.y;
            this.isDragging = true;

        } else if (guideContains || contains) {
            let effects = this.scope.effects;
            let curID = this.id;
            for (let effect of effects) {
                let effectID = effect.id;
                if (effectID == curID) {
                    continue;
                }
                if (effectID > curID && (effect.guideContains(this.mouse.x, this.mouse.y) > 0 ||
                    effect.contains(this.mouse.x, this.mouse.y))) {
                    this.isSelected = false;
                    this.isDragging = false;
                    this.isEditing = false;
                    return;
                }
            }

            if (guideContains) { // if the corner guides contain the mouse we are resizing
                this.isSelected = true;
                this.corner = this.guideContains(this.mouse.x, this.mouse.y);
                this.scope.eventLog.push(this.logClick());
                this.dragOffX = this.x;
                this.dragOffY = this.y;
                this.initDistance = EffectUtils.calcDistance(this.mouse.x, this.mouse.y, this.x, this.y);
                this.isResizing = true;
                this.prevFontSize = this.fontSize; // saving old font size

            } else if (contains) {
                this.prevX = this.x; // Saving original x and y
                this.prevY = this.y;
                this.isSelected = true;
                this.scope.eventLog.push(this.logClick());
                this.dragOffX = this.mouse.x - this.x;
                this.dragOffY = this.mouse.y - this.y;
                if (!this.isEditing) {
                    this.isDragging = true;
                }
            }

        } else if (!this.isSelectingMultiple) {
            this.isSelected = false;
            this.isDragging = false;
            this.isEditing = false;
        }
    }

    modifyReset(): void {
        if (this.isDragging && this.isSelected) {
            this.isDragging = false;
            if (Math.abs(this.prevX - this.x) > 1 || Math.abs(this.prevY - this.y) > 1) {
                this.justDragged = true;
            }
        } else if (this.isResizing && this.isSelected) {
            this.isResizing = false;
            if (Math.abs(this.prevFontSize - this.fontSize) > 0) {
                this.justResized = true;
            }
        }
        this.isDragging = false;
        this.isResizing = false;
        this.corner = 0;
    }

    abstract convertStrToNodeVal(str: string): V;

    /* Logging functions */

    logPaint(): LogEvent<any> {
        return new PaintEvent(`${this.name} ${this.node.toString()} with ID ${this.id}`, this.x, this.y);
    }

    logResize(): LogEvent<any> {
        return new ResizeEvent(this);
    }

    logClick(): LogEvent<any> {
        return new ClickEvent(`${this.name} ${this.node.toString()} with ID ${this.id}`, this.x, this.y);
    }

    toSelString(): string {
        return ` ${this.name} ${this.node.toString()} with ID ${this.id} at ${this.x}, ${this.y}`;
    }

    toDragString(): string {
        return `${this.name} ${this.node.toString()} with ID ${this.id} from ${this.prevX}, ${this.prevY} to ${this.x}, ${this.y}`;
    }

    toIDString(): string {
        return `${this.id} to ${this.name} ${this.node.toString()} at ${this.x}, ${this.y}`;
    }

    /* Getters and Setters */

    get fontSize(): number {
        return this.aes.getFontSize(this.scope);
    }

    set fontSize(val: number) {
        this.aes.setFontSize(this.scope, val);
    }

    get prevFontSize(): number {
        return this._prevFontSize;
    }

    set prevFontSize(val: number) {
        this._prevFontSize = val;
    }

    get isEditing(): boolean {
        return this._isEditing;
    }

    set isEditing(val: boolean) {
        this._isEditing = val;
    }

    get isListening(): boolean {
        return this._isListening;
    }

    set isListening(val: boolean) {
        this._isListening = val;
    }

    get cursorPos(): number {
        return this._cursorPos;
    }

    set cursorPos(cursorPos: number) {
        this._cursorPos = cursorPos;
    }

    get cursorTimeCurrent(): number {
        return this._cursorTimeCurrent;
    }

    set cursorTimeCurrent(val: number) {
        this._cursorTimeCurrent = Math.round(val);
    }

    get isCursorDisplayed(): boolean {
        return this._isCursorDisplayed;
    }

    set isCursorDisplayed(val: boolean) {
        this._isCursorDisplayed = val;
    }

    get cursorTime(): number {
        return this._cursorTime;
    }

    get val(): V {
        return this.node.val;
    }

    get text(): string {
        return String(this.val);
    }

    get width(): number {
        return this.ctx.measureText(this.text).width;
    }

    get interval(): number {
        return this.text.length == 0 ? 0 : this.width / this.text.length;
    }
}
