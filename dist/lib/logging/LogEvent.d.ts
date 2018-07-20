export declare abstract class LogEvent {
    dateTime: string;
    toLog: string;
    tag: string;
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    constructor(toLog: string, x1?: number, y1?: number, x2?: number, y2?: number);
    logItem(toLog: string): string;
    abstract assembleLog(item: string): string;
}
