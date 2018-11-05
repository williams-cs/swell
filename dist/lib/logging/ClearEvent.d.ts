import { LogEvent } from './LogEvent';
export declare class ClearEvent extends LogEvent<any> {
    /**
     * Constructor for the Clear Event, which logs when the canvas is cleared
     * @param toLog What to log (spoiler: nothing)
     */
    constructor(toLog?: string);
    /**
     * Assembles and returns message "Console cleared" with date and time attached
     */
    assembleLog(): string;
}
