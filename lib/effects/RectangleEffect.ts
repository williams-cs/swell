import { Effect } from "./Effect";
import { NumberNode } from "../prims/NumberNode";
import { RectangleNode } from "../shapes/RectangleNode";
import { Expression } from "../Expression";
import { Scope } from "../structural/Scope";
import { PaintEvent } from "../logging/PaintEvent";
import { Dimensions } from "../structural/Dimensions";
import { LogEvent } from "../logging/LogEvent";

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
    private _selected: boolean = false;

    private _x1: number; // used to save coords for logging
    private _y1: number;
    private _size1: number; // saves size for logging

    private _context: Scope;

    private _myState: {
        dragoffx: number,
        dragoffy: number,
        initDistance: number,
        selection: any,
        dragging: boolean,
        resizing: boolean
    };
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
            this._myState = context.myState;
            let ctx = context.canvas.get().getContext("2d");
            this._ctx = ctx;
            this.update();
        }
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
        if(this._selected) {
            this.drawGuides(x, y, width, height, this._corner);
        }
    }

    addEventListeners(): void {
        this._canvas.addEventListener('mousemove', this.onMouseMove.bind(this));
        this._canvas.addEventListener('mousedown', this.onMouseDown.bind(this));
        this._canvas.addEventListener('mouseup', this.onMouseUp.bind(this));
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
        let x = this._dims.x.eval(this._context).val;
        let y = this._dims.y.eval(this._context).val;
        let w = this._dims.width.eval(this._context).val;
        let h = this._dims.height.eval(this._context).val;
        let xdif = mx - (x + w);
        let ydif = my - (y + h);
        if(xdif <= 5 && ydif <= 5 && xdif >= -5 && ydif >= -5){
            return 3;
        }
        return 0;
    }

    //draws the guides for different objects
    drawGuides(x: number, y: number, w: number, h: number, corner: number) { //corner is 1,2,3 or 4
        this._ctx.beginPath();
        this._ctx.rect(x, y, w, h);
        this._ctx.strokeStyle = 'gray';
        this._ctx.stroke();
        if(corner !== 0){
            switch (corner) { //colors the correct guide blue
                case 3:
                    this.drawSquare(x+w-2.5, y+h-2.5, 5, 5, 'blue');
                    break;
            }
        }
        else {
            this.drawSquare(x+w-2.5, y+h-2.5, 5, 5, 'white');
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
        if(this._myState.dragging && this._selected){
            this.modifyDrag();
        }
        else if(this._myState.resizing && this._selected){
            this.modifyResize(this._dims.width.eval(this._context).val < 5, this._dims.height.eval(this._context).val < 5);
        }
    }

    onMouseDown(event: any): void {
        this.modifyState(this.guideContains(this._mouse.x, this._mouse.y) > 0, this.contains(this._mouse.x, this._mouse.y));
    }

    onMouseUp(event: any) {
        console.log("I'm an ellipse!");
        this.modifyReset();
    }

    /* Modification functions */
    modifyDrag(): void {
        this._dims.x.eval(this._context).val = this._mouse.x - this._myState.dragoffx;
        this._dims.y.eval(this._context).val = this._mouse.y - this._myState.dragoffy;
    }

    modifyResize(widthTooSmall: boolean, heightTooSmall: boolean): void {
        if(widthTooSmall) {
            this._dims.width.eval(this._context).val = 5;
            let newDistance = distance(this._mouse.x, this._mouse.y, this._myState.dragoffx, this._myState.dragoffy);
            if(newDistance - this._myState.initDistance > 0){
                let ratio = this._dims.width.eval(this._context).val / this._dims.height.eval(this._context).val;
                this._dims.width.eval(this._context).val += newDistance - this._myState.initDistance;
                this._dims.height.eval(this._context).val += (newDistance - this._myState.initDistance) / ratio;
                this._myState.initDistance = newDistance;
            }
        }
        else if(heightTooSmall) {
            this._dims.height.eval(this._context).val = 5;
            let newDistance = distance(this._mouse.x, this._mouse.y, this._myState.dragoffx, this._myState.dragoffy);
            if(newDistance - this._myState.initDistance > 0){
                let ratio = this._dims.width.eval(this._context).val / this._dims.height.eval(this._context).val;
                this._dims.width.eval(this._context).val += newDistance - this._myState.initDistance;
                this._dims.height.eval(this._context).val += (newDistance - this._myState.initDistance) / ratio;
                this._myState.initDistance = newDistance;
            }
        }
        else {
            let newDistance = distance(this._mouse.x, this._mouse.y, this._myState.dragoffx, this._myState.dragoffy);
            let ratio = this._dims.width.eval(this._context).val / this._dims.height.eval(this._context).val;
            this._dims.width.eval(this._context).val += newDistance - this._myState.initDistance;
            this._dims.height.eval(this._context).val += (newDistance - this._myState.initDistance) / ratio;
            this._myState.initDistance = newDistance;
        }
    }

    modifyState(guideContains: boolean, contains: boolean): void {
        if(guideContains) {
            this._selected = true;
            this._corner = this.guideContains(this._mouse.x, this._mouse.y);
            this._myState.selection = this;
            this._myState.dragoffx = this._dims.x.eval(this._context).val + this._dims.width.eval(this._context).val / 2;
            this._myState.dragoffy = this._dims.y.eval(this._context).val + this._dims.height.eval(this._context).val / 2;
            this._myState.initDistance = distance(this._mouse.x, this._mouse.y, this._dims.x.eval(this._context).val + this._dims.width.eval(this._context).val / 2, this._dims.y.eval(this._context).val + this._dims.height.eval(this._context).val / 2);
            this._myState.resizing = true;
        }
        else if (contains) {
            this._x1 = this._dims.x.eval(this._context).val; // Saving original x and y
            this._y1 = this._dims.y.eval(this._context).val;

            this._selected = true;
            this._myState.selection = this;
            this._myState.dragoffx = this._mouse.x - this._dims.x.eval(this._context).val;
            this._myState.dragoffy = this._mouse.y - this._dims.y.eval(this._context).val;
            this._myState.dragging = true;
        }
        else {
            this._selected = false;
        }
    }

    modifyReset(): void {
        if(this._myState.dragging){
            //this._context.eventLog.push(this.logMove());
        } else if (this._myState.resizing){
            //this._context.eventLog.push(this.logResize());
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
            this._selected = false;
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

    ast(): Expression<RectangleNode> {
        throw new Error("Not implemented");
    }

    updateAST(): Expression<NumberNode> {
        throw new Error("Not implemented");
    }

    get x(): number {
        return this._x;
    }
    get y(): number {
        return this._y;
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