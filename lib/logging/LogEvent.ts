import { Effect } from "../effects/Effect";

export abstract class LogEvent<T> {
    private _date: string;
    private _time: string;
    private _dateTime: string;
    private _toLog: string | Effect<any>[] | Effect<any>;
    private _tag: string;
    private _x1: number; // used for initial x or size
    private _y1: number; // used for initial y or resulting size
    private _x2: number;
    private _y2: number;

    /**
     * Abstract class constructor for a Log Event. Registers event time.
     * @param toLog The string, object, or array of objects to be logged
     * @param x1 Initial x position, if applicable
     * @param y1 Initial y position, if applicable
     * @param x2 Final x position, if applicable
     * @param y2 Final y position, if applicable
     */
    constructor(toLog: string | Effect<any>[] | Effect<any>, x1?: number, y1?: number, x2?: number, y2?: number){
        let today = new Date();
        this._date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        this._time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        this._dateTime = this._date + ' ' + this._time;
        this._toLog = toLog;
        //this._toLogArray = toLogArray;
        this._x1 = x1;
        this._y1 = y1;
        this._x2 = x2;
        this._y2 = y2;
    }

    /**
     * Attaches date and time to log message
     * @param toLog The log message
     */
    logItem(toLog: string): string {
        return " " + this._dateTime + ": " + toLog;
    }

    /**
     * Assembles and returns coherent log message
     */
    abstract assembleLog(): string;

    /**
     * Returns date-time string
     */
    get dateTime(): string {
        return this._dateTime;
    }

    /**
     * Returns string or effect(s) to be logged
     */
    get toLog(): string | Effect<any>[] | Effect<any>{
        return this._toLog;
    }

    /**
     * Returns event tag
     */
    get tag(): string {
        return this._tag;
    }
    /**
     * Sets tag string
     */
    set tag(tag: string){
        this._tag = tag;
    }

    /**
     * Returns x1
     */
    get x1(): number{
        return this._x1;
    }
    /**
     * Returns y1
     */
    get y1(): number{
        return this._y1;
    }
    /**
     * Returns x2
     */
    get x2(): number{
        return this._x2;
    }
    /**
     * Returns y2
     */
    get y2(): number{
        return this._y2;
    }
}