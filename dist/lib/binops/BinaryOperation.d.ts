import { Scope, Expression } from '../..';
export declare abstract class BinaryOperation<T> implements Expression<T> {
    private _left;
    private _right;
    constructor(_left: Expression<T>, _right: Expression<T>);
    abstract eval(context: Scope): T;
    draw(context: Scope, x: number, y: number): void;
    left: Expression<T>;
    right: Expression<T>;
}
