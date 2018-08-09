import { Effect } from "./Effect";
import { NumberNode } from "../prims/NumberNode";
import { Expression } from "../Expression";
import { Scope } from "../structural/Scope";
import { Dimensions } from "../structural/Dimensions";
import { LogEvent } from "../logging/LogEvent";
export declare class NumberEffect implements Effect<NumberNode> {
    private _dims;
    private _x;
    private _y;
    private _num;
    private _str;
    private _fontSize;
    private _w;
    private _h;
    private _isSelected;
    private _justDragged;
    idObj: {
        readonly _id: number;
    };
    constructor(num: NumberNode);
    draw(context: Scope, dims: Dimensions, ast: Expression<any>): void;
    update(): void;
    logPaint(): LogEvent<any>;
    ast(): Expression<NumberNode>;
    updateAST(): Expression<NumberNode>;
    initID(id: number): void;
    readonly x: number;
    readonly y: number;
    readonly dims: Dimensions;
    readonly selected: boolean;
    getID(): number;
    getJustDragged(): boolean;
    setJustDragged(val: boolean): void;
    toSelString(): string;
    toDragString(): string;
    toIDString(): string;
    equalsVal(right: Effect<any>): boolean;
}
