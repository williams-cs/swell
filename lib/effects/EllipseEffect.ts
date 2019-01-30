import { Effect } from "./Effect";
import { EllipseNode } from "../shapes/EllipseNode";
import { Expression } from "../Expression";
import { Scope } from "../structural/Scope";
import { Dimensions } from "../structural/Dimensions";
import { PaintEvent } from "../logging/PaintEvent";
import { DragEvent } from "../logging/DragEvent";
import { ResizeEvent } from "../logging/ResizeEvent";
import { LogEvent } from "../logging/LogEvent";
import { NumberNode } from "../prims/NumberNode";
import { ClickEvent } from "../logging/ClickEvent";
import { EffectUtils } from "./EffectUtils";

export class EllipseEffect extends Effect<EllipseNode> {

    private _x1: number; // used to save coords for logging
    private _y1: number;
    private _width1: number; // saves size for logging
    private _height1: number;

    /**
     * This method is called in order to draw and redraw the object when manipulations are made
     */
    update(): void {
        let x: number = this.x;
        let y: number = this.y;
        let w: number = this.w;
        let h: number = this.h;
        this.ctx.beginPath();
        this.ctx.ellipse(x, y, w / 2, h / 2, 0, 0, Math.PI * 2, false);
        this.ctx.fillStyle = "#D5B8FF";
        this.ctx.shadowColor = "#6C6C6C";
        this.ctx.shadowBlur = 15;
        this.ctx.fill();

        if (this.isSelected) {
            this.drawGuides(x - w / 2, y - h / 2, w, h, this.corner);
        }
    }

    /**
     * Returns true if the mouse is inside of the object's bounding rectangle, false if otherwise
     * @param mx the mouse x coordinate
     * @param my the mouse y coordinate
     */
    contains(mx: number, my: number): boolean {
        let x: number = this.x;
        let y: number = this.y;
        let w: number = this.w;
        let h: number = this.h;
        return Math.pow(mx - x, 2) / Math.pow(w / 2, 2) + Math.pow(my - y, 2) / Math.pow(h / 2, 2) <= 1;
    }

    /**
     * Returns a number > 0 if the mouse is inside one of the corner/side guides, returns 0 if not
     * The corner guides are numbered 1-4 with 1 being the top left, 2 being the top right, and so on.
     * The middle guides are numbered 5-8, with 5 being the top middle, 6 being the right middle, and so on.
     * @param mx the mouse x coordinate
     * @param my the mouse y coordinate
     */
    guideContains(mx: number, my: number): number {
        let x: number = this.x;
        let y: number = this.y;
        let w: number = this.w;
        let h: number = this.h;
        let xdif: number = mx - (x - w / 2);
        let ydif: number = my - (y - h / 2);
        /* Corner Guides */
        if (Math.abs(xdif) <= 5 && Math.abs(ydif) <= 5) { //top left
            return 1;
        }
        xdif = mx - (x + w / 2);
        if (Math.abs(xdif) <= 5 && Math.abs(ydif) <= 5) { //top right
            return 2;
        }
        xdif = mx - (x + w / 2);
        ydif = my - (y + h / 2);
        if (Math.abs(xdif) <= 5 && Math.abs(ydif) <= 5) { //bottom right
            return 3;
        }
        xdif = mx - (x - w / 2);
        if (Math.abs(xdif) <= 5 && Math.abs(ydif) <= 5) { //bottom left
            return 4;
        }
        /* Middle Guides */
        xdif = mx - x;
        ydif = my - (y - h / 2);
        if (Math.abs(xdif) <= 5 && Math.abs(ydif) <= 5) { //top middle
            return 5;
        }
        xdif = mx - (x + w / 2);
        ydif = my - y;
        if (Math.abs(xdif) <= 5 && Math.abs(ydif) <= 5) { //middle right
            return 6;
        }
        xdif = mx - x;
        ydif = my - (y + h / 2);
        if (Math.abs(xdif) <= 5 && Math.abs(ydif) <= 5) { //bottom middle
            return 7;
        }
        xdif = mx - (x - w / 2);
        ydif = my - y;
        if (Math.abs(xdif) <= 5 && Math.abs(ydif) <= 5) { //middle left
            return 8;
        }
        else return 0;
    }

    /**
     * Draws the bounding rectangle and guides for the object when the object is selected
     * If one of the guides is selected, it colors that guide blue
     * @param x the x coordinate for where the rectangle will originate from (top left corner)
     * @param y the y coordinate for where the rectangle will originate from (top left corner)
     * @param w the width of the bounding rectangle
     * @param h the height of the bounding rectangle
     * @param corner the number of the corner to be colored blue (if any at all, if 0, all are white)
     */
    drawGuides(x: number, y: number, w: number, h: number, corner: number) { //corner is 1,2,3 or 4 for corner guides, 5,6,7 or 8 for side guides
        this.ctx.beginPath();
        this.ctx.rect(x, y, w, h);
        this.ctx.strokeStyle = 'gray';
        this.ctx.stroke();
        if (corner !== 0 && corner <= 4) {
            switch (corner) { //colors the correct guide blue
                case 1:
                    this.drawSquare(x - 2.5, y - 2.5, 5, 5, 'blue'); // top left
                    this.drawSquare((x + w / 2) - 2.5, y - 2.5, 5, 5, 'white'); // top middle
                    this.drawSquare(x + w - 2.5, y - 2.5, 5, 5, 'white'); // top right
                    this.drawSquare(x + w - 2.5, (y + h / 2) - 2.5, 5, 5, 'white'); // middle right
                    this.drawSquare(x + w - 2.5, y + h - 2.5, 5, 5, 'white'); // bottom right
                    this.drawSquare((x + w / 2) - 2.5, y + h - 2.5, 5, 5, 'white'); // bottom middle
                    this.drawSquare(x - 2.5, y + h - 2.5, 5, 5, 'white'); // bottom left
                    this.drawSquare(x - 2.5, (y + h / 2) - 2.5, 5, 5, 'white'); // middle left
                    break;
                case 2:
                    this.drawSquare(x - 2.5, y - 2.5, 5, 5, 'white'); // top left
                    this.drawSquare((x + w / 2) - 2.5, y - 2.5, 5, 5, 'white'); // top middle
                    this.drawSquare(x + w - 2.5, y - 2.5, 5, 5, 'blue'); // top right
                    this.drawSquare(x + w - 2.5, (y + h / 2) - 2.5, 5, 5, 'white'); // middle right
                    this.drawSquare(x + w - 2.5, y + h - 2.5, 5, 5, 'white'); // bottom right
                    this.drawSquare((x + w / 2) - 2.5, y + h - 2.5, 5, 5, 'white'); // bottom middle
                    this.drawSquare(x - 2.5, y + h - 2.5, 5, 5, 'white'); // bottom left
                    this.drawSquare(x - 2.5, (y + h / 2) - 2.5, 5, 5, 'white'); // middle left
                    break;
                case 3:
                    this.drawSquare(x - 2.5, y - 2.5, 5, 5, 'white'); // top left
                    this.drawSquare((x + w / 2) - 2.5, y - 2.5, 5, 5, 'white'); // top middle
                    this.drawSquare(x + w - 2.5, y - 2.5, 5, 5, 'white'); // top right
                    this.drawSquare(x + w - 2.5, (y + h / 2) - 2.5, 5, 5, 'white'); // middle right
                    this.drawSquare(x + w - 2.5, y + h - 2.5, 5, 5, 'blue'); // bottom right
                    this.drawSquare((x + w / 2) - 2.5, y + h - 2.5, 5, 5, 'white'); // bottom middle
                    this.drawSquare(x - 2.5, y + h - 2.5, 5, 5, 'white'); // bottom left
                    this.drawSquare(x - 2.5, (y + h / 2) - 2.5, 5, 5, 'white'); // middle left
                    break;
                case 4:
                    this.drawSquare(x - 2.5, y - 2.5, 5, 5, 'white'); // top left
                    this.drawSquare((x + w / 2) - 2.5, y - 2.5, 5, 5, 'white'); // top middle
                    this.drawSquare(x + w - 2.5, y - 2.5, 5, 5, 'white'); // top right
                    this.drawSquare(x + w - 2.5, (y + h / 2) - 2.5, 5, 5, 'white'); // middle right
                    this.drawSquare(x + w - 2.5, y + h - 2.5, 5, 5, 'white'); // bottom right
                    this.drawSquare((x + w / 2) - 2.5, y + h - 2.5, 5, 5, 'white'); // bottom middle
                    this.drawSquare(x - 2.5, y + h - 2.5, 5, 5, 'blue'); // bottom left
                    this.drawSquare(x - 2.5, (y + h / 2) - 2.5, 5, 5, 'white'); // middle left
                    break;
            }
        }
        else if (corner !== 0 && corner > 4) {
            switch (corner) { //colors the correct guide blue
                case 5:
                    this.drawSquare(x - 2.5, y - 2.5, 5, 5, 'white'); // top left
                    this.drawSquare((x + w / 2) - 2.5, y - 2.5, 5, 5, 'blue'); // top middle
                    this.drawSquare(x + w - 2.5, y - 2.5, 5, 5, 'white'); // top right
                    this.drawSquare(x + w - 2.5, (y + h / 2) - 2.5, 5, 5, 'white'); // middle right
                    this.drawSquare(x + w - 2.5, y + h - 2.5, 5, 5, 'white'); // bottom right
                    this.drawSquare((x + w / 2) - 2.5, y + h - 2.5, 5, 5, 'white'); // bottom middle
                    this.drawSquare(x - 2.5, y + h - 2.5, 5, 5, 'white'); // bottom left
                    this.drawSquare(x - 2.5, (y + h / 2) - 2.5, 5, 5, 'white'); // middle left
                    break;
                case 6:
                    this.drawSquare(x - 2.5, y - 2.5, 5, 5, 'white'); // top left
                    this.drawSquare((x + w / 2) - 2.5, y - 2.5, 5, 5, 'white'); // top middle
                    this.drawSquare(x + w - 2.5, y - 2.5, 5, 5, 'white'); // top right
                    this.drawSquare(x + w - 2.5, (y + h / 2) - 2.5, 5, 5, 'blue'); // middle right
                    this.drawSquare(x + w - 2.5, y + h - 2.5, 5, 5, 'white'); // bottom right
                    this.drawSquare((x + w / 2) - 2.5, y + h - 2.5, 5, 5, 'white'); // bottom middle
                    this.drawSquare(x - 2.5, y + h - 2.5, 5, 5, 'white'); // bottom left
                    this.drawSquare(x - 2.5, (y + h / 2) - 2.5, 5, 5, 'white'); // middle left
                    break;
                case 7:
                    this.drawSquare(x - 2.5, y - 2.5, 5, 5, 'white'); // top left
                    this.drawSquare((x + w / 2) - 2.5, y - 2.5, 5, 5, 'white'); // top middle
                    this.drawSquare(x + w - 2.5, y - 2.5, 5, 5, 'white'); // top right
                    this.drawSquare(x + w - 2.5, (y + h / 2) - 2.5, 5, 5, 'white'); // middle right
                    this.drawSquare(x + w - 2.5, y + h - 2.5, 5, 5, 'white'); // bottom right
                    this.drawSquare((x + w / 2) - 2.5, y + h - 2.5, 5, 5, 'blue'); // bottom middle
                    this.drawSquare(x - 2.5, y + h - 2.5, 5, 5, 'white'); // bottom left
                    this.drawSquare(x - 2.5, (y + h / 2) - 2.5, 5, 5, 'white'); // middle left
                    break;
                case 8:
                    this.drawSquare(x - 2.5, y - 2.5, 5, 5, 'white'); // top left
                    this.drawSquare((x + w / 2) - 2.5, y - 2.5, 5, 5, 'white'); // top middle
                    this.drawSquare(x + w - 2.5, y - 2.5, 5, 5, 'white'); // top right
                    this.drawSquare(x + w - 2.5, (y + h / 2) - 2.5, 5, 5, 'white'); // middle right
                    this.drawSquare(x + w - 2.5, y + h - 2.5, 5, 5, 'white'); // bottom right
                    this.drawSquare((x + w / 2) - 2.5, y + h - 2.5, 5, 5, 'white'); // bottom middle
                    this.drawSquare(x - 2.5, y + h - 2.5, 5, 5, 'white'); // bottom left
                    this.drawSquare(x - 2.5, (y + h / 2) - 2.5, 5, 5, 'blue'); // middle left
                    break;
            }
        }
        else {
            this.drawSquare(x - 2.5, y - 2.5, 5, 5, 'white'); // top left
            this.drawSquare((x + w / 2) - 2.5, y - 2.5, 5, 5, 'white'); // top middle
            this.drawSquare(x + w - 2.5, y - 2.5, 5, 5, 'white'); // top right
            this.drawSquare(x + w - 2.5, (y + h / 2) - 2.5, 5, 5, 'white'); // middle right
            this.drawSquare(x + w - 2.5, y + h - 2.5, 5, 5, 'white'); // bottom right
            this.drawSquare((x + w / 2) - 2.5, y + h - 2.5, 5, 5, 'white'); // bottom middle
            this.drawSquare(x - 2.5, y + h - 2.5, 5, 5, 'white'); // bottom left
            this.drawSquare(x - 2.5, (y + h / 2) - 2.5, 5, 5, 'white'); // middle left
        }
    }

    /* Modification functions */

    /**
     * Changes the size of the object when called (when a corner guide is clicked and dragged).
     *
     * If any of width or height is too small, it sets them equal to 14 and the other equal to
     * 10 divided or multiplied by the ratio of width/height to keep it the same.
     */
    modifyResize(): void {
        let ratio: number = this.w / this.h;
        if (this.w < 14) {
            this.dims.width.eval(this.scope).val = 14;
            this.dims.height.eval(this.scope).val = Math.round(14 / ratio);
        }
        if (this.h < 14) {
            this.dims.height.eval(this.scope).val = 14;
            this.dims.width.eval(this.scope).val = Math.round(14 * ratio);
        }
        let newDistance = EffectUtils.calcDistance(this.mouse.x, this.mouse.y, this.dragOffX, this.dragOffY);
        this.dims.width.eval(this.scope).val += newDistance - this.initDistance;
        this.dims.height.eval(this.scope).val = Math.round(this.w / ratio);
        this.initDistance = newDistance;
    }

    /**
     * Changes the dimensions of the object when called.
     * If any of width or height is too small, it sets them equal to 10.
     */
    modifyChangeDims(): void {
        let newDistance = EffectUtils.calcDistance(this.mouse.x, this.mouse.y, this.dragOffX, this.dragOffY);
        let ratio: number = this.w / this.h;
        let dist_diff: number = newDistance - this.initDistance;
        if (this.corner == 5 || this.corner == 7) { // if modifying height
            if (this.h >= 14) {
                this.dims.height.eval(this.scope).val += dist_diff * 2;
                this.initDistance = newDistance;
            } else {
                this.dims.height.eval(this.scope).val = 14;
                if (dist_diff > 0) {
                    this.dims.height.eval(this.scope).val += dist_diff * 2;
                    this.initDistance = newDistance;
                }
            }
        } else { // modifying width
            if (this.w >= 14) {
                this.dims.width.eval(this.scope).val += dist_diff * 2;
                this.initDistance = newDistance;
            } else {
                this.dims.width.eval(this.scope).val = 14;
                if (dist_diff > 0) {
                    this.dims.width.eval(this.scope).val += dist_diff * 2;
                    this.initDistance = newDistance;
                }
            }
        }
    }

    modifyState(): void {
        let guideContains: number = this.guideContains(this.mouse.x, this.mouse.y);
        let contains: boolean = this.contains(this.mouse.x, this.mouse.y);
        this.justDragged = false;
        this.justResized = false;

        if (this.isSelectingMultiple) { //prepares the object for dragging whether it is personally selected or not
            this.isDragging = true;
            this.dragOffX = this.mouse.x - this.x;
            this.dragOffY = this.mouse.y - this.y;
            if (contains) {
                this._x1 = this.x;
                this._y1 = this.y;
                this.isSelected = true;
            }

        } else if (guideContains > 0 || contains) {
            let effects = this.scope.effects;
            let curID = this.id;
            for (let effect of effects) {
                let effectID = effect.id;
                if (effectID == curID) {
                    continue;
                } else if (effectID > curID && (effect.guideContains(this.mouse.x, this.mouse.y) > 0 || effect.contains(this.mouse.x, this.mouse.y))) {
                    this.isSelected = false;
                    this.isDragging = false;
                    return;
                }
            }

            if (guideContains > 0 && guideContains <= 4) { //resizing
                this.isSelected = true;
                this.isResizing = true;

                this.scope.eventLog.push(this.logClick());

                this.corner = guideContains;
                this.dragOffX = this.x;
                this.dragOffY = this.y;
                this.initDistance = EffectUtils.calcDistance(this.mouse.x, this.mouse.y, this.x, this.y);

                this._width1 = this.w;
                this._height1 = this.h;
                //this._size1 = Math.sqrt(Math.pow(this.w,2) + Math.pow(this.h,2)); // saving old size

            } else if (guideContains > 4) { //changing shape dimensions
                this.isSelected = true;
                this.isChangingDims = true;
                this.corner = guideContains;
                this.dragOffX = this.x;
                this.dragOffY = this.y;
                this.initDistance = EffectUtils.calcDistance(this.mouse.x, this.mouse.y, this.x, this.y);

            } else if (contains) { //simply selecting the shape or dragging
                this._x1 = this.x; // Saving original x and y
                this._y1 = this.y;
                this.isSelected = true;
                this.isDragging = true;

                this.scope.eventLog.push(this.logClick());

                this.dragOffX = this.mouse.x - this.x;
                this.dragOffY = this.mouse.y - this.y;
            }

        } else if (!this.isSelectingMultiple) {
            this.isSelected = false;
            this.isDragging = false;
        }
    }

    /**
     * Resets all of the private booleans to false (like dragging, resizing, etc) when the mouse is released
     */
    modifyReset(): void {
        if (this.isDragging && this.isSelected) { // probs only need dragging but oh well | isSel || selMul?
            this.isDragging = false;
            if (Math.abs(this._x1 - this.x) > 1 || Math.abs(this._y1 - this.y) > 1) {
                this.justDragged = true;
                //this.scope.eventLog.push(this.logMove());
            }
        } else if ((this.isResizing || this.isChangingDims) && this.isSelected) {
            //console.log("resizing ellipse");
            this.isResizing = false;
            //let size2 = Math.sqrt(Math.pow(this.w,2) + Math.pow(this.h,2));
            //console.log("Size diff: " + Math.abs(this._size1 - size2));
            if ((Math.abs(this._width1 - this.w) > 0) || (Math.abs(this._height1 - this.h) > 0)) {
                this.justResized = true;
            }
        }

        // if(this.isSelectingMultiple){
        //     if(Math.abs(this._x1 - this.x) > 1 || Math.abs(this._y1 - this.y) > 1) {
        //         this.scope.eventLog.push(this.logMove());
        //     }
        // }
        this.isDragging = false;
        this.isResizing = false;
        this.isChangingDims = false;
        this.corner = 0;
    }

    /**
     * Logs a paint event
     */
    logPaint(): LogEvent<any> {
        return new PaintEvent("ellipse", this.x, this.y);
    }

    /**
     * Logs a resize event
     */
    logResize(): LogEvent<any> {
        return new ResizeEvent(this);
        //Math.round(this._size1*100)/100, Math.round((Math.sqrt(Math.pow(this.w,2) + Math.pow(this.h,2))*100))/100);
    }

    /**
     * Logs a click event
     */
    logClick(): LogEvent<any> {
        return new ClickEvent("ellipse with ID " + this.id, this.x, this.y);
    }

    /**
     * Assembles a string for selection events
     */
    toSelString(): string {
        return (" ellipse with ID " + this.id + " at " + this.x + ", " + this.y);
    }

    /**
    * Assembles a string for drag events
    */
    toDragString(): string {
        return ("ellipse with ID " + this.id + " from " + this._x1 + ", " + this._y1 + " to " + this.x + ", " + this.y);
    }

    /**
     * Assembles a string for ID assignment events
     */
    toIDString(): string {
        return (this.id + " to ellipse at " + this.x + ", " + this.y);
    }
}
