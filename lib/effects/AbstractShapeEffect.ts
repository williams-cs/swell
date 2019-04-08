import { AbstractRectangularBoundEffect } from "./AbstractRectangularBoundEffect";
import { AbstractShapeNode } from "../shapes/AbstractShapeNode";
import { Effect } from "./Effect";
import { EffectUtils } from "./EffectUtils";
import { Expression } from "../Expression";
import { LogEvent } from "../logging/LogEvent";
import { PaintEvent } from "../logging/PaintEvent";
import { ResizeEvent } from "../logging/ResizeEvent";
import { ClickEvent } from "../logging/ClickEvent";
import { PrintNode } from "../structural/PrintNode";
import { Scope } from "../structural/Scope";
import GUIDE = EffectUtils.GUIDE;
import KEYBOARD = EffectUtils.KEYBOARD;
import { EventEmitter } from "events";

export abstract class AbstractShapeEffect<T extends AbstractShapeNode<T, E>, E extends AbstractShapeEffect<T, E>> extends AbstractRectangularBoundEffect<T> {

    private _prevWidth: number; // saves size for logging
    private _prevHeight: number;

    guideContains(): GUIDE {
        let mx: number = this.mouse.x;
        let my: number = this.mouse.y;
        let x: number = this.x;
        let y: number = this.y;
        let w: number = this.w;
        let h: number = this.h;

        /* Corner Guides */
        let xdif: number = mx - x;
        let ydif: number = my - y;
        let halfSize: number = this.guideSize/2;
        if (Math.abs(xdif) <= halfSize && Math.abs(ydif) <= halfSize) {
            return GUIDE.RECT_TOP_LEFT;
        }
        xdif = mx - (x + w);
        if (Math.abs(xdif) <= halfSize && Math.abs(ydif) <= halfSize) {
            return GUIDE.RECT_TOP_RIGHT;
        }
        xdif = mx - (x + w);
        ydif = my - (y + h);
        if (Math.abs(xdif) <= halfSize && Math.abs(ydif) <= halfSize) {
            return GUIDE.RECT_BOTTOM_RIGHT;
        }
        xdif = mx - x;
        if (Math.abs(xdif) <= halfSize && Math.abs(ydif) <= halfSize) {
            return GUIDE.RECT_BOTTOM_LEFT;
        }

        /* Middle Guides */
        xdif = mx - (x + w/2);
        ydif = my - y;
        if (Math.abs(xdif) <= halfSize && Math.abs(ydif) <= halfSize) {
            return GUIDE.RECT_TOP_MID;
        }
        xdif = mx - (x + w);
        ydif = my - (y + h/2);
        if (Math.abs(xdif) <= halfSize && Math.abs(ydif) <= halfSize) {
            return GUIDE.RECT_MID_RIGHT;
        }
        xdif = mx - (x + w/2);
        ydif = my - (y + h);
        if (Math.abs(xdif) <= halfSize && Math.abs(ydif) <= halfSize) {
            return GUIDE.RECT_BOTTOM_MID;
        }
        xdif = mx - x;
        ydif = my - (y + h/2);
        if (Math.abs(xdif) <= halfSize && Math.abs(ydif) <= halfSize) { //middle left
            return GUIDE.RECT_MID_LEFT;
        }
        return GUIDE.NONE;
    }

    drawGuides() {
        let x: number = this.x;
        let y: number = this.y;
        let w: number = this.w;
        let h: number = this.h;
        this.ctx.beginPath();
        this.ctx.rect(x, y, w, h);
        this.ctx.strokeStyle = 'gray';
        this.ctx.stroke();
        let halfSize: number = this.guideSize/2;
        this.drawSingleGuide(x - halfSize, y - halfSize, GUIDE.RECT_TOP_LEFT);
        this.drawSingleGuide((x + w/2) - halfSize, y - halfSize, GUIDE.RECT_TOP_MID);
        this.drawSingleGuide(x + w - halfSize, y - halfSize, GUIDE.RECT_TOP_RIGHT);
        this.drawSingleGuide(x - halfSize, (y + h/2) - halfSize, GUIDE.RECT_MID_LEFT);
        this.drawSingleGuide(x + w - halfSize, (y + h/2) - halfSize, GUIDE.RECT_MID_RIGHT);
        this.drawSingleGuide(x + w - halfSize, y + h - halfSize, GUIDE.RECT_BOTTOM_RIGHT);
        this.drawSingleGuide((x + w/2) - halfSize, y + h - halfSize, GUIDE.RECT_BOTTOM_MID);
        this.drawSingleGuide(x - halfSize, y + h - halfSize, GUIDE.RECT_BOTTOM_LEFT);
    }

    /**
     * Returns true if the mouse is inside of the object's bounding rectangle, false if otherwise
     * @param mx the mouse x coordinate
     * @param my the mouse y coordinate
     */
    contains(): boolean {
        let mx: number = this.mouse.x;
        let my: number = this.mouse.y;
        return (mx > this.x) && (mx < this.x + this.w) &&
            (my > this.y) && (my < this.y + this.h);
    }


    // Modification functions

    modifyResize(event: MouseEvent): void {
        let corner: GUIDE = this.corner;
        if (corner == GUIDE.NONE) {
            return;
        }
        let mx: number = this.mouse.x;
        let my: number = this.mouse.y;
        let prevX: number = this.prevX;
        let prevY: number = this.prevY;
        let prevWidth: number = this.prevWidth;
        let prevHeight: number = this.prevHeight;
        let xDiff: number = mx - this.prevMouse.x;
        let yDiff: number = my - this.prevMouse.y;
        let minSize: number = this.guideSize * 2;

        if (EffectUtils.isRectGuideSide(corner)) {
            switch (corner) {
                case GUIDE.RECT_TOP_MID:
                    this.h = prevHeight - Math.min(yDiff, prevHeight - minSize);
                    this.y = prevY + prevHeight - this.h;
                    break;
                case GUIDE.RECT_MID_LEFT:
                    this.w = prevWidth - Math.min(xDiff, prevWidth - minSize);
                    this.x = prevX + prevWidth - this.w;
                    break;
                case GUIDE.RECT_MID_RIGHT:
                    this.w = prevWidth + Math.max(xDiff, minSize - prevWidth);
                    break;
                case GUIDE.RECT_BOTTOM_MID:
                    this.h = prevHeight + Math.max(yDiff, minSize - prevHeight);
                    break;
            }
        } else if (!event.shiftKey) {
            switch (corner) {
                case GUIDE.RECT_TOP_LEFT:
                    this.w = prevWidth - Math.min(xDiff, prevWidth - minSize);
                    this.h = prevHeight - Math.min(yDiff, prevHeight - minSize);
                    this.x = prevX + prevWidth - this.w;
                    this.y = prevY + prevHeight - this.h;
                    break;
                case GUIDE.RECT_TOP_RIGHT:
                    this.w = prevWidth + Math.max(xDiff, minSize - prevWidth);
                    this.h = prevHeight - Math.min(yDiff, prevHeight - minSize);
                    this.y = prevY + prevHeight - this.h;
                    break;
                case GUIDE.RECT_BOTTOM_LEFT:
                    this.w = prevWidth - Math.min(xDiff, prevWidth - minSize);
                    this.h = prevHeight + Math.max(yDiff, minSize - prevHeight);
                    this.x = prevX + prevWidth - this.w;
                    break;
                case GUIDE.RECT_BOTTOM_RIGHT:
                    this.w = prevWidth + Math.max(xDiff, minSize - prevWidth);
                    this.h = prevHeight + Math.max(yDiff, minSize - prevHeight);
                    break;
            }
        } else {
            let ratio: number = prevWidth / prevHeight;
            let newW: number;
            let newH: number;
            switch (this.corner) {
                case GUIDE.RECT_TOP_LEFT:
                    newW = prevWidth - Math.min(xDiff, prevWidth - minSize);
                    newH = Math.round(newW / ratio);
                    if (prevY + prevHeight - newH <= my) {
                        break;
                    }
                    newH = prevHeight - Math.min(yDiff, prevHeight - minSize);
                    newW = Math.round(newH * ratio);
                    if (prevX + prevWidth - newW <= mx) {
                        break;
                    }
                    newW = this.w;
                    newH = this.h;
                    break;
                case GUIDE.RECT_TOP_RIGHT:
                    newW = prevWidth + Math.max(xDiff, minSize - prevWidth);
                    newH = Math.round(newW / ratio);
                    if (prevY + prevHeight - newH <= my) {
                        break;
                    }
                    newH = prevHeight - Math.min(yDiff, prevHeight - minSize);
                    newW = Math.round(newH * ratio);
                    if ((newW + this.x) >= mx) {
                        break;
                    }
                    newW = this.w;
                    newH = this.h;
                    break;
                case GUIDE.RECT_BOTTOM_LEFT:
                    newW = prevWidth - Math.min(xDiff, prevWidth - minSize);
                    newH = Math.round(newW / ratio);
                    if ((newH + this.y) >= my) {
                        break;
                    }
                    newH = prevHeight + Math.max(yDiff, minSize - prevHeight);
                    newW = Math.round(newH * ratio);
                    if (prevX + prevWidth - newW <= mx) {
                        break;
                    }
                    newW = this.w;
                    newH = this.h;
                    break;
                case GUIDE.RECT_BOTTOM_RIGHT:
                    newW = prevWidth + xDiff;
                    newH = Math.round(newW / ratio);
                    if ((newH + this.y) >= my) {
                        break;
                    }
                    newH = prevHeight + yDiff;
                    newW = Math.round(newH * ratio);
                    if ((newW + this.x) >= mx) {
                        break;
                    }
                    newW = this.w;
                    newH = this.h;
                    break;
            }

            // Final adjustment
            if (newW < minSize || newH < minSize) {
                if (ratio <= 1) {
                    newW = Math.max(minSize, newW);
                    newH = Math.round(this.w / ratio);
                } else {
                    newW = Math.max(minSize, newH);
                    newH = Math.round(this.h * ratio);
                }
            }
            this.w = newW;
            this.h = newH;
            switch (corner) {
                case GUIDE.RECT_TOP_LEFT:
                    this.x = prevX + prevWidth - this.w;
                    this.y = prevY + prevHeight - this.h;
                    break;
                case GUIDE.RECT_TOP_RIGHT:
                    this.y = prevY + prevHeight - this.h;
                    break;
                case GUIDE.RECT_BOTTOM_LEFT:
                    this.x = prevX + prevWidth - this.w;
                    break;
            }
        }
    }

    modifyState(event: MouseEvent): void {
        let guideContains: GUIDE = this.guideContains();
        let contains: boolean = this.contains();
        this.corner = guideContains;
        this.justDragged = false;
        this.justResized = false;
        this.prevX = this.x;
        this.prevY = this.y;

        if (event.ctrlKey) { //prepares the object for dragging whether it is actually selected or not
            if (contains) {
                this.isSelected = true;
            }
            this.isDragging = true;

        } else if ((guideContains == GUIDE.NONE && !contains) || this.isOverlapped()) {
            this.isSelected = false;
            this.isDragging = false;
            return;
        }

        this.isSelected = true;
        this.scope.eventLog.push(this.logClick());
        if (guideContains != GUIDE.NONE) { //resizing
            this.isResizing = true;
            this.prevHeight = this.h;
            this.prevWidth = this.w;
        } else if (contains) { // dragging
            this.isDragging = true;
        }
    }

    modifyReset(): void {
        if (!this.isSelected) {
            return;
        }
        if (this.isDragging) {
            if (Math.abs(this.prevX - this.x) > 0 || Math.abs(this.prevY - this.y) > 0) {
                this.justDragged = true;
            }
        } else if (this.isResizing) {
            if ((Math.abs(this.prevWidth - this.w) > 0) || (Math.abs(this.prevHeight - this.h) > 0)) {
                this.justResized = true;
            }
        }
        this.isDragging = false;
        this.isResizing = false;
        this.corner = GUIDE.NONE;
    }

    // Logging functions

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

    get w(): number {
        return this.node.getWidth(this.scope);
    }

    set w(val: number) {
        this.node.setWidth(this.scope, val);
    }

    get h(): number {
        return this.node.getHeight(this.scope);
    }

    set h(val: number) {
        this.node.setHeight(this.scope, val);
    }

    get prevWidth(): number {
        return this._prevWidth;
    }

    set prevWidth(val: number) {
        this._prevWidth = val;
    }

    get prevHeight(): number {
        return this._prevHeight;
    }

    set prevHeight(val: number) {
        this._prevHeight = val;
    }
}
