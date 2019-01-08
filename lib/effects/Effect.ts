import { Expression } from "../Expression";
import { Scope } from "../structural/Scope";
import { Dimensions } from "../structural/Dimensions";
import { PrintNode } from "../structural/PrintNode";

/**
 * Effects are what allow for PDM. They permit the drawing and manipulation of shapes.
 */
export interface Effect<T>{
    /**
     * Draws the shape for the first time
     * @param context The current program context
     * @param dims The object dimensions
     * @param ast The current AST
     */
    draw(context: Scope, dims: Dimensions, ast: Expression<any>): void; // draws object

    /**
     * Updates the shape when drawn again or manipulated.
     */
    update(): void;

    /**
     * The x position
     */
    x: number;
    /**
     * The y position
     */
    y: number;

    /**
     * The ID of the object
     */
    idObj: {readonly _id: number};

    /**
     * The object dimensions
     */
    dims: Dimensions;

    /**
     * Is the object selected?
     */
    selected: boolean;

    /**
     * Returns a number > 0 if the mouse is inside one of the corner/side guides, returns 0 if not
     * The corner guides are numbered 1-4 with 1 being the top left, 2 being the top right, and so on.
     * The middle guides are numbered 5-8, with 5 being the top middle, 6 being the right middle, and so on.
     * @param mx the mouse x coordinate
     * @param my the mouse y coordinate
     */
    guideContains(mx: number, my: number): number;

    /**
     * Returns true if the mouse is inside of the object's bounding rectangle, false if otherwise
     * @param mx the mouse x coordinate
     * @param my the mouse y coordinate
     */
    contains(mx: number, my: number): boolean;

    /**
     * Was the object just dragged?
     */
    getJustDragged(): boolean;
    /**
     * Sets whether the object was dragged
     * @param val Whether or not the object was just dragged
     */
    setJustDragged(val: boolean): void;

    /**
     * Initializes the object ID
     * @param id The ID number
     */
    initID(id: number): void;

    /**
     * Returns the object ID
     */
    getID(): number;

    addEventListeners(): void;
    removeEventListeners(): void;

    /**
     * Returns string for selection logging
     */
    toSelString(): string;

    /**
     * returns string for drag logging
     */
    toDragString(): string;

    /**
     * returns string for ID assignment logging
     */
    toIDString(): string;
}
