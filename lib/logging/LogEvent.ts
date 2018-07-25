export abstract class LogEvent<T> {
    private _dateTime: string;
    private _toLog: string;
    private _tag: string;
    private _x1: number; // used for initial x or size
    private _y1: number; // used for initial y or resulting size
    private _x2: number;
    private _y2: number;

    constructor(toLog: string, x1?: number, y1?: number, x2?: number, y2?: number){
        this._toLog = toLog;
        this._x1 = x1;
        this._y1 = y1;
        this._x2 = x2;
        this._y2 = y2;
    }

    logItem(toLog: string): string {
        let today = new Date();
        let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        this._dateTime = date + ' ' + time;
        return " " + this._dateTime + ": " + toLog;
    }

    // Assembles coherent log message
    abstract assembleLog(): string;

    get dateTime(): string {
        return this._dateTime;
    }
    get toLog(): string {
        return this._toLog;
    }
    get tag(): string {
        return this._tag;
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