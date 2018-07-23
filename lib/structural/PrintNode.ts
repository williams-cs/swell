import { Expression } from "../Expression";
import { Scope } from "./Scope";
import { Dimensions } from "./Dimensions";
import { NumberNode } from "../prims/NumberNode";

export class PrintNode implements Expression<any>{
    private _x: Expression<NumberNode> = new NumberNode(0);
    private _y: Expression<NumberNode> = new NumberNode(0);
    private _toPrint: Expression<any>;
    private _scale: number = 1;
    private _dims: Dimensions;

    constructor(toPrint: Expression<any>, dimensions?: Dimensions){
        this._toPrint = toPrint;
        this._x = new NumberNode(dimensions.x) || new NumberNode(0);
        this._y = new NumberNode(dimensions.y) || new NumberNode(0);
        this._dims = dimensions || null;
    }

    draw(context: Scope, dims: Dimensions, ast: PrintNode): void {
        throw new Error("Cannot call draw() on printOp");
    }

    // eval param and call draw
    eval(context: Scope): any {
        let res = this._toPrint.eval(context);
        res.draw(context, this._dims, this);
        return res;
    }

    get x(): Expression<NumberNode> {
        return this._x;
    }
    set x(val: Expression<NumberNode>){
        this._x = val;
    } 
    get y(): Expression<NumberNode> {
        return this._y;
    }
    set y(val: Expression<NumberNode>){
        this._y = val;
    }
    get toPrint(): Expression<any>{
        return this._toPrint;
    }
    get dims(): Dimensions {
        return this._dims;
    }
}