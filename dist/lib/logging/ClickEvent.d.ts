import { LogEvent } from './LogEvent';
export declare class ClickEvent extends LogEvent<any> {
    /**
     * Constructor for a Click Event, which logs when an object on the canvas is clicked
     * @param toLog The string representation of the object to log
     * @param x1 The x coordinate of the object to log
     * @param y1 The y coordinate of the object to log
     */
    constructor(toLog: string, x1: number, y1: number);
    /**
     * Assembles and returns message of form "Clicked on obj at x, y" with date and time attached
     */
    assembleLog(): string;
}
