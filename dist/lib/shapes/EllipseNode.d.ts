import { Shape } from './Shape';
import { Expression } from '../Expression';
import { ColorNode } from './ColorNode';
import { Scope } from '../structural/Scope';
import { NumberNode } from '../prims/NumberNode';
import { Dimensions } from '../structural/Dimensions';
export declare class EllipseNode extends Shape implements Expression<EllipseNode> {
    private _width;
    private _height;
    constructor(color: ColorNode, xPos: Expression<NumberNode>, yPos: Expression<NumberNode>, width: Expression<NumberNode>, height: Expression<NumberNode>);
    draw(context: Scope, dims: Dimensions, ast: Expression<any>): void;
    eval(context: Scope): EllipseNode;
    move(): void;
    width: Expression<NumberNode>;
    readonly heigth: Expression<NumberNode>;
    height: Expression<NumberNode>;
}
