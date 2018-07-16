import { ColorNode, NumberNode } from '../..';
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
