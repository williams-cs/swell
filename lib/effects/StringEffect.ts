import { Effect } from "./Effect";
import { StringNode } from "../prims/StringNode";
import { Expression } from "../Expression";
import { Scope } from "../Scope";

export class StringEffect implements Effect<StringNode> {

    private _str: StringNode;
    private _fontSize: number = 20;
    private _w: number;
    private _h: number;

    constructor(str: StringNode) {
        this._str = str;
    }

    draw(context: Scope, x: number, y: number): void {
        if (context.canvas.isDefined()) {
            let ctx = context.canvas.get().getContext("2d");
            let fontDeets: string = this._fontSize + "px Arial";
            ctx!.font = fontDeets;
            ctx!.fillStyle = 'black';
            ctx!.fillText(this._str.str, x, y);
            let dims = ctx!.measureText(this._str.str);
            this._w = dims.width;
            this._h = this._fontSize;
        }
    }

    ast(): Expression<StringNode> {
        throw new Error("Not implemented");
    }

    updateAST(): Expression<StringNode> {
        throw new Error("Not implemented");
    }
}