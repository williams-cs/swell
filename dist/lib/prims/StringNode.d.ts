import { Expression } from '../Expression';
import { Scope } from '../structural/Scope';
import { Dimensions } from '../structural/Dimensions';
export declare class StringNode implements Expression<StringNode> {
    private _str;
    private _newLine;
    private _ws;
    constructor(str: string, ws?: string);
    eval(context: Scope): StringNode;
    draw(context: Scope, dims: Dimensions, ast: Expression<any>): void;
    equalsVal(right: Expression<any>): boolean;
    toString(): string;
    str: string;
    readonly val: string;
    newLine(): boolean;
}
