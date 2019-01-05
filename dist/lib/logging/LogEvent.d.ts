import { Effect } from "../effects/Effect";
export declare abstract class LogEvent<T> {
    private _date;
    private _time;
    private _dateTime;
    private _toLog;
    private _tag;
    private _x1;
    private _y1;
    private _x2;
    private _y2;
    /**
     * Abstract class constructor for a Log Event. Registers event time.
     * @param toLog The string, object, or array of objects to be logged
     * @param x1 Initial x position, if applicable
     * @param y1 Initial y position, if applicable
     * @param x2 Final x position, if applicable
     * @param y2 Final y position, if applicable
     */
    constructor(toLog: string | Effect<any>[] | Effect<any>, x1?: number, y1?: number, x2?: number, y2?: number);
    /**
     * Attaches date and time to log message
     * @param toLog The log message
     */
    logItem(toLog: string): string;
    /**
     * Assembles and returns coherent log message
     */
    abstract assembleLog(): string;
    /**
     * Prints JSON payload for remote logging
     */
    abstract toJSON(): string;
    abstract eventType(): string;
    /**
     * Returns date-time string
     */
    readonly dateTime: string;
    /**
     * Returns string or effect(s) to be logged
     */
    readonly toLog: string | Effect<any>[] | Effect<any>;
    /**
     * Returns event tag
     */
    /**
    * Sets tag string
    */
    tag: string;
    /**
     * Returns x1
     */
    readonly x1: number;
    /**
     * Returns y1
     */
    readonly y1: number;
    /**
     * Returns x2
     */
    readonly x2: number;
    /**
     * Returns y2
     */
    readonly y2: number;
    /**
     * Logs to a remote server.
     */
    static logToRemoteServer(eventtype: string, uid: string, data: string): void;
}
