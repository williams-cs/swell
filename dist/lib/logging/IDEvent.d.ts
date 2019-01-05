import { LogEvent } from './LogEvent';
import { Effect } from '../effects/Effect';
export declare class IDEvent extends LogEvent<any> {
    private _toPrint;
    /**
     * A constructor for an ID event, used when an object gets assigned an ID
     * @param toLog The effect to log
     */
    constructor(toLog: Effect<any>);
    /**
     * Assembles string using the effect's toIDString() method
     */
    assembleString(): string;
    /**
     * Assembles message of form "Assigned ID # to obj at x, y" with date and time attached
     */
    assembleLog(): string;
    eventType(): string;
    toJSON(): string;
}
