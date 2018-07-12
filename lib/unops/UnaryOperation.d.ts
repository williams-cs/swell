import { Expression } from '../Expression';
import { Scope } from '../structural/Scope';
export declare abstract class UnaryOperation<T> implements Expression<T> {
    private _val;
    constructor(_val: Expression<T>);
    abstract eval(context?: Scope): T;
    draw(context: Scope, x: number, y: number): void;
    val: Expression<T>;
}
