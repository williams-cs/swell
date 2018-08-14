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
    idObj: {
        readonly _id: number;
    };
    private _isSelected;
    private _isEditing;
    private _isListening;
    private _isDragging;
    private _isResizing;
    private _isSelectingMultiple;
    private _justDragged;
    private _dragoffx;
    private _dragoffy;
    private _initDistance;
    private _mouse;
    private _textMetrics;
    constructor(str: StringNode);
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
    drawTextGuides(x: number, y: number, w: number, h: number, corner: number): void;
    /**
     * Simple method that draws a rectangle
     * @param x x coordinate for the top left corner of the rectangle
     * @param y y coordinate for the top left corner of the rectangle
     * @param w width of the rectangle
     * @param h height of the rectangle
     * @param color color of the rectangle's fill
     */
    drawSquare(x: number, y: number, w: number, h: number, color: string): void;
    /**
     * Called whenever the mouse moves within the canvas.
     * Gets the mouse position, calls the modify methods if the booleans satisfy them.
     * @param event the mousemove event
     */
    onMouseMove(event: any): void;
    /**
     * Called whenever the mouse clicks inside the canvas.
     * Modifies the state depending on whether the guides contain the mouse or the bounding rect contains the mouse.
     * @param event the mousedown event
     */
    onMouseDown(event: any): void;
    /**
     * Called whenever the mouse unclicks.
     * Calls modifyReset to reset dragging and resizing booleans among others.
     * @param event the mouseup event
     */
    onMouseUp(event: any): void;
    /**
     * Called whenever a key is pressed down
     * Toggles the isSelectingMultiple boolean if the key pressed is the shift key
     * @param event the keydown event
     */
    onShiftDown(event: any): void;
    /**
     * Called whenever a key is released
     * Toggles the isSelectingMultiple boolean if the key released is the shift key
     * @param event the keydown event
     */
    onShiftUp(event: any): void;
    /**
     * Changes the x and y coordinates of the object in order to drag the object.
     */
    modifyDrag(): void;
    /**
     * Creates and moves the text edit cursor based on where the mouse is clicked
     */
    modifyTextCursor(): void;
    /**
     * This edits the string when editing text
     * @param event keydown event
     */
    modifyText(event: any): void;
    /**
     * Modifies the font size of the text
     * If the text font is smaller than 15pt, it set's it equal to 15pt
     * @param isTooSmall true if the font size is < 15
     */
    modifyResize(isTooSmall: boolean): void;
    /**
     * Toggles all of the private booleans depending on the mouse position when called (onMouseDown)
     * e.g. if the mouse is within the bounding rectangle when this is called, isSelected = true
     * @param guideContains
     * @param contains
     */
    modifyState(guideContains: boolean, contains: boolean): void;
    /**
     * Resets all of the private booleans to false (like dragging, resizing, etc) when the mouse is released
     */
    modifyReset(): void;
    /**
     * Gets the current x and y coordinates of the mouse
     */
    getMousePosition(): void;
    /**
     * Sets isDragging, isResizing, isChangingDims, and isSelected to false if the mouse clicks outside of the canvas
     * @param event the mousedown event
     */
    isMouseOutside(event: any): void;
    /**
     * Logs a paint event
     */
    logPaint(): LogEvent<any>;
    /**
     * Logs a resize event
     */
    logResize(): LogEvent<any>;
    /**
     * Logs a click event
     */
    logClick(): LogEvent<any>;
    /**
     * Returns the AST
     */
    ast(): Expression<StringNode>;
    /**
     * Initializes and assigns an ID to an object
     * @param id The ID to be assigned
     */
    initID(id: number): void;
    /**
     * Returns the canvas
     */
    /**
    * Sets the canvas
    * @param canvas The canvas to be assigned
    */
    canvas: HTMLCanvasElement;
    /**
     * Returns the x position of the ellipse
     */
    readonly x: number;
    /**
     * Returns the y position of the ellipse
     */
    readonly y: number;
    /**
     * Returns the Dimensions object
     */
    readonly dims: Dimensions;
    /**
    * Returns whether or not the ellipse has just been dragged
    */
    getJustDragged(): boolean;
    /**
     * Sets whether or not the ellipse has just been dragged
     * @param val The value to be assigned
     */
    setJustDragged(val: boolean): void;
    /**
     * Returns whether or not the ellipse is dragging
     */
    readonly isDragging: boolean;
    /**
     * Returns whether or not this is selected
     */
    readonly selected: boolean;
    /**
     * Returns the string
     */
    readonly str: string;
    /**
     * Returns the object ID
     */
    getID(): number;
    /**
     * Assembles a string for selection events
     */
    toSelString(): string;
    /**
    * Assembles a string for drag events
    */
    toDragString(): string;
    /**
     * Assembles a string for ID assignment events
     */
    toIDString(): string;
}
