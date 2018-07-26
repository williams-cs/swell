import { Effect } from "./Effect";
import { StringNode } from "../prims/StringNode";
import { Expression } from "../Expression";
import { Scope } from "../structural/Scope";
import { Dimensions } from "../structural/Dimensions";
import { LogEvent } from "../logging/LogEvent";
export declare class StringEffect implements Effect<StringNode> {
    private _ast;
    private _context;
    private _ctx;
    private _canvas;
    private _str;
    private _dims;
    private _fontSize;
    private _x1;
    private _y1;
    private _size1;
    private _corner;
    private _isSelected;
    private _isEditing;
    private _isListening;
    private _isDragging;
    private _isResizing;
    private _myState;
    private _mouse;
    private _textMetrics;
    constructor(str: StringNode);
    draw(context: Scope, dims: Dimensions, ast: Expression<any>): void;
    update(): void;
    addEventListeners(): void;
    onMouseMove(event: any): void;
    onMouseDown(event: any): void;
    onMouseUp(event: any): void;
    modifyDrag(): void;
    modifyTextCursor(): void;
    modifyText(event: any): void;
    modifyResize(isTooSmall: boolean): void;
    modifyState(guideContains: boolean, contains: boolean): void;
    modifyReset(): void;
    getMousePosition(): void;
    isMouseOutside(event: any): void;
    contains(mx: number, my: number): boolean;
    guideContains(mx: number, my: number): number;
    drawTextGuides(x: number, y: number, w: number, h: number, corner: number): void;
    drawSquare(x: number, y: number, w: number, h: number, color: string): void;
    logPaint(): LogEvent<any>;
    logMove(): LogEvent<any>;
    logResize(): LogEvent<any>;
    ast(): Expression<StringNode>;
    canvas: HTMLCanvasElement;
    readonly x: number;
    readonly y: number;
    readonly dims: Dimensions;
}
