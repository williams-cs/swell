import { Expression, Scope } from "..";
export declare class SequenceNode implements Expression<void> {
    private _left;
    private _right;
    private _leftVal;
    private _rightVal;
    constructor(left: Expression<any>, right: Expression<any>);
    draw(context: Scope): void;
    eval(context: Scope): void;
    left: Expression<any>;
    right: Expression<any>;
    readonly leftVal: any;
    readonly rightVal: any;
}
