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
     * Prints JSON payload for remote logging
     */
    abstract toJSON(): string;

    abstract eventType(): string;

    abstract logRemotely(uid: string, data: string, checkpoint: string, parses: boolean, doNotLog: boolean, time?: string): void;

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

    /**
     * Logs to a remote server.
     */
    static logToRemoteServer(eventtype: string, uid: string, data: string, checkpoint: string, parses: boolean, doNotLog: boolean, time?: string) {
        //check for permission to log event
        if (doNotLog) {
            return;
        }

        //Initialize time to log if no time was provided
        let newTime = time;
        if (newTime == null) {
            newTime = this.getNewTime();
        }

        let payload = new FormData();
        payload.append('uid', uid);
        payload.append('data', data);
        payload.append('eventtype', eventtype);

        // MUST USE THE FOLLOWING DATE FORMAT
        // payload.append('time', '2019-01-01 16:36:00');
        payload.append('time', newTime);
        payload.append('checkpoint_id', checkpoint);
        payload.append('parses', '' + parses);


        let xhr = new XMLHttpRequest();
        xhr.open("POST", "http://camembert.cs.williams.edu:8080/events", true);
        xhr.send(payload);
    }

    /**
     * Provides new timestamp
     */
    static getNewTime() : string {
        // modified from: https://stackoverflow.com/a/10073788/480764
        function pad(n: number, width: number) : string {
            let padWith = '0';
            let nstr = n.toString();
            return nstr.length >= width ? nstr : new Array(width - nstr.length + 1).join(padWith) + nstr;
        }

        let date = new Date();
        let year = date.getFullYear().toString();
        let month = pad(date.getMonth() + 1, 2);
        let day = pad(date.getDate(), 2);
        let hour = pad(date.getHours(), 2);
        let minutes = pad(date.getMinutes(), 2);
        let seconds = pad(date.getSeconds(), 2);
        return year + '-' + month + '-' + day + ' ' + hour + ':' + minutes + ':' + seconds;
    }
}
