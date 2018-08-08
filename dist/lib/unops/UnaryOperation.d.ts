import { Expression } from '../Expression';
import { Scope } from '../structural/Scope';
import { Dimensions } from '../structural/Dimensions';
export declare abstract class UnaryOperation<T> implements Expression<T> {
    private _val;
    private _newLine;
    constructor(_val: Expression<T>);
    abstract eval(context?: Scope): T;
    draw(context: Scope, dims: Dimensions, ast: Expression<any>): void;
    val: Expression<T>;
    equalsVal(right: Expression<any>): boolean;
    newLine(): boolean;
}
