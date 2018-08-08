import { BinaryOperation } from './BinaryOperation';
import { Expression } from '../Expression';
import { Scope } from '../structural/Scope';
import { Dimensions } from '../structural/Dimensions';
export declare class DeclareOp<T> extends BinaryOperation<T> {
    constructor(left: Expression<T>, right: Expression<T>);
    toString(): string;
    eval(context: Scope): T;
    draw(context: Scope, dims: Dimensions, ast: Expression<any>): void;
    equalsVal(right: Expression<any>): boolean;
    newLine(): boolean;
}
