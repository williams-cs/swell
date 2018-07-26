import { Expression } from "../Expression";
import { Scope } from '../structural/Scope';
import { BooleanNode } from '../prims/BooleanNode';
import { Dimensions } from "../structural/Dimensions";
export declare class ForNode implements Expression<any> {
    private _init;
    private _cond;
    private _post;
    private _body;
    private _newLine;
    constructor(init: Expression<any>, cond: Expression<BooleanNode>, post: Expression<any>, body: Expression<any>);
    eval(context: Scope): any;
    draw(context: Scope, dims: Dimensions, ast: Expression<any>): void;
    toString(): string;
    readonly newLine: boolean;
}
