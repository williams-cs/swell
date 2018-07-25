import { Expression } from '../Expression';
import { Scope } from '../structural/Scope';
import { NumberNode } from '../prims/NumberNode';
import { Dimensions } from '../structural/Dimensions';
export declare class RectangleNode implements Expression<RectangleNode> {
    private _width;
    private _height;
    constructor(width: Expression<NumberNode>, height: Expression<NumberNode>);
    draw(context: Scope, dims: Dimensions, ast: Expression<any>): void;
    eval(context: Scope): RectangleNode;
    move(): void;
    width: Expression<NumberNode>;
    height: Expression<NumberNode>;
}
