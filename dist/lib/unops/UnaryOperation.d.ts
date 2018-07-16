import { Expression, Scope } from '../..';
export declare abstract class UnaryOperation<T> implements Expression<T> {
    private _val;
    constructor(_val: Expression<T>);
    abstract eval(context?: Scope): T;
    draw(context: Scope, x: number, y: number): void;
    val: Expression<T>;
}
