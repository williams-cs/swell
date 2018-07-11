import { Expression } from '../Expression';
import { Scope } from '../Scope';
export declare class StringNode implements Expression<string> {
    private _str;
    constructor(str: string);
    eval(context: Scope): string;
    draw(context: Scope): void;
    str: string;
}
