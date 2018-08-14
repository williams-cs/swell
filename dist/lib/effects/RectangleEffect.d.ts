import { Effect } from "./Effect";
import { RectangleNode } from "../shapes/RectangleNode";
import { Expression } from "../Expression";
import { Scope } from "../structural/Scope";
import { Dimensions } from "../structural/Dimensions";
import { LogEvent } from "../logging/LogEvent";
export declare class RectangleEffect implements Effect<RectangleNode> {
    private _rect;
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
    constructor(rect: RectangleNode);
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
     * Changes the size of the object when called (when a corner guide is clicked and dragged).
     *
     * If any of width or height is too small, it sets them equal to 10 and the other equal to
     * 10 divided or multiplied by the ratio of width/height to keep it the same.
     *
     * The work of changing the size is done by calling the helper method modifyResizeHelper.
     * @param widthTooSmall true if the width dimension is < 10
     * @param heightTooSmall true if the height dimension is < 10
     */
    modifyResize(widthTooSmall: boolean, heightTooSmall: boolean): void;
    /**
     * Does the work of changing the size of the object.
     *
     * Since the rectangle originates from the top left corner and not the center,
     * it changes the x and y coordinates as well if guides 1, 2, or 4 are selected
     *
     * @param newDistance the distance between the mouse and the location opposite to it
     * (if top right guide is clicked, the distance between that and the bottom left guide is newDistance)
     */
    modifyResizeHelper(newDistance: number): void;
    /**
     * Changes the dimensions of the object when called.
     * If any of width or height is too small, it sets them equal to 10.
     * Calls modifyChangeDimsHelper to actually do the work
     * @param widthTooSmall true if the width dimension is < 10
     * @param heightTooSmall true if the height dimension is < 10
     */
    modifyChangeDims(widthTooSmall: boolean, heightTooSmall: boolean): void;
    /**
     * Does the work of changing the size of the object.
     *
     * Since the rectangle originates from the top left corner and not the center,
     * it changes the x and y coordinates as well if guides 5 or 8 are selected
     */
    modifyChangeDimsHelper(): void;
    /**
     * Toggles all of the private booleans depending on the mouse position when called (onMouseDown)
     * e.g. if the mouse is within the bounding rectangle when this is called, isSelected = true
     * @param guideContains
     * @param contains
     */
    modifyState(guideContains: number, contains: boolean): void;
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
     * Logs a rectangle paint event
     */
    logPaint(): LogEvent<any>;
    /**
     * Logs a rectangle resize event
     */
    logResize(): LogEvent<any>;
    /**
     * Logs a rectangle click event
     */
    logClick(): LogEvent<any>;
    /**
     * Initializes and assigns an ID to an object
     * @param id The ID to be assigned
     */
    initID(id: number): void;
    ast(): Expression<RectangleNode>;
    /**
     * Returns the x position of the rect
     */
    readonly x: number;
    /**
     * Returns the y position of the rect
     */
    readonly y: number;
    /**
     * Returns the width of the rect
     */
    readonly w: number;
    /**
     * Returns the height of the rect
     */
    readonly h: number;
    /**
     * Returns the Dimensions object
     */
    readonly dims: Dimensions;
    /**
     * Returns whether or not the rect is selected
     */
    readonly selected: boolean;
    /**
     * Returns the ID of the rect
     */
    getID(): number;
    /**
     * Returns whether or not the rect has just been dragged
     */
    getJustDragged(): boolean;
    /**
     * Sets whether or not the rect has just been dragged
     * @param val The value to be assigned
     */
    setJustDragged(val: boolean): void;
    /**
     * Returns whether or not the rect is dragging
     */
    readonly isDragging: boolean;
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
