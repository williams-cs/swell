import { NumberNode } from "../prims/NumberNode";
import { Expression } from "../Expression";
export declare class Dimensions {
    private _x;
    private _y;
    private _radius;
    private _scale;
    constructor(x: Expression<NumberNode>, y: Expression<NumberNode>, scale: Expression<NumberNode>, radius?: Expression<NumberNode>);
    x: Expression<NumberNode>;
    y: Expression<NumberNode>;
    radius: Expression<NumberNode>;
    scale: Expression<NumberNode>;
}
