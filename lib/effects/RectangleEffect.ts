import { Effect } from "./Effect";
import { NumberNode } from "../prims/NumberNode";
import { RectangleNode } from "../shapes/RectangleNode";
import { Expression } from "../Expression";
import { Scope } from "../structural/Scope";
import { PaintEvent } from "../logging/PaintEvent";
import { Dimensions } from "../structural/Dimensions";
import { LogEvent } from "../logging/LogEvent";
import { ResizeEvent } from "../logging/ResizeEvent";
import { DragEvent } from "../logging/DragEvent";
import { ClickEvent } from "../logging/ClickEvent";

export class RectangleEffect implements Effect<RectangleNode> {

    private _rect: RectangleNode;
    private _dims: Dimensions;
    private _ast: Expression<any>;
    private _x: number;
    private _y: number;
    private _w: number;
    private _h: number;
    private _ctx: CanvasRenderingContext2D;
    private _canvas: HTMLCanvasElement;
    private _corner: number = 0;

    private _isSelected: boolean = false; // private bools
    private _isDragging: boolean = false;
    private _isResizing: boolean = false;
    private _isChangingDims: boolean = false;
    private _isSelectingMultiple: boolean = false;

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

    constructor(rect: RectangleNode) {
        this._rect = rect;
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
        this._context.eventLog.push(this.logPaint());
        context.effects.push(this);
        this.addEventListeners();
    }

    update(): void {
        let x = this._dims.x.eval(this._context).val;
        let y = this._dims.y.eval(this._context).val;
        let width = this._dims.width.eval(this._context).val;
        let height = this._dims.height.eval(this._context).val;
        this._ctx.beginPath();
        this._ctx.rect(x, y, width, height);
        this._ctx.strokeStyle = "black";
        this._ctx.stroke();
        if(this._isSelected) {
            this.drawGuides(x, y, width, height, this._corner);
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
        let x = this._dims.x.eval(this._context).val;
        let y = this._dims.y.eval(this._context).val;
        let w = this._dims.width.eval(this._context).val;
        let h = this._dims.height.eval(this._context).val;
        if(mx > x && mx < x+w && my > y && my < y+h) {
            return true;
        }
        else return false;
    }

    guideContains(mx: number, my: number): number {
        let x: number = this._dims.x.eval(this._context).val;
        let y: number = this._dims.y.eval(this._context).val;
        let w: number = this._dims.width.eval(this._context).val;
        let h: number = this._dims.height.eval(this._context).val;
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

    //draws the guides for different objects
    drawGuides(x: number, y: number, w: number, h: number, corner: number) { //corner is 1,2,3 or 4
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
        else if (corner !== 0) {
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
        if(this._isDragging && this._isSelected) {
            this.modifyDrag();
        }
        else if(this._isResizing && this._isSelected) {
            this.modifyResize(this._dims.width.eval(this._context).val < 10, this._dims.height.eval(this._context).val < 10);
        }
        else if(this._isChangingDims && this._isSelected) {
            this.modifyChangeDims(this._dims.width.eval(this._context).val < 10, this._dims.height.eval(this._context).val < 10);
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
        //console.log("rectangle dragoffx: " + this._dragoffx);
        this._dims.x.eval(this._context).val = this._mouse.x - this._dragoffx;
        this._dims.y.eval(this._context).val = this._mouse.y - this._dragoffy;
    }

    modifyResize(widthTooSmall: boolean, heightTooSmall: boolean): void {
        if(widthTooSmall) {
            this._dims.width.eval(this._context).val = 10;
            this._rect.width = new NumberNode(10);
            this._dims.height.eval(this._context).val = 10 / this._ratio;
            this._rect.height = new NumberNode(Math.round(10 / this._ratio));
            let newDistance = distance(this._mouse.x, this._mouse.y, this._dragoffx, this._dragoffy);
            if(newDistance - this._initDistance > 0){
                this.modifyResizeHelper();
            }
        }
        if(heightTooSmall) {
            this._dims.height.eval(this._context).val = 10;
            this._rect.height = new NumberNode(10);
            this._dims.width.eval(this._context).val = 10 * this._ratio;
            this._rect.width = new NumberNode(Math.round(10 * this._ratio));
            let newDistance = distance(this._mouse.x, this._mouse.y, this._dragoffx, this._dragoffy);
            if(newDistance - this._initDistance > 0){
                this.modifyResizeHelper();
            }
        }
        else {
            this.modifyResizeHelper();
        }
    }

    modifyResizeHelper(): void {
        let newDistance = distance(this._mouse.x, this._mouse.y, this._dragoffx, this._dragoffy);
        switch (this._corner) {
            case 1:
                this._dims.y.eval(this._context).val -= Math.round(newDistance - this._initDistance);
                this._dims.x.eval(this._context).val -= Math.round(newDistance - this._initDistance);
            break;
            case 2:
                this._dims.y.eval(this._context).val -= Math.round(newDistance - this._initDistance);
            break;
            case 4:
                this._dims.x.eval(this._context).val -= Math.round(newDistance - this._initDistance);
            break;
        }
        this._dims.width.eval(this._context).val += newDistance - this._initDistance;
        this._rect.width = new NumberNode(Math.round(this._dims.width.eval(this._context).val));
        this._dims.height.eval(this._context).val += (newDistance - this._initDistance) / this._ratio;
        this._rect.height = new NumberNode(Math.round(this._dims.height.eval(this._context).val));
        this._initDistance = newDistance;
    }

    modifyChangeDims(widthTooSmall: boolean, heightTooSmall: boolean): void {
        let newDistance = distance(this._mouse.x, this._mouse.y, this._dragoffx, this._dragoffy);
        if(widthTooSmall) {
            this._dims.width.eval(this._context).val = 10;
            this._rect.width = new NumberNode(10);
            //this._dims.height.eval(this._context).val = 10 / this._ratio;
            //this._rect.height = new NumberNode(Math.round(10 / this._ratio));
            if(newDistance - this._initDistance > 0){
                this.modifyChangeDimsHelper();
            }
        }
        if(heightTooSmall) {
            this._dims.height.eval(this._context).val = 10;
            this._rect.height = new NumberNode(10);
            //this._dims.width.eval(this._context).val = 10 * this._ratio;
            //this._rect.width = new NumberNode(Math.round(10 * this._ratio));
            if(newDistance - this._initDistance > 0){
                this.modifyChangeDimsHelper();
            }
        }
        else {
            this.modifyChangeDimsHelper();
        }
    }

    modifyChangeDimsHelper(): void {
        let newDistance = distance(this._mouse.x, this._mouse.y, this._dragoffx, this._dragoffy);
        switch (this._corner) {
            case 5:
                this._dims.y.eval(this._context).val -= Math.round(newDistance - this._initDistance);
                this._dims.height.eval(this._context).val += newDistance - this._initDistance;
                this._rect.height = new NumberNode(Math.round(this._dims.height.eval(this._context).val));
                this._ratio = this._dims.width.eval(this._context).val / this._dims.height.eval(this._context).val;
                this._initDistance = newDistance;
            break;
            case 6:
                this._dims.width.eval(this._context).val += newDistance - this._initDistance;
                this._rect.width = new NumberNode(Math.round(this._dims.height.eval(this._context).val));
                this._ratio = this._dims.width.eval(this._context).val / this._dims.height.eval(this._context).val;
                this._initDistance = newDistance;
            break;
            case 7:
                this._dims.height.eval(this._context).val += newDistance - this._initDistance;
                this._rect.height = new NumberNode(Math.round(this._dims.height.eval(this._context).val));
                this._ratio = this._dims.width.eval(this._context).val / this._dims.height.eval(this._context).val;
                this._initDistance = newDistance;
            break;
            case 8:
                this._dims.x.eval(this._context).val -= Math.round(newDistance - this._initDistance);
                this._dims.width.eval(this._context).val += newDistance - this._initDistance;
                this._rect.width = new NumberNode(Math.round(this._dims.height.eval(this._context).val));
                this._ratio = this._dims.width.eval(this._context).val / this._dims.height.eval(this._context).val;
                this._initDistance = newDistance;
            break;
        }

    }
    /**
     * 
     * @param guideContains 
     * @param contains 
     */
    modifyState(guideContains: number, contains: boolean): void {
        let x: number = this._dims.x.eval(this._context).val;
        let y: number = this._dims.y.eval(this._context).val;
        let w: number = this._dims.width.eval(this._context).val;
        let h: number = this._dims.height.eval(this._context).val;
        if (this._isSelectingMultiple) {
            if (contains) {
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
            
            switch (this._corner) {
                case 1: 
                    this._initDistance = distance(this._mouse.x, this._mouse.y, x + w, y + h);
                    this._dragoffx = x + w;
                    this._dragoffy = y + h;
                break;
                case 2: 
                    this._initDistance = distance(this._mouse.x, this._mouse.y, x, y + h);
                    this._dragoffx = x;
                    this._dragoffy = y + h;
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
            //this._initDistance = distance(this._mouse.x, this._mouse.y, x + w / 2, y + h / 2);

            this._size1 = Math.sqrt(w^2 + h^2); // size is diagonal length
        }
        else if(guideContains > 4){ //changing shape dimensions
            this._isSelected = true;
            this._isChangingDims = true;
            this._corner = guideContains;
            this._dragoffx = x + w / 2;
            this._dragoffy = y + h / 2;
            /*
            switch (this._corner) {
                case 5: this._initDistance = distance(this._mouse.x, this._mouse.y, x + w / 2, y + h);
                break;
                case 6: this._initDistance = distance(this._mouse.x, this._mouse.y, x, y + h / 2);
                break;
                case 7: this._initDistance = distance(this._mouse.x, this._mouse.y, x + w / 2, y);
                break;
                case 8: this._initDistance = distance(this._mouse.x, this._mouse.y, x + w, y + h / 2);
                break;
            }
            */
            this._initDistance = distance(this._mouse.x, this._mouse.y, x + w / 2, y + h / 2);
        }
        else if (contains) {
            this._x1 = x; // Saving original x and y
            this._y1 = y;

            this._context.eventLog.push(this.logClick());
            this._isSelected = true;
            this._isDragging = true;

            this._dragoffx = this._mouse.x - x;
            this._dragoffy = this._mouse.y - y;
        }
        else if (!this._isSelectingMultiple) {
            this._isSelected = false;
            this._isDragging = false;
        }
    }

    modifyReset(): void {
        if(this._isDragging && this._isSelected){
            this._isDragging = false;
            if(Math.abs(this._x1 - this._dims.x.eval(this._context).val) > 1 || Math.abs(this._y1 - this._dims.y.eval(this._context).val) > 1) {
                this._context.eventLog.push(this.logMove());
            }
        } else if (this._isResizing && this._isSelected){
            this._isResizing = false;
            let size2 = Math.sqrt(Math.pow(this._dims.width.eval(this._context).val,2) + Math.pow(this._dims.height.eval(this._context).val,2)); 
            if(Math.abs(this._size1 - size2) > 0){
                this._context.eventLog.push(this.logResize());
            }
        }
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

    /*logPaint(): LogEvent<any> {
        //return new PaintEvent(this._str);
    }*/

    // logMove(): string {
    //     let moveStr = new DragEvent(this._str, this._x1, this._y1, this._dims.x, this._dims.y);
    //     return moveStr.assembleLog();
    // }

    // logResize(): string {
    //     let sizeStr = new ResizeEvent(this._str, this._size1, this._fontSize);
    //     return sizeStr.assembleLog();
    // }

    logPaint(): LogEvent<any> {
        return new PaintEvent("rectangle", this._dims.x.eval(this._context).val, this._dims.y.eval(this._context).val);
    }

    logMove(): LogEvent<any> {
        //console.log("x1,y1,x,y: " + this._x1 + " " + this._y1 + " " + this._dims.x + " " + this._dims.y);
        return new DragEvent("rectangle", this._x1, this._y1, this._dims.x.eval(this._context).val, this._dims.y.eval(this._context).val);
    }

    logResize(): LogEvent<any> {
        return new ResizeEvent("rectangle", this._size1, this._dims.width.eval(this._context).val);
    }

    logClick(): LogEvent<any>{
        return new ClickEvent("rectangle at ", this._dims.x.eval(this._context).val, this._dims.y.eval(this._context).val);
    }

    ast(): Expression<RectangleNode> {
        throw new Error("Not implemented");
    }

    updateAST(): Expression<NumberNode> {
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

    toString(): string{
        return " rectangle at " + this.x + ", " + this.y;
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