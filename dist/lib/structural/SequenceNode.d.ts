import { Expression } from "../Expression";
import { Scope } from './Scope';
import { Dimensions } from "./Dimensions";
export declare class SequenceNode implements Expression<void> {
    private _left;
    private _right;
    private _leftVal;
    private _rightVal;
    private _newLine;
    readonly newLine: boolean;
    constructor(left: Expression<any>, right: Expression<any>);
    draw(context: Scope, dims: Dimensions, ast: Expression<any>): void;
    toString(): string;
    eval(context: Scope): void;
    left: Expression<any>;
    right: Expression<any>;
    readonly leftVal: any;
    readonly rightVal: any;
}
