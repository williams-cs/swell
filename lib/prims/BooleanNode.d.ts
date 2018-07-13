import { Scope, Expression } from "..";
export declare class BooleanNode implements Expression<BooleanNode> {
    private _val;
    constructor(val: boolean);
    eval(context: Scope): BooleanNode;
    draw(context: Scope, x: number, y: number): void;
    val: boolean;
}
