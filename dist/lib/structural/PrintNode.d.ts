import { Expression, Scope, NumberNode } from "../..";
export declare class PrintNode implements Expression<any> {
    private _x;
    private _y;
    private _toPrint;
    constructor(toPrint: Expression<any>, x?: NumberNode, y?: NumberNode);
    draw(context: Scope, x: number, y: number): void;
    eval(context: Scope): any;
    x: number;
    y: number;
}
