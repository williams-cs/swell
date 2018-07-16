import { BinaryOperation } from './BinaryOperation';
import { Expression } from '../Expression';
import { Scope } from '../structural/Scope';
export declare class DeclareOp<T> extends BinaryOperation<T> {
    constructor(left: Expression<T>, right: Expression<T>);
    draw(context: Scope, x: number, y: number): void;
    eval(context: Scope): T;
}
