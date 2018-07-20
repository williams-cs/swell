import { Shape } from './Shape';
import { Expression } from '../Expression';
import { ColorNode } from './ColorNode';
import { Scope } from '../structural/Scope';
import { NumberNode } from '../prims/NumberNode';
import { Dimensions } from '../structural/Dimensions';
import { PrintNode } from '../structural/PrintNode';
export declare class EllipseNode extends Shape implements Expression<EllipseNode> {
    private _width;
    private _height;
    constructor(//ellipse: Ellipse, 
    color: ColorNode, xPos: Expression<NumberNode>, yPos: Expression<NumberNode>, width: Expression<NumberNode>, height: Expression<NumberNode>);
    draw(context: Scope, x: number, y: number, dims: Dimensions, ast: PrintNode): void;
    eval(context: Scope): EllipseNode;
    move(): void;
    width: Expression<NumberNode>;
    readonly heigth: Expression<NumberNode>;
    height: Expression<NumberNode>;
}
