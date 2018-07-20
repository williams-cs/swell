import { Effect } from "./Effect";
import { StringNode } from "../prims/StringNode";
import { Expression } from "../Expression";
import { Scope } from "../structural/Scope";
<<<<<<< HEAD
import { Dimensions } from "../structural/Dimensions";
import { PrintNode } from "../structural/PrintNode";
=======
import { PaintEvent } from "../logging/PaintEvent";
>>>>>>> fd15ccdcd30d4842891ffa5a692662d69ebf9c1b

export class StringEffect implements Effect<StringNode> {

    private _ast: PrintNode;
    private _ctx: CanvasRenderingContext2D;
    private _canvas: HTMLCanvasElement;
    private _str: StringNode;
    private _dims: Dimensions;
    private _fontSize: number = 20;
    private _x: number;
    private _y: number;
    private _w: number;
    private _h: number;
    private _scale: number;
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

    draw(context: Scope, x: number, y: number, dims: Dimensions, ast: PrintNode): void {
        if (context.canvas.isDefined()) {
            this._ast = ast;
            this._canvas = context.canvas.get();
            this._dims = dims;
            this._myState = context.myState;
            this._x = dims.x;
            this._y = dims.y;
            this._scale = dims.scale;
            let ctx = context.canvas.get().getContext("2d");
            this._ctx = ctx;
            let fontDeets: string = this._fontSize + "px Arial";
            ctx.font = fontDeets;
            ctx.fillStyle = 'black';
            ctx.fillText(this._str.val, x, y);
            let textDims = ctx.measureText(this._str.val);
            this._w = textDims.width;
            this._h = this._fontSize;

            // logging
            context.eventLog.push(this.log());
            
            if(!context.effects.includes(this)){
                context.effects.push(this);
            }
            if(this._selected) {
                this.drawTextGuides(this._x, this._y - this._fontSize, this._w, this._h, this._corner);
            }

            this._canvas.addEventListener('mousemove', this.onMouseMove.bind(this));
            this._canvas.addEventListener('mousedown', this.onMouseDown.bind(this));
            this._canvas.addEventListener('mouseup', this.onMouseUp.bind(this));
        }
        else {
            console.log("canvas is NOT defined");
        }
    }

    contains(mx: number, my: number): boolean {
        return  (this._x <= mx) && (this._x + this._w >= mx) &&
          (this._y - this._fontSize <= my) && (this._y >= my);
    }

    guideContains(mx: number, my: number): number {
        let xdif = mx - (this._x + this._w);
        let ydif = my - (this._y - this._fontSize);
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

    onMouseMove(event: any): void {
        this._mouse.x = getMousePos(this._canvas, event).x;
        this._mouse.y = getMousePos(this._canvas, event).y;
        if(this._myState.dragging && this._selected){
            this._x = this._mouse.x - this._myState.dragoffx;
            this._y = this._mouse.y - this._myState.dragoffy;
        }
        else if(this._myState.resizing && this._selected){
            if (this._fontSize >= 15) {
                let newDistance = distance(this._mouse.x, this._mouse.y, this._myState.dragoffx, this._myState.dragoffy);
                this._fontSize += newDistance - this._myState.initDistance;
                this._myState.initDistance = newDistance;
            }
            else {
                this._fontSize = 15;
                let newDistance = distance(this._mouse.x, this._mouse.y, this._myState.dragoffx, this._myState.dragoffy);
                if(newDistance - this._myState.initDistance > 0){
                    this._fontSize += newDistance - this._myState.initDistance;
                    this._myState.initDistance = newDistance;
                }
            }
        }
    }

    onMouseDown(event: any): void {
        if (this.guideContains(this._mouse.x, this._mouse.y) > 0) {
            this._selected = true;
            this._corner = this.guideContains(this._mouse.x, this._mouse.y);
            this._myState.selection = this;
            this._myState.dragoffx = this._x;
            this._myState.dragoffy = this._y;
            this._myState.initDistance = distance(this._mouse.x, this._mouse.y, this._x, this._y);
            this._myState.resizing = true;
        }
        else if (this.contains(this._mouse.x, this._mouse.y)) {
            this._selected = true;
            this._myState.selection = this;
            this._myState.dragoffx = this._mouse.x - this._x;
            this._myState.dragoffy = this._mouse.y - this._y;
            this._myState.dragging = true;
        }
        else {
            this._selected = false;
        }
    }

    onMouseUp(event: any) {
        if(this._myState.resizing == true) {
            this.updateAST();
        }
        this._myState.dragging = false;
        this._myState.resizing = false;
        this._corner = 0;
    }

    log(): string {
        let paint = new PaintEvent(this._str.val);
        return paint.assembleLog();
    }

    ast(): Expression<StringNode> {
        throw new Error("Not implemented");
    }

    updateAST(): Expression<StringNode> {
        this._ast.dims.x = this._x;
        this._ast.dims.y = this._y;
        return this._ast;
    }

    get canvas(): HTMLCanvasElement {
        return this._canvas;
    }
    set canvas(canvas: HTMLCanvasElement) {
        this._canvas = canvas;
    }

    x(): number {
        return this._x;
    }
    y(): number {
        return this._y;
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