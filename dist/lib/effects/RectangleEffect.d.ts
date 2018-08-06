import { Effect } from "./Effect";
import { NumberNode } from "../prims/NumberNode";
import { RectangleNode } from "../shapes/RectangleNode";
import { Expression } from "../Expression";
import { Scope } from "../structural/Scope";
import { Dimensions } from "../structural/Dimensions";
import { LogEvent } from "../logging/LogEvent";
export declare class RectangleEffect implements Effect<RectangleNode> {
    private _rect;
    private _dims;
    private _ast;
    private _x;
    private _y;
    private _w;
    private _h;
    private _ctx;
    private _canvas;
    private _corner;
    private _isSelected;
    private _isDragging;
    private _isResizing;
    private _isChangingDims;
    private _isSelectingMultiple;
    private _x1;
    private _y1;
    private _size1;
    private _context;
    private _ratio;
    private _dragoffx;
    private _dragoffy;
    private _initDistance;
    private _mouse;
    constructor(rect: RectangleNode);
    draw(context: Scope, dims: Dimensions, ast: Expression<any>): void;
    update(): void;
    addEventListeners(): void;
    contains(mx: number, my: number): boolean;
    guideContains(mx: number, my: number): number;
    drawGuides(x: number, y: number, w: number, h: number, corner: number): void;
    drawSquare(x: number, y: number, w: number, h: number, color: string): void;
    onMouseMove(event: any): void;
    onMouseDown(event: any): void;
    onMouseUp(event: any): void;
    onShiftDown(event: any): void;
    onShiftUp(event: any): void;
    modifyDrag(): void;
    modifyResize(widthTooSmall: boolean, heightTooSmall: boolean): void;
    modifyResizeHelper(): void;
    modifyChangeDims(widthTooSmall: boolean, heightTooSmall: boolean): void;
    modifyChangeDimsHelper(): void;
    /**
     *
     * @param guideContains
     * @param contains
     */
    modifyState(guideContains: number, contains: boolean): void;
    modifyReset(): void;
    getMousePosition(): void;
    isMouseOutside(event: any): void;
    logPaint(): LogEvent<any>;
    logMove(): LogEvent<any>;
    logResize(): LogEvent<any>;
    logClick(): LogEvent<any>;
    ast(): Expression<RectangleNode>;
    updateAST(): Expression<NumberNode>;
    readonly x: number;
    readonly y: number;
    readonly dims: Dimensions;
    readonly selected: boolean;
    toString(): string;
}
