import { Expression } from '../Expression';
import { Scope } from '../structural/Scope';
import { NumberNode } from '../prims/NumberNode';
import { EllipseEffect } from '../effects/EllipseEffect';
import { Dimensions } from '../structural/Dimensions';

export class EllipseNode implements Expression<EllipseNode> {
    private _width: Expression<NumberNode>;
    private _height: Expression<NumberNode>; 
    private _newLine: boolean = false;
    private _ws: string;
    
    /**
     * Constructor for an EllipseNode, a node representing an ellipse
     * @param width The width of the ellipse
     * @param height The height of the ellipse
     * @param ws Preceding whitespace
     */
    constructor(width: Expression<NumberNode>, height: Expression<NumberNode>, ws?: string){
        this._width = width;
        this._height = height;
        this._ws = ws;
        if (ws == undefined) {
            this._ws= "";
        }
    }

    /**
     * Returns this EllipseNode
     * @param context The current program context
     */
    eval(context: Scope): EllipseNode {
        return this;
    }

    /**
     * Draws the ellipse on the canvas using EllipseEffect
     * @param context The current program context
     * @param dims The dimensions of the ellipse
     * @param ast The program AST
     */
    draw(context: Scope, dims: Dimensions, ast: Expression<any>): void {
        dims.width = this._width;
        dims.height = this._height;
        let e = new EllipseEffect(this);
        e.draw(context, dims, ast);
    }

    /**
     * Returns whether this EllipseNode equals another EllipseNode (if their widths and heights are equal)
     * @param right The right side of the equality (must be an EllipseNode)
     */
    equalsVal(right: Expression<any>): boolean{
        if(right instanceof EllipseNode){
            return (this.width.equalsVal(right.width) && this.height.equalsVal(right.height));
        }
        return false;
    }

    /**
     * Returns a string representation of the ellipse
     */
    toString(): string {
        return this._ws + "ellipse(" + this._width.toString() + ", " + this._height.toString() + ")"
    }

    move(): void{}

    /**
     * Returns the ellipse width
     */
    get width(): Expression<NumberNode>{
        return this._width;
    }
    /**
     * Sets the ellipse width
     */
    set width(width: Expression<NumberNode>){
        this._width = width;
    }

     /**
     * Returns the ellipse height
     */
    get height(): Expression<NumberNode>{
        return this._height;
    }
    /**
     * Sets the ellipse height
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
    // get methods? 
}