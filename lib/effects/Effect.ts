import { EffectUtils } from "./EffectUtils";
import { Expression } from "../Expression";
import { LogEvent } from "../logging/LogEvent";
import { PrintNode } from "../structural/PrintNode";
import { Scope } from "../structural/Scope";
import GUIDE = EffectUtils.GUIDE;
import { CanvasState } from "./CanvasState";

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
    private _justDragged: boolean = false;
    private _justResized: boolean = false;
    private _corner: GUIDE = GUIDE.NONE;
    private readonly _guideSize: number = 7;

    private _mouse: {
        x: number,
        y: number,
    } = {
            x: 0,
            y: 0,
        };
    private _prevMouse: {
        x: number,
        y: number,
    } = {
            x: 0,
            y: 0,
        };

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
     * Draws all guides
     */
    abstract drawGuides(): void;

    /**
     * Updates the shape when drawn again or manipulated.
     */
    abstract update(): void;

    /**
     * Returns the guide containing the mouse
     */
    abstract guideContains(): GUIDE;

    /**
     * Returns true if the mouse is inside of the object's boundary, false if otherwise
     */
    abstract contains(): boolean;

    /**
     * Check if there is another object above
     */
    protected isOverlapped(): boolean {
        for (let effect of this.scope.effects) {
            if (effect.id == this.id) {
                continue;
            }
            if (effect.id > this.id && (effect.guideContains() != GUIDE.NONE || effect.contains())) {
                return true;
            }
        }
        return false;
    }

    /* Event listener functions */

    private addEventListeners(): void {
        this.canvas.addEventListener("mousemove", this.onMouseMove.bind(this));
        this.canvas.addEventListener("mousedown", this.onMouseDown.bind(this));
        this.canvas.addEventListener("mouseup", this.onMouseUp.bind(this));
        window.addEventListener("changingcolor", this.onChangingObjectColor.bind(this));
        window.addEventListener("deleting", this.onDeletingObject.bind(this));
        window.addEventListener("keydown", this.onKeyDown.bind(this));
        window.addEventListener("mouseup", this.isMouseOutside.bind(this));
    }

    public removeEventListeners(): void {
        this.canvas.removeEventListener("mousemove", this.onMouseMove.bind(this));
        this.canvas.removeEventListener("mousedown", this.onMouseDown.bind(this));
        this.canvas.removeEventListener("mouseup", this.onMouseUp.bind(this));
        window.removeEventListener("changingcolor", this.onChangingObjectColor.bind(this));
        window.removeEventListener("deleting", this.onDeletingObject.bind(this));
        window.removeEventListener("keydown", this.onKeyDown.bind(this));
        window.removeEventListener("mouseup", this.isMouseOutside.bind(this));
    }

    /** 
     * <Custom Event> Synthetic Event "changeingcolor" in ui.ts
     * Dispatched only when color buttons are clicked.
     * Color of object changed depending on the val of event.detail.color 
    */
    protected onChangingObjectColor(event : Event) : void {
        if (this.isSelected) {
            let colorName = (event as CustomEvent).detail.color;
            this.aes.setColor(this.scope, colorName);
        }
    }

    private onDeletingObject(event : Event) : void {
        if (this.isSelected) {
            this.delete();
        }
    }

    /**
     * Called whenever the mouse moves within the canvas.
     * Updates mouse position and calls the modify methods.
     * @param event the mousemove event
     */
    private onMouseMove(event: MouseEvent): void {
        // Update mouse pos
        let rect = this.canvas.getBoundingClientRect();
        this.mouse = {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top,
        };

        if (!this.isSelected) {
            return;
        }
        if (this.isDragging) {
            this.modifyDrag(event);
        } else if (this.isResizing) {
            this.modifyResize(event);
        }
    }

    /**
     * Called whenever the mouse clicks inside the canvas.
     * Modifies the state depending on whether the guides contain the mouse or the bounding rect contains the mouse.
     * @param event the mousedown event
     */
    private onMouseDown(event: MouseEvent): void {
        this.prevMouse = this.mouse;
        this.modifyState(event);
    }

    /**
     * Called whenever the mouse unclicks.
     * Calls modifyReset to reset dragging and resizing booleans among others.
     * @param event the mouseup event
     */
    private onMouseUp(event: MouseEvent) {
        this.modifyReset();
    }

    /**
     * Triggered when key is pressed down
     */
    abstract onKeyDown(event: KeyboardEvent): void;

    /**
     * Sets isDragging, isResizing and isSelected to false if the mouse clicks outside of the canvas
     * @param event the mousedown event
     */
    private isMouseOutside(event: MouseEvent): void {
        let mouseX = event.clientX;
        let mouseY = event.clientY;
        let rect = this.canvas.getBoundingClientRect();
        if (mouseX < rect.left || mouseX > rect.right || mouseY < rect.top || mouseY > rect.bottom) {
            this.isDragging = false;
            this.isResizing = false;
            this.isSelected = false;
            this.corner = GUIDE.NONE;
        }
    }

    /**
     * Simple method that draws a single guide.
     * @param x x coordinate for the top left corner of the rectangle
     * @param y y coordinate for the top left corner of the rectangle
     * @param color Fill color for the rectangle
     */
    drawSingleGuide(x: number, y: number, guide: GUIDE) {
        this.ctx.beginPath();
        this.ctx.fillStyle = this.corner == guide ? "blue" : "white";
        this.ctx.fillRect(x, y, this.guideSize, this.guideSize);
        this.ctx.rect(x, y, this.guideSize, this.guideSize);
        this.ctx.strokeStyle = "gray";
        this.ctx.stroke();
    }

    /* Modification functions */

    /**
     * Changes the x and y coordinates of the object in order to drag the object.
     */
    abstract modifyDrag(event: MouseEvent): void;

    /**
     * Changes the size of the object when called (when a corner guide is clicked and dragged).
     */
    abstract modifyResize(event: MouseEvent): void;

    /**
     * Toggles all of the private booleans depending on the mouse position when called (onMouseDown)
     * e.g. if the mouse is within the bounding rectangle when this is called, isSelected = true
     */
    abstract modifyState(event: MouseEvent): void;

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

    delete() {
        this.aes.commentOut();
    }

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

    get corner(): GUIDE {
        return this._corner;
    }

    set corner(corner: GUIDE) {
        this._corner = corner;
    }

    get mouse(): { x: number, y: number } {
        return this._mouse;
    }

    set mouse(mouse: { x: number, y: number }) {
        this._mouse = mouse;
    }

    get prevMouse(): { x: number, y: number } {
        return this._prevMouse;
    }

    set prevMouse(mouse: { x: number, y: number }) {
        this._prevMouse = mouse;
    }

    get canvas(): HTMLCanvasElement {
        return this.scope.canvas;
    }

    get ctx(): CanvasRenderingContext2D {
        return this.canvas.getContext("2d");
    }

    get color(): string {
        return this.aes.getColor(this.scope);
    }

    set color(val: string) {
        this.aes.setColor(this.scope, val);
    }

    get guideSize(): number {
        return this._guideSize;
    }

    get canvasState() : CanvasState {
        return this.scope.canvasState;
    }

    get cursorOwnerID() {
        return this.canvasState.cursorOwnerID;
    }

    set cursorOwnerID(newID : number) {
        this.canvasState.cursorOwnerID = newID;
    }
}
