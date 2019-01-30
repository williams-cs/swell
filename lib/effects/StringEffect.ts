import { Effect } from "./Effect";
import { StringNode } from "../prims/StringNode";
import { Expression } from "../Expression";
import { Scope } from "../structural/Scope";
import { Dimensions } from "../structural/Dimensions";
import { PrintNode } from "../structural/PrintNode";
import { PaintEvent } from "../logging/PaintEvent";
import { DragEvent } from "../logging/DragEvent";
import { ResizeEvent } from "../logging/ResizeEvent";
import { LogEvent } from "../logging/LogEvent";
import { ClickEvent } from "../logging/ClickEvent";
import { SelectEvent } from "../logging/SelectEvent";
import { EffectUtils } from "./EffectUtils";

export class StringEffect extends Effect<StringNode> {

    private _fontSize: number = 20;
    private _x1: number; // Original position for drag logging
    private _y1: number;
    private _size1: number; // Original scale for resize logging
    private _isEditing: boolean = false;
    private _isListening: boolean = false;

    private _textMetrics: { // all the details of the text on the canvas
        width: number,
        interval: number,
        initMousePos: number,
        cursorPos: number
    } = {
            width: 0,
            interval: 0,
            initMousePos: 0,
            cursorPos: 0
        }

    /**
     * This method is called in order to draw and redraw the object when manipulations are made
     */
    update(): void {
        let fontDeets: string = this._fontSize + "px Courier New";
        this.ctx.font = fontDeets;
        this.ctx.fillStyle = "#673AB7";
        this.ctx.fillText(this.node.val, this.x, this.y);
        this._textMetrics.width = this.ctx.measureText(this.node.val).width;
        this._textMetrics.interval = this._textMetrics.width != 0 ? this._textMetrics.width / this.node.val.length : 0;
        if (this.isSelected) {
            this.drawTextGuides(this.x, this.y - this._fontSize, this._textMetrics.width, this._fontSize, this.corner);
        }
        if (this._isEditing) {
            this.modifyTextCursor();
        }
    }

    /**
     * Returns true if the mouse is inside of the object's bounding rectangle, false if otherwise
     * @param mx the mouse x coordinate
     * @param my the mouse y coordinate
     */
    contains(mx: number, my: number): boolean {
        return (this.x <= mx) && (this.x + this._textMetrics.width >= mx) &&
            (this.y - this._fontSize <= my) && (this.y >= my);
    }

    /**
     * Returns a number > 0 if the mouse is inside one of the corner/side guides, returns 0 if not
     * The corner guides are numbered 1-4 with 1 being the top left, 2 being the top right, and so on.
     * The middle guides are numbered 5-8, with 5 being the top middle, 6 being the right middle, and so on.
     * @param mx the mouse x coordinate
     * @param my the mouse y coordinate
     */
    guideContains(mx: number, my: number): number {
        let xdif = mx - (this.x + this._textMetrics.width);
        let ydif = my - (this.y - this._fontSize);
        if (Math.abs(xdif) <= 5 && Math.abs(ydif) <= 5) {
            this._isEditing = false;
            return 2;
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
    drawTextGuides(x: number, y: number, w: number, h: number, corner: number) { //corner is 2 or 0
        this.ctx.beginPath();
        this.ctx.rect(x, y, w, h);
        this.ctx.strokeStyle = 'gray';
        this.ctx.stroke();
        if (corner !== 0) {
            switch (corner) { //colors the guide blue if selected
                case 2:
                    this.drawSquare(x + w - 2.5, y - 2.5, 5, 5, 'blue');
                    break;
            }
        }
        else {
            this.drawSquare(x + w - 2.5, y - 2.5, 5, 5, 'white');
        }
    }

    /* Event listener functions */

    /**
     * Called whenever the mouse moves within the canvas.
     * Gets the mouse position, calls the modify methods if the booleans satisfy them.
     * @param event the mousemove event
     */
    onMouseMove(event: any): void {
        this.getMousePosition(event);
        if (this.isSelected && this.isDragging) {
            //console.log(this.node.val + " is being dragged.");
            this.modifyDrag();
        }
        else if (this.isResizing && this.isSelected) {
            this.modifyResize();
        }
    }

    /**
     * Called whenever the mouse clicks inside the canvas.
     * Modifies the state depending on whether the guides contain the mouse or the bounding rect contains the mouse.
     * @param event the mousedown event
     */
    onMouseDown(event: any): void {
        if (!this.isSelectingMultiple && this.isSelected && this.contains(this.mouse.x, this.mouse.y)) { //text editing
            if (!this._isListening) {
                window.addEventListener('keydown', this.modifyText.bind(this));
            }
            this._isListening = true;
            this._isEditing = true;
            this.isDragging = false;
            //console.log(this.node.val + " is setting dragging to false");
            this._textMetrics.initMousePos = this.mouse.x;
            this.modifyTextCursor();
        } else if (!this.isSelectingMultiple) {
            this.isSelected = false;
            this._isEditing = false;
        } else {
            this._isEditing = false;
        }
        this.modifyState();
    }

    /* Modification functions */

    modifyChangeDims(): void { }

    /**
     * Creates and moves the text edit cursor based on where the mouse is clicked
     */
    modifyTextCursor(): void {
        let xDif: number = this._textMetrics.initMousePos - this.x; // difference between mouse x and left wall
        let interval: number = this._textMetrics.interval;
        this._textMetrics.cursorPos = interval != 0 ? interval * Math.round(xDif / interval) : 0;
        let moveFactor: number = this._textMetrics.cursorPos + this.x;
        this.ctx.moveTo(moveFactor, this.y - this._fontSize);
        this.ctx.lineTo(moveFactor, this.y);
        this.ctx.strokeStyle = "grey";
        this.ctx.stroke();
    }

    /**
     * This edits the string when editing text
     * @param event keydown event
     */
    modifyText(event: any): void {
        if (!this._isEditing) {
            return;
        }
        let interval: number = this._textMetrics.interval;
        let breakPoint: number = interval != 0 ? this._textMetrics.cursorPos / interval : 0;
        let firstHalf: string = this.node.val.substring(0, breakPoint);
        let secondHalf: string = this.node.val.substring(breakPoint);

        switch (event.keyCode) {
            case 37: // Arrow left
                if (this._textMetrics.initMousePos > this.x + interval / 2) {
                    this._textMetrics.initMousePos -= interval;
                    this.modifyTextCursor();
                }
                break;
            case 39: // Arrow right
                if (this._textMetrics.initMousePos < this.x + this._textMetrics.width) {
                    this._textMetrics.initMousePos += interval;
                    this.modifyTextCursor();
                }
                break;
            case 8: // Backspace
                if (this._textMetrics.cursorPos > 0) {
                    firstHalf = firstHalf.substring(0, firstHalf.length - 1);
                    this.node.str = firstHalf + secondHalf;
                    this._textMetrics.initMousePos -= interval;
                    this.modifyTextCursor();
                }
                event.preventDefault(); // Backspacing on Firefox will go back to a previous page
                break;
            case 46: // Del
                secondHalf = secondHalf.substring(1, secondHalf.length);
                this.node.str = firstHalf + secondHalf;
                break;
            default:
                let keyName = event.key;
                if (keyName.length == 1) {
                    firstHalf += keyName;
                    this.node.str = firstHalf + secondHalf;
                    if (interval == 0) {
                        interval = this.ctx.measureText(this.node.val).width / this.node.val.length;
                    }
                    this._textMetrics.initMousePos += interval;
                    this.modifyTextCursor();
                }
        }
    }

    /**
     * Modifies the font size of the text
     * If the text font is smaller than 15pt, it set's it equal to 15pt
     * @param isTooSmall true if the font size is < 15
     */
    modifyResize(): void {
        if (this._fontSize < 15) {
            this._fontSize = 15;
            let newDistance = EffectUtils.calcDistance(this.mouse.x, this.mouse.y, this.dragOffX, this.dragOffY);
            if (newDistance - this.initDistance > 0) {
                this._fontSize += (newDistance - this.initDistance) * 0.2;
                this.initDistance = newDistance;
            }
        } else {
            let newDistance = EffectUtils.calcDistance(this.mouse.x, this.mouse.y, this.dragOffX, this.dragOffY);
            this._fontSize += (newDistance - this.initDistance) * 0.2;
            this.initDistance = newDistance;
        }
    }

    modifyState(): void {
        let guideContains: boolean = this.guideContains(this.mouse.x, this.mouse.y) > 0;
        let contains: boolean = this.contains(this.mouse.x, this.mouse.y);
        this.justDragged = false;
        this.justResized = false;

        if (this.isSelectingMultiple) { //prepares the object for dragging whether it is personally selected or not
            if (contains) {
                this._x1 = this.x;
                this._y1 = this.y;
                this.isSelected = true;
                this.isDragging = true;
                this.dragOffX = this.mouse.x - this.x;
                this.dragOffY = this.mouse.y - this.y;
            }
            else {
                this.dragOffX = this.mouse.x - this.x;
                this.dragOffY = this.mouse.y - this.y;
                this.isDragging = true;
            }

            // if(this.scope.mulSelected.mulSel){
            //     console.log("string effect mulSelected: " + this.scope.mulSelected.mulSel);
            //     //if(this.scope.mulSelected.val){
            //     this.scope.eventLog.push(this.logSelected());
            //     //this.logSelected();
            // }

        } else if (guideContains || contains) {
            let effects = this.scope.effects;
            let curID = this.id;
            for (let effect of effects) {
                let effectID = effect.id;
                if (effectID == curID) {
                    continue;
                } else if (effectID > curID && (effect.guideContains(this.mouse.x, this.mouse.y) > 0 || effect.contains(this.mouse.x, this.mouse.y))) {
                    this.isSelected = false;
                    this.isDragging = false;
                    this._isEditing = false;
                    return;
                }
            }

            if (guideContains) { //if the corner guides contain the mouse we are resizing
                this.isSelected = true;
                this.corner = this.guideContains(this.mouse.x, this.mouse.y);

                this.scope.eventLog.push(this.logClick());

                //console.log(this.node.val + "is selected?" + this._selected);
                //console.log("state selection is " + this.node.val);

                this.dragOffX = this.x;
                this.dragOffY = this.y;
                this.initDistance = EffectUtils.calcDistance(this.mouse.x, this.mouse.y, this.x, this.y);
                this.isResizing = true;
                this._size1 = this._fontSize; // saving old font size

            } else if (contains) {
                this._x1 = this.x; // Saving original x and y
                this._y1 = this.y;
                this.isSelected = true;

                this.scope.eventLog.push(this.logClick());

                //console.log(this.node.val + "is selected?" + this._selected);
                //console.log("state selection is " + this.node.val);

                this.dragOffX = this.mouse.x - this.x;
                this.dragOffY = this.mouse.y - this.y;
                if (!this._isEditing) {
                    this.isDragging = true;
                    //console.log(this.node.val + " is dragging? " + this.isDragging);
                }
            }

        } else if (!this.isSelectingMultiple) {
            this.isSelected = false;
            this.isDragging = false;
            this._isEditing = false;
        }
    }

    /**
     * Resets all of the private booleans to false (like dragging, resizing, etc) when the mouse is released
     */
    modifyReset(): void {
        if (this.isDragging && this.isSelected) {
            //console.log(this.node.val + " logging drag");
            this.isDragging = false;
            if (Math.abs(this._x1 - this.x) > 1 || Math.abs(this._y1 - this.y) > 1) {
                this.justDragged = true;
                //this.scope.eventLog.push(this.logMove());
            }
        } else if (this.isResizing && this.isSelected) {
            //console.log(this.node.val + " logging resize");
            this.isResizing = false;
            if (Math.abs(this._size1 - this._fontSize) > 0) {
                this.justResized = true;
            }
        }
        this.isDragging = false;
        this.isResizing = false;
        this.corner = 0;

        // console.log("string effect mulSelected: " + this.scope.mulSelected.val);
        // if(this.scope.mulSelected.val){
        //     this.logSelected();
        // }
        // if(this.isMultipleSelected){
        //     context.eventLog.push(new SelectEvent(selectedElems));
        //     masterLog.push(context.eventLog[context.eventLog.length - 1]);
        //     //console.log("multiple selected");
        // }
        // //this.scope.eventLog.push(this.logMove());
    }

    /**
     * Logs a paint event
     */
    logPaint(): LogEvent<any> {
        return new PaintEvent(this.node.val, this.x, this.y);
    }

    /**
     * Logs a resize event
     */
    logResize(): LogEvent<any> {
        return new ResizeEvent(this);
    }

    /**
     * Logs a click event
     */
    logClick(): LogEvent<any> {
        return new ClickEvent(this.node.val + " with ID " + this.id, this.x, this.y);
    }

    /**
     * Returns the string
     */
    get str(): string {
        return this.node.val;
    }

    /**
     * Assembles a string for selection events
     */
    toSelString(): string {
        return " " + this.node.val + " with ID " + this.id + " at " + this.x + ", " + this.y;
    }

    /**
    * Assembles a string for drag events
    */
    toDragString(): string {
        return (this.node.val + " with ID " + this.id + " from " + this._x1 + ", " + this._y1 + " to " + this.x + ", " + this.y);
    }

    /**
     * Assembles a string for ID assignment events
     */
    toIDString(): string {
        return (this.id + " to " + this.node.val + " at " + this.x + ", " + this.y);
    }
}
