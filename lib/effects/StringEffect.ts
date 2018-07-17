import { Effect } from "./Effect";
import { StringNode } from "../prims/StringNode";
import { Expression } from "../Expression";
import { Scope } from "../structural/Scope";

export class StringEffect implements Effect<StringNode> {

    private _str: StringNode;
    private _ctx: CanvasRenderingContext2D;
    protected _canvas: HTMLCanvasElement;
    private _fontSize: number = 20;
    private _w: number;
    private _h: number;
    protected mouse: {
        x: number,
        y: number
    } = {
        x: 0,
        y: 0
    }

    constructor(str: StringNode) {
        this._str = str;
    }

    draw(context: Scope, x: number, y: number): void {
        this._canvas = context.canvas.get();
        if (context.canvas.isDefined()) {
            let ctx = context.canvas.get().getContext("2d");
            //this.canvas = context.canvas.get();
            this._ctx = ctx;
            let fontDeets: string = this._fontSize + "px Arial";
            ctx.font = fontDeets;
            ctx.fillStyle = 'black';
            ctx.fillText(this._str.val, x, y);
            let dims = ctx.measureText(this._str.val);
            this._w = dims.width;
            this._h = this._fontSize;
            context.effects.push(this);

            this._canvas.addEventListener('mousemove', this.onMouseMove);
            if (this._canvas == undefined) { console.log("shit") };
        }
        else {
            console.log("canvas is NOT defined");
        }
    }

    onMouseMove(event: any): void {
        this.mouse.x = getMousePos(this._canvas, event).x;
        this.mouse.y = getMousePos(this._canvas, event).y;
        console.log("x: " + this.mouse.x);
        console.log("y: " + this.mouse.y);
    }

    ast(): Expression<StringNode> {
        throw new Error("Not implemented");
    }

    updateAST(): Expression<StringNode> {
        throw new Error("Not implemented");
    }

    set canvas(canvas: HTMLCanvasElement) {
        this._canvas = canvas;
    }

    get canvas(): HTMLCanvasElement {
        return this._canvas;
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