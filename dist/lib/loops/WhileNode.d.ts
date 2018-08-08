import { Expression } from "../Expression";
import { Scope } from '../structural/Scope';
import { Dimensions } from "../structural/Dimensions";
export declare class WhileNode implements Expression<any> {
    private _cond;
    private _body;
    private _newLine;
    private _ws;
    constructor(cond: Expression<any>, body: Expression<any>, ws: string);
    eval(context: Scope): any;
    equalsVal(right: Expression<any>): boolean;
    draw(context: Scope, dims: Dimensions, ast: Expression<any>): string;
    toString(): string;
    newLine(): boolean;
}
