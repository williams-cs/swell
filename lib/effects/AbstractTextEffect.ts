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
import GUIDE = EffectUtils.GUIDE;
import KEYBOARD = EffectUtils.KEYBOARD;

export abstract class AbstractTextEffect<T extends AbstractTypeableNode<T, V, E>, V, E extends AbstractTextEffect<T, V, E>> extends AbstractRectangularBoundEffect<T> {

    private _font: string = "Courier New";
    private _minFontSize: number = this.guideSize;
    private _prevFontSize: number;
    private _isEditing: boolean = false;
    private _cursorPos: number = 0;
    private _cursorTime: number = 90;
    private _cursorTimeCurrent: number = 90;
    private _isCursorDisplayed: boolean = true;

    update(): void {
        this.prepareCanvas(this.x, this.y);
        this.ctx.font = this.fontSize + this.font;
        this.ctx.fillStyle = this.color;
        this.ctx.fillText(this.text, -this.width/2, this.fontSize/2); // Text starts from bottom left
        this.restoreCanvas();
        if (this.isSelected) {
            this.drawGuides();
            if (this.isEditing) {
                this.drawCursor();
            }
        }

        this.changeCursor();
    }

    guideContains(): number {
        let mx: number = this.mouse.x;
        let my: number = this.mouse.y;
        let x: number = this.x;
        let y: number = this.y;
        let w: number = this.width;
        let h: number = this.fontSize;
        let halfSize: number = this.guideSize/2;
        let rotSize: number = this.rotGuideSize

        let newMousePos = this.changeCoordinate(mx - x, my - y, this.rotate);
        mx = newMousePos[0];
        my = newMousePos[1];

        let xDiff: number = mx - w/2;
        let yDiff: number = my + h/2;
        if (Math.abs(xDiff) <= halfSize && Math.abs(yDiff) <= halfSize) {
            this.isEditing = false;
            return GUIDE.RECT_TOP_RIGHT;
        }

        xDiff = mx + w/2;
        if (Math.abs(xDiff) <= halfSize && Math.abs(yDiff) <= halfSize) {
            this.isEditing = false;
            return GUIDE.RECT_TOP_LEFT;
        }

        xDiff = mx - w/2;
        yDiff = my - h/2;
        if (Math.abs(xDiff) <= halfSize && Math.abs(yDiff) <= halfSize) {
            this.isEditing = false;
            return GUIDE.RECT_BOTTOM_RIGHT;
        }

        xDiff = mx + w/2;
        if (Math.abs(xDiff) <= halfSize && Math.abs(yDiff) <= halfSize) {
            this.isEditing = false;
            return GUIDE.RECT_BOTTOM_LEFT;
        }

        xDiff = mx;
        yDiff = my + h/2 + 10 + rotSize/2;
        if (Math.abs(xDiff) <= rotSize/2 && Math.abs(yDiff) <= rotSize/2) {
            return GUIDE.ROTATE;
        }

        return GUIDE.NONE;
    }

    contains(): boolean {
        let newMousePos = this.changeCoordinate(this.mouse.x - this.x,
            this.mouse.y - this.y, this.rotate);
        let mx: number = newMousePos[0];
        let my: number = newMousePos[1];
        return (Math.abs(mx) < this.width/2) && (Math.abs(my) < this.fontSize/2);
    }

    drawGuides() {
        let fontSize: number = this.fontSize;
        let x: number = this.x;
        let y: number = this.y;
        let w: number = this.width;
        this.prepareCanvas(x, y);
        this.ctx.beginPath();
        this.ctx.rect(-w/2, -fontSize/2, w, fontSize);
        this.ctx.strokeStyle = 'gray';
        this.ctx.stroke();
        let halfSize: number = this.guideSize/2;
        this.drawRotationGuide(0, -fontSize/2);
        this.drawSingleGuide(-w/2 - halfSize, -fontSize/2 - halfSize, GUIDE.RECT_TOP_LEFT);
        this.drawSingleGuide(w/2 - halfSize, -fontSize/2 - halfSize, GUIDE.RECT_TOP_RIGHT);
        this.drawSingleGuide(w/2 - halfSize, fontSize/2 - halfSize, GUIDE.RECT_BOTTOM_RIGHT);
        this.drawSingleGuide(-w/2 - halfSize, fontSize/2 - halfSize, GUIDE.RECT_BOTTOM_LEFT);
        this.restoreCanvas();
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
        this.prepareCanvas(this.x, this.y);
        let cursorX: number = this.cursorPos * this.interval - this.width/2;
        this.ctx.moveTo(cursorX, -this.fontSize/2);
        this.ctx.lineTo(cursorX, this.fontSize/2);
        this.ctx.strokeStyle = "grey";
        this.ctx.stroke();
        this.restoreCanvas();
    }

    /* Event listener functions */

    onKeyDown(event: KeyboardEvent) {
        this.modifyText(event);
        if (!this.isEditing) this.modifyKeyDrag(event);
    }

    /* Cursor modifying functions */

    changeCursor() : void {
        let cx: number = this.x;
        let cy: number = this.y;
        if (this.cursorOwnerID == undefined || this.cursorOwnerID === this.id) {
            this.changeResizeCursor(this.mouse.x, cx, this.mouse.y, cy);

            if (!this.isEditing) {
                this.changeDragCursor(this.guideContains());
            }

            this.changeEditCursor();
        }
    }

    changeEditCursor() : void {
        if (this.guideContains() === GUIDE.NONE) {
            if (this.contains()) {
                if (this.isEditing) {
                    this.canvasState.cursorOwnerID = this.id;
                    this.canvas.style.cursor = "text";
                } 
            } else {
                if (!this.isResizing) {
                    this.canvasState.cursorOwnerID = undefined;
                    this.canvas.style.cursor = "auto";
                }
            }
        }
    }

    /* Modification funcions */

    updateCursorPos(delta_pos: number): void {
        let newPos: number = this.cursorPos + Math.round(delta_pos);
        newPos = Math.max(newPos, 0);
        newPos = Math.min(newPos, this.text.length);
        this.cursorPos = newPos;
        this.resetCursorStatus();
    }

    updateCursorPosFromMouse(): void {
        let newMousePos = this.changeCoordinate(this.mouse.x - this.x, this.mouse.y - this.y, this.rotate);
        let xDiff: number = newMousePos[0] + this.width/2;
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

    modifyText(event: KeyboardEvent): void {
        if (!this.isEditing) {
            return;
        }
        let firstHalf: string = this.text.substring(0, this.cursorPos);
        let secondHalf: string = this.text.substring(this.cursorPos);

        switch (event.keyCode) {
            case KEYBOARD.ARROW_LEFT: // Arrow left
                this.updateCursorPos(-1);
                break;
            case KEYBOARD.ARROW_RIGHT: // Arrow right
                this.updateCursorPos(1);
                break;
            case KEYBOARD.BACKSPACE: // Backspace
                firstHalf = firstHalf.substring(0, firstHalf.length - 1);
                this.node.val = this.convertStrToNodeVal(firstHalf + secondHalf);
                this.updateCursorPos(-1);
                event.preventDefault(); // Backspacing on Firefox will go back to a previous page
                break;
            case KEYBOARD.DELETE: // Del
                secondHalf = secondHalf.substring(1, secondHalf.length);
                this.node.val = this.convertStrToNodeVal(firstHalf + secondHalf);
                this.updateCursorPos(0);
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

    modifyResize(event: MouseEvent): void {
        //"unrotate" mousepos, resize as if rotate = 0
        let curMousePos = this.changeCoordinate(this.mouse.x - this.x, this.mouse.y - this.y, this.rotate);
        let prevFontSize: number = this.prevFontSize;
        let newFontSize: number = prevFontSize;
        let mouseY: number = curMousePos[1];
        let prevWidth: number = this.measureTextWidth(prevFontSize);
        let newWidth: number;
        let yDiff: number;
        let newXY: [number, number];
        let deltaX: number;
        let deltaY: number;
        let corner: GUIDE = this.corner;
        let changeFactor: number = 0.75;
        
        if (corner == GUIDE.RECT_TOP_RIGHT || corner == GUIDE.RECT_TOP_LEFT) {
            yDiff = - mouseY - prevFontSize/2;
            newFontSize = Math.max(this.minFontSize, prevFontSize + yDiff * changeFactor);
            newWidth = this.measureTextWidth(newFontSize);
            if (corner == GUIDE.RECT_TOP_LEFT) {
                deltaX = (prevWidth - newWidth)/2;
                deltaY = (prevFontSize - newFontSize)/2
            } else {
                deltaX = - (prevWidth - newWidth)/2;
                deltaY = (prevFontSize - newFontSize)/2
            }
        } else if (corner == GUIDE.RECT_BOTTOM_RIGHT || corner == GUIDE.RECT_BOTTOM_LEFT) {
            yDiff = mouseY - prevFontSize/2;
            newFontSize = Math.max(this.minFontSize, prevFontSize + yDiff * changeFactor);
            newWidth = this.measureTextWidth(newFontSize);
            if (corner == GUIDE.RECT_BOTTOM_LEFT) {
                deltaX = (prevWidth - newWidth)/2;
                deltaY = - (prevFontSize - newFontSize)/2
            } else {
                deltaX = - (prevWidth - newWidth)/2;
                deltaY = - (prevFontSize - newFontSize)/2
            }
        }
        this.fontSize = newFontSize;
        //rotate back to get updated x,y coordinates
        newXY = this.changeCoordinate(deltaX, deltaY, -this.rotate);
        this.x = this.prevX + newXY[0];
        this.y = this.prevY + newXY[1];
    }

    modifyState(event: MouseEvent): void {
        let contains: boolean = this.contains();
        if (!event.shiftKey && this.isSelected && contains) { //text editing
            this.isEditing = true;
            this.isDragging = false;
            this.updateCursorPosFromMouse();
        } else {
            this.isEditing = false;
            if (!event.shiftKey) {
                this.isSelected = false;
            }
        }

        let guideContains: number = this.guideContains();
        this.corner = guideContains;
        this.justDragged = false;
        this.justResized = false;
        this.prevX = this.x;
        this.prevY = this.y;

        if (event.shiftKey) { // prepares the object for dragging whether it is personally selected or not
            if (contains) {
                this.isSelected = true;
            }
            this.isDragging = true;

            return;

        } else if ((guideContains == GUIDE.NONE && !contains) || this.isOverlapped()) {
            this.isSelected = false;
            this.isDragging = false;
            this.isEditing = false;

            return;
        }

        this.isSelected = true;
        this.scope.eventLog.push(this.logClick());
        if (guideContains != GUIDE.NONE && guideContains != GUIDE.ROTATE) {
            this.prevFontSize = this.fontSize; // saving old font size
            this.isResizing = true;
        } else if (guideContains == GUIDE.ROTATE) {
            this.isRotating = true;
        } else if (contains) {
            if (!this.isEditing) {
                this.isDragging = true;
            }
        }
    }

    modifyRotate() : void {
        let dy = this.mouse.y - this.y;
        let dx = this.mouse.x - this.x;
        let theta = Math.atan2(dy, dx); // range (-PI, PI]
        theta = theta * (180 / Math.PI) + 90; // range (0, 360), starting at rotate = 0;
        if (theta < 0) theta += 360;
        if (Math.round(theta) == 360) theta = 0;
        this.rotate = Math.round(theta);
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
        this.isRotating = false;
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

    delete() {
        if(!this._isEditing) {
            this.aes.commentOut();
        } else {
            let firstHalf: string = this.text.substring(0, this.cursorPos);
            let secondHalf: string = this.text.substring(this.cursorPos);
            secondHalf = secondHalf.substring(1, secondHalf.length);
            this.node.val = this.convertStrToNodeVal(firstHalf + secondHalf);
            this.updateCursorPos(0);
        }
    }
    /* Getters and Setters */

    get font(): string {
        return "px " + this._font;
    }

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
        this.ctx.font = this.fontSize + this.font;
        return this.ctx.measureText(this.text).width;
    }

    measureTextWidth(fontSize: number): number {
        this.ctx.font = fontSize + this.font;
        let width: number = this.ctx.measureText(this.text).width;
        this.ctx.font = this.fontSize + this.font;
        return width;
    }

    get interval(): number {
        return this.text.length == 0 ? 0 : this.width / this.text.length;
    }

    get minFontSize(): number {
        return this._minFontSize;
    }
}
