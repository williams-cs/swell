import { Ellipse } from './Ellipse';
import { Shape } from './Shape';
import { Expression } from '../Expression';
import { ColorNode } from './ColorNode';
import { Scope } from '..';
import { NumberNode } from '../prims/NumberNode';
export declare class EllipseNode extends Shape implements Expression<Ellipse> {
    private _width;
    private _height;
    constructor(//ellipse: Ellipse, 
    color: ColorNode, xPos: NumberNode, yPos: NumberNode, width: NumberNode, height: NumberNode);
    draw(context: Scope): void;
    eval(context: Scope): any;
    move(): void;
    width: NumberNode;
    readonly heigth: NumberNode;
    height: NumberNode;
}
