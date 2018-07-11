import { Expression, Scope } from "..";
export declare class GreaterThanEq implements Expression<any> {
    private _left;
    private _right;
    constructor(left: Expression<any>, right: Expression<any>);
    eval(context: Scope): boolean;
    draw(): void;
    readonly left: Expression<any>;
    readonly right: Expression<any>;
}
