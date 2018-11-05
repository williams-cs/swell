import { ColorNode } from '../shapes/ColorNode';
import { Expression } from '../Expression';
import { NumberNode } from '../prims/NumberNode';
export declare class Ellipse {
    private _width;
    private _height;
    value: any;
    constructor(color: ColorNode, xPos: NumberNode, yPos: NumberNode, width: NumberNode, height: NumberNode);
    move(): void;
    draw(): void;
    equalsVal(right: Expression<any>): boolean;
    ast(): Expression<any>;
}
