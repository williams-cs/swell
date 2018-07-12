import { Scope, Expression } from "..";
export declare class BooleanNode implements Expression<boolean> {
    private _val;
    constructor(val: boolean);
    eval(context: Scope): boolean;
    draw(context: Scope, x: number, y: number): void;
    val: boolean;
}
