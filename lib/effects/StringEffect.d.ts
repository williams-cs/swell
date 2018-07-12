import { Effect } from "./Effect";
import { StringNode } from "../prims/StringNode";
import { Expression } from "../Expression";
import { Scope } from "../structural/Scope";
export declare class StringEffect implements Effect<StringNode> {
    private _str;
    private _fontSize;
    private _w;
    private _h;
    constructor(str: StringNode);
    draw(context: Scope, x: number, y: number): void;
    ast(): Expression<StringNode>;
    updateAST(): Expression<StringNode>;
}
