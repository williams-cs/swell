import { Expression } from "../Expression";
import { Scope } from '../structural/Scope';
import { BooleanNode } from '../prims/BooleanNode';
export declare class ForNode implements Expression<any> {
    private _init;
    private _cond;
    private _post;
    private _body;
    constructor(init: Expression<any>, cond: Expression<BooleanNode>, post: Expression<any>, body: Expression<any>);
    eval(context: Scope): any;
    draw(context: Scope, x: number, y: number): void;
}
