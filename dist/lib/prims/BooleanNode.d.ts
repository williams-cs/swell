import { Expression } from "../Expression";
import { Scope } from '../structural/Scope';
import { Dimensions } from "../structural/Dimensions";
export declare class BooleanNode implements Expression<BooleanNode> {
    private _val;
    constructor(val: boolean);
    eval(context: Scope): BooleanNode;
    draw(context: Scope, dims: Dimensions, ast: Expression<any>): void;
    toString(): string;
    val: boolean;
}
