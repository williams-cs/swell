import { BinaryOperation, Expression, Scope } from '../..';
export declare class AssignOp<T> extends BinaryOperation<T> {
    constructor(left: Expression<T>, right: Expression<T>);
    draw(context: Scope, x: number, y: number): void;
    eval(context: Scope): T;
}
