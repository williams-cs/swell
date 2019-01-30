import { Effect } from "./Effect";
import { NumberNode } from "../prims/NumberNode";
import { EmojiNode } from "../shapes/EmojiNode";
import { Expression } from "../Expression";
import { Scope } from "../structural/Scope";
import { PaintEvent } from "../logging/PaintEvent";
import { Dimensions } from "../structural/Dimensions";
import { LogEvent } from "../logging/LogEvent";
import { ResizeEvent } from "../logging/ResizeEvent";
import { DragEvent } from "../logging/DragEvent";
import { ClickEvent } from "../logging/ClickEvent";
import { EffectUtils } from "./EffectUtils";

export class EmojiEffect extends Effect<EmojiNode> {

    private _emojiImg: HTMLImageElement;
    private _x1: number; // used to save coords for logging
    private _y1: number;
    private _width1: number; // saves size for logging
    private _height1: number;

    constructor(node: EmojiNode, scope: Scope, dims: Dimensions) {
        super(node, scope, dims);
        this._emojiImg = new Image();
        this._emojiImg.src = './pics/' + this.node.name.eval(this.scope).val + '.svg';
    }

    /**
     * This method is called in order to draw and redraw the object when manipulations are made
     */
    update(): void {
        let x = this.x;
        let y = this.y;
        let width = this.w;
        let height = this.h;
        this.ctx.beginPath();
        //var imgObj = new Image();
        //let ctx = this.canvas.getContext('2d');
        // this._emojiImg = new Image();
        // this._emojiImg.src = './pics/demoncow.png';
        //imgObj.onload = function(){
        //this._emojiImg.onload = function(){
        this.ctx.drawImage(this._emojiImg, this.x, this.y, width, height);
        //this._emojiImg.onload = function(){
        // this._emojiImg.width = width;
        // this._emojiImg.height = height;
        //}
        //}
        if (this.isSelected) {
            this.drawGuides(x, y, width, height, this.corner);
        }
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
        let xdif: number = mx - x;
        let ydif: number = my - y;
        /* Corner Guides */
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
        xdif = mx - (x + w / 2);
        ydif = my - y;
        if (Math.abs(xdif) <= 5 && Math.abs(ydif) <= 5) { //top middle
            return 5;
        }
        xdif = mx - (x + w);
        ydif = my - (y + h / 2);
        if (Math.abs(xdif) <= 5 && Math.abs(ydif) <= 5) { //middle right
            return 6;
        }
        xdif = mx - (x + w / 2);
        ydif = my - (y + h);
        if (Math.abs(xdif) <= 5 && Math.abs(ydif) <= 5) { //bottom middle
            return 7;
        }
        xdif = mx - x;
        ydif = my - (y + h / 2);
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
    drawGuides(x: number, y: number, w: number, h: number, corner: number) { //corner is 1,2,3 or 4
        this.ctx.beginPath();
        this.ctx.rect(x, y, w, h);
        this.ctx.strokeStyle = 'gray';
        this.ctx.stroke();
        if (corner !== 0 && corner <= 4) {
            switch (corner) { //colors the corner guide blue
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
        else if (corner !== 0) {
            switch (corner) { //colors the coremoji guide blue
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
     * If any of width or height is too small, it sets them equal to 10 and the other equal to
     * 10 divided or multiplied by the ratio of width/height to keep it the same.
     */
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

    /**
     * Changes the dimensions of the object when called.
     * If any of width or height is too small, it sets them equal to 10.
     */
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

        if (this.isSelectingMultiple) {
            if (contains) {
                this._x1 = this.x;
                this._y1 = this.y;
                this.isSelected = true;
                this.isDragging = true;
                this.dragOffX = this.mouse.x - x;
                this.dragOffY = this.mouse.y - y;
            }
            else {
                this.dragOffX = this.mouse.x - x;
                this.dragOffY = this.mouse.y - y;
                this.isDragging = true;
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

                this.corner = this.guideContains(this.mouse.x, this.mouse.y);
                this._height1 = this.h;
                this._width1 = this.w;
                //this._size1 = Math.sqrt(Math.pow(w,2) + Math.pow(h,2)); // size is diagonal length

                switch (this.corner) {
                    case 1:
                        this.initDistance = EffectUtils.calcDistance(this.mouse.x, this.mouse.y, x + w, y + h);
                        this.dragOffX = x + w;
                        this.dragOffY = y + h;
                        break;
                    case 2:
                        this.initDistance = EffectUtils.calcDistance(this.mouse.x, this.mouse.y, x, y + h);
                        this.dragOffX = x;
                        this.dragOffY = y + h;
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
                //this.initDistance = EffectUtils.calcDistance(this.mouse.x, this.mouse.y, x + w / 2, y + h / 2);
            } else if (guideContains > 4) { //changing shape dimensions
                this.isSelected = true;
                this.isChangingDims = true;
                this.corner = guideContains;

                switch (this.corner) {
                    case 5:
                        this.initDistance = EffectUtils.calcDistance(this.mouse.x, this.mouse.y, x + w / 2, y + h);
                        this.dragOffX = x + w / 2;
                        this.dragOffY = y + h;
                        break;
                    case 6:
                        this.initDistance = EffectUtils.calcDistance(this.mouse.x, this.mouse.y, x, y + h / 2);
                        this.dragOffX = x;
                        this.dragOffY = y + h / 2;
                        break;
                    case 7:
                        this.initDistance = EffectUtils.calcDistance(this.mouse.x, this.mouse.y, x + w / 2, y);
                        this.dragOffX = x + w / 2;
                        this.dragOffY = y;
                        break;
                    case 8:
                        this.initDistance = EffectUtils.calcDistance(this.mouse.x, this.mouse.y, x + w, y + h / 2);
                        this.dragOffX = x + w;
                        this.dragOffY = y + h / 2;
                        break;
                }
            } else if (contains) {
                this._x1 = x; // Saving original x and y
                this._y1 = y;

                this.scope.eventLog.push(this.logClick());
                this.isSelected = true;
                this.isDragging = true;

                this.dragOffX = this.mouse.x - x;
                this.dragOffY = this.mouse.y - y;
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
        if (this.isDragging && this.isSelected) {
            this.isDragging = false;
            if (Math.abs(this._x1 - this.x) > 1 || Math.abs(this._y1 - this.y) > 1) {
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

    /**
     * Logs an emoji paint event
     */
    logPaint(): LogEvent<any> {
        return new PaintEvent("emoji", this.x, this.y);
    }

    /**
     * Logs an emoji resize event
     */
    logResize(): LogEvent<any> {
        return new ResizeEvent(this);
    }

    /**
     * Logs an emoji click event
     */
    logClick(): LogEvent<any> {
        return new ClickEvent("emoji with ID " + this.id, this.x, this.y);
    }

    /**
     * Returns the image
     */
    get image(): HTMLImageElement {
        return this._emojiImg;
    }

    /**
     * Returns the name of this emoji
     */
    get name(): string {
        return this.node.name.eval(this.scope).val;
    }

    /**
     * Assembles a string for selection events
     */
    toSelString(): string {
        return " emoji with ID " + this.id + " at " + this.x + ", " + this.y;
    }

    /**
    * Assembles a string for drag events
    */
    toDragString(): string {
        return ("emoji with ID " + this.id + " from " + this._x1 + ", " + this._y1 + " to " + this.x + ", " + this.y);
    }

    /**
     * Assembles a string for ID assignment events
     */
    toIDString(): string {
        return (this.id + " to emoji at " + this.x + ", " + this.y);
    }
}
