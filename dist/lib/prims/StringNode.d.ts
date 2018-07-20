import { Expression } from '../Expression';
import { Scope } from '../structural/Scope';
import { Dimensions } from '../structural/Dimensions';
import { PrintNode } from '../structural/PrintNode';
export declare class StringNode implements Expression<StringNode> {
    private _str;
    constructor(str: string);
    eval(context: Scope): StringNode;
    draw(context: Scope, x: number, y: number, dims: Dimensions, ast: PrintNode): void;
    str: string;
    readonly val: string;
}
