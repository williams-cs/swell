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

export class EllipseEffect implements Effect<EllipseNode> {

    private _circle: EllipseNode;
    private _dims: Dimensions;
    private _ast: Expression<any>;
    private _ctx: CanvasRenderingContext2D;
    private _canvas: HTMLCanvasElement;

    private _corner: number = 0;
    private _isSelected: boolean = false; // Private bools
    private _isDragging: boolean = false;
    private _isResizing: boolean = false;
    private _isChangingDims: boolean = false;
    private _isSelectingMultiple: boolean = false;

    private _justDragged: boolean = false; // Has this object just been dragged?

    private _x1: number; // used to save coords for logging
    private _y1: number;
    private _width1: number; // saves size for logging
    private _height1: number;

    idObj: {readonly _id: number};

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

    constructor(circle: EllipseNode) {
        this._circle = circle;
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
        // logging
        this._context.eventLog.push(this.logPaint());
        context.effects.push(this);
        this.addEventListeners();

    }

    /**
     * This method is called in order to draw and redraw the object when manipulations are made
     */
    update(): void {
        let x: number = this.x;
        let y: number = this.y;
        let w: number = this.w;
        let h: number = this.h;
        this._ctx.beginPath();
        this._ctx.ellipse(x, y, w/2, h/2, 0, 0, Math.PI * 2, false);
        //this._ctx.strokeStyle = "black";
        //this._ctx.stroke();
        this._ctx.fillStyle = "##d5b8ff";
        this._ctx.shadowColor = "#6C6C6C";
        this._ctx.shadowBlur = 15;
        //this._ctx.shadowOffsetX = 2;
        //this._ctx.shadowOffsetY = 2;
        this._ctx.fill();

        if(this._isSelected) {
            this.drawGuides(x - w/2, y - h/2, w, h, this._corner);
        }
    }
/*
    private mouseMove = this.onMouseMove.bind(this);
    private mouseDown = this.onMouseDown.bind(this);
    private mouseUp = this.onMouseUp.bind(this);
    private shiftDown = this.onShiftDown.bind(this);
    private shiftUp = this.onShiftUp.bind(this);
    private mouseOutside = this.isMouseOutside.bind(this);
    private selectStart = function(e:any) { e.preventDefault(); return false; };
*/
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
        this._canvas.addEventListener('selectstart', function(e:any) { e.preventDefault(); return false; }, false);
    }


    removeEventListeners(): void {
      /*
      console.log("removing EventListners");
        this._canvas.removeEventListener('mousemove', this.mouseMove); // bind in order to maintain the meaning of 'this'
        this._canvas.removeEventListener('mousedown', this.mouseDown);
        this._canvas.removeEventListener('mouseup', this.mouseUp);
        window.removeEventListener('keydown', this.shiftDown);
        window.removeEventListener('keyup', this.shiftUp);
        window.removeEventListener('mousedown', this.mouseOutside);
        //makes it so that double clicking doesn't select text on the page
        this._canvas.removeEventListener('selectstart', this.selectStart, false);
        */
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
        return Math.pow(mx - x, 2)/Math.pow(w/2, 2) + Math.pow(my - y, 2)/Math.pow(h/2, 2) <= 1;
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
        let xdif: number = mx - (x - w/2);
        let ydif: number = my - (y - h/2);
        /* Corner Guides */
        if(Math.abs(xdif) <= 5 && Math.abs(ydif) <= 5){ //top left
            return 1;
        }
        xdif = mx - (x + w/2);
        if(Math.abs(xdif) <= 5 && Math.abs(ydif) <= 5){ //top right
            return 2;
        }
        xdif = mx - (x + w/2);
        ydif = my - (y + h/2);
        if(Math.abs(xdif) <= 5 && Math.abs(ydif) <= 5){ //bottom right
            return 3;
        }
        xdif = mx - (x - w/2);
        if(Math.abs(xdif) <= 5 && Math.abs(ydif) <= 5){ //bottom left
            return 4;
        }
        /* Middle Guides */
        xdif = mx - x;
        ydif = my - (y - h/2);
        if(Math.abs(xdif) <= 5 && Math.abs(ydif) <= 5){ //top middle
            return 5;
        }
        xdif = mx - (x + w/2);
        ydif = my - y;
        if(Math.abs(xdif) <= 5 && Math.abs(ydif) <= 5){ //middle right
            return 6;
        }
        xdif = mx - x;
        ydif = my - (y + h/2);
        if(Math.abs(xdif) <= 5 && Math.abs(ydif) <= 5){ //bottom middle
            return 7;
        }
        xdif = mx - (x - w/2);
        ydif = my - y;
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
    drawGuides(x: number, y: number, w: number, h: number, corner: number) { //corner is 1,2,3 or 4 for corner guides, 5,6,7 or 8 for side guides
        this._ctx.beginPath();
        this._ctx.rect(x, y, w, h);
        this._ctx.strokeStyle = 'gray';
        this._ctx.stroke();
        if(corner !== 0 && corner <= 4){
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
        else if (corner !== 0 && corner > 4) {
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
        else {
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
        if(this._isDragging && this._isSelected){
            this.modifyDrag();
        }
        else if(this._isResizing && this._isSelected){
            this.modifyResize(this.w < 14, this.h < 14);
        }
        else if(this._isChangingDims && this._isSelected) {
            this.modifyChangeDims(this.w < 14, this.h < 14);
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
        //console.log("I'm an ellipse!");
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
        //console.log("ellipse dragoffx: " + this._dragoffx);
        this._dims.x.eval(this._context).val = this._mouse.x - this._dragoffx;
        this._dims.y.eval(this._context).val = this._mouse.y - this._dragoffy;
    }

    /**
     * Changes the size of the object when called (when a corner guide is clicked and dragged).
     *
     * If any of width or height is too small, it sets them equal to 14 and the other equal to
     * 10 divided or multiplied by the ratio of width/height to keep it the same.
     * @param widthTooSmall true if the width dimension is < 14
     * @param heightTooSmall true if the height dimension is < 14
     */
    modifyResize(widthTooSmall: boolean, heightTooSmall: boolean): void {
        if(widthTooSmall){
            this._dims.width.eval(this._context).val = 14;
            this._circle.width = new NumberNode(14); // set for the prodirect manipulation
            this._dims.height.eval(this._context).val = 14 / this._ratio;
            this._circle.height = new NumberNode(Math.round(14 / this._ratio));
            let newDistance = distance(this._mouse.x, this._mouse.y, this._dragoffx, this._dragoffy);
            if(newDistance - this._initDistance > 0){
                this._dims.width.eval(this._context).val += (newDistance - this._initDistance) * 2;
                this._circle.width = new NumberNode(Math.round(this.w));
                this._dims.height.eval(this._context).val += (newDistance - this._initDistance) * 2 / this._ratio;
                this._circle.height = new NumberNode(Math.round(this.h));
                this._initDistance = newDistance;
            }
        }
        if(heightTooSmall) {
            this._dims.height.eval(this._context).val = 14;
            this._circle.height = new NumberNode(14); // set for the prodirect manipulation
            this._dims.width.eval(this._context).val = 14 * this._ratio;
            this._circle.width = new NumberNode(Math.round(14 * this._ratio));
            let newDistance = distance(this._mouse.x, this._mouse.y, this._dragoffx, this._dragoffy);
            if(newDistance - this._initDistance > 0){
                this._dims.width.eval(this._context).val += (newDistance - this._initDistance) * 2;
                this._circle.width = new NumberNode(Math.round(this.w));
                this._dims.height.eval(this._context).val += (newDistance - this._initDistance) * 2 / this._ratio;
                this._circle.height = new NumberNode(Math.round(this.h));
                this._initDistance = newDistance;
            }
        }
        else {
            let newDistance = distance(this._mouse.x, this._mouse.y, this._dragoffx, this._dragoffy);
            this._dims.width.eval(this._context).val += (newDistance - this._initDistance) * 2;
            this._circle.width = new NumberNode(Math.round(this.w));
            this._dims.height.eval(this._context).val += (newDistance - this._initDistance) * 2 / this._ratio;
            this._circle.height = new NumberNode(Math.round(this.h));
            this._initDistance = newDistance;
        }
    }

    /**
     * Changes the dimensions of the object when called.
     * If any of width or height is too small, it sets them equal to 10.
     * @param widthTooSmall true if the width dimension is < 10
     * @param heightTooSmall true if the height dimension is < 10
     */
    modifyChangeDims(widthTooSmall: boolean, heightTooSmall: boolean): void {
        let newDistance = distance(this._mouse.x, this._mouse.y, this._dragoffx, this._dragoffy);
        if (this._corner == 5 || this._corner == 7) { // if modifying height
            if (!heightTooSmall) {
                this._dims.height.eval(this._context).val += (newDistance - this._initDistance) * 2 / this._ratio;
                this._circle.height = new NumberNode(Math.round(this.h));
                this._initDistance = newDistance;
                this._ratio = this.w / this.h; // setting width/height ratio = to the new ratio
            } else {
                this._dims.height.eval(this._context).val = 14;
                this._circle.height = new NumberNode(14);
                this._ratio = this.w / this.h;
                if(newDistance - this._initDistance > 0){
                    this._dims.height.eval(this._context).val += (newDistance - this._initDistance) * 2 / this._ratio;
                    this._circle.height = new NumberNode(Math.round(this.h));
                    this._initDistance = newDistance;
                    this._ratio = this.w / this.h;
                }
            }
        }
        else { // modifying width
            if (!widthTooSmall) {
                this._dims.width.eval(this._context).val += (newDistance - this._initDistance) * 2;
                this._circle.width = new NumberNode(Math.round(this.w));
                this._initDistance = newDistance;
                this._ratio = this.w / this.h;
            } else {
                this._dims.width.eval(this._context).val = 14;
                this._circle.width = new NumberNode(14);
                this._ratio = this.w / this.h;
                if(newDistance - this._initDistance > 0){
                    this._dims.width.eval(this._context).val += (newDistance - this._initDistance) * 2;
                    this._circle.width = new NumberNode(Math.round(this.w));
                    this._initDistance = newDistance;
                    this._ratio = this.w / this.h;
                }
            }
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

        if (this._isSelectingMultiple) { //prepares the object for dragging whether it is personally selected or not
            if (contains) {
                this._x1 = this.x;
                this._y1 = this.y;
                this._isSelected = true;
                this._isDragging = true;
                this._dragoffx = this._mouse.x - this.x;
                this._dragoffy = this._mouse.y - this.y;
            } else {
                this._dragoffx = this._mouse.x - this.x;
                this._dragoffy = this._mouse.y - this.y;
                this._isDragging = true;
            }
        }
        else if(guideContains > 0 && guideContains <= 4) { //resizing
            this._isSelected = true;
            this._isResizing = true;

            this._context.eventLog.push(this.logClick());

            this._corner = guideContains;
            this._dragoffx = this.x;
            this._dragoffy = this.y;
            this._initDistance = distance(this._mouse.x, this._mouse.y, this.x, this.y);

            this._width1 = this.w;
            this._height1 = this.h;
            //this._size1 = Math.sqrt(Math.pow(this.w,2) + Math.pow(this.h,2)); // saving old size
        }
        else if(guideContains > 4){ //changing shape dimensions
            this._isSelected = true;
            this._isChangingDims = true;
            this._corner = guideContains;
            this._dragoffx = this.x;
            this._dragoffy = this.y;
            this._initDistance = distance(this._mouse.x, this._mouse.y, this.x, this.y);
        }
        else if (contains) { //simply selecting the shape or dragging
            this._x1 = this.x; // Saving original x and y
            this._y1 = this.y;
            this._isSelected = true;
            this._isDragging = true;

            this._context.eventLog.push(this.logClick());

            this._dragoffx = this._mouse.x - this.x;
            this._dragoffy = this._mouse.y - this.y;

        }
        else if (!this._isSelectingMultiple) {
            this._isSelected = false;
            this._isDragging = false;
        }
    }

    /**
     * Resets all of the private booleans to false (like dragging, resizing, etc) when the mouse is released
     */
    modifyReset(): void {
        if(this._isDragging && this._isSelected){ // probs only need dragging but oh well | isSel || selMul?
            this._isDragging = false;
            if(Math.abs(this._x1 - this.x) > 1 || Math.abs(this._y1 - this.y) > 1) {
                this._justDragged = true;
                //this._context.eventLog.push(this.logMove());
            }
        } else if((this._isResizing || this._isChangingDims) && this._isSelected){
            //console.log("resizing ellipse");
            this._isResizing = false;
            //let size2 = Math.sqrt(Math.pow(this.w,2) + Math.pow(this.h,2));
            //console.log("Size diff: " + Math.abs(this._size1 - size2));
            if((Math.abs(this._width1 - this.w) > 0) || (Math.abs(this._height1 - this.h) > 0)){
                this._context.eventLog.push(this.logResize());
            }
        }

        // if(this._isSelectingMultiple){
        //     if(Math.abs(this._x1 - this.x) > 1 || Math.abs(this._y1 - this.y) > 1) {
        //         this._context.eventLog.push(this.logMove());
        //     }
        // }
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
            this._isSelected = false;
            this._corner = 0;
        }
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
        return new ResizeEvent("ellipse with ID " + this.getID().toString(), Math.round(this._width1*100)/100, Math.round(this._height1*100)/100, Math.round(this.w*100)/100, Math.round(this.h*100)/100);
        //Math.round(this._size1*100)/100, Math.round((Math.sqrt(Math.pow(this.w,2) + Math.pow(this.h,2))*100))/100);
    }

    /**
     * Logs a click event
     */
    logClick(): LogEvent<any>{
        return new ClickEvent("ellipse with ID " + this.getID().toString(), this.x, this.y);
    }

    /**
     * Initializes and assigns an ID to an object
     * @param id The ID to be assigned
     */
    initID(id: number){
        this.idObj = {_id: id};
    }

    ast(): Expression<EllipseNode> {
        throw new Error("Method not implemented.");
    }

    /**
     * Returns the x position of the ellipse
     */
    get x(): number {
        return this._dims.x.eval(this._context).val;
    }
    /**
     * Returns the y position of the ellipse
     */
    get y(): number {
        return this._dims.y.eval(this._context).val;
    }
    /**
     * Returns the width of the ellipse
     */
    get w(): number {
        return this._dims.width.eval(this._context).val;
    }
    /**
     * Returns the height of the ellipse
     */
    get h(): number {
        return this._dims.height.eval(this._context).val;
    }

    /**
     * Returns the Dimensions object
     */
    get dims(): Dimensions {
        return this._dims;
    }

    /**
     * Returns whether or not the ellipse is selected
     */
    get selected(): boolean {
        return this._isSelected;
    }

    /**
     * Returns the ID of the ellipse
     */
    getID(): number{
        return this.idObj._id;
    }

    /**
     * Returns whether or not the ellipse has just been dragged
     */
    getJustDragged(): boolean {
        return this._justDragged;
    }
    /**
     * Sets whether or not the ellipse has just been dragged
     * @param val The value to be assigned
     */
    setJustDragged(val: boolean) {
        this._justDragged = val;
    }

    /**
     * Returns whether or not the ellipse is dragging
     */
    get isDragging(): boolean {
        return this._isDragging;
    }

    /**
     * Assembles a string for selection events
     */
    toSelString(): string {
        return (" ellipse with ID " + this.getID().toString() + " at " + this.x + ", " + this.y);
    }

    /**
    * Assembles a string for drag events
    */
    toDragString(): string {
        return("ellipse with ID " + this.getID().toString() + " from " + this._x1 + ", " + this._y1 + " to " + this.x + ", " + this.y);
    }

    /**
     * Assembles a string for ID assignment events
     */
    toIDString(): string {
        return (this.idObj._id.toString() + " to ellipse at " + this.x + ", " + this.y);
    }
}

/**
 * Get's the mouse x and y coordinates in relation to the canvas
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
