import { BinaryOperation } from './BinaryOperation';
import { Expression } from '../Expression';
import { Scope } from '../structural/Scope';
import { Dimensions } from '../structural/Dimensions';
export declare class AssignOp<T> extends BinaryOperation<T> {
    private _ws;
    constructor(left: Expression<T>, right: Expression<T>, ws?: string);
    eval(context: Scope): T;
    toString(): string;
    draw(context: Scope, dims: Dimensions, ast: Expression<any>): void;
    equalsVal(right: Expression<any>): boolean;
    newLine(): boolean;
}
