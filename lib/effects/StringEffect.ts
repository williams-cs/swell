import { Effect } from "./Effect";
import { StringNode } from "../prims/StringNode";
import { Expression } from "../Expression";
import { Scope } from "../structural/Scope";
import { Dimensions } from "../structural/Dimensions";
import { PrintNode } from "../structural/PrintNode";
import { PaintEvent } from "../logging/PaintEvent";
import { DragEvent } from "../logging/DragEvent";
import { update } from "../../node_modules/immupdate";

export class StringEffect implements Effect<StringNode> {

    private _ast: Expression<any>;
    private _context: Scope;
    private _ctx: CanvasRenderingContext2D;
    private _canvas: HTMLCanvasElement;
    private _str: StringNode;
    private _dims: Dimensions;
    private _fontSize: number = 20;
    private _w: number;
    private _h: number;
    private _x1: number; // Original position for drag logging
    private _y1: number;
    private _corner: number = 0;
    private _selected: boolean = false;
    //private _log: string[];
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

    constructor(str: StringNode) {
        this._str = str;
    }

    draw(context: Scope, dims: Dimensions, ast: Expression<any>): void {
        if (context.canvas.isDefined()) {
            this._ast = ast;
            this._context = context;
            this._canvas = context.canvas.get();
            this._dims = dims;
            this._myState = context.myState;
            let ctx = context.canvas.get().getContext("2d");
            this._ctx = ctx;
            let fontDeets: string = this._fontSize + "px Courier";
            ctx.font = fontDeets;
            ctx.fillStyle = 'black';
            ctx.fillText(this._str.val, this._dims.x, this._dims.y);
            let textDims = ctx.measureText(this._str.val);
            this._w = textDims.width;
            this._h = this._fontSize;

            // logging
            this._context.eventLog.push(this.logPaint()); // this.context or context?
            
            if(!context.effects.includes(this)){
                context.effects.push(this);
            }
            if(this._selected) {
                this.drawTextGuides(this._dims.x, this._dims.y - this._fontSize, this._w, this._h, this._corner);
            }

            this._canvas.addEventListener('mousemove', this.onMouseMove.bind(this));
            this._canvas.addEventListener('mousedown', this.onMouseDown.bind(this));
            this._canvas.addEventListener('mouseup', this.onMouseUp.bind(this));
            //makes it so that double clicking doesn't select text on the page
            this._canvas.addEventListener('selectstart', function(e) { e.preventDefault(); return false; }, false);
        }
        else {
            console.log("canvas is NOT defined");
        }
    }

    contains(mx: number, my: number): boolean {
        return  (this._dims.x <= mx) && (this._dims.x + this._w >= mx) &&
          (this._dims.y - this._fontSize <= my) && (this._dims.y >= my);
    }

    guideContains(mx: number, my: number): number {
        let xdif = mx - (this._dims.x + this._w);
        let ydif = my - (this._dims.y - this._fontSize);
        if(xdif <= 5 && ydif <= 5 && xdif >= -5 && ydif >= -5){
            return 2;
        }
        else return 0;
    }

    drawTextGuides(x: number, y: number, w: number, h: number, corner: number) { //corner is 2 or 0
        this._ctx.beginPath();
        this._ctx.rect(x, y, w, h);
        this._ctx.strokeStyle = 'gray';
        this._ctx.stroke();
        if(corner !== 0){
            switch (corner) { //colors the guide blue if selected
                case 2:
                    this.drawSquare(x+w-2.5, y-2.5, 5, 5, 'blue');
                    break;
            }
        }
        else {
            this.drawSquare(x+w-2.5, y-2.5, 5, 5, 'white');
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

    /* Event listener functions */
    onMouseMove(event: any): void {
        this.getMousePosition();
        if(this._myState.dragging && this._selected){
            this.modifyDrag();
        }
        else if(this._myState.resizing && this._selected){
            this.modifyResize(this._fontSize < 15);
        }
    }

    onMouseDown(event: any): void {
        this.modifyState(this.guideContains(this._mouse.x, this._mouse.y) > 0, this.contains(this._mouse.x, this._mouse.y));
    }

    onMouseUp(event: any) {
        this.modifyReset();
    }

    /* Modification functions */
    modifyDrag(): void {
        this._dims.x = this._mouse.x - this._myState.dragoffx;
        this._dims.y = this._mouse.y - this._myState.dragoffy;
    }

    modifyResize(isTooSmall: boolean): void {
        if(isTooSmall){
            this._fontSize = 15;
            let newDistance = distance(this._mouse.x, this._mouse.y, this._myState.dragoffx, this._myState.dragoffy);
            if(newDistance - this._myState.initDistance > 0){
                this._fontSize += newDistance - this._myState.initDistance;
                this._myState.initDistance = newDistance;
            }
        }
        else {
            let newDistance = distance(this._mouse.x, this._mouse.y, this._myState.dragoffx, this._myState.dragoffy);
            this._fontSize += newDistance - this._myState.initDistance;
            this._myState.initDistance = newDistance;
        }
    }

    modifyState(guideContains: boolean, contains: boolean): void {
        if(guideContains) {
            this._selected = true;
            this._corner = this.guideContains(this._mouse.x, this._mouse.y);
            this._myState.selection = this;
            this._myState.dragoffx = this._dims.x;
            this._myState.dragoffy = this._dims.y;
            this._myState.initDistance = distance(this._mouse.x, this._mouse.y, this._dims.x, this._dims.y);
            this._myState.resizing = true;
        }
        else if (contains) {
            this._selected = true;
            this._myState.selection = this;
            this._myState.dragoffx = this._mouse.x - this._dims.x;
            this._myState.dragoffy = this._mouse.y - this._dims.y;
            this._myState.dragging = true;
            this._x1 = this._dims.x; // Saving original x and y
            this._y1 = this._dims.y;
        }
        else {
            this._selected = false;
        }
    }

    modifyReset(): void {
        this._myState.dragging = false;
        this._myState.resizing = false;
        this._corner = 0;
        this._context.eventLog.push(this.logMove());
    }

    getMousePosition(): void {
        this._mouse.x = getMousePos(this._canvas, event).x;
        this._mouse.y = getMousePos(this._canvas, event).y;
    }

    logPaint(): string {
        let paint = new PaintEvent(this._str.val);
        return paint.assembleLog();
    }
    
    logMove(): string {
        console.log("x1,y1,x,y: " + this._x1 + " " + this._y1 + " " + this._dims.x + " " + this._dims.y);
        let moveStr = new DragEvent(this._str.val, this._x1, this._y1, this._dims.x, this._dims.y);
        return moveStr.assembleLog();
    }

    ast(): Expression<StringNode> {
        return this._ast;
    }


    get canvas(): HTMLCanvasElement {
        return this._canvas;
    }
    set canvas(canvas: HTMLCanvasElement) {
        this._canvas = canvas;
    }

    get x(): number {
        return this._dims.x;
    }
    get y(): number {
        return this._dims.y;
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