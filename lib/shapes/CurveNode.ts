import { Expression } from '../Expression';
import { Scope } from '../structural/Scope';
import { NumberNode } from '../prims/NumberNode';
import { CurveEffect } from '../effects/CurveEffect';
import { Dimensions } from '../structural/Dimensions';

export class CurveNode implements Expression<CurveNode> {
    private _dx: Expression<NumberNode>;
    private _dy: Expression<NumberNode>;
    private _curvature: Expression<NumberNode>;
    private _newLine: boolean = false;
    private _ws: string;

    /**
     * Constructor for a CurveNode, a node representing a curve
     * @param dx the run of the curve
     * @param dy the rise of the curve
     * @param curvature how much the curve, umm, curves
     * @param ws Preceding whitespace
     */
    constructor(dx: Expression<NumberNode>, dy: Expression<NumberNode>, curvature: Expression<NumberNode>, ws?: string){
        this._dx = dx;
        this._dy = dy;
        this._curvature = curvature;
        this._ws = ws;
        if (ws == undefined) {
            this._ws= "";
        }
    }

    /**
     * Returns this CurveNode
     * @param context The current program context
     */
    eval(context: Scope): CurveNode {
        return this;
    }

    /**
     * Draws the curve using CurveEffect
     * @param context The current program context
     * @param dims The line dimensions
     * @param ast The program AST
     */
    draw(context: Scope, dims: Dimensions, ast: Expression<any>): void {
        dims.width = new NumberNode(this._dx.eval(context).val, "");
        dims.height = new NumberNode(this._dy.eval(context).val, "");
        dims.curvature = new NumberNode(this._curvature.eval(context).val, "");
        let e = new CurveEffect(this);
        e.draw(context, dims, ast);
    }

    /**
     * Returns whether this CurveNode equals another (if their dx, dy, and curvature are equal)
     * @param right The right side of the equality (must be a CurveNode)
     */
    equalsVal(right: Expression<any>): boolean{
        if(right instanceof CurveNode){
            return (this.dx.equalsVal(right.dx) && this.dy.equalsVal(right.dy) && this.curvature.equalsVal(right.curvature));
        }
        return false;
    }

    move(): void{}

    /**
     * Returns a string representation of the curve
     */
    toString(): string {
        return this._ws + "curve(" + this._dx.toString() + ", " + this._dy.toString() + ", " + this._curvature.toString() + ")";
    }

    /**
     * Returns the run of the curve
     */
    get dx(): Expression<NumberNode>{
        return this._dx;
    }
    /**
     * Sets the run of the curve
     */
    set dx(dx: Expression<NumberNode>){
        this._dx = dx;
    }

    /**
     * Returns the rise of the curve
     */
    get dy(): Expression<NumberNode>{
        return this._dy;
    }
    /**
     * Sets the rise of the curve
     */
    set dy(dy: Expression<NumberNode>){
        this._dy = dy;
    }

    /**
     * Returns the curvature of the curve
     */
    get curvature(): Expression<NumberNode>{
        return this._curvature;
    }
    /**
     * Sets the curvature of the curve
     */
    set curvature(curvature: Expression<NumberNode>){
        this._curvature = curvature;
    }

    /**
     * Returns whether the element is terminated by a newline (true) or semicolon (false)
     */
    newLine(): boolean {
        return this._newLine;
    }
}
