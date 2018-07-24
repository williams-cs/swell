import { ColorNode } from './ColorNode';
import { Expression } from '../Expression';
import { NumberNode } from '../prims/NumberNode';
export declare class Ellipse {
    private _width;
    private _height;
    value: any;
    constructor(color: ColorNode, xPos: NumberNode, yPos: NumberNode, width: NumberNode, height: NumberNode);
    move(): void;
    draw(): void;
    ast(): Expression<any>;
}
