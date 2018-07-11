import { Expression } from '../Expression';
import { Scope } from '../Scope';
export declare abstract class UnaryOperation<T> implements Expression<T> {
    private _val;
    constructor(_val: Expression<T>);
    abstract eval(context?: Scope): T;
    draw(context: Scope): void;
    val: Expression<T>;
}
