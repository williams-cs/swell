import { BinaryOperation } from './BinaryOperation';
import { Expression } from '../Expression';
import { Scope } from '../structural/Scope';
import { Dimensions } from '../structural/Dimensions';
export declare class AssignOp<T> extends BinaryOperation<T> {
    constructor(left: Expression<T>, right: Expression<T>);
    draw(context: Scope, dims: Dimensions, ast: Expression<any>): void;
    eval(context: Scope): T;
    toString(): string;
    readonly newLine: boolean;
}
