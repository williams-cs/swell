import { Dimensions } from "../structural/Dimensions";
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

export abstract class AbstractTextEffect<T> extends Effect<T> {

    private _fontSize: number = 20;
    private _prevFontSize: number;
    private _isEditing: boolean = false;
    private _isListening: boolean = false;
    private _textMetrics: { // all the details of the text on the canvas
        width: number,
        interval: number,
        initMousePos: number,
        cursorPos: number,
    } = {
            width: 0,
            interval: 0,
            initMousePos: 0,
            cursorPos: 0,
        };

    update(): void {
        this.ctx.font = this.fontSize + "px Courier New";
        this.ctx.fillStyle = "#673AB7";
        let text: string = this.node.toString();
        if (text.startsWith('"') && text.endsWith('"')) {
            text = text.slice(1, text.length - 1);
        }
        this.ctx.fillText(text, this.x, this.y);
        this.textMetrics.width = this.ctx.measureText(text).width;
        this.textMetrics.interval = this.textMetrics.width != 0 ? this.textMetrics.width / text.length : 0;
        if (this.isSelected) {
            this.drawGuides(this.x, this.y - this.fontSize, this.textMetrics.width, this.fontSize, this.corner);
        }
        if (this.isEditing) {
            this.modifyTextCursor();
        }
    }

    guideContains(mx: number, my: number): number {
        let xdif = mx - (this.x + this.textMetrics.width);
        let ydif = my - (this.y - this.fontSize);
        if (Math.abs(xdif) <= 5 && Math.abs(ydif) <= 5) {
            this.isEditing = false;
            return 2;
        }
        return 0;
    }

    contains(mx: number, my: number): boolean {
        return (this.x <= mx) && (this.x + this.textMetrics.width >= mx) &&
            (this.y - this.fontSize <= my) && (this.y >= my);
    }

    drawGuides(x: number, y: number, w: number, h: number, corner: number) { //corner is 2 or 0
        this.ctx.beginPath();
        this.ctx.rect(x, y, w, h);
        this.ctx.strokeStyle = 'gray';
        this.ctx.stroke();
        switch (corner) {
            case 0:
                this.drawSquare(x + w - 2.5, y - 2.5, 5, 5, 'white');
                break;
            case 2:
                this.drawSquare(x + w - 2.5, y - 2.5, 5, 5, 'blue');
                break;
        }
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
            this.textMetrics.initMousePos = this.mouse.x;
            this.modifyTextCursor();
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

    modifyTextCursor(): void {
        let xDif: number = this.textMetrics.initMousePos - this.x; // difference between mouse x and left wall
        let interval: number = this.textMetrics.interval;
        this.textMetrics.cursorPos = interval != 0 ? interval * Math.round(xDif / interval) : 0;
        let moveFactor: number = this.textMetrics.cursorPos + this.x;
        this.ctx.moveTo(moveFactor, this.y - this.fontSize);
        this.ctx.lineTo(moveFactor, this.y);
        this.ctx.strokeStyle = "grey";
        this.ctx.stroke();
    }

    modifyResize(): void {
        if (this.fontSize < 15) {
            this.fontSize = 15;
            let newDistance = EffectUtils.calcDistance(this.mouse.x, this.mouse.y, this.dragOffX, this.dragOffY);
            if (newDistance - this.initDistance > 0) {
                this.fontSize += (newDistance - this.initDistance) * 0.2;
                this.initDistance = newDistance;
            }
        } else {
            let newDistance = EffectUtils.calcDistance(this.mouse.x, this.mouse.y, this.dragOffX, this.dragOffY);
            this.fontSize += (newDistance - this.initDistance) * 0.2;
            this.initDistance = newDistance;
        }
    }

    modifyState(): void {
        let guideContains: boolean = this.guideContains(this.mouse.x, this.mouse.y) > 0;
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

    /**
     * This edits the string when editing text
     * @param event keydown event
     */
    abstract modifyText(event: any): void;

    /* Logging functions */

    logPaint(): LogEvent<any> {
        return new PaintEvent(`${this.name} ${this.node.toString()}`, this.x, this.y);
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
        return this._fontSize;
    }

    set fontSize(val: number) {
        this._fontSize = val;
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

    get textMetrics(): {
        width: number,
        interval: number,
        initMousePos: number,
        cursorPos: number,
    } {
        return this._textMetrics;
    }

    set textMetrics(textMetrics: {
        width: number,
        interval: number,
        initMousePos: number,
        cursorPos: number,
    }) {
        this._textMetrics = textMetrics;
    }

    abstract get val(): any;
}
