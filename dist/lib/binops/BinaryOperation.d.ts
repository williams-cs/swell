import { Scope } from '../structural/Scope';
import { Expression } from '../Expression';
import { Dimensions } from '../structural/Dimensions';
export declare abstract class BinaryOperation<T> implements Expression<T> {
    private _left;
    private _right;
    private _newLine;
    constructor(_left: Expression<T>, _right: Expression<T>);
    abstract eval(context: Scope): T;
    draw(context: Scope, dims: Dimensions, ast: Expression<any>): void;
    equalsVal(right: Expression<any>): boolean;
    toString(): string;
    left: Expression<T>;
    right: Expression<T>;
    newLine(): boolean;
}
