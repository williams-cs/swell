import { Expression } from '../Expression';
import { Scope } from '../Scope';
export declare class NumberNode implements Expression<number> {
    private _val;
    constructor(val: number);
    draw(context: Scope): void;
    eval(context: Scope): number;
    val: number;
}
