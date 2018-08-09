import { Expression } from '../Expression';
import { Scope } from '../structural/Scope';
import { NumberNode } from '../prims/NumberNode';
import { Dimensions } from '../structural/Dimensions';
export declare class Decrement implements Expression<any> {
    private innerRep;
    private expr;
    private _ws;
    constructor(variable: Expression<any>, ws?: string);
    eval(context: Scope): NumberNode;
    toString(): string;
    draw(context: Scope, dims: Dimensions, ast: Expression<any>): void;
    equalsVal(right: Expression<any>): boolean;
    newLine(): boolean;
}
