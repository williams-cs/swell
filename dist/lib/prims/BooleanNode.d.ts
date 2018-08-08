import { Expression } from "../Expression";
import { Scope } from '../structural/Scope';
import { Dimensions } from "../structural/Dimensions";
export declare class BooleanNode implements Expression<BooleanNode> {
    private _val;
    private _newLine;
    private _ws;
    constructor(val: boolean, ws?: string);
    eval(context: Scope): BooleanNode;
    draw(context: Scope, dims: Dimensions, ast: Expression<any>): void;
    toString(): string;
    val: boolean;
    newLine(): boolean;
}
