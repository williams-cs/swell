import { Effect } from "./Effect";
import { NumberNode } from "../prims/NumberNode";
import { CurveNode } from "../shapes/CurveNode";
import { Expression } from "../Expression";
import { Scope } from "../structural/Scope";
import { PaintEvent } from "../logging/PaintEvent";
import { Dimensions } from "../structural/Dimensions";
import { LogEvent } from "../logging/LogEvent";
import { ResizeEvent } from "../logging/ResizeEvent";
import { DragEvent } from "../logging/DragEvent";
import { ClickEvent } from "../logging/ClickEvent";

export class CurveEffect implements Effect<CurveNode> {

    private _curve: CurveNode;
    private _dims: Dimensions;
    private _ctx: CanvasRenderingContext2D;
    private _canvas: HTMLCanvasElement;
    private _corner: number = 0;
    idObj: {readonly _id: number};

    private _isSelected: boolean = false; // private bools
    private _isDragging: boolean = false;
    private _isResizing: boolean = false;
    private _isChangingDims: boolean = false;
    private _isSelectingMultiple: boolean = false;

    private _justDragged = false;

    private _x1: number; // used to save coords for logging
    private _y1: number;
    private _curvature: number;
    private _width1: number; // saves size for logging
    private _height1: number;

    private _context: Scope;

    private _ratio: number = 0;
    private _dragoffx: number = 0;
    private _dragoffy: number = 0;
    private _initDistance: number = 0;
    private _mouse: {
        x: number,
        y: number
    } = {
        x: 0,
        y: 0
    };

    constructor(curve: CurveNode) {
        this._curve = curve;
    }

    /**
     * The method that is called when evaluating nodes (StringNode, EllipseNode, etc)
     * This method assigns all params to private variables and draws the initial object to the canvas
     * by calling update()
     * @param context The parent Scope that contains the canvas among other things
     * @param dims The object's dimensions including x and y position
     * @param ast Unnecessary now, used to be the parent AST
     */
    draw(context: Scope, dims: Dimensions, ast: Expression<any>): void {
        if (context.canvas.isDefined()) {
            this._dims = dims;
            this._canvas = context.canvas.get();
            this._context = context;
            let ctx = context.canvas.get().getContext("2d");
            this._ctx = ctx;
            this._ratio = this.w / this.h;
            this.update();
        }
        this._context.eventLog.push(this.logPaint());
        context.effects.push(this);
        this.addEventListeners();
    }

    /**
     * This method is called in order to draw and redraw the object when manipulations are made
     */
    update(): void {
        let x = this.x;
        let y = this.y;
        let width = this.w;
        let height = this.h;
        let curvature = this.curvature;
        this._ctx.beginPath();
        this._ctx.moveTo(x, y);
        let v = this.perpendicularVector(width, height);
        this._ctx.quadraticCurveTo((x + width/2) + curvature * v[0], (y + height/2) + curvature * v[1], x + width, y + height);
        this._ctx.strokeStyle = "#673AB7";
        this._ctx.stroke();
        if(this._isSelected) {
            this.drawGuides(x, y, width, height, this._corner);
        }
    }

    //a * w + b * h = 0
    perpendicularVector(w: number, h: number): [number,number] {
      if (w == 0 && h == 0) {
        return [0,0];
      } else if (w == 0) {
        return [1,0];
      } else if (h == 0) {
        return [0,1];
      }
      return [1, (-w)/h];
    }

    /**
     * Adds all the necessary event listeners in one fell swoop
     */
    addEventListeners(): void {
        this._canvas.addEventListener('mousemove', this.onMouseMove.bind(this)); // bind in order to maintain the meaning of 'this'
        this._canvas.addEventListener('mousedown', this.onMouseDown.bind(this));
        this._canvas.addEventListener('mouseup', this.onMouseUp.bind(this));
        window.addEventListener('keydown', this.onShiftDown.bind(this));
        window.addEventListener('keyup', this.onShiftUp.bind(this));
        window.addEventListener('mousedown', this.isMouseOutside.bind(this));
        //makes it so that double clicking doesn't select text on the page
        this._canvas.addEventListener('selectstart', function(e) { e.preventDefault(); return false; }, false);
    }

    /**
     * Removes all the necessary event listeners in another fell swoop
     */
    removeEventListeners(): void {
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
        if(mx > x && mx < x+w && my > y && my < y+h) {
            return true;
        }
        else return false;
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
        if(Math.abs(xdif) <= 5 && Math.abs(ydif) <= 5){ //top left
            return 1;
        }
        xdif = mx - (x + w);
        if(Math.abs(xdif) <= 5 && Math.abs(ydif) <= 5){ //top right
            return 2;
        }
        xdif = mx - (x + w);
        ydif = my - (y + h);
        if(Math.abs(xdif) <= 5 && Math.abs(ydif) <= 5){ //bottom right
            return 3;
        }
        xdif = mx - x;
        if(Math.abs(xdif) <= 5 && Math.abs(ydif) <= 5){ //bottom left
            return 4;
        }
        /* Middle Guides */
        xdif = mx - (x + w/2);
        ydif = my - y;
        if(Math.abs(xdif) <= 5 && Math.abs(ydif) <= 5){ //top middle
            return 5;
        }
        xdif = mx - (x + w);
        ydif = my - (y + h/2);
        if(Math.abs(xdif) <= 5 && Math.abs(ydif) <= 5){ //middle right
            return 6;
        }
        xdif = mx - (x + w/2);
        ydif = my - (y + h);
        if(Math.abs(xdif) <= 5 && Math.abs(ydif) <= 5){ //bottom middle
            return 7;
        }
        xdif = mx - x;
        ydif = my - (y + h/2);
        if(Math.abs(xdif) <= 5 && Math.abs(ydif) <= 5){ //middle left
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
    drawGuides(x: number, y: number, w: number, h: number, corner: number) { //corner is 1,2,3,4,5,6,7 or 8
        this._ctx.beginPath();
        this._ctx.rect(x, y, w, h);
        this._ctx.strokeStyle = 'gray';
        this._ctx.stroke();
        if(corner !== 0 && corner <= 4){ // a corner guide is selected
            switch (corner) { //colors the correct guide blue
                case 1:
                    this.drawSquare(x-2.5, y-2.5, 5, 5, 'blue'); // top left
                    this.drawSquare((x+w/2)-2.5, y-2.5, 5, 5, 'white'); // top middle
                    this.drawSquare(x+w-2.5, y-2.5, 5, 5, 'white'); // top right
                    this.drawSquare(x+w-2.5, (y+h/2)-2.5, 5, 5, 'white'); // middle right
                    this.drawSquare(x+w-2.5, y+h-2.5, 5, 5, 'white'); // bottom right
                    this.drawSquare((x+w/2)-2.5, y+h-2.5, 5, 5, 'white'); // bottom middle
                    this.drawSquare(x-2.5, y+h-2.5, 5, 5, 'white'); // bottom left
                    this.drawSquare(x-2.5, (y+h/2)-2.5, 5, 5, 'white'); // middle left
                    break;
                case 2:
                    this.drawSquare(x-2.5, y-2.5, 5, 5, 'white'); // top left
                    this.drawSquare((x+w/2)-2.5, y-2.5, 5, 5, 'white'); // top middle
                    this.drawSquare(x+w-2.5, y-2.5, 5, 5, 'blue'); // top right
                    this.drawSquare(x+w-2.5, (y+h/2)-2.5, 5, 5, 'white'); // middle right
                    this.drawSquare(x+w-2.5, y+h-2.5, 5, 5, 'white'); // bottom right
                    this.drawSquare((x+w/2)-2.5, y+h-2.5, 5, 5, 'white'); // bottom middle
                    this.drawSquare(x-2.5, y+h-2.5, 5, 5, 'white'); // bottom left
                    this.drawSquare(x-2.5, (y+h/2)-2.5, 5, 5, 'white'); // middle left
                    break;
                case 3:
                    this.drawSquare(x-2.5, y-2.5, 5, 5, 'white'); // top left
                    this.drawSquare((x+w/2)-2.5, y-2.5, 5, 5, 'white'); // top middle
                    this.drawSquare(x+w-2.5, y-2.5, 5, 5, 'white'); // top right
                    this.drawSquare(x+w-2.5, (y+h/2)-2.5, 5, 5, 'white'); // middle right
                    this.drawSquare(x+w-2.5, y+h-2.5, 5, 5, 'blue'); // bottom right
                    this.drawSquare((x+w/2)-2.5, y+h-2.5, 5, 5, 'white'); // bottom middle
                    this.drawSquare(x-2.5, y+h-2.5, 5, 5, 'white'); // bottom left
                    this.drawSquare(x-2.5, (y+h/2)-2.5, 5, 5, 'white'); // middle left
                    break;
                case 4:
                    this.drawSquare(x-2.5, y-2.5, 5, 5, 'white'); // top left
                    this.drawSquare((x+w/2)-2.5, y-2.5, 5, 5, 'white'); // top middle
                    this.drawSquare(x+w-2.5, y-2.5, 5, 5, 'white'); // top right
                    this.drawSquare(x+w-2.5, (y+h/2)-2.5, 5, 5, 'white'); // middle right
                    this.drawSquare(x+w-2.5, y+h-2.5, 5, 5, 'white'); // bottom right
                    this.drawSquare((x+w/2)-2.5, y+h-2.5, 5, 5, 'white'); // bottom middle
                    this.drawSquare(x-2.5, y+h-2.5, 5, 5, 'blue'); // bottom left
                    this.drawSquare(x-2.5, (y+h/2)-2.5, 5, 5, 'white'); // middle left
                    break;
            }
        }
        else if (corner !== 0) { // a middle guide is selected
            switch (corner) { //colors the correct guide blue
                case 5:
                    this.drawSquare(x-2.5, y-2.5, 5, 5, 'white'); // top left
                    this.drawSquare((x+w/2)-2.5, y-2.5, 5, 5, 'blue'); // top middle
                    this.drawSquare(x+w-2.5, y-2.5, 5, 5, 'white'); // top right
                    this.drawSquare(x+w-2.5, (y+h/2)-2.5, 5, 5, 'white'); // middle right
                    this.drawSquare(x+w-2.5, y+h-2.5, 5, 5, 'white'); // bottom right
                    this.drawSquare((x+w/2)-2.5, y+h-2.5, 5, 5, 'white'); // bottom middle
                    this.drawSquare(x-2.5, y+h-2.5, 5, 5, 'white'); // bottom left
                    this.drawSquare(x-2.5, (y+h/2)-2.5, 5, 5, 'white'); // middle left
                    break;
                case 6:
                    this.drawSquare(x-2.5, y-2.5, 5, 5, 'white'); // top left
                    this.drawSquare((x+w/2)-2.5, y-2.5, 5, 5, 'white'); // top middle
                    this.drawSquare(x+w-2.5, y-2.5, 5, 5, 'white'); // top right
                    this.drawSquare(x+w-2.5, (y+h/2)-2.5, 5, 5, 'blue'); // middle right
                    this.drawSquare(x+w-2.5, y+h-2.5, 5, 5, 'white'); // bottom right
                    this.drawSquare((x+w/2)-2.5, y+h-2.5, 5, 5, 'white'); // bottom middle
                    this.drawSquare(x-2.5, y+h-2.5, 5, 5, 'white'); // bottom left
                    this.drawSquare(x-2.5, (y+h/2)-2.5, 5, 5, 'white'); // middle left
                    break;
                case 7:
                    this.drawSquare(x-2.5, y-2.5, 5, 5, 'white'); // top left
                    this.drawSquare((x+w/2)-2.5, y-2.5, 5, 5, 'white'); // top middle
                    this.drawSquare(x+w-2.5, y-2.5, 5, 5, 'white'); // top right
                    this.drawSquare(x+w-2.5, (y+h/2)-2.5, 5, 5, 'white'); // middle right
                    this.drawSquare(x+w-2.5, y+h-2.5, 5, 5, 'white'); // bottom right
                    this.drawSquare((x+w/2)-2.5, y+h-2.5, 5, 5, 'blue'); // bottom middle
                    this.drawSquare(x-2.5, y+h-2.5, 5, 5, 'white'); // bottom left
                    this.drawSquare(x-2.5, (y+h/2)-2.5, 5, 5, 'white'); // middle left
                    break;
                case 8:
                    this.drawSquare(x-2.5, y-2.5, 5, 5, 'white'); // top left
                    this.drawSquare((x+w/2)-2.5, y-2.5, 5, 5, 'white'); // top middle
                    this.drawSquare(x+w-2.5, y-2.5, 5, 5, 'white'); // top right
                    this.drawSquare(x+w-2.5, (y+h/2)-2.5, 5, 5, 'white'); // middle right
                    this.drawSquare(x+w-2.5, y+h-2.5, 5, 5, 'white'); // bottom right
                    this.drawSquare((x+w/2)-2.5, y+h-2.5, 5, 5, 'white'); // bottom middle
                    this.drawSquare(x-2.5, y+h-2.5, 5, 5, 'white'); // bottom left
                    this.drawSquare(x-2.5, (y+h/2)-2.5, 5, 5, 'blue'); // middle left
                    break;
            }
        }
        else { //if no guides are selected, colors everything white
            this.drawSquare(x-2.5, y-2.5, 5, 5, 'white'); // top left
            this.drawSquare((x+w/2)-2.5, y-2.5, 5, 5, 'white'); // top middle
            this.drawSquare(x+w-2.5, y-2.5, 5, 5, 'white'); // top right
            this.drawSquare(x+w-2.5, (y+h/2)-2.5, 5, 5, 'white'); // middle right
            this.drawSquare(x+w-2.5, y+h-2.5, 5, 5, 'white'); // bottom right
            this.drawSquare((x+w/2)-2.5, y+h-2.5, 5, 5, 'white'); // bottom middle
            this.drawSquare(x-2.5, y+h-2.5, 5, 5, 'white'); // bottom left
            this.drawSquare(x-2.5, (y+h/2)-2.5, 5, 5, 'white'); // middle left
        }
    }

    /**
     * Simple method that draws a rectangle
     * @param x x coordinate for the top left corner of the rectangle
     * @param y y coordinate for the top left corner of the rectangle
     * @param w width of the rectangle
     * @param h height of the rectangle
     * @param color color of the rectangle's fill
     */
    drawSquare(x: number, y: number, w: number, h: number, color: string) {
        this._ctx.beginPath();
        this._ctx.fillStyle = color;
        this._ctx.fillRect(x, y, w, h);
        this._ctx.rect(x, y, w, h);
        this._ctx.strokeStyle = 'gray';
        this._ctx.stroke();
    }

    /**
     * Called whenever the mouse moves within the canvas.
     * Gets the mouse position, calls the modify methods if the booleans satisfy them.
     * @param event the mousemove event
     */
    onMouseMove(event: any): void {
        this.getMousePosition();
        if(this._isDragging && this._isSelected) {
            this.modifyDrag();
        }
        else if(this._isResizing && this._isSelected) {
            this.modifyResize(this.w < 10, this.h < 10);
        }
        else if(this._isChangingDims && this._isSelected) {
            this.modifyChangeDims(this.w < 10, this.h < 10);
        }
    }

    /**
     * Called whenever the mouse clicks inside the canvas.
     * Modifies the state depending on whether the guides contain the mouse or the bounding rect contains the mouse.
     * @param event the mousedown event
     */
    onMouseDown(event: any): void {
        this.modifyState(this.guideContains(this._mouse.x, this._mouse.y), this.contains(this._mouse.x, this._mouse.y));
    }

    /**
     * Called whenever the mouse unclicks.
     * Calls modifyReset to reset dragging and resizing booleans among others.
     * @param event the mouseup event
     */
    onMouseUp(event: any) {
        this.modifyReset();
    }

    /**
     * Called whenever a key is pressed down
     * Toggles the isSelectingMultiple boolean if the key pressed is the shift key
     * @param event the keydown event
     */
    onShiftDown(event: any) {
        if(event.keyCode == "16") { //shift keycode
            this._isSelectingMultiple = true;
        }
    }

    /**
     * Called whenever a key is released
     * Toggles the isSelectingMultiple boolean if the key released is the shift key
     * @param event the keydown event
     */
    onShiftUp(event: any) {
        if(event.keyCode == "16") { //shift keycode
            this._isSelectingMultiple = false;
        }
    }

    /* Modification functions */

    /**
     * Changes the x and y coordinates of the object in order to drag the object.
     */
    modifyDrag(): void {
        this._dims.x.eval(this._context).val = this._mouse.x - this._dragoffx;
        this._dims.y.eval(this._context).val = this._mouse.y - this._dragoffy;
    }

    /**
     * Changes the size of the object when called (when a corner guide is clicked and dragged).
     *
     * If any of width or height is too small, it sets them equal to 10 and the other equal to
     * 10 divided or multiplied by the ratio of width/height to keep it the same.
     *
     * The work of changing the size is done by calling the helper method modifyResizeHelper.
     * @param widthTooSmall true if the width dimension is < 10
     * @param heightTooSmall true if the height dimension is < 10
     */
    modifyResize(widthTooSmall: boolean, heightTooSmall: boolean): void {
        if(widthTooSmall) {
            this._dims.width.eval(this._context).val = 10;
            this._curve.dx = new NumberNode(10); // set for the prodirect manipulation
            this._dims.height.eval(this._context).val = 10 / this._ratio;
            this._curve.dy = new NumberNode(Math.round(10 / this._ratio));
            let newDistance = distance(this._mouse.x, this._mouse.y, this._dragoffx, this._dragoffy);
            if(newDistance - this._initDistance > 0) {
                this.modifyResizeHelper(newDistance);
            }
        }
        if(heightTooSmall) {
            this._dims.height.eval(this._context).val = 10;
            this._curve.dy = new NumberNode(10); // set for the prodirect manipulation
            this._dims.width.eval(this._context).val = 10 * this._ratio;
            this._curve.dx = new NumberNode(Math.round(10 * this._ratio));
            let newDistance = distance(this._mouse.x, this._mouse.y, this._dragoffx, this._dragoffy);
            if(newDistance - this._initDistance > 0){
                this.modifyResizeHelper(newDistance);
            }
        }
        else {
            let newDistance = distance(this._mouse.x, this._mouse.y, this._dragoffx, this._dragoffy);
            this.modifyResizeHelper(newDistance);
        }
    }

    /**
     * Does the work of changing the size of the object.
     *
     * Since the rectangle originates from the top left corner and not the center,
     * it changes the x and y coordinates as well if guides 1, 2, or 4 are selected
     *
     * @param newDistance the distance between the mouse and the location opposite to it
     * (if top right guide is clicked, the distance between that and the bottom left guide is newDistance)
     */
    modifyResizeHelper(newDistance: number): void {
        if(this.w > 10 && this.h > 10) {
            switch (this._corner) {
                case 1:
                    this._dims.y.eval(this._context).val -= Math.round((newDistance - this._initDistance) / this._ratio);
                    this._dims.x.eval(this._context).val -= Math.round(newDistance - this._initDistance);
                break;
                case 2:
                    this._dims.y.eval(this._context).val -= Math.round((newDistance - this._initDistance) / this._ratio);
                break;
                case 4:
                    this._dims.x.eval(this._context).val -= Math.round(newDistance - this._initDistance);
                break;
            }
        }
        this._dims.width.eval(this._context).val += newDistance - this._initDistance;
        this._curve.dx = new NumberNode(Math.round(this.w));
        this._dims.height.eval(this._context).val += (newDistance - this._initDistance) / this._ratio;
        this._curve.dy = new NumberNode(Math.round(this.h));
        this._initDistance = newDistance;
    }

    /**
     * Changes the dimensions of the object when called.
     * If any of width or height is too small, it sets them equal to 10.
     * Calls modifyChangeDimsHelper to actually do the work
     * @param widthTooSmall true if the width dimension is < 10
     * @param heightTooSmall true if the height dimension is < 10
     */
    modifyChangeDims(widthTooSmall: boolean, heightTooSmall: boolean): void {
        let newDistance = distance(this._mouse.x, this._mouse.y, this._dragoffx, this._dragoffy);
        if(widthTooSmall) {
            this._dims.width.eval(this._context).val = 10;
            this._curve.dx = new NumberNode(10);
            if(newDistance - this._initDistance > 0){
                this.modifyChangeDimsHelper();
            }
        }
        if(heightTooSmall) {
            this._dims.height.eval(this._context).val = 10;
            this._curve.dy = new NumberNode(10);
            if(newDistance - this._initDistance > 0){
                this.modifyChangeDimsHelper();
            }
        }
        else {
            this.modifyChangeDimsHelper();
        }
    }

    /**
     * Does the work of changing the size of the object.
     *
     * Since the rectangle originates from the top left corner and not the center,
     * it changes the x and y coordinates as well if guides 5 or 8 are selected
     */
    modifyChangeDimsHelper(): void {
        let newDistance = distance(this._mouse.x, this._mouse.y, this._dragoffx, this._dragoffy);
        switch (this._corner) {
            case 5:
                if(this.h > 10) { //as long as the height is > 10
                    this._dims.y.eval(this._context).val -= Math.round(newDistance - this._initDistance);
                }
                this._dims.height.eval(this._context).val += newDistance - this._initDistance;
                this._curve.dy = new NumberNode(Math.round(this.h));
                this._ratio = this.w / this.h;
                this._initDistance = newDistance;
            break;
            case 6:
                this._dims.width.eval(this._context).val += newDistance - this._initDistance;
                this._curve.dx = new NumberNode(Math.round(this.w));
                this._ratio = this.w / this.h;
                this._initDistance = newDistance;
            break;
            case 7:
                this._dims.height.eval(this._context).val += newDistance - this._initDistance;
                this._curve.dy = new NumberNode(Math.round(this.h));
                this._ratio = this.w / this.h;
                this._initDistance = newDistance;
            break;
            case 8:
                if(this.w > 10) { // as long as width is > 10
                    this._dims.x.eval(this._context).val -= Math.round(newDistance - this._initDistance);
                }
                this._dims.width.eval(this._context).val += newDistance - this._initDistance;
                this._curve.dx = new NumberNode(Math.round(this.w));
                this._ratio = this.w / this.h;
                this._initDistance = newDistance;
            break;
        }
    }

    /**
     * Toggles all of the private booleans depending on the mouse position when called (onMouseDown)
     * e.g. if the mouse is within the bounding rectangle when this is called, isSelected = true
     * @param guideContains
     * @param contains
     */
    modifyState(guideContains: number, contains: boolean): void {
        this._justDragged = false;
        let x: number = this.x;
        let y: number = this.y;
        let w: number = this.w;
        let h: number = this.h;
        if (this._isSelectingMultiple) { //prepares the object for dragging whether it is personally selected or not
            if (contains) {
                this._x1 = this.x;
                this._y1 = this.y;
                this._isSelected = true;
                this._isDragging = true;
                this._dragoffx = this._mouse.x - x;
                this._dragoffy = this._mouse.y - y;
            }
            else {
                this._dragoffx = this._mouse.x - x;
                this._dragoffy = this._mouse.y - y;
                this._isDragging = true;
            }
        }
        else if(guideContains > 0 && guideContains <= 4) { //resizing
            this._isSelected = true;
            this._isResizing = true;

            this._context.eventLog.push(this.logClick());

            this._corner = this.guideContains(this._mouse.x, this._mouse.y);
            this._height1 = this.h;
            this._width1 = this.w;
            //this._size1 = Math.sqrt(Math.pow(w,2) + Math.pow(h,2)); // size is diagonal length

            switch (this._corner) { // sets the offsets depending on which corner is selected
                case 1: // top left
                    this._initDistance = distance(this._mouse.x, this._mouse.y, x + w, y + h);
                    this._dragoffx = x + w; // offset is bottom right
                    this._dragoffy = y + h;
                break;
                case 2: // top right
                    this._initDistance = distance(this._mouse.x, this._mouse.y, x, y + h);
                    this._dragoffx = x;
                    this._dragoffy = y + h; // offset is bottom left, etc
                break;
                case 3:
                    this._initDistance = distance(this._mouse.x, this._mouse.y, x, y);
                    this._dragoffx = x;
                    this._dragoffy = y;
                break;
                case 4:
                    this._initDistance = distance(this._mouse.x, this._mouse.y, x + w, y);
                    this._dragoffx = x + w;
                    this._dragoffy = y;
                break;
            }
        }
        else if(guideContains > 4){ //changing shape dimensions
            this._isSelected = true;
            this._isChangingDims = true;
            this._corner = guideContains;

            switch (this._corner) { // sets the offsets depending on which middle guide is selected
                case 5: // top middle
                    this._initDistance = distance(this._mouse.x, this._mouse.y, x + w / 2, y + h);
                    this._dragoffx = x + w / 2; // offset is bottom middle
                    this._dragoffy = y + h;
                break;
                case 6: //right middle
                    this._initDistance = distance(this._mouse.x, this._mouse.y, x, y + h / 2);
                    this._dragoffx = x;
                    this._dragoffy = y + h / 2; // offset is left middle etc
                break;
                case 7:
                    this._initDistance = distance(this._mouse.x, this._mouse.y, x + w / 2, y);
                    this._dragoffx = x + w / 2;
                    this._dragoffy = y;
                break;
                case 8:
                    this._initDistance = distance(this._mouse.x, this._mouse.y, x + w, y + h / 2);
                    this._dragoffx = x + w;
                    this._dragoffy = y + h / 2;
                break;
            }
        }
        else if (contains) { // dragging
            this._x1 = x; // Saving original x and y
            this._y1 = y;

            this._context.eventLog.push(this.logClick());
            this._isSelected = true;
            this._isDragging = true;

            this._dragoffx = this._mouse.x - x;
            this._dragoffy = this._mouse.y - y;
        }
        else if (!this._isSelectingMultiple) { // not selected
            this._isSelected = false;
            this._isDragging = false;
        }
    }

    /**
     * Resets all of the private booleans to false (like dragging, resizing, etc) when the mouse is released
     */
    modifyReset(): void {
        if(this._isDragging && this._isSelected){
            this._isDragging = false;
            if(Math.abs(this._x1 - this.x) > 1 || Math.abs(this._y1 - this.y) > 1) {
                this._justDragged = true;
            }
        } else if ((this._isResizing || this._isChangingDims) && this._isSelected){
            this._isResizing = false;
            let size2 = Math.sqrt(Math.pow(this.w,2) + Math.pow(this.h,2));
            if((Math.abs(this._width1 - this.w) > 0) || (Math.abs(this._height1 - this.h) > 0)){
                this._context.eventLog.push(this.logResize());
            }
        }
        this._isDragging = false;
        this._isResizing = false;
        this._isChangingDims = false;
        this._corner = 0;
    }

    /**
     * Gets the current x and y coordinates of the mouse
     */
    getMousePosition(): void {
        this._mouse.x = getMousePos(this._canvas, event).x;
        this._mouse.y = getMousePos(this._canvas, event).y;
    }

    /**
     * Sets isDragging, isResizing, isChangingDims, and isSelected to false if the mouse clicks outside of the canvas
     * @param event the mousedown event
     */
    isMouseOutside(event: any): void {
        let mouseX = event.clientX;
        let mouseY = event.clientY;
        let rect = this._canvas.getBoundingClientRect();
        if(mouseX < rect.left || mouseX > rect.right || mouseY < rect.top || mouseY > rect.bottom) {
            this._isDragging = false;
            this._isResizing = false;
            this._isChangingDims = false;
            this._isSelected = false;
            this._corner = 0;
        }
    }

    /**
     * Logs a rectangle paint event
     */
    logPaint(): LogEvent<any> {
        return new PaintEvent("rectangle", this.x, this.y);
    }

    /**
     * Logs a rectangle resize event
     */
    logResize(): LogEvent<any> {
        return new ResizeEvent("rectangle with ID " + this.getID().toString(), Math.round(this._width1*100)/100, Math.round(this._height1*100)/100, Math.round(this.w*100)/100, Math.round(this.h*100)/100);
    }

    /**
     * Logs a rectangle click event
     */
    logClick(): LogEvent<any>{
        return new ClickEvent("rectangle with ID " + this.getID().toString(), this.x, this.y);
    }

    /**
     * Initializes and assigns an ID to an object
     * @param id The ID to be assigned
     */
    initID(id: number){
        this.idObj = {_id: id};
    }

    ast(): Expression<CurveNode> {
        throw new Error("Method not implemented.");
    }

    /**
     * Returns the x position of the rect
     */
    get x(): number {
        return this._dims.x.eval(this._context).val;
    }
    /**
     * Returns the y position of the rect
     */
    get y(): number {
        return this._dims.y.eval(this._context).val;
    }
    /**
     * Returns the width of the rect
     */
    get w(): number {
        return this._dims.width.eval(this._context).val;
    }
    /**
     * Returns the height of the rect
     */
    get h(): number {
        return this._dims.height.eval(this._context).val;
    }
    /**
     * Returns the curvature of the curve
     */
    get curvature(): number {
        return this._dims.curvature.eval(this._context).val;
    }

    /**
     * Returns the Dimensions object
     */
    get dims(): Dimensions {
        return this._dims;
    }

    /**
     * Returns whether or not the rect is selected
     */
    get selected(): boolean {
        return this._isSelected;
    }

    /**
     * Returns the ID of the rect
     */
    getID(): number {
        return this.idObj._id;
    }

    /**
     * Returns whether or not the rect has just been dragged
     */
    getJustDragged(): boolean {
        return this._justDragged;
    }
    /**
     * Sets whether or not the rect has just been dragged
     * @param val The value to be assigned
     */
    setJustDragged(val: boolean) {
        this._justDragged = val;
    }

    /**
     * Returns whether or not the rect is dragging
     */
    get isDragging(): boolean {
        return this._isDragging;
    }

    /**
     * Assembles a string for selection events
     */
    toSelString(): string{
        return " rectangle with ID " + this.getID().toString() + " at " + this.x + ", " + this.y;
    }

    /**
    * Assembles a string for drag events
    */
    toDragString(): string{
        return("rectangle with ID " + this.getID().toString() + " from " + this._x1 + ", " + this._y1 + " to " + this.x + ", " + this.y);
    }

    /**
     * Assembles a string for ID assignment events
     */
    toIDString(): string {
        return (this.idObj._id.toString() + " to rectangle at " + this.x + ", " + this.y);
    }
}

/**
 * Gets the mouse x and y coordinates in relation to the canvas
 * @param canvas the canvas object
 * @param event the mousemove event
 */
function getMousePos(canvas: any, event: any): {x: number, y: number} {
    let rect = canvas.getBoundingClientRect();
    return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
    };
}

/**
 * Computes the distance between two points
 * @param x1 x coordinate of first point
 * @param y1 y coordinate of first point
 * @param x2 x coordinate of second point
 * @param y2 y coordinate of second point
 */
function distance(x1: number, y1: number, x2: number, y2: number) {
    return Math.sqrt(Math.pow(x1 - x2,2) + Math.pow(y1 - y2,2));
}
