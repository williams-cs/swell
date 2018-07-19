import { Effect } from "./Effect";
import { StringNode } from "../prims/StringNode";
import { Expression } from "../Expression";
import { Scope } from "../structural/Scope";

export class StringEffect implements Effect<StringNode> {

    private _ctx: CanvasRenderingContext2D;
    private _canvas: HTMLCanvasElement;
    private _str: StringNode;
    private _fontSize: number = 20;
    private _x: number;
    private _y: number;
    private _w: number;
    private _h: number;
    private _corner: number = 0;
    private _selected: boolean = false;
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

    draw(context: Scope, x: number, y: number): void {
        this._canvas = context.canvas.get();
        if (context.canvas.isDefined()) {
            this._myState = context.myState;
            this._x = x;
            this._y = y;
            let ctx = context.canvas.get().getContext("2d");
            this._ctx = ctx;
            let fontDeets: string = this._fontSize + "px Arial";
            ctx.font = fontDeets;
            ctx.fillStyle = 'black';
            ctx.fillText(this._str.val, x, y);
            let dims = ctx.measureText(this._str.val);
            this._w = dims.width;
            this._h = this._fontSize;
            context.effects.push(this);
            if(this._selected) {
                this.drawTextGuides(this._x, this._y - this._fontSize, this._w, this._h, this._corner);
            }

            this._canvas.addEventListener('mousemove', this.onMouseMove.bind(this));
            this._canvas.addEventListener('mousedown', this.onMouseDown.bind(this));
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
            console.log(true);
            this._selected = true;
            this._myState.selection = this;
            this._myState.dragoffx = this._mouse.x - this._x;
            this._myState.dragoffy = this._mouse.y - this._y;
            this._myState.dragging = true;
        }
    }

    ast(): Expression<StringNode> {
        throw new Error("Not implemented");
    }

    updateAST(): Expression<StringNode> {
        throw new Error("Not implemented");
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