import { Expression } from '../Expression';
import { Scope } from '../structural/Scope';
import { NumberNode } from '../prims/NumberNode';
import { Dimensions } from '../structural/Dimensions';
export declare class EllipseNode implements Expression<EllipseNode> {
    private _width;
    private _height;
    private _newLine;
    private _ws;
    constructor(width: Expression<NumberNode>, height: Expression<NumberNode>, ws: string);
    draw(context: Scope, dims: Dimensions, ast: Expression<any>): void;
    equalsVal(right: Expression<any>): boolean;
    eval(context: Scope): EllipseNode;
    move(): void;
    width: Expression<NumberNode>;
    height: Expression<NumberNode>;
    newLine(): boolean;
    toString(): string;
}
