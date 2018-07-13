import { Shape } from './Shape';
import { Expression } from '../Expression';
import { ColorNode } from './ColorNode';
import { Scope } from '..';
import { NumberNode } from '../prims/NumberNode';
export declare class EllipseNode extends Shape implements Expression<EllipseNode> {
    private _width;
    private _height;
    constructor(//ellipse: Ellipse, 
    color: ColorNode, xPos: NumberNode, yPos: NumberNode, width: NumberNode, height: NumberNode);
    draw(context: Scope, x: number, y: number): void;
    eval(context: Scope): EllipseNode;
    move(): void;
    width: NumberNode;
    readonly heigth: NumberNode;
    height: NumberNode;
}
