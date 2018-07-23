import { ColorNode } from './ColorNode';
import { NumberNode } from '../prims/NumberNode';
import { Expression } from '../Expression';
export declare abstract class Shape {
    private _color;
    private _xPos;
    private _yPos;
    constructor(_color: ColorNode, _xPos: Expression<NumberNode>, _yPos: Expression<NumberNode>);
    color: ColorNode;
    xPos: Expression<NumberNode>;
    yPos: Expression<NumberNode>;
    abstract move(): void;
}
