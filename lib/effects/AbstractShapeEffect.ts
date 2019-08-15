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

export abstract class AbstractShapeEffect<T extends AbstractShapeNode<T, E>, E extends AbstractShapeEffect<T, E>> extends AbstractRectangularBoundEffect<T> {

    private _prevWidth: number; // saves size for logging
    private _prevHeight: number;

    guideContains(): GUIDE {
        let w: number = this.w;
        let h: number = this.h;
        let x: number = this.x;
        let y: number = this.y;
        let mx: number = this.mouse.x;
        let my: number = this.mouse.y; 
        
        let newMousePos = this.changeCoordinate(mx - x, my - y, this.rotate);
        mx = newMousePos[0];
        my = newMousePos[1];

        /* Corner Guides */
        let xdif: number = mx + w/2;
        let ydif: number = my + h/2;
        let halfSize: number = this.guideSize/2;
        let rotSize = this.rotGuideSize;

        if (Math.abs(xdif) <= halfSize && Math.abs(ydif) <= halfSize) {
            return GUIDE.RECT_TOP_LEFT;
        }
        xdif = mx - w/2;
        if (Math.abs(xdif) <= halfSize && Math.abs(ydif) <= halfSize) {
            return GUIDE.RECT_TOP_RIGHT;
        }
        xdif = mx - w/2;
        ydif = my - h/2;
        if (Math.abs(xdif) <= halfSize && Math.abs(ydif) <= halfSize) {
            return GUIDE.RECT_BOTTOM_RIGHT;
        }
        xdif = mx + w/2;
        if (Math.abs(xdif) <= halfSize && Math.abs(ydif) <= halfSize) {
            return GUIDE.RECT_BOTTOM_LEFT;
        }

        /* Middle Guides */
        xdif = mx;
        ydif = my + h/2;
        if (Math.abs(xdif) <= halfSize && Math.abs(ydif) <= halfSize) {
            return GUIDE.RECT_TOP_MID;
        }
        xdif = mx - w/2;
        ydif = my;
        if (Math.abs(xdif) <= halfSize && Math.abs(ydif) <= halfSize) {
            return GUIDE.RECT_MID_RIGHT;
        }
        xdif = mx;
        ydif = my - h/2;
        if (Math.abs(xdif) <= halfSize && Math.abs(ydif) <= halfSize) {
            return GUIDE.RECT_BOTTOM_MID;
        }
        xdif = mx + w/2;
        ydif = my;
        if (Math.abs(xdif) <= halfSize && Math.abs(ydif) <= halfSize) { //middle left
            return GUIDE.RECT_MID_LEFT;
        }

        /* Rotation Guide*/
        xdif = mx;
        ydif = my + h/2 + 10 + rotSize/2;
        if (Math.abs(xdif) <= rotSize/2 && Math.abs(ydif) <= rotSize/2) {
            return GUIDE.ROTATE;
        }

        return GUIDE.NONE;
    }

    drawGuides() {
        let x: number = this.x;
        let y: number = this.y;
        let w: number = this.w;
        let h: number = this.h;

        this.prepareCanvas(x, y);

        this.ctx.beginPath();
        this.ctx.rect(-w/2, -h/2, w, h);
        this.ctx.strokeStyle = 'gray';
        this.ctx.stroke();
        let halfSize: number = this.guideSize/2;

        this.drawRotationGuide(0, -h/2);
        this.drawSingleGuide(-w/2 - halfSize, -h/2 - halfSize, GUIDE.RECT_TOP_LEFT);
        this.drawSingleGuide(- halfSize, -h/2 - halfSize, GUIDE.RECT_TOP_MID);
        this.drawSingleGuide(w/2 - halfSize, -h/2 - halfSize, GUIDE.RECT_TOP_RIGHT);
        this.drawSingleGuide(-w/2 - halfSize, -halfSize, GUIDE.RECT_MID_LEFT);
        this.drawSingleGuide(w/2 - halfSize, -halfSize, GUIDE.RECT_MID_RIGHT);
        this.drawSingleGuide(w/2 - halfSize, h/2 - halfSize, GUIDE.RECT_BOTTOM_RIGHT);
        this.drawSingleGuide(- halfSize, h/2 - halfSize, GUIDE.RECT_BOTTOM_MID);
        this.drawSingleGuide(-w/2 - halfSize, h/2 - halfSize, GUIDE.RECT_BOTTOM_LEFT);
        this.restoreCanvas();
    }

    /**
     * Returns true if the mouse is inside of the object's bounding rectangle, false if otherwise
     * @param mx the mouse x coordinate with respect to the translated and rotated canvas
     * @param my the mouse y coordinate with respect to the translated and rotated canvas
     */
    contains(): boolean {
        let newMousePos = this.changeCoordinate(this.mouse.x - this.x,
            this.mouse.y - this.y, this.rotate);
        let mx: number = newMousePos[0];
        let my: number = newMousePos[1];
        return (Math.abs(mx) < this.w/2) && (Math.abs(my) < this.h/2);
    }


    // Modification functions

    modifyResize(event: MouseEvent): void {
        let corner: GUIDE = this.corner;
        if (corner == GUIDE.NONE) {
            return;
        }
        //"unrotate" mousepos, resize as if rotate = 0
        let prevMousePos = this.changeCoordinate(this.prevMouse.x - this.x, this.prevMouse.y - this.y, this.rotate);
        let curMousePos = this.changeCoordinate(this.mouse.x - this.x, this.mouse.y - this.y, this.rotate);
        let newXY : [number, number];
        let deltaX: number = 0;
        let deltaY: number = 0;
        let mx: number = curMousePos[0];
        let my: number = curMousePos[1];
        let prevX: number = this.prevX;
        let prevY: number = this.prevY;
        let prevWidth: number = this.prevWidth;
        let prevHeight: number = this.prevHeight;
        let xDiff: number = Math.floor(mx - prevMousePos[0]);
        let yDiff: number = Math.floor(my - prevMousePos[1]);
        let minSize: number = this.guideSize * 2;

        if (EffectUtils.isRectGuideSide(corner)) {
            switch (corner) {
                case GUIDE.RECT_TOP_MID:
                    this.h = prevHeight - Math.min(yDiff, prevHeight - minSize);
                    deltaY = (prevHeight - this.h)/2;
                    break;
                case GUIDE.RECT_MID_LEFT:
                    this.w = prevWidth - Math.min(xDiff, prevWidth - minSize);
                    deltaX = (prevWidth - this.w)/2;
                    break;
                case GUIDE.RECT_MID_RIGHT:
                    this.w = prevWidth + Math.max(xDiff, minSize - prevWidth);
                    deltaX = - (prevWidth - this.w)/2;
                    break;
                case GUIDE.RECT_BOTTOM_MID:
                    this.h = prevHeight + Math.max(yDiff, minSize - prevHeight);
                    deltaY = - (prevHeight - this.h)/2;
                    break;
            }
            //rotate back to get new coordinates
            newXY = this.changeCoordinate(deltaX, deltaY, -this.rotate);
            this.x = prevX + newXY[0];
            this.y = prevY + newXY[1];
        } else if (!event.shiftKey) {
            switch (corner) {
                case GUIDE.RECT_TOP_LEFT:
                    this.w = prevWidth - Math.min(xDiff, prevWidth - minSize);
                    this.h = prevHeight - Math.min(yDiff, prevHeight - minSize);
                    deltaX = (prevWidth - this.w)/2;
                    deltaY = (prevHeight - this.h)/2;
                    break;
                case GUIDE.RECT_TOP_RIGHT:
                    this.w = prevWidth + Math.max(xDiff, minSize - prevWidth);
                    this.h = prevHeight - Math.min(yDiff, prevHeight - minSize);
                    deltaX = - (prevWidth - this.w)/2;
                    deltaY = (prevHeight - this.h)/2;
                    break;
                case GUIDE.RECT_BOTTOM_LEFT:
                    this.w = prevWidth - Math.min(xDiff, prevWidth - minSize);
                    this.h = prevHeight + Math.max(yDiff, minSize - prevHeight);
                    deltaX = (prevWidth - this.w)/2;
                    deltaY = - (prevHeight - this.h)/2;
                    break;
                case GUIDE.RECT_BOTTOM_RIGHT:
                    this.w = prevWidth + Math.max(xDiff, minSize - prevWidth);
                    this.h = prevHeight + Math.max(yDiff, minSize - prevHeight);
                    deltaX = - (prevWidth - this.w)/2;
                    deltaY = - (prevHeight - this.h)/2;
                    break;
            }
            newXY = this.changeCoordinate(deltaX, deltaY, -this.rotate);
            this.x = prevX + newXY[0];
            this.y = prevY + newXY[1];
        } else { 
            let ratio: number = prevWidth / prevHeight;
            let newW: number;
            let newH: number;
            switch (this.corner) {
                case GUIDE.RECT_TOP_LEFT:
                    newW = prevWidth - Math.min(xDiff, prevWidth - minSize);
                    newH = Math.round(newW / ratio);
                    if (prevY + prevHeight/2 - newH <= my) {
                        break;
                    }
                    newH = prevHeight - Math.min(yDiff, prevHeight - minSize);
                    newW = Math.round(newH * ratio);
                    if (prevX + prevWidth/2 - newW <= mx) {
                        break;
                    }
                    newW = this.w;
                    newH = this.h;
                    break;
                case GUIDE.RECT_TOP_RIGHT:
                    newW = prevWidth + Math.max(xDiff, minSize - prevWidth);
                    newH = Math.round(newW / ratio);
                    if (prevY + prevHeight/2 - newH <= my) {
                        break;
                    }
                    newH = prevHeight - Math.min(yDiff, prevHeight - minSize);
                    newW = Math.round(newH * ratio);
                    if ((newW/2 + this.x) >= mx) {
                        break;
                    }
                    newW = this.w;
                    newH = this.h;
                    break;
                case GUIDE.RECT_BOTTOM_LEFT:
                    newW = prevWidth - Math.min(xDiff, prevWidth - minSize);
                    newH = Math.round(newW / ratio);
                    if ((newH/2 + this.y) >= my) {
                        break;
                    }
                    newH = prevHeight + Math.max(yDiff, minSize - prevHeight);
                    newW = Math.round(newH * ratio);
                    if (prevX + prevWidth/2 - newW <= mx) {
                        break;
                    }
                    newW = this.w;
                    newH = this.h;
                    break;
                case GUIDE.RECT_BOTTOM_RIGHT:
                    newW = prevWidth + xDiff;
                    newH = Math.round(newW / ratio);
                    if ((newH/2 + this.y) >= my) {
                        break;
                    }
                    newH = prevHeight + yDiff;
                    newW = Math.round(newH * ratio);
                    if ((newW/2 + this.x) >= mx) {
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
                    deltaX = (prevWidth - this.w)/2;
                    deltaY = (prevHeight - this.h)/2;
                    break;
                case GUIDE.RECT_TOP_RIGHT:
                    deltaX = - (prevWidth - this.w)/2;
                    deltaY = (prevHeight - this.h)/2;
                    break;
                case GUIDE.RECT_BOTTOM_LEFT:
                    deltaX = (prevWidth - this.w)/2;
                    deltaY = - (prevHeight - this.h)/2;
                    break;
                case GUIDE.RECT_BOTTOM_RIGHT:
                    deltaX = - (prevWidth - this.w)/2;
                    deltaY = - (prevHeight - this.h)/2;
                    break;
            }
            newXY = this.changeCoordinate(deltaX, deltaY, -this.rotate);
            this.x = prevX + newXY[0];
            this.y = prevY + newXY[1];
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
        if (guideContains != GUIDE.NONE && guideContains != GUIDE.ROTATE) { //resizing
            this.isResizing = true;
            this.prevHeight = this.h;
            this.prevWidth = this.w;
        } else if (guideContains === GUIDE.ROTATE) { //rotating
            this.isRotating = true;
        } else if (contains) { // dragging
            this.isDragging = true;
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
        this.isRotating = false;
        this.isDragging = false;
        this.isResizing = false;
        this.corner = GUIDE.NONE;
    }

    changeCursor() : void {
        let cx: number = this.x;
        let cy: number = this.y;
        if (this.cursorOwnerID == undefined || this.cursorOwnerID === this.id) {
            this.changeResizeCursor(this.mouse.x, cx, this.mouse.y, cy);

            this.changeDragCursor(this.guideContains());
        }
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
