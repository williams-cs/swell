import { Expression } from "./Expression";
import { Scope } from "./Scope";

export class PrintNode implements Expression<any>{
    private _x: number = 0;
    private _y: number = 0;
    private _toPrint: Expression<any>

    constructor(toPrint: Expression<any>, x?: number, y?: number){
        this._toPrint = toPrint;
        this._x = x || 0;
        this._y = y || 0;
    }

    draw(context: Scope): void {
        throw new Error("Cannot call draw() on printOp");
    }

    // eval param and call draw
    eval(context: Scope): any {
        let res = this._toPrint.eval(context);
        res.draw(context, this._x, this._y);
        return res;
    }

    get x() : number {
        return this._x;
    }
    set x(val: number){
        this._x = val;
    } 
    get y() : number {
        return this._y;
    }
    set y(val: number){
        this._y = val;
    }
}