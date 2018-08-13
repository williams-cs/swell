import { LogEvent } from './LogEvent';
export declare class PaintEvent extends LogEvent<any> {
    /**
     * Constructor for a Paint Event, used when an object is painted on the canvas
     * @param toLog The string representation of the object to be logged
     * @param x1 The x position of the object
     * @param y1 The y position of the object
     */
    constructor(toLog: string, x1: number, y1: number);
    /**
     * Assembles and returns message of form "Painted obj at x, y" with date and time attached
     */
    assembleLog(): string;
}
