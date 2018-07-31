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
    constructor(toLog: string, x1?: number, y1?: number, x2?: number, y2?: number);
    logItem(toLog: string): string;
    abstract assembleLog(): string;
    readonly dateTime: string;
    readonly toLog: string;
    tag: string;
    readonly x1: number;
    readonly y1: number;
    readonly x2: number;
    readonly y2: number;
}
