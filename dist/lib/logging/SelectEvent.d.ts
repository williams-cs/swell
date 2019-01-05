import { LogEvent } from './LogEvent';
import { Effect } from '../effects/Effect';
export declare class SelectEvent extends LogEvent<any> {
    private _toPrint;
    /**
     * Constructor for a Selection Event, used when multiple objects on the canvas are selected
     * @param toLog The array of objects selected
     */
    constructor(toLog: Effect<any>[]);
    /**
     * Assembles and returns a string representation of all the objects selected
     */
    assembleStrings(): string;
    /**
     * Returns the message with date and time attached
     */
    assembleLog(): string;
    eventType(): string;
    toJSON(): string;
}
