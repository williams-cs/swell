import { Expression } from '../Expression';
import { Scope } from '../structural/Scope';
import { NumberNode } from '../prims/NumberNode';
import { Dimensions } from '../structural/Dimensions';
export declare class Decrement implements Expression<any> {
    private innerRep;
    private expr;
    constructor(variable: Expression<any>);
    draw(context: Scope, dims: Dimensions, ast: Expression<any>): void;
    eval(context: Scope): NumberNode;
    toString(): string;
    newLine(): boolean;
}
