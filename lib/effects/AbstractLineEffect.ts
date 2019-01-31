import { Dimensions } from "../structural/Dimensions";
import { Effect } from "./Effect";
import { EffectUtils } from "./EffectUtils";
import { Expression } from "../Expression";
import { LogEvent } from "../logging/LogEvent";
import { PrintNode } from "../structural/PrintNode";
import { Scope } from "../structural/Scope";

export abstract class AbstractLineEffect<T> extends Effect<T> {

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
     * Returns true if the mouse is inside of the object's bounding rectangle, false if otherwise
     * @param mx the mouse x coordinate
     * @param my the mouse y coordinate
     */


    /**
     * Returns true if the mouse is inside of the object's bounding rectangle, false if otherwise
     * @param mx the mouse x coordinate
     * @param my the mouse y coordinate
     */
    contains(mx: number, my: number): boolean {
        return (mx > this.x) && (mx < this.x + this.w) &&
            (my > this.y) && (my < this.y + this.h);
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

    abstract modifyResize(): void;

    abstract modifyChangeDims(): void;

    /**
     * Toggles all of the private booleans depending on the mouse position when called (onMouseDown)
     * e.g. if the mouse is within the bounding rectangle when this is called, isSelected = true
     */
    abstract modifyState(): void;

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
}
