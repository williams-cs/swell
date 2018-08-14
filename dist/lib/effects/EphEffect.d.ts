import { Effect } from "./Effect";
import { NumberNode } from "../prims/NumberNode";
import { EphNode } from "../shapes/EphNode";
import { Expression } from "../Expression";
import { Scope } from "../structural/Scope";
import { Dimensions } from "../structural/Dimensions";
import { LogEvent } from "../logging/LogEvent";
export declare class EphEffect implements Effect<EphNode> {
    private _eph;
    private _dims;
    private _ctx;
    private _canvas;
    private _corner;
    idObj: {
        readonly _id: number;
    };
    private _isSelected;
    private _isDragging;
    private _isResizing;
    private _isChangingDims;
    private _isSelectingMultiple;
    private _justDragged;
    private _x1;
    private _y1;
    private _width1;
    private _height1;
    private _context;
    private _ratio;
    private _dragoffx;
    private _dragoffy;
    private _initDistance;
    private _mouse;
    constructor(eph: EphNode);
    /**
     * The method that is called when evaluating nodes (StringNode, EllipseNode, etc)
     * This method assigns all params to private variables and draws the initial object to the canvas
     * by calling update()
     * @param context The parent Scope that contains the canvas among other things
     * @param dims The object's dimensions including x and y position
     * @param ast Unnecessary now, used to be the parent AST
     */
    draw(context: Scope, dims: Dimensions, ast: Expression<any>): void;
    /**
     * This method is called in order to draw and redraw the object when manipulations are made
     */
    update(): void;
    /**
     * Adds all the necessary event listeners in one fell swoop
     */
    addEventListeners(): void;
    /**
     * Returns true if the mouse is inside of the object's bounding rectangle, false if otherwise
     * @param mx the mouse x coordinate
     * @param my the mouse y coordinate
     */
    contains(mx: number, my: number): boolean;
    /**
     * Returns a number > 0 if the mouse is inside one of the corner/side guides, returns 0 if not
     * The corner guides are numbered 1-4 with 1 being the top left, 2 being the top right, and so on.
     * The middle guides are numbered 5-8, with 5 being the top middle, 6 being the right middle, and so on.
     * @param mx the mouse x coordinate
     * @param my the mouse y coordinate
     */
    guideContains(mx: number, my: number): number;
    /**
     * Draws the bounding rectangle and guides for the object when the object is selected
     * If one of the guides is selected, it colors that guide blue
     * @param x the x coordinate for where the rectangle will originate from (top left corner)
     * @param y the y coordinate for where the rectangle will originate from (top left corner)
     * @param w the width of the bounding rectangle
     * @param h the height of the bounding rectangle
     * @param corner the number of the corner to be colored blue (if any at all, if 0, all are white)
     */
    drawGuides(x: number, y: number, w: number, h: number, corner: number): void;
    drawSquare(x: number, y: number, w: number, h: number, color: string): void;
    onMouseMove(event: any): void;
    onMouseDown(event: any): void;
    onMouseUp(event: any): void;
    onShiftDown(event: any): void;
    /**
     * @param event
     */
    onShiftUp(event: any): void;
    modifyDrag(): void;
    modifyResize(widthTooSmall: boolean, heightTooSmall: boolean): void;
    modifyResizeHelper(newDistance: number): void;
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
    logResize(): LogEvent<any>;
    logClick(): LogEvent<any>;
    initID(id: number): void;
    ast(): Expression<EphNode>;
    updateAST(): Expression<NumberNode>;
    readonly x: number;
    readonly y: number;
    readonly w: number;
    readonly h: number;
    readonly dims: Dimensions;
    readonly selected: boolean;
    getID(): number;
    getJustDragged(): boolean;
    setJustDragged(val: boolean): void;
    readonly isDragging: boolean;
    toSelString(): string;
    toDragString(): string;
    toIDString(): string;
}
