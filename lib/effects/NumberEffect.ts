import { Effect } from "./Effect";
import { NumberNode } from "../prims/NumberNode";
import { Expression } from "../Expression";
import { Scope } from "../structural/Scope";
import { PaintEvent } from "../logging/PaintEvent";
import { Dimensions } from "../structural/Dimensions";

export class NumberEffect implements Effect<NumberNode> {

    private _x: number;
    private _y: number;
    private _num: NumberNode;
    private _str: string;
    private _fontSize: number = 20;
    private _w: number;
    private _h: number;

    constructor(num: NumberNode) {
        this._num = num;
        this._str = num.val.toString();
    }
    
    draw(context: Scope, dims: Dimensions, ast: Expression<any>): void {
        if (context.canvas.isDefined()) {
            let ctx = context.canvas.get().getContext("2d");
            let fontDeets: string = this._fontSize + "px Arial";
            ctx.font = fontDeets;
            ctx.fillStyle = 'black';
            ctx.fillText(this._str, this._x, this._y);
            let dims = ctx!.measureText(this._str);
            this._w = dims.width;
            this._h = this._fontSize;
        }
    }

    log(): string {
        let paint = new PaintEvent(this._str);
        return paint.assembleLog();
    }

    ast(): Expression<NumberNode> {
        throw new Error("Not implemented");
    }

    updateAST(): Expression<NumberNode> {
        throw new Error("Not implemented");
    }

    x(): number {
        return this._x;
    }
    y(): number {
        return this._y;
    }
}