export abstract class LogEvent<T> {
    private _date: string;
    private _time: string;
    private _dateTime: string;
    private _toLog: string | string[];
    //private _toLogArray: string[];
    private _tag: string;
    private _x1: number; // used for initial x or size
    private _y1: number; // used for initial y or resulting size
    private _x2: number;
    private _y2: number;

    constructor(toLog: string | string[], x1?: number, y1?: number, x2?: number, y2?: number){
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

    logItem(toLog: string): string {
        return " " + this._dateTime + ": " + toLog;
    }

    // Assembles coherent log message
    abstract assembleLog(): string;

    get dateTime(): string {
        return this._dateTime;
    }
    get toLog(): string | string[]{
        return this._toLog;
    }
    get tag(): string {
        return this._tag;
    }
    set tag(tag: string){
        this._tag = tag;
    }
    get x1(): number{
        return this._x1;
    }
    get y1(): number{
        return this._y1;
    }
    get x2(): number{
        return this._x2;
    }
    get y2(): number{
        return this._y2;
    }
}