import { Effect } from "./Effect";
import { StringNode } from "../prims/StringNode";
import { Expression } from "../Expression";
import { Scope } from "../structural/Scope";

export class StringEffect implements Effect<StringNode> {

    private _str: StringNode;
    private _ctx: any;
    private _fontSize: number = 20;
    private _w: number;
    private _h: number;

    constructor(str: StringNode) {
        this._str = str;
    }

    draw(context: Scope, x: number, y: number): void {
        if (context.canvas.isDefined()) {
            let ctx = context.canvas.get().getContext("2d");
            this._ctx = ctx;
            let fontDeets: string = this._fontSize + "px Arial";
            ctx.font = fontDeets;
            ctx.fillStyle = 'black';
            ctx.fillText(this._str.str, x, y);
            console.log("canvas is defined");
            // let dims = ctx.measureText(this._str.str);
            // this._w = dims.width;
            // this._h = this._fontSize;
        }
    }

    ast(): Expression<StringNode> {
        throw new Error("Not implemented");
    }

    updateAST(): Expression<StringNode> {
        throw new Error("Not implemented");
    }

    drawTextGuides(x: number, y: number, w: number, h: number, corner: number) { //corner is 2 or 4
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