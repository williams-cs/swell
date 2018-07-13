import { Effect } from "./Effect";
import { EllipseNode } from "../shapes/EllipseNode";
import { Expression } from "../Expression";
import { Scope } from "../structural/Scope";

export class EllipseEffect implements Effect<EllipseNode> {

    private _circle: EllipseNode;
    private _ctx: any;
    private _radius: number = 10;

    constructor(circle: EllipseNode) {
        this._circle = circle;
    }

    draw(context: Scope, x: number, y: number): void {
        if (context.canvas.isDefined()) {
            let ctx = context.canvas.get().getContext("2d");
            this._ctx = ctx;
            ctx.beginPath();
            ctx.arc(x, y, this._radius, 0, Math.PI * 2, false);
            ctx.strokeStyle = "black";
            ctx.stroke();
        }
        context.effects.push(this);
    }

    ast(): Expression<EllipseNode> {
        throw new Error("Not implemented");
    }

    updateAST(): Expression<EllipseNode> {
        throw new Error("Not implemented");
    }
}