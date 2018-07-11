import { IfOp } from "./IfOp";
import { ElseIfOp } from "./ElseIfOp";
import { Expression, Scope } from "..";
import { ElseOp } from "./ElseOp";
export declare class Conditional implements Expression<any> {
    private _ifOp;
    private _elseOp;
    private _elseIfOps;
    private _ifRes;
    private _elseIfRes;
    private _elseRes;
    constructor(ifOp: IfOp, elseOp?: ElseOp, ...elseIfOps: ElseIfOp[]);
    eval(context: Scope): any;
    draw(): void;
}
