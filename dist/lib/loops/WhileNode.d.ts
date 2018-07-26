import { Expression } from "../Expression";
import { Scope } from '../structural/Scope';
import { Dimensions } from "../structural/Dimensions";
export declare class WhileNode implements Expression<any> {
    private _cond;
    private _body;
    private _newLine;
    constructor(cond: Expression<any>, body: Expression<any>);
    eval(context: Scope): any;
    draw(context: Scope, dims: Dimensions, ast: Expression<any>): void;
    toString(): string;
    readonly newLine: boolean;
}
