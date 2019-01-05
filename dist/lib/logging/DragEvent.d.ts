import { LogEvent } from './LogEvent';
import { Effect } from '../effects/Effect';
export declare class DragEvent extends LogEvent<any> {
    private _toPrint;
    /**
     * Constructor for a Drag Event, which logs when an object on the canvas is dragged
     * @param toLog The effect to log
     */
    constructor(toLog: Effect<any>);
    /**
     * Assembles a log string using the Effect's toDragString() method
     */
    assembleString(): string;
    /**
     * Assembles and returns final log message of form "Dragged obj from x1, y1 to x2, y2"
     * with date and time attached
     */
    assembleLog(): string;
    eventType(): string;
    toJSON(): string;
}
