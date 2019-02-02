import { Expression } from '../Expression';
import { Scope } from '../structural/Scope';
import { NumberNode } from '../prims/NumberNode';
import { CurveEffect } from '../effects/CurveEffect';
import { Dimensions } from '../structural/Dimensions';

export class CurveNode extends Expression<CurveNode> {

    /**
     * Constructor for a CurveNode, a node representing a curve
     * @param dx the run of the curve
     * @param dy the rise of the curve
     * @param curvature how much the curve, umm, curves
     * @param ws Preceding whitespace
     */
    constructor(
        private _dx: Expression<NumberNode>,
        private _dy: Expression<NumberNode>,
        private _curvature: Expression<NumberNode>,
        ws: string = ""
    ) {
        super(ws);
    }

    eval(context: Scope): CurveNode {
        return this;
    }

    draw(scope: Scope, dims: Dimensions): void {
        dims.width = this.dx;
        dims.height = this.dy;
        dims.curvature = this.curvature;
        let e = new CurveEffect(this, scope, dims);
        e.draw();
    }

    /**
     * Returns whether this CurveNode equals another (if their dx, dy, and curvature are equal)
     * @param right The right side of the equality (must be a CurveNode)
     */
    equals(right: Expression<any>): boolean {
        if (right instanceof CurveNode) {
            return (this.dx.equals(right.dx) && this.dy.equals(right.dy) && this.curvature.equals(right.curvature));
        }
        return false;
    }

    toString(): string {
        return this.ws + "curve(" + this.dx.toString() + ", " + this.dy.toString() + ", " + this.curvature.toString() + ")";
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

    get curvature(): Expression<NumberNode> {
        return this._curvature;
    }

    set curvature(curvature: Expression<NumberNode>) {
        this._curvature = curvature;
    }
}
