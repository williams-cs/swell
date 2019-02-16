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
import RECT_GUIDE = EffectUtils.RECT_GUIDE;

export abstract class AbstractShapeEffect<T extends AbstractShapeNode<T, E>, E extends AbstractShapeEffect<T, E>> extends AbstractRectangularBoundEffect<T> {

    private _prevWidth: number; // saves size for logging
    private _prevHeight: number;

    guideContains(mx: number, my: number): RECT_GUIDE {
        let x: number = this.x;
        let y: number = this.y;
        let w: number = this.w;
        let h: number = this.h;

        /* Corner Guides */
        let xdif: number = mx - x;
        let ydif: number = my - y;
        let halfSize: number = this.guideSize/2;
        if (Math.abs(xdif) <= halfSize && Math.abs(ydif) <= halfSize) {
            return RECT_GUIDE.TOP_LEFT;
        }
        xdif = mx - (x + w);
        if (Math.abs(xdif) <= halfSize && Math.abs(ydif) <= halfSize) {
            return RECT_GUIDE.TOP_RIGHT;
        }
        xdif = mx - (x + w);
        ydif = my - (y + h);
        if (Math.abs(xdif) <= halfSize && Math.abs(ydif) <= halfSize) {
            return RECT_GUIDE.BOTTOM_RIGHT;
        }
        xdif = mx - x;
        if (Math.abs(xdif) <= halfSize && Math.abs(ydif) <= halfSize) {
            return RECT_GUIDE.BOTTOM_LEFT;
        }

        /* Middle Guides */
        xdif = mx - (x + w/2);
        ydif = my - y;
        if (Math.abs(xdif) <= halfSize && Math.abs(ydif) <= halfSize) {
            return RECT_GUIDE.TOP_MID;
        }
        xdif = mx - (x + w);
        ydif = my - (y + h/2);
        if (Math.abs(xdif) <= halfSize && Math.abs(ydif) <= halfSize) {
            return RECT_GUIDE.MID_RIGHT;
        }
        xdif = mx - (x + w/2);
        ydif = my - (y + h);
        if (Math.abs(xdif) <= halfSize && Math.abs(ydif) <= halfSize) {
            return RECT_GUIDE.BOTTOM_MID;
        }
        xdif = mx - x;
        ydif = my - (y + h/2);
        if (Math.abs(xdif) <= halfSize && Math.abs(ydif) <= halfSize) { //middle left
            return RECT_GUIDE.MID_LEFT;
        }
        return RECT_GUIDE.NONE;
    }

    drawGuides(x: number, y: number, w: number, h: number, corner: number) {
        this.ctx.beginPath();
        this.ctx.rect(x, y, w, h);
        this.ctx.strokeStyle = 'gray';
        this.ctx.stroke();
        let size: number = this.guideSize;
        let halfSize: number = size/2;
        this.drawSquare(x - halfSize, y - halfSize, size, size, this.getGuideColor(RECT_GUIDE.TOP_LEFT));
        this.drawSquare((x + w/2) - halfSize, y - halfSize, size, size, this.getGuideColor(RECT_GUIDE.TOP_MID));
        this.drawSquare(x + w - halfSize, y - halfSize, size, size, this.getGuideColor(RECT_GUIDE.TOP_RIGHT));
        this.drawSquare(x - halfSize, (y + h/2) - halfSize, size, size, this.getGuideColor(RECT_GUIDE.MID_LEFT));
        this.drawSquare(x + w - halfSize, (y + h/2) - halfSize, size, size, this.getGuideColor(RECT_GUIDE.MID_RIGHT));
        this.drawSquare(x + w - halfSize, y + h - halfSize, size, size, this.getGuideColor(RECT_GUIDE.BOTTOM_RIGHT));
        this.drawSquare((x + w/2) - halfSize, y + h - halfSize, size, size, this.getGuideColor(RECT_GUIDE.BOTTOM_MID));
        this.drawSquare(x - halfSize, y + h - halfSize, size, size, this.getGuideColor(RECT_GUIDE.BOTTOM_LEFT));
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

    // Event listeners

    onKeyDown(event: KeyboardEvent) {}

    // Modification functions

    modifyResize(event: MouseEvent): void {
        let corner: RECT_GUIDE = this.corner;
        if (corner == RECT_GUIDE.NONE) {
            return;
        }
        let mx: number = this.mouse.x;
        let my: number = this.mouse.y;
        let prevMx: number = this.prevMouse.x;
        let prevMy: number = this.prevMouse.y;
        let prevX: number = this.prevX;
        let prevY: number = this.prevY;
        let prevWidth: number = this.prevWidth;
        let prevHeight: number = this.prevHeight;
        let xDiff: number = mx - prevMx;
        let yDiff: number = my - prevMy;
        let minSize: number = this.guideSize * 2;

        if (EffectUtils.isRectGuideSide(corner)) {
            switch (corner) {
                case RECT_GUIDE.TOP_MID:
                    this.h = prevHeight - Math.min(yDiff, prevHeight - minSize);
                    this.y = prevY + prevHeight - this.h;
                    break;
                case RECT_GUIDE.MID_LEFT:
                    this.w = prevWidth - Math.min(xDiff, prevWidth - minSize);
                    this.x = prevX + prevWidth - this.w;
                    break;
                case RECT_GUIDE.MID_RIGHT:
                    this.w = prevWidth + Math.max(xDiff, minSize - prevWidth);
                    break;
                case RECT_GUIDE.BOTTOM_MID:
                    this.h = prevHeight + Math.max(yDiff, minSize - prevHeight);
                    break;
            }
        } else if (!event.shiftKey) {
            switch (corner) {
                case RECT_GUIDE.TOP_LEFT:
                    this.w = prevWidth - Math.min(xDiff, prevWidth - minSize);
                    this.h = prevHeight - Math.min(yDiff, prevHeight - minSize);
                    this.x = prevX + prevWidth - this.w;
                    this.y = prevY + prevHeight - this.h;
                    break;
                case RECT_GUIDE.TOP_RIGHT:
                    this.w = prevWidth + Math.max(xDiff, minSize - prevWidth);
                    this.h = prevHeight - Math.min(yDiff, prevHeight - minSize);
                    this.y = prevY + prevHeight - this.h;
                    break;
                case RECT_GUIDE.BOTTOM_LEFT:
                    this.w = prevWidth - Math.min(xDiff, prevWidth - minSize);
                    this.h = prevHeight + Math.max(yDiff, minSize - prevHeight);
                    this.x = prevX + prevWidth - this.w;
                    break;
                case RECT_GUIDE.BOTTOM_RIGHT:
                    this.w = prevWidth + Math.max(xDiff, minSize - prevWidth);
                    this.h = prevHeight + Math.max(yDiff, minSize - prevHeight);
                    break;
            }
        } else {
            let ratio: number = prevWidth / prevHeight;
            let newW: number;
            let newH: number;
            switch (this.corner) {
                case RECT_GUIDE.TOP_LEFT:
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
                case RECT_GUIDE.TOP_RIGHT:
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
                case RECT_GUIDE.BOTTOM_LEFT:
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
                case RECT_GUIDE.BOTTOM_RIGHT:
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
                case RECT_GUIDE.TOP_LEFT:
                    this.x = prevX + prevWidth - this.w;
                    this.y = prevY + prevHeight - this.h;
                    break;
                case RECT_GUIDE.TOP_RIGHT:
                    this.y = prevY + prevHeight - this.h;
                    break;
                case RECT_GUIDE.BOTTOM_LEFT:
                    this.x = prevX + prevWidth - this.w;
                    break;
            }
        }
    }

    modifyState(event: MouseEvent): void {
        let guideContains: RECT_GUIDE = this.guideContains(this.mouse.x, this.mouse.y);
        this.corner = guideContains;
        let contains: boolean = this.contains(this.mouse.x, this.mouse.y);
        this.justDragged = false;
        this.justResized = false;
        let x: number = this.x;
        let y: number = this.y;
        let w: number = this.w;
        let h: number = this.h;

        if (event.ctrlKey) { //prepares the object for dragging whether it is actually selected or not
            if (contains) {
                this.isSelected = true;
            }
            this.prevX = x;
            this.prevY = y;
            this.isDragging = true;

        } else if (guideContains != RECT_GUIDE.NONE || contains) {
            for (let effect of this.scope.effects) {
                if (effect.id == this.id) {
                    continue;
                }
                if (effect.id > this.id && (effect.guideContains(this.mouse.x, this.mouse.y) != RECT_GUIDE.NONE ||
                    effect.contains(this.mouse.x, this.mouse.y))) {
                    this.isSelected = false;
                    this.isDragging = false;
                    return;
                }
            }

            this.prevX = x; // Saving original x and y
            this.prevY = y;
            this.isSelected = true;
            this.scope.eventLog.push(this.logClick());
            if (guideContains != RECT_GUIDE.NONE) { //resizing
                this.isResizing = true;
                this.prevHeight = this.h;
                this.prevWidth = this.w;
            } else if (contains) { // dragging
                this.isDragging = true;
            }

        } else { // not selected
            this.isSelected = false;
            this.isDragging = false;
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
        this.corner = RECT_GUIDE.NONE;
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
