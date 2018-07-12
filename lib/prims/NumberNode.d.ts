import { Expression } from '../Expression';
import { Scope } from '../structural/Scope';
export declare class NumberNode implements Expression<number> {
    private _val;
    constructor(val: number);
    eval(context: Scope): number;
    draw(context: Scope): void;
    val: number;
}
