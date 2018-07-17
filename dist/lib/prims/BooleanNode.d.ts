import { Expression } from "../Expression";
import { Scope } from '../structural/Scope';
export declare class BooleanNode implements Expression<BooleanNode> {
    private _val;
    constructor(val: boolean);
    eval(context: Scope): BooleanNode;
    draw(context: Scope, x: number, y: number): void;
    val: boolean;
}
