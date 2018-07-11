import { Scope, Expression } from "..";
export declare class IfOp implements Expression<any> {
    private _cond;
    private _body;
    constructor(cond: Expression<any>, body: Expression<any>);
    eval(context: Scope): any;
    draw(): void;
    readonly cond: Expression<any>;
    readonly body: Expression<any>;
}
