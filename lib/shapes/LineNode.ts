import { Expression } from '../Expression';
import { Scope } from '../structural/Scope';
import { NumberNode } from '../prims/NumberNode';
import { LineEffect } from '../effects/LineEffect';
import { Dimensions } from '../structural/Dimensions';

export class LineNode extends Expression<LineNode> {

    /**
     * Constructor for a LineNode, a node representing a line
     * @param dx the run of the line
     * @param dy the rise of the line
     * @param ws Preceding whitespace
     */
    constructor(private _dx: Expression<NumberNode>, private _dy: Expression<NumberNode>, ws: string = "") {
        super(ws);
    }

    eval(context: Scope): LineNode {
        return this;
    }

    draw(scope: Scope, dims: Dimensions): void {
        dims.width = this.dx;
        dims.height = this.dy;
        let e = new LineEffect(this, scope, dims);
        e.draw();
    }

    /**
     * Returns whether this LineNode equals another (if their dx and dy are equal)
     * @param right The right side of the equality (must be a LineNode)
     */
    equals(right: Expression<any>): boolean {
        if (right instanceof LineNode) {
            return (this.dx.equals(right.dx) && this.dy.equals(right.dy));
        }
        return false;
    }

    toString(): string {
        return this.ws + "line(" + this.dx + ", " + this.dy + ")";
    }

    get dx(): Expression<NumberNode> {
        return this._dx;
    }

    set dx(dx: Expression<NumberNode>) {
        this._dx = dx;
    }

    get dy(): Expression<NumberNode> {
        return this._dy;
    }

    set dy(dy: Expression<NumberNode>) {
        this._dy = dy;
    }
}
