import { Expression, Scope } from '../..';
export declare class NumberNode implements Expression<NumberNode> {
    private _val;
    constructor(val: number);
    eval(context: Scope): NumberNode;
    draw(context: Scope, x: number, y: number): void;
    val: number;
}
