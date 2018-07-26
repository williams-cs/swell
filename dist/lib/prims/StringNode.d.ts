import { Expression } from '../Expression';
import { Scope } from '../structural/Scope';
import { Dimensions } from '../structural/Dimensions';
export declare class StringNode implements Expression<StringNode> {
    private _str;
    private _newLine;
    constructor(str: string);
    eval(context: Scope): StringNode;
    draw(context: Scope, dims: Dimensions, ast: Expression<any>): void;
    toString(): string;
    str: string;
    readonly val: string;
    newLine(): boolean;
}
