import { Effect, NumberNode, Expression, Scope } from "../..";
export declare class NumberEffect implements Effect<NumberNode> {
    private _num;
    private _str;
    private _fontSize;
    private _w;
    private _h;
    constructor(num: NumberNode);
    draw(context: Scope, x: number, y: number): void;
    ast(): Expression<NumberNode>;
    updateAST(): Expression<NumberNode>;
}
