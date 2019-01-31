import { Dimensions } from "../structural/Dimensions";
import { Effect } from "./Effect";
import { EffectUtils } from "./EffectUtils";
import { Expression } from "../Expression";
import { LogEvent } from "../logging/LogEvent";
import { PaintEvent } from "../logging/PaintEvent";
import { ResizeEvent } from "../logging/ResizeEvent";
import { ClickEvent } from "../logging/ClickEvent";
import { PrintNode } from "../structural/PrintNode";
import { Scope } from "../structural/Scope";

export abstract class AbstractShapeEffect<T> extends Effect<T> {

    _width1: number; // saves size for logging
    _height1: number;

    guideContains(mx: number, my: number): number {
        let x: number = this.x;
        let y: number = this.y;
        let w: number = this.w;
        let h: number = this.h;

        /* Corner Guides */
        let xdif: number = mx - x;
        let ydif: number = my - y;
        if (Math.abs(xdif) <= 5 && Math.abs(ydif) <= 5) { //top left
            return 1;
        }
        xdif = mx - (x + w);
        if (Math.abs(xdif) <= 5 && Math.abs(ydif) <= 5) { //top right
            return 2;
        }
        xdif = mx - (x + w);
        ydif = my - (y + h);
        if (Math.abs(xdif) <= 5 && Math.abs(ydif) <= 5) { //bottom right
            return 3;
        }
        xdif = mx - x;
        if (Math.abs(xdif) <= 5 && Math.abs(ydif) <= 5) { //bottom left
            return 4;
        }

        /* Middle Guides */
        xdif = mx - (x + w/2);
        ydif = my - y;
        if (Math.abs(xdif) <= 5 && Math.abs(ydif) <= 5) { //top middle
            return 5;
        }
        xdif = mx - (x + w);
        ydif = my - (y + h/2);
        if (Math.abs(xdif) <= 5 && Math.abs(ydif) <= 5) { //middle right
            return 6;
        }
        xdif = mx - (x + w/2);
        ydif = my - (y + h);
        if (Math.abs(xdif) <= 5 && Math.abs(ydif) <= 5) { //bottom middle
            return 7;
        }
        xdif = mx - x;
        ydif = my - (y + h/2);
        if (Math.abs(xdif) <= 5 && Math.abs(ydif) <= 5) { //middle left
            return 8;
        }
        return 0;
    }

    drawGuides(x: number, y: number, w: number, h: number, corner: number) {
        this.ctx.beginPath();
        this.ctx.rect(x, y, w, h);
        this.ctx.strokeStyle = 'gray';
        this.ctx.stroke();

        this.drawSquare(x - 2.5, y - 2.5, 5, 5, 'white'); // top left
        this.drawSquare((x + w/2) - 2.5, y - 2.5, 5, 5, 'white'); // top middle
        this.drawSquare(x + w - 2.5, y - 2.5, 5, 5, 'white'); // top right
        this.drawSquare(x - 2.5, (y + h/2) - 2.5, 5, 5, 'white'); // middle left
        this.drawSquare(x + w - 2.5, (y + h/2) - 2.5, 5, 5, 'white'); // middle right
        this.drawSquare(x + w - 2.5, y + h - 2.5, 5, 5, 'white'); // bottom right
        this.drawSquare((x + w/2) - 2.5, y + h - 2.5, 5, 5, 'white'); // bottom middle
        this.drawSquare(x - 2.5, y + h - 2.5, 5, 5, 'white'); // bottom left

        switch (corner) {
            case 1:
                this.drawSquare(x - 2.5, y - 2.5, 5, 5, 'blue'); // top left
                break;
            case 2:
                this.drawSquare(x + w - 2.5, y - 2.5, 5, 5, 'blue'); // top right
                break;
            case 3:
                this.drawSquare(x + w - 2.5, y + h - 2.5, 5, 5, 'blue'); // bottom right
                break;
            case 4:
                this.drawSquare(x - 2.5, y + h - 2.5, 5, 5, 'blue'); // bottom left
                break;
            case 5:
                this.drawSquare((x + w/2) - 2.5, y - 2.5, 5, 5, 'blue'); // top middle
                break;
            case 6:
                this.drawSquare(x + w - 2.5, (y + h/2) - 2.5, 5, 5, 'blue'); // middle right
                break;
            case 7:
                this.drawSquare((x + w/2) - 2.5, y + h - 2.5, 5, 5, 'blue'); // bottom middle
                break;
            case 8:
                this.drawSquare(x - 2.5, (y + h/2) - 2.5, 5, 5, 'blue'); // middle left
                break;
            default:
        }
    }

    /**
     * Returns true if the mouse is inside of the object's bounding rectangle, false if otherwise
     * @param mx the mouse x coordinate
     * @param my the mouse y coordinate
     */
    contains(mx: number, my: number): boolean {
        return (mx > this.x) && (mx < this.x + this.w) &&
            (my > this.y) && (my < this.y + this.h);
    }

    /**
     * Called whenever the mouse moves within the canvas.
     * Gets the mouse position, calls the modify methods if the booleans satisfy them.
     * @param event the mousemove event
     */
    onMouseMove(event: any): void {
        this.getMousePosition(event);
        if (this.isDragging && this.isSelected) {
            this.modifyDrag();
        }
        else if (this.isResizing && this.isSelected) {
            this.modifyResize();
        }
        else if (this.isChangingDims && this.isSelected) {
            this.modifyChangeDims();
        }
    }

    modifyResize(): void {
        let ratio: number = this.w / this.h;
        if (this.w < 10) {
            this.dims.width.eval(this.scope).val = 10;
            this.dims.height.eval(this.scope).val = 10 / ratio;
        }
        if (this.h < 10) {
            this.dims.height.eval(this.scope).val = 10;
            this.dims.width.eval(this.scope).val = 10 * ratio;
        }

        let newDistance = EffectUtils.calcDistance(this.mouse.x, this.mouse.y, this.dragOffX, this.dragOffY);
        let dist_diff: number = newDistance - this.initDistance;

        if (this.w >= 10 && this.h >= 10) {
            switch (this.corner) {
                case 1:
                    this.dims.y.eval(this.scope).val -= Math.round(dist_diff / ratio);
                    this.dims.x.eval(this.scope).val -= dist_diff;
                    break;
                case 2:
                    this.dims.y.eval(this.scope).val -= Math.round(dist_diff / ratio);
                    break;
                case 4:
                    this.dims.x.eval(this.scope).val -= dist_diff;
                    break;
            }
            this.dims.width.eval(this.scope).val += dist_diff;
            this.dims.height.eval(this.scope).val = Math.round(this.w / ratio);
            this.initDistance = newDistance;
        }
    }

    modifyChangeDims(): void {
        let newDistance = EffectUtils.calcDistance(this.mouse.x, this.mouse.y, this.dragOffX, this.dragOffY);
        if (this.w < 10) {
            this.dims.width.eval(this.scope).val = 10;
        }
        if (this.h < 10) {
            this.dims.height.eval(this.scope).val = 10;
        }
        let dist_diff: number = newDistance - this.initDistance;
        switch (this.corner) {
            case 5:
                if (this.h > 10) { //as long as the height is >= 10
                    this.dims.y.eval(this.scope).val -= dist_diff;
                }
                this.dims.height.eval(this.scope).val += dist_diff;
                break;
            case 6:
                this.dims.width.eval(this.scope).val += dist_diff;
                break;
            case 7:
                this.dims.height.eval(this.scope).val += dist_diff;
                break;
            case 8:
                if (this.w > 10) { // as long as width is > 10
                    this.dims.x.eval(this.scope).val -= dist_diff;
                }
                this.dims.width.eval(this.scope).val += dist_diff;
                break;
        }
        this.initDistance = newDistance;
    }

    modifyState(): void {
        let guideContains: number = this.guideContains(this.mouse.x, this.mouse.y);
        let contains: boolean = this.contains(this.mouse.x, this.mouse.y);
        this.justDragged = false;
        this.justResized = false;
        let x: number = this.x;
        let y: number = this.y;
        let w: number = this.w;
        let h: number = this.h;

        if (this.isSelectingMultiple) { //prepares the object for dragging whether it is personally selected or not
            if (contains) {
                this.prevX = this.x;
                this.prevY = this.y;
                this.isSelected = true;
            }
            this.dragOffX = this.mouse.x - x;
            this.dragOffY = this.mouse.y - y;
            this.isDragging = true;
        } else if (guideContains > 0 || contains) {
            let effects = this.scope.effects;
            let curID = this.id;
            for (let effect of effects) {
                let effectID = effect.id;
                if (effectID == curID) {
                    continue;
                }
                if (effectID > curID && (effect.guideContains(this.mouse.x, this.mouse.y) > 0 || effect.contains(this.mouse.x, this.mouse.y))) {
                    this.isSelected = false;
                    this.isDragging = false;
                    return;
                }
            }

            if (guideContains > 0 && guideContains <= 4) { //resizing
                this.isSelected = true;
                this.isResizing = true;
                this.scope.eventLog.push(this.logClick());
                this.corner = this.guideContains(this.mouse.x, this.mouse.y);
                this._height1 = this.h;
                this._width1 = this.w;

                switch (this.corner) { // sets the offsets depending on which corner is selected
                    case 1: // top left
                        this.initDistance = EffectUtils.calcDistance(this.mouse.x, this.mouse.y, x + w, y + h);
                        this.dragOffX = x + w; // offset is bottom right
                        this.dragOffY = y + h;
                        break;
                    case 2: // top right
                        this.initDistance = EffectUtils.calcDistance(this.mouse.x, this.mouse.y, x, y + h);
                        this.dragOffX = x;
                        this.dragOffY = y + h; // offset is bottom left, etc
                        break;
                    case 3:
                        this.initDistance = EffectUtils.calcDistance(this.mouse.x, this.mouse.y, x, y);
                        this.dragOffX = x;
                        this.dragOffY = y;
                        break;
                    case 4:
                        this.initDistance = EffectUtils.calcDistance(this.mouse.x, this.mouse.y, x + w, y);
                        this.dragOffX = x + w;
                        this.dragOffY = y;
                        break;
                }

            } else if (guideContains > 4) { //changing shape dimensions
                this.isSelected = true;
                this.isChangingDims = true;
                this.corner = guideContains;

                switch (this.corner) { // sets the offsets depending on which middle guide is selected
                    case 5: // top middle
                        this.initDistance = EffectUtils.calcDistance(this.mouse.x, this.mouse.y, x + w/2, y + h);
                        this.dragOffX = x + w/2; // offset is bottom middle
                        this.dragOffY = y + h;
                        break;
                    case 6: //right middle
                        this.initDistance = EffectUtils.calcDistance(this.mouse.x, this.mouse.y, x, y + h/2);
                        this.dragOffX = x;
                        this.dragOffY = y + h/2; // offset is left middle etc
                        break;
                    case 7:
                        this.initDistance = EffectUtils.calcDistance(this.mouse.x, this.mouse.y, x + w/2, y);
                        this.dragOffX = x + w/2;
                        this.dragOffY = y;
                        break;
                    case 8:
                        this.initDistance = EffectUtils.calcDistance(this.mouse.x, this.mouse.y, x + w, y + h/2);
                        this.dragOffX = x + w;
                        this.dragOffY = y + h/2;
                        break;
                }
            } else if (contains) { // dragging
                this.prevX = x; // Saving original x and y
                this.prevY = y;
                this.scope.eventLog.push(this.logClick());
                this.isSelected = true;
                this.isDragging = true;
                this.dragOffX = this.mouse.x - x;
                this.dragOffY = this.mouse.y - y;
            }

        } else if (!this.isSelectingMultiple) { // not selected
            this.isSelected = false;
            this.isDragging = false;
        }
    }

    modifyReset(): void {
        if (this.isDragging && this.isSelected) {
            this.isDragging = false;
            if (Math.abs(this.prevX - this.x) > 1 || Math.abs(this.prevY - this.y) > 1) {
                this.justDragged = true;
            }
        } else if ((this.isResizing || this.isChangingDims) && this.isSelected) {
            this.isResizing = false;
            let size2 = Math.sqrt(Math.pow(this.w, 2) + Math.pow(this.h, 2));
            if ((Math.abs(this._width1 - this.w) > 0) || (Math.abs(this._height1 - this.h) > 0)) {
                this.justResized = true;
            }
        }
        this.isDragging = false;
        this.isResizing = false;
        this.isChangingDims = false;
        this.corner = 0;
    }

    logPaint(): LogEvent<any> {
        return new PaintEvent(`${this.name} with ID ${this.id}`, this.x, this.y);
    }

    logResize(): LogEvent<any> {
        return new ResizeEvent(this);
    }

    logClick(): LogEvent<any> {
        return new ClickEvent(`${this.name} with ID ${this.id}`, this.x, this.y);
    }

    toSelString(): string {
        return ` ${this.name} with ID ${this.id} at ${this.x}, ${this.y}`;
    }

    toDragString(): string {
        return `${this.name} with ID ${this.id} from ${this.prevX}, ${this.prevY} to ${this.x}, ${this.y}`;
    }

    toIDString(): string {
        return `${this.id} to ${this.name} at ${this.x}, ${this.y}`;
    }
}
