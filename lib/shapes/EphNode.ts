import { Expression } from '../Expression';
import { Scope } from '../structural/Scope';
import { NumberNode } from '../prims/NumberNode';
import { RectangleEffect } from '../effects/RectangleEffect';
import { Dimensions } from '../structural/Dimensions';
import { EphEffect } from '../effects/EphEffect';

export class EphNode implements Expression<EphNode> {
    //private _image: HTMLImageElement;
    private _width: Expression<NumberNode>;
    private _height: Expression<NumberNode>; 
    private _newLine: boolean = false;
    private _ws: string;
    
    /**
     * Constructor for an EphNode, a node representing something very special
     * @param width The width of the EphNode
     * @param height The height of the EphNode
     * @param ws Preceding whitespace
     */
    constructor(width: Expression<NumberNode>, height: Expression<NumberNode>, ws?: string){
        //this._image = image;
        this._width = width;
        this._height = height;
        this._ws = ws;
        if (ws == undefined) {
            this._ws= "";
        }
    }

    /**
     * Returns this RectangleNode
     * @param context The current program context
     */
    eval(context: Scope): EphNode {
        return this;
    }

    /**
     * Draws the rectangle using RectangleEffect
     * @param context The current program context
     * @param dims The rectangle dimensions
     * @param ast The program AST
     */
    draw(context: Scope, dims: Dimensions, ast: Expression<any>): void {
        dims.width = new NumberNode(this._width.eval(context).val, "");
        dims.height = new NumberNode(this._height.eval(context).val, "");
        let e = new EphEffect(this);
        e.draw(context, dims, ast);
    }

    /**
     * Returns whether this EphNode equals another (if their widths and heights are equal)
     * @param right The right side of the equality (must be a RectangleNode)
     */
    equalsVal(right: Expression<any>): boolean{
        if(right instanceof EphNode){
            return (this.width.equalsVal(right.width) && this.height.equalsVal(right.height));
        }
        return false;
    }

    move(): void{}

    /**
     * Returns a string representation of the EphNode
     */
    toString(): string {
        return this._ws + "eph(" + this._width.toString() + ", " + this._height.toString() + ")";
    }

    /**
     * Returns the image associated with the EphNode
     */
    // get image(): HTMLImageElement{
    //     return this._image;
    // }

    /**
     * Returns the width of the EphNode
     */
    get width(): Expression<NumberNode>{
        return this._width;
    }
    /**
     * Sets the width of the EphNode
     */
    set width(width: Expression<NumberNode>){
        this._width = width;
    }

    /**
     * Returns the height of the EphNode
     */
    get height(): Expression<NumberNode>{
        return this._height;
    }
    /**
     * Sets the height of the EphNode
     */
    set height(height: Expression<NumberNode>){
        this._height = height;
    }

    /**
     * Returns whether the element is terminated by a newline (true) or semicolon (false)
     */
    newLine(): boolean {
        return this._newLine;
    }
}