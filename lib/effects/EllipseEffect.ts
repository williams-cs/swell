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
    private _isSelectingMultiple: boolean = false;

    private _x1: number; // used to save coords for logging
    private _y1: number;
    private _size1: number; // saves size for logging

    private _context: Scope;

    private _dragoffx: number = 0;
    private _dragoffy: number = 0;
    private _initDistance: number = 0;

    private _myState: {
        dragoffx: number,
        dragoffy: number,
        initDistance: number,
        selection: any,
        dragging: boolean,
        resizing: boolean
    } = {
        dragoffx: 0,
        dragoffy: 0,
        initDistance: 0,
        selection: null,
        dragging: false,
        resizing: false
    }
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
            this._myState = context.myState;
            let ctx = context.canvas.get().getContext("2d");
            this._ctx = ctx;
            this.update();
        }
        // logging
        this._context.eventLog.push(this.logPaint());
        context.effects.push(this);
        this.addEventListeners();
        
    }

    update(): void {
        this._ctx.beginPath();
        this._ctx.arc(this._dims.x.eval(this._context).val, this._dims.y.eval(this._context).val, this._dims.radius.eval(this._context).val, 0, Math.PI * 2, false);
        this._ctx.strokeStyle = "black";
        this._ctx.stroke();
        if(this._isSelected) {
            this.drawGuides(this._dims.x.eval(this._context).val - this._dims.radius.eval(this._context).val, this._dims.y.eval(this._context).val - this._dims.radius.eval(this._context).val, this._dims.radius.eval(this._context).val * 2, this._dims.radius.eval(this._context).val * 2, this._corner);
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
        return distance(mx, my, this._dims.x.eval(this._context).val, this._dims.y.eval(this._context).val) < this._dims.radius.eval(this._context).val;
    }

    guideContains(mx: number, my: number): number {
        let xdif = mx - (this._dims.x.eval(this._context).val - this._dims.radius.eval(this._context).val);
        let ydif = my - (this._dims.y.eval(this._context).val - this._dims.radius.eval(this._context).val);
        if(xdif <= 5 && ydif <= 5 && xdif >= -5 && ydif >= -5){
            return 1;
        }
        xdif = mx - (this._dims.x.eval(this._context).val + this._dims.radius.eval(this._context).val);
        if(xdif <= 5 && ydif <= 5 && xdif >= -5 && ydif >= -5){
            return 2;
        }
        xdif = mx - (this._dims.x.eval(this._context).val + this._dims.radius.eval(this._context).val);
        ydif = my - (this._dims.y.eval(this._context).val + this._dims.radius.eval(this._context).val);
        if(xdif <= 5 && ydif <= 5 && xdif >= -5 && ydif >= -5){
            return 3;
        }
        xdif = mx - (this._dims.x.eval(this._context).val - this._dims.radius.eval(this._context).val);
        if(xdif <= 5 && ydif <= 5 && xdif >= -5 && ydif >= -5){
            return 4;
        }
        else return 0;
    }
    
    //draws the guides for different objects
    drawGuides(x: number, y: number, w: number, h: number, corner: number) { //corner is 1,2,3 or 4
        this._ctx.beginPath();
        this._ctx.rect(x, y, w, h);
        this._ctx.strokeStyle = 'gray';
        this._ctx.stroke();
        if(corner !== 0){
            switch (corner) { //colors the correct guide blue
                case 1:
                    this.drawSquare(x-2.5, y-2.5, 5, 5, 'blue');
                    this.drawSquare(x+w-2.5, y+h-2.5, 5, 5, 'white');
                    this.drawSquare(x+w-2.5, y-2.5, 5, 5, 'white');
                    this.drawSquare(x-2.5, y+h-2.5, 5, 5, 'white');
                    break;
                case 2:
                    this.drawSquare(x-2.5, y-2.5, 5, 5, 'white');
                    this.drawSquare(x+w-2.5, y+h-2.5, 5, 5, 'white');
                    this.drawSquare(x+w-2.5, y-2.5, 5, 5, 'blue');
                    this.drawSquare(x-2.5, y+h-2.5, 5, 5, 'white');
                    break;
                case 3:
                    this.drawSquare(x-2.5, y-2.5, 5, 5, 'white');
                    this.drawSquare(x+w-2.5, y+h-2.5, 5, 5, 'blue');
                    this.drawSquare(x+w-2.5, y-2.5, 5, 5, 'white');
                    this.drawSquare(x-2.5, y+h-2.5, 5, 5, 'white');
                    break;
                case 4:
                    this.drawSquare(x-2.5, y-2.5, 5, 5, 'white');
                    this.drawSquare(x+w-2.5, y+h-2.5, 5, 5, 'white');
                    this.drawSquare(x+w-2.5, y-2.5, 5, 5, 'white');
                    this.drawSquare(x-2.5, y+h-2.5, 5, 5, 'blue');
                    break;
            }
        }
        else {
            this.drawSquare(x-2.5, y-2.5, 5, 5, 'white');
            this.drawSquare(x+w-2.5, y-2.5, 5, 5, 'white');
            this.drawSquare(x+w-2.5, y+h-2.5, 5, 5, 'white');
            this.drawSquare(x-2.5, y+h-2.5, 5, 5, 'white');
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
        /*
        if(this._myState.dragging) {
            this._isDragging = true;
        }*/
        if(this._isDragging && this._isSelected){
            this.modifyDrag();
        }
        else if(this._isResizing && this._isSelected){
            this.modifyResize(this._dims.radius.eval(this._context).val < 10);
        }
    }

    onMouseDown(event: any): void {
        this.modifyState(this.guideContains(this._mouse.x, this._mouse.y) > 0, this.contains(this._mouse.x, this._mouse.y));
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
        console.log("ellipse dragoffx: " + this._dragoffx);
        this._dims.x.eval(this._context).val = this._mouse.x - this._dragoffx;
        this._dims.y.eval(this._context).val = this._mouse.y - this._dragoffy;
    }

    modifyResize(isTooSmall: boolean): void {
        if(isTooSmall){
            this._dims.radius.eval(this._context).val = 15;
            let widthAndHeight: NumberNode = new NumberNode(Math.round(this._dims.radius.eval(this._context).val * 2));
            this._circle.width = widthAndHeight;
            this._circle.height = widthAndHeight;
            let newDistance = distance(this._mouse.x, this._mouse.y, this._dragoffx, this._dragoffy);
            if(newDistance - this._initDistance > 0){
                this._dims.radius.eval(this._context).val += newDistance - this._initDistance;
                widthAndHeight = new NumberNode(Math.round(this._dims.radius.eval(this._context).val * 2));
                this._circle.width = widthAndHeight;
                this._circle.height = widthAndHeight;
                this._initDistance = newDistance;
            }
        }
        else {
            let newDistance = distance(this._mouse.x, this._mouse.y, this._dragoffx, this._dragoffy);
            this._dims.radius.eval(this._context).val += newDistance - this._initDistance;
            let widthAndHeight: NumberNode = new NumberNode(Math.round(this._dims.radius.eval(this._context).val * 2));
            this._circle.width = widthAndHeight;
            this._circle.height = widthAndHeight;
            this._initDistance = newDistance;
        }
    }

    modifyState(guideContains: boolean, contains: boolean): void {
        if (this._isSelectingMultiple) {
            if (contains) {
                this._isSelected = true;
                this._isDragging = true;
                this._dragoffx = this._mouse.x - this._dims.x.eval(this._context).val;
                this._dragoffy = this._mouse.y - this._dims.y.eval(this._context).val;
            }
            else {
                this._dragoffx = this._mouse.x - this._dims.x.eval(this._context).val;
                this._dragoffy = this._mouse.y - this._dims.y.eval(this._context).val;
                this._isDragging = true;
            }
        }
        else if(guideContains) {
            this._isSelected = true;
            this._isResizing = true;

            this._context.eventLog.push(this.logClick());

            this._corner = this.guideContains(this._mouse.x, this._mouse.y);
            //this._myState.selection = this;
            this._dragoffx = this._dims.x.eval(this._context).val;
            this._dragoffy = this._dims.y.eval(this._context).val;
            this._initDistance = distance(this._mouse.x, this._mouse.y, this._dims.x.eval(this._context).val, this._dims.y.eval(this._context).val);
            //this._myState.resizing = true;

            this._size1 = this._dims.radius.eval(this._context).val; // saving old font size
        }
        else if (contains) {
            this._myState.dragging = false;
            this._x1 = this._dims.x.eval(this._context).val; // Saving original x and y
            this._y1 = this._dims.y.eval(this._context).val;
            this._isSelected = true;
            this._isDragging = true;
        
            this._context.eventLog.push(this.logClick());

            //this._myState.dragging = true;
            //this._myState.selection = this;
            this._dragoffx = this._mouse.x - this._dims.x.eval(this._context).val;
            this._dragoffy = this._mouse.y - this._dims.y.eval(this._context).val;

        }
        else if (!this._isSelectingMultiple) {
            this._isSelected = false;
            this._isDragging = false;
            this._myState.dragging = false;
        }
    }

    modifyReset(): void {
        if(this._isDragging && this._isSelected){ // probs only need dragging but oh well
            this._isDragging = false;
            if(Math.abs(this._x1 - this._dims.x.eval(this._context).val) > 1 || Math.abs(this._y1 - this._dims.y.eval(this._context).val) > 1) {
                this._context.eventLog.push(this.logMove());
            }
        } else if (this._isResizing && this._isSelected){
            this._isResizing = false;
            if(Math.abs(this._size1 - this._dims.radius.eval(this._context).val) > 0){
                this._context.eventLog.push(this.logResize());
            }
        }
        this._myState.dragging = false;
        this._myState.resizing = false;
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
            this._myState.dragging = false;
            this._myState.resizing = false;
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
        return new ClickEvent("ellipse at ", this._dims.x.eval(this._context).val, this._dims.y.eval(this._context).val);
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