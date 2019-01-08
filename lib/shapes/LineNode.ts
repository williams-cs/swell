import { Expression } from '../Expression';
import { Scope } from '../structural/Scope';
import { NumberNode } from '../prims/NumberNode';
import { LineEffect } from '../effects/LineEffect';
import { Dimensions } from '../structural/Dimensions';

export class LineNode implements Expression<LineNode> {
    private _dx: Expression<NumberNode>;
    private _dy: Expression<NumberNode>;
    private _newLine: boolean = false;
    private _ws: string;

    /**
     * Constructor for a LineNode, a node representing a line
     * @param dx the run of the line
     * @param dy the rise of the line
     * @param ws Preceding whitespace
     */
    constructor(dx: Expression<NumberNode>, dy: Expression<NumberNode>, ws?: string){
        this._dx = dx;
        this._dy = dy;
        this._ws = ws;
        if (ws == undefined) {
            this._ws= "";
        }
    }

    /**
     * Returns this LineNode
     * @param context The current program context
     */
    eval(context: Scope): LineNode {
        return this;
    }

    /**
     * Draws the line using LineEffect
     * @param context The current program context
     * @param dims The line dimensions
     * @param ast The program AST
     */
    draw(context: Scope, dims: Dimensions, ast: Expression<any>): void {
        dims.width = this._dx;
        dims.height = this._dy;
        let e = new LineEffect(this);
        e.draw(context, dims, ast);
    }

    /**
     * Returns whether this LineNode equals another (if their dx and dy are equal)
     * @param right The right side of the equality (must be a LineNode)
     */
    equalsVal(right: Expression<any>): boolean{
        if(right instanceof LineNode){
            return (this.dx.equalsVal(right.dx) && this.dy.equalsVal(right.dy));
        }
        return false;
    }

    move(): void{}

    /**
     * Returns a string representation of the line
     */
    toString(): string {
        return this._ws + "line(" + this._dx.toString() + ", " + this._dy.toString() + ")";
    }

    /**
     * Returns the run of the line
     */
    get dx(): Expression<NumberNode>{
        return this._dx;
    }
    /**
     * Sets the run of the line
     */
    set dx(dx: Expression<NumberNode>){
        this._dx = dx;
    }

    /**
     * Returns the rise of the line
     */
    get dy(): Expression<NumberNode>{
        return this._dy;
    }
    /**
     * Sets the rise of the line
     */
    set dy(dy: Expression<NumberNode>){
        this._dy = dy;
    }

    /**
     * Returns whether the element is terminated by a newline (true) or semicolon (false)
     */
    newLine(): boolean {
        return this._newLine;
    }
}
