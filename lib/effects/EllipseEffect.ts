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
    //private _isListening: boolean = false;
    private _isDragging: boolean = false;
    private _isResizing: boolean = false;
    private _isChangingDims: boolean = false;
    private _isSelectingMultiple: boolean = false;

    private _justDragged: boolean = false; // Has this object just been dragged?

    private _x1: number; // used to save coords for logging
    private _y1: number;
    private _size1: number; // saves size for logging

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

    draw(context: Scope, dims: Dimensions, ast: Expression<any>): void {
        if (context.canvas.isDefined()) {
            this._dims = dims;
            this._ast = ast;
            this._canvas = context.canvas.get();
            this._context = context;
            let ctx = context.canvas.get().getContext("2d");
            this._ctx = ctx;
            this._ratio = this._dims.width.eval(this._context).val / this._dims.height.eval(this._context).val;
            this.update();
        }
        // logging
        this._context.eventLog.push(this.logPaint());
        context.effects.push(this);
        this.addEventListeners();
        
    }

    update(): void {
        let x: number = this._dims.x.eval(this._context).val;
        let y: number = this._dims.y.eval(this._context).val;
        let w: number = this._dims.width.eval(this._context).val;
        let h: number = this._dims.height.eval(this._context).val;
        this._ctx.beginPath();
        this._ctx.ellipse(x, y, w/2, h/2, 0, 0, Math.PI * 2, false);
        this._ctx.strokeStyle = "black";
        this._ctx.stroke();
        if(this._isSelected) {
            this.drawGuides(x - w/2, y - h/2, w, h, this._corner);
        }
    }

    addEventListeners(): void {
        this._canvas.addEventListener('mousemove', this.onMouseMove.bind(this));
        this._canvas.addEventListener('mousedown', this.onMouseDown.bind(this));
        this._canvas.addEventListener('mouseup', this.onMouseUp.bind(this));
        window.addEventListener('keydown', this.onShiftDown.bind(this));
        window.addEventListener('keyup', this.onShiftUp.bind(this));
        window.addEventListener('mousedown', this.isMouseOutside.bind(this));
        //makes it so that double clicking doesn't select text on the page
        this._canvas.addEventListener('selectstart', function(e) { e.preventDefault(); return false; }, false);
    }

    contains(mx: number, my: number): boolean {
        let x: number = this._dims.x.eval(this._context).val;
        let y: number = this._dims.y.eval(this._context).val;
        let w: number = this._dims.width.eval(this._context).val;
        let h: number = this._dims.height.eval(this._context).val;
        return Math.pow(mx - x, 2)/Math.pow(w/2, 2) + Math.pow(my - y, 2)/Math.pow(h/2, 2) <= 1;
    }

    guideContains(mx: number, my: number): number {
        let x: number = this._dims.x.eval(this._context).val;
        let y: number = this._dims.y.eval(this._context).val;
        let w: number = this._dims.width.eval(this._context).val;
        let h: number = this._dims.height.eval(this._context).val;
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
    
    //draws the guides for different objects
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

    drawSquare(x: number, y: number, w: number, h: number, color: string) {
        this._ctx.beginPath();
        this._ctx.fillStyle = color;
        this._ctx.fillRect(x, y, w, h);
        this._ctx.rect(x, y, w, h);
        this._ctx.strokeStyle = 'gray';
        this._ctx.stroke();
    }

    onMouseMove(event: any): void {
        this.getMousePosition();
        if(this._isDragging && this._isSelected){
            this.modifyDrag();
        }
        else if(this._isResizing && this._isSelected){
            this.modifyResize(this._dims.width.eval(this._context).val < 14, this._dims.height.eval(this._context).val < 14);
        }
        else if(this._isChangingDims && this._isSelected) {
            this.modifyChangeDims(this._dims.width.eval(this._context).val < 14, this._dims.height.eval(this._context).val < 14);
        }
    }

    onMouseDown(event: any): void {
        this.modifyState(this.guideContains(this._mouse.x, this._mouse.y), this.contains(this._mouse.x, this._mouse.y));
    }

    onMouseUp(event: any) {
        //console.log("I'm an ellipse!");
        this.modifyReset();
    }

    onShiftDown(event: any) {
        if(event.keyCode == "16") { //shift keycode
            this._isSelectingMultiple = true;
        }
    }

    onShiftUp(event: any) {
        if(event.keyCode == "16") { //shift keycode
            this._isSelectingMultiple = false;
        }
    }

    /* Modification functions */
    modifyDrag(): void {
        //console.log("ellipse dragoffx: " + this._dragoffx);
        this._dims.x.eval(this._context).val = this._mouse.x - this._dragoffx;
        this._dims.y.eval(this._context).val = this._mouse.y - this._dragoffy;
    }

    modifyResize(widthTooSmall: boolean, heightTooSmall: boolean): void {
        if(widthTooSmall){
            this._dims.width.eval(this._context).val = 14;
            this._circle.width = new NumberNode(14);
            this._dims.height.eval(this._context).val = 14 / this._ratio;
            this._circle.height = new NumberNode(Math.round(14 / this._ratio));
            let newDistance = distance(this._mouse.x, this._mouse.y, this._dragoffx, this._dragoffy);
            if(newDistance - this._initDistance > 0){
                this._dims.width.eval(this._context).val += (newDistance - this._initDistance) * 2;
                this._circle.width = new NumberNode(Math.round(this._dims.width.eval(this._context).val));
                this._dims.height.eval(this._context).val += (newDistance - this._initDistance) * 2 / this._ratio;
                this._circle.height = new NumberNode(Math.round(this._dims.height.eval(this._context).val));
                this._initDistance = newDistance;
            }
        }
        if(heightTooSmall) {
            this._dims.height.eval(this._context).val = 14;
            this._circle.height = new NumberNode(14);
            this._dims.width.eval(this._context).val = 14 * this._ratio;
            this._circle.width = new NumberNode(Math.round(14 * this._ratio));
            let newDistance = distance(this._mouse.x, this._mouse.y, this._dragoffx, this._dragoffy);
            if(newDistance - this._initDistance > 0){
                this._dims.width.eval(this._context).val += (newDistance - this._initDistance) * 2;
                this._circle.width = new NumberNode(Math.round(this._dims.width.eval(this._context).val));
                this._dims.height.eval(this._context).val += (newDistance - this._initDistance) * 2 / this._ratio;
                this._circle.height = new NumberNode(Math.round(this._dims.height.eval(this._context).val));
                this._initDistance = newDistance;
            }
        }
        else {
            let newDistance = distance(this._mouse.x, this._mouse.y, this._dragoffx, this._dragoffy);
            this._dims.width.eval(this._context).val += (newDistance - this._initDistance) * 2;
            this._circle.width = new NumberNode(Math.round(this._dims.width.eval(this._context).val));
            this._dims.height.eval(this._context).val += (newDistance - this._initDistance) * 2 / this._ratio;
            this._circle.height = new NumberNode(Math.round(this._dims.height.eval(this._context).val));
            this._initDistance = newDistance;
        }
    }

    modifyChangeDims(widthTooSmall: boolean, heightTooSmall: boolean): void {
        let newDistance = distance(this._mouse.x, this._mouse.y, this._dragoffx, this._dragoffy);
        if (this._corner == 5 || this._corner == 7) {
            if (!heightTooSmall) {
                this._dims.height.eval(this._context).val += (newDistance - this._initDistance) * 2 / this._ratio;
                this._circle.height = new NumberNode(Math.round(this._dims.height.eval(this._context).val));
                this._initDistance = newDistance;
                this._ratio = this._dims.width.eval(this._context).val / this._dims.height.eval(this._context).val;
            }
            else {
                this._dims.height.eval(this._context).val = 14;
                this._circle.height = new NumberNode(14);
                this._ratio = this._dims.width.eval(this._context).val / this._dims.height.eval(this._context).val;
                if(newDistance - this._initDistance > 0){
                    this._dims.height.eval(this._context).val += (newDistance - this._initDistance) * 2 / this._ratio;
                    this._circle.height = new NumberNode(Math.round(this._dims.height.eval(this._context).val));
                    this._initDistance = newDistance;
                    this._ratio = this._dims.width.eval(this._context).val / this._dims.height.eval(this._context).val;
                }
            }
        }
        else {
            if (!widthTooSmall) {
                this._dims.width.eval(this._context).val += (newDistance - this._initDistance) * 2;
                this._circle.width = new NumberNode(Math.round(this._dims.width.eval(this._context).val));
                this._initDistance = newDistance;
                this._ratio = this._dims.width.eval(this._context).val / this._dims.height.eval(this._context).val;       
            }
            else {
                this._dims.width.eval(this._context).val = 14;
                this._circle.width = new NumberNode(14);
                this._ratio = this._dims.width.eval(this._context).val / this._dims.height.eval(this._context).val;
                if(newDistance - this._initDistance > 0){
                    this._dims.width.eval(this._context).val += (newDistance - this._initDistance) * 2;
                    this._circle.width = new NumberNode(Math.round(this._dims.width.eval(this._context).val));
                    this._initDistance = newDistance;
                    this._ratio = this._dims.width.eval(this._context).val / this._dims.height.eval(this._context).val;
                }
            }
        }
    }

    modifyState(guideContains: number, contains: boolean): void {
        this._justDragged = false;

        if (this._isSelectingMultiple) {
            if (contains) {
                this._isSelected = true;
                this._isDragging = true;
                this._dragoffx = this._mouse.x - this._dims.x.eval(this._context).val;
                this._dragoffy = this._mouse.y - this._dims.y.eval(this._context).val;
            } else {
                this._dragoffx = this._mouse.x - this._dims.x.eval(this._context).val;
                this._dragoffy = this._mouse.y - this._dims.y.eval(this._context).val;
                this._isDragging = true;
            }
                // this._isSelected = true;
                // this._isDragging = true; // originally had if else with if(contains), but they were the same except for isSelected
                // this._dragoffx = this._mouse.x - this._dims.x.eval(this._context).val;
                // this._dragoffy = this._mouse.y - this._dims.y.eval(this._context).val;
        }
        else if(guideContains > 0 && guideContains <= 4) { //resizing
            this._isSelected = true;
            this._isResizing = true;

            this._context.eventLog.push(this.logClick());

            this._corner = guideContains;
            this._dragoffx = this._dims.x.eval(this._context).val;
            this._dragoffy = this._dims.y.eval(this._context).val;
            this._initDistance = distance(this._mouse.x, this._mouse.y, this._dims.x.eval(this._context).val, this._dims.y.eval(this._context).val);

            this._size1 = this._dims.radius.eval(this._context).val; // saving old font size
        }
        else if(guideContains > 4){ //changing shape dimensions
            this._isSelected = true;
            this._isChangingDims = true;
            this._corner = guideContains;
            this._dragoffx = this._dims.x.eval(this._context).val;
            this._dragoffy = this._dims.y.eval(this._context).val;
            this._initDistance = distance(this._mouse.x, this._mouse.y, this._dims.x.eval(this._context).val, this._dims.y.eval(this._context).val);
        }
        else if (contains) { //simply selecting the shape
            this._x1 = this._dims.x.eval(this._context).val; // Saving original x and y
            this._y1 = this._dims.y.eval(this._context).val;
            this._isSelected = true;
            this._isDragging = true;
        
            this._context.eventLog.push(this.logClick());

            this._dragoffx = this._mouse.x - this._dims.x.eval(this._context).val;
            this._dragoffy = this._mouse.y - this._dims.y.eval(this._context).val;

        }
        else if (!this._isSelectingMultiple) {
            this._isSelected = false;
            this._isDragging = false;
        }
    }

    modifyReset(): void {
        if(this._isDragging && (this._isSelected || this._isSelectingMultiple)){ // probs only need dragging but oh well
            this._isDragging = false;
            if(Math.abs(this._x1 - this._dims.x.eval(this._context).val) > 1 || Math.abs(this._y1 - this._dims.y.eval(this._context).val) > 1) {
                //this._justDragged = true;
                this._context.eventLog.push(this.logMove());
            }
        } else if (this._isResizing && this._isSelected){
            this._isResizing = false;
            if(Math.abs(this._size1 - this._dims.radius.eval(this._context).val) > 0){
                this._context.eventLog.push(this.logResize());
            }
        }

        // if(this._isSelectingMultiple){
        //     if(Math.abs(this._x1 - this._dims.x.eval(this._context).val) > 1 || Math.abs(this._y1 - this._dims.y.eval(this._context).val) > 1) {
        //         this._context.eventLog.push(this.logMove());
        //     }
        // }
        this._isDragging = false;
        this._isResizing = false;
        this._isChangingDims = false;
        this._corner = 0;
    }

    getMousePosition(): void {
        this._mouse.x = getMousePos(this._canvas, event).x;
        this._mouse.y = getMousePos(this._canvas, event).y;
    }

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

    ast(): Expression<EllipseNode> {
        return this._ast;
    }

    logPaint(): LogEvent<any> {
        return new PaintEvent("ellipse", this._dims.x.eval(this._context).val, this._dims.y.eval(this._context).val);
    }

    logMove(): LogEvent<any> {
        //console.log("x1,y1,x,y: " + this._x1 + " " + this._y1 + " " + this._dims.x + " " + this._dims.y);
        return new DragEvent("ellipse", this._x1, this._y1, this._dims.x.eval(this._context).val, this._dims.y.eval(this._context).val);
    }

    logResize(): LogEvent<any> {
        return new ResizeEvent("ellipse", this._size1, this._dims.radius.eval(this._context).val);
    }

    logClick(): LogEvent<any>{
        return new ClickEvent("ellipse", this._dims.x.eval(this._context).val, this._dims.y.eval(this._context).val);
    }

    updateAST(): Expression<EllipseNode> {
        throw new Error("Not implemented");
    }

    get x(): number {
        return this._dims.x.eval(this._context).val;
    }
    get y(): number {
        return this._dims.y.eval(this._context).val;
    }

    get dims(): Dimensions {
        return this._dims;
    }
    
    get selected(): boolean {
        return this._isSelected;
    }

    get justDragged(): boolean {
        return this._justDragged;
    }

    toString(): string{
        return (" ellipse at " + this.x + ", " + this.y);
    }
}

//allows us to get the mouse position in relation to the canvas!
//see mousemove event listener
function getMousePos(canvas: any, event: any): {x: number, y: number} {
    let rect = canvas.getBoundingClientRect();
    return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
    };
}

//computes the distance between two points
function distance(x1: number, y1: number, x2: number, y2: number) {
    return Math.sqrt(Math.pow(x1 - x2,2) + Math.pow(y1 - y2,2));
}