import { EllipseNode, Expression, Scope, Effect } from "../..";
export declare class EllipseEffect implements Effect<EllipseNode> {
    private _circle;
    private _ctx;
    private _radius;
    constructor(circle: EllipseNode);
    draw(context: Scope, x: number, y: number): void;
    ast(): Expression<EllipseNode>;
    updateAST(): Expression<EllipseNode>;
}
