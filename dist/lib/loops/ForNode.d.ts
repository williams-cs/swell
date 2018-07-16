import { Expression } from "../Expression";
import { Scope } from '../structural/Scope';
import { DeclareOp } from '../binops/DeclareOp';
export declare class ForNode implements Expression<any> {
    private _init;
    private _cond;
    private _adj;
    private _body;
    constructor(init: DeclareOp<any>, cond: Expression<any>, adj: Expression<any>, body: Expression<any>);
    eval(context: Scope): any;
    draw(context: Scope, x: number, y: number): void;
}
