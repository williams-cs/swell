import { NumberNode } from "../prims/NumberNode";
import { Expression } from "../Expression";
export declare class Dimensions {
    private _x;
    private _y;
    private _radius;
    private _scale;
    private _width;
    private _height;
    constructor(x: Expression<NumberNode>, y: Expression<NumberNode>, scale: Expression<NumberNode>, radius?: Expression<NumberNode>);
    toString(): string;
    x: Expression<NumberNode>;
    y: Expression<NumberNode>;
    radius: Expression<NumberNode>;
    scale: Expression<NumberNode>;
    width: Expression<NumberNode>;
    height: Expression<NumberNode>;
}
