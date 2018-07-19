import { Effect } from "./Effect";
import { EllipseNode } from "../shapes/EllipseNode";
import { Expression } from "../Expression";
import { Scope } from "../structural/Scope";
export declare class EllipseEffect implements Effect<EllipseNode> {
    private _x;
    private _y;
    private _circle;
    private _ctx;
    private _radius;
    constructor(circle: EllipseNode);
    draw(context: Scope, x: number, y: number): void;
    ast(): Expression<EllipseNode>;
    updateAST(): Expression<EllipseNode>;
    x(): number;
    y(): number;
}
