import { Scope, Expression } from "..";
export declare class ElseOp implements Expression<any> {
    private _body;
    constructor(body: Expression<any>);
    eval(context: Scope): any;
    draw(): void;
    readonly body: Expression<any>;
}
