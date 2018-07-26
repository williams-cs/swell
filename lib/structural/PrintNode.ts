import { Expression } from "../Expression";
import { Scope } from "./Scope";
import { Dimensions } from "./Dimensions";
import { NumberNode } from "../prims/NumberNode";

export class PrintNode implements Expression<any>{
    private _toPrint: Expression<any>;
    private _scale: number = 1;
    private _dims: Dimensions;
    private _newLine : boolean = false;

    constructor(toPrint: Expression<any>, dimensions?: Dimensions){
        this._toPrint = toPrint;
        this._dims = dimensions || null;
    }

    toString() : string {
        return "print(" + this.toPrint.toString() + ", " + this.dims.toString() + " )";
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
    
    get toPrint(): Expression<any>{
        return this._toPrint;
    }
    get dims(): Dimensions {
        return this._dims;
    }

    newLine() : boolean {
        return this._newLine;
    }
}