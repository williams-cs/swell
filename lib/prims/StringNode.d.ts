import { Expression } from '../Expression';
import { Scope } from '../Scope';
export declare class StringNode implements Expression<StringNode> {
    private _str;
    constructor(str: string);
    eval(context: Scope): StringNode;
    draw(context: Scope): void;
    str: string;
}
