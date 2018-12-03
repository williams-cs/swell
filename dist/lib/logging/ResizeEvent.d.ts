import { LogEvent } from './LogEvent';
export declare class ResizeEvent extends LogEvent<any> {
    toPrint: string;
    /**
     * Constructor for Resize Event, used when an object on the canvas is resized
     * @param toLog String representation of the object to be logged
     * @param x1 Initial x dimension of the object, or initial font size
     * @param y1 Initial y dimension of the object, or final font size
     * @param x2 Final x dimension of the object
     * @param y2 Final y dimension of the object
     */
    constructor(toLog: string, x1: number, y1: number, x2?: number, y2?: number);
    /**
     * Assembles log message of form "Resized obj from size x1, y1 to size x1, y2" for rects and ellipses
     * or of form "Resized obj from size x1 to size y1" for strings
     * Has date and time attached
     */
    assembleLog(): string;
}
