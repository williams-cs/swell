import { ColorNode } from './ColorNode';
import { NumberNode } from '../prims/NumberNode';
export declare abstract class Shape {
    private _color;
    private _xPos;
    private _yPos;
    constructor(_color: ColorNode, _xPos: NumberNode, _yPos: NumberNode);
    color: ColorNode;
    xPos: NumberNode;
    yPos: NumberNode;
    abstract move(): void;
}
