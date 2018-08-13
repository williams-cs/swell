import { ColorNode } from '../shapes/ColorNode';
import { NumberNode } from '../prims/NumberNode';
import { Expression } from '../Expression';
export declare abstract class Shape {
    private _color;
    private _xPos;
    private _yPos;
    /**
     * Abstract class constructor for a Shape
     * @param _color The shape color
     * @param _xPos The x coordinate of the shape
     * @param _yPos The y coordinate of the shape
     */
    constructor(_color: ColorNode, _xPos: Expression<NumberNode>, _yPos: Expression<NumberNode>);
    color: ColorNode;
    xPos: Expression<NumberNode>;
    yPos: Expression<NumberNode>;
    abstract move(): void;
}
