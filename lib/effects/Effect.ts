import { EffectUtils } from "./EffectUtils";
import { Expression } from "../Expression";
import { LogEvent } from "../logging/LogEvent";
import { PrintNode } from "../structural/PrintNode";
import { Scope } from "../structural/Scope";

export abstract class Effect<T> {

    /**
     * The node of the effect
     */
    private _node: T;

    /**
     * The effect's scope
     */
    private _scope: Scope;

    /**
     * The PrintNode that is printing the effect
     */
    private _aes: PrintNode;

    /**
     * The ID of the effect
     */
    private _id: number;

    /**
     * The name of the effect, used for logging
     */
    abstract name: string;

    private _isSelected: boolean = false;
    private _isDragging: boolean = false;
    private _isResizing: boolean = false;
    private _isChangingDims: boolean = false;
    private _isSelectingMultiple: boolean = false;
    private _justDragged: boolean = false;
    private _justResized: boolean = false;
    private _corner: number = 0;
    private _mouse: {
        x: number,
        y: number,
    } = {
            x: 0,
            y: 0,
        };

    private _dragOffX: number = 0;
    private _dragOffY: number = 0;
    private _initDistance: number = 0;

    constructor(node: T, scope: Scope, aes: PrintNode) {
        this.node = node;
        this.scope = scope;
        this.aes = aes;
    }

    /**
     * Draws the effect
     */
    draw(): void {
        this.update();
        this.scope.eventLog.push(this.logPaint());
        this.scope.effects.push(this);
        this.addEventListeners();
    }

    /**
     * Updates the shape when drawn again or manipulated.
     */
    abstract update(): void;

    /**
     * Returns a number > 0 if the mouse is inside one of the corner/side guides, returns 0 if not
     * The corner guides are numbered 1-4 with 1 being the top left, 2 being the top right, and so on.
     * The middle guides are numbered 5-8, with 5 being the top middle, 6 being the right middle, and so on.
     * @param mx the mouse x coordinate
     * @param my the mouse y coordinate
     */
    abstract guideContains(mx: number, my: number): number;

    /**
     * Returns true if the mouse is inside of the object's boundary, false if otherwise
     * @param mx the mouse x coordinate
     * @param my the mouse y coordinate
     */


    /**
     * Returns true if the mouse is inside of the object's boundary, false if otherwise
     * @param mx the mouse x coordinate
     * @param my the mouse y coordinate
     */
    abstract contains(mx: number, my: number): boolean;

    /* Event listener functions */

    addEventListeners(): void {
        this.canvas.addEventListener('mousemove', this.onMouseMove.bind(this));
        this.canvas.addEventListener('mousedown', this.onMouseDown.bind(this));
        this.canvas.addEventListener('mouseup', this.onMouseUp.bind(this));
        window.addEventListener('keydown', this.onShiftDown.bind(this));
        window.addEventListener('keyup', this.onShiftUp.bind(this));
        window.addEventListener('mousedown', this.isMouseOutside.bind(this));
        //makes it so that double clicking doesn't select text on the page
        this.canvas.addEventListener('selectstart', function(e) {
            e.preventDefault();
            return false;
        }, false);
    }

    /**
     * Called whenever the mouse moves within the canvas.
     * Gets the mouse position, calls the modify methods if the booleans satisfy them.
     * @param event the mousemove event
     */
    onMouseMove(event: any): void {
        this.getMousePosition(event);
        if (this.isDragging && this.isSelected) {
            this.modifyDrag();
        }
        else if (this.isResizing && this.isSelected) {
            this.modifyResize();
        }
        else if (this.isChangingDims && this.isSelected) {
            this.modifyChangeDims();
        }
    }

    /**
     * Called whenever the mouse clicks inside the canvas.
     * Modifies the state depending on whether the guides contain the mouse or the bounding rect contains the mouse.
     * @param event the mousedown event
     */
    onMouseDown(event: any): void {
        this.modifyState();
    }

    /**
     * Called whenever the mouse unclicks.
     * Calls modifyReset to reset dragging and resizing booleans among others.
     * @param event the mouseup event
     */
    onMouseUp(event: any) {
        this.modifyReset();
    }

    /**
     * Called whenever a key is pressed down
     * Toggles the isSelectingMultiple boolean if the key pressed is the shift key
     * @param event the keydown event
     */
    onShiftDown(event: any) {
        if (event.keyCode == "16") { //shift keycode
            this.isSelectingMultiple = true;
        }
    }

    /**
     * Called whenever a key is released
     * Toggles the isSelectingMultiple boolean if the key released is the shift key
     * @param event the keydown event
     */
    onShiftUp(event: any) {
        if (event.keyCode == "16") { //shift keycode
            this.isSelectingMultiple = false;
        }
    }


    /**
     * Gets the current x and y coordinates of the mouse
     * NOTE: in Firefox, window.event is not global. Need to be passed in here as a paramater.
     * @param event the mousedown event
     */
    getMousePosition(event: any): void {
        let mousePos: {x: number, y: number} = EffectUtils.getMouseCanvasPos(this.canvas, event);
        this.mouse = {
            x: mousePos.x,
            y: mousePos.y,
        };
    }

    /**
     * Sets isDragging, isResizing, isChangingDims, and isSelected to false if the mouse clicks outside of the canvas
     * @param event the mousedown event
     */
    isMouseOutside(event: any): void {
        let mouseX = event.clientX;
        let mouseY = event.clientY;
        let rect = this.canvas.getBoundingClientRect();
        if (mouseX < rect.left || mouseX > rect.right || mouseY < rect.top || mouseY > rect.bottom) {
            this.isDragging = false;
            this.isResizing = false;
            this.isChangingDims = false;
            this.isSelected = false;
            this.corner = 0;
        }
    }

    /**
     * Simple method that draws a rectangle
     * @param x x coordinate for the top left corner of the rectangle
     * @param y y coordinate for the top left corner of the rectangle
     * @param w width of the rectangle
     * @param h height of the rectangle
     * @param color color of the rectangle's fill
     */
    drawSquare(x: number, y: number, w: number, h: number, color: string) {
        this.ctx.beginPath();
        this.ctx.fillStyle = color;
        this.ctx.fillRect(x, y, w, h);
        this.ctx.rect(x, y, w, h);
        this.ctx.strokeStyle = 'gray';
        this.ctx.stroke();
    }

    /* Modification functions */

    /**
     * Changes the x and y coordinates of the object in order to drag the object.
     */
    abstract modifyDrag(): void;

    /**
     * Changes the size of the object when called (when a corner guide is clicked and dragged).
     *
     * If any of width or height is too small, it sets them equal to 10 and the other equal to
     * 10 divided or multiplied by the ratio of width/height to keep it the same.
     *
     */
    abstract modifyResize(): void;

    /**
     * Changes the dimensions of the object when called.
     * If any of width or height is too small, it sets them equal to 10.
     * Calls modifyChangeDimsHelper to actually do the work
     */
    abstract modifyChangeDims(): void;

    /**
     * Toggles all of the private booleans depending on the mouse position when called (onMouseDown)
     * e.g. if the mouse is within the bounding rectangle when this is called, isSelected = true
     */
    abstract modifyState(): void;

    /**
     * Resets all of the private booleans to false (like dragging, resizing, etc) when the mouse is released
     */
    abstract modifyReset(): void;

    /* Logging functions */

    abstract logPaint(): LogEvent<any>;

    abstract logResize(): LogEvent<any>;

    abstract logClick(): LogEvent<any>;

    /**
     * Returns string for selection logging
     */
    abstract toSelString(): string;

    /**
     * returns string for drag logging
     */
    abstract toDragString(): string;

    /**
     * returns string for ID assignment logging
     */
    abstract toIDString(): string;

    /* Getters & Setters */

    get node(): T {
        return this._node;
    }

    set node(node: T) {
        this._node = node;
    }

    get scope(): Scope {
        return this._scope;
    }

    set scope(scope: Scope) {
        this._scope = scope;
    }

    get aes(): PrintNode {
        return this._aes;
    }

    set aes(aes: PrintNode) {
        this._aes = aes;
    }

    get id(): number {
        return this._id;
    }

    set id(id: number) {
        this._id = id;
    }

    get isSelected(): boolean {
        return this._isSelected;
    }

    set isSelected(val: boolean) {
        this._isSelected = val;
    }

    get isSelectingMultiple(): boolean {
        return this._isSelectingMultiple;
    }

    set isSelectingMultiple(val: boolean) {
        this._isSelectingMultiple = val;
    }

    get justDragged(): boolean {
        return this._justDragged;
    }

    set justDragged(val: boolean) {
        this._justDragged = val;
    }

    get justResized(): boolean {
        return this._justResized;
    }

    set justResized(val: boolean) {
        this._justResized = val;
    }

    get isDragging(): boolean {
        return this._isDragging;
    }

    set isDragging(val: boolean) {
        this._isDragging = val;
    }

    get isResizing(): boolean {
        return this._isResizing;
    }

    set isResizing(val: boolean) {
        this._isResizing = val;
    }

    get isChangingDims(): boolean {
        return this._isChangingDims;
    }

    set isChangingDims(val: boolean) {
        this._isChangingDims = val;
    }

    get corner(): number {
        return this._corner;
    }

    set corner(corner: number) {
        this._corner = corner;
    }

    get mouse(): { x: number, y: number } {
        return this._mouse;
    }

    set mouse(mouse: { x: number, y: number }) {
        this._mouse = mouse;
    }

    get dragOffX(): number {
        return this._dragOffX;
    }

    set dragOffX(val: number) {
        this._dragOffX = val;
    }

    get dragOffY(): number {
        return this._dragOffY;
    }

    set dragOffY(val: number) {
        this._dragOffY = val;
    }

    get initDistance(): number {
        return this._initDistance;
    }

    set initDistance(val: number) {
        this._initDistance = val;
    }

    get canvas(): HTMLCanvasElement {
        return this.scope.canvas.get();
    }

    get ctx(): CanvasRenderingContext2D {
        return this.canvas.getContext("2d");
    }
}
