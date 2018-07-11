import { BinaryOperation } from './BinaryOperation';
import { Expression } from '../Expression';
import { Scope } from '../Scope';
export declare class AssignOp<T> extends BinaryOperation<T> {
    constructor(left: Expression<T>, right: Expression<T>);
    draw(context: Scope): void;
    eval(context: Scope): T;
}
