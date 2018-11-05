import { NumberNode } from "../prims/NumberNode";
import { Expression } from "../Expression";
export declare class Dimensions {
    private _x;
    private _y;
    private _radius;
    private _scale;
    private _width;
    private _height;
    /**
     * Constructor for Dimensions, which stores object dimensions
     * @param x The x coordinate of the object
     * @param y The y coordinate of the object
     * @param scale The scale of the object
     * @param radius The radius of the object
     */
    constructor(x: Expression<NumberNode>, y: Expression<NumberNode>, scale: Expression<NumberNode>, radius?: Expression<NumberNode>);
    /**
     * Returns a string representation of the dimensions
     */
    toString(): string;
    /**
     * Returns the x coordinate of the object
     */
    /**
    * Sets the x coordinate of the object
    */
    x: Expression<NumberNode>;
    /**
     * Returns the y coordinate of the object
     */
    /**
    * Sets the y coordinate of the object
    */
    y: Expression<NumberNode>;
    /**
     * Returns the radius of the object
     */
    /**
    * Sets the radius of the object
    */
    radius: Expression<NumberNode>;
    /**
     * Returns the scale of the object
     */
    /**
    * Sets the scale of the object
    */
    scale: Expression<NumberNode>;
    /**
     * Returns the width of the object
     */
    /**
    * Sets the width of the object
    */
    width: Expression<NumberNode>;
    /**
     * Returns the height of the object
     */
    /**
    * Sets the height of the object
    */
    height: Expression<NumberNode>;
}
