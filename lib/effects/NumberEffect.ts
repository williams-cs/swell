import { Effect } from "./Effect";
import { NumberNode } from "../prims/NumberNode";
import { Expression } from "../Expression";
import { Scope } from "../structural/Scope";
import { PaintEvent } from "../logging/PaintEvent";
import { Dimensions } from "../structural/Dimensions";
import { DragEvent } from "../logging/DragEvent";
import { ResizeEvent } from "../logging/ResizeEvent";
import { LogEvent } from "../logging/LogEvent";

export class NumberEffect implements Effect<NumberNode> {

    private _dims: Dimensions = null;
    private _x: number;
    private _y: number;
    private _num: NumberNode;
    private _str: string;
    private _fontSize: number = 20;
    private _w: number;
    private _h: number;
    private _isSelected: boolean;
    private _justDragged: boolean;

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

    update(): void {

    }

    logPaint(): LogEvent<any> {
        return null;
        //return new PaintEvent(this._str, this._dims.x.eval(this._context).val, this._dims.y.eval(this._context).val););
    }

    // logMove(): string {
    //     let moveStr = new DragEvent(this._str, this._x1, this._y1, this._dims.x, this._dims.y);
    //     return moveStr.assembleLog();
    // }

    // logResize(): string {
    //     let sizeStr = new ResizeEvent(this._str, this._size1, this._fontSize);
    //     return sizeStr.assembleLog();
    // }

    ast(): Expression<NumberNode> {
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

    get selected(): boolean {
        return this._isSelected;
    }
    getJustDragged(): boolean {
        return this._justDragged;
    }
    setJustDragged(val: boolean) {
        this._justDragged = val;
    }

    toSelString(): string {
        return this._num + " at " + this._dims.x + " , " + this._dims.y;
    }
    toDragString(): string {
        return "are we even using this?";
    }
    equalsVal(right: Effect<any>): boolean{
        return false;
    }
}