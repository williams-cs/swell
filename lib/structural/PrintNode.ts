import { Expression } from "../Expression";
import { Scope } from "./Scope";
import { NumberNode } from "../prims/NumberNode";

export class PrintNode implements Expression<any>{
    private _x: NumberNode = new NumberNode(0);
    private _y: NumberNode = new NumberNode(0);
    private _toPrint: Expression<any>

    constructor(toPrint: Expression<any>, x?: NumberNode, y?: NumberNode){
        this._toPrint = toPrint;
        //this._x = x || 0;
        //this._y = y || 0;
        this._x = x || new NumberNode(0);
        this._y = y || new NumberNode(0);
    }

    draw(context: Scope, x: number, y: number): void {
        throw new Error("Cannot call draw() on printOp");
    }

    // eval param and call draw
    eval(context: Scope): any {
        let res = this._toPrint.eval(context);
        res.draw(context, this._x, this._y);
        return res;
    }

    get x(): number {
        return this._x.val;
    }
    set x(val: number){
        this._x = new NumberNode(val);
    } 
    get y(): number {
        return this._y.val;
    }
    set y(val: number){
        this._y = new NumberNode(val);
    }
    get toPrint(): Expression<any>{
        return this._toPrint;
    }
}