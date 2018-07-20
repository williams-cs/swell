export declare abstract class LogEvent {
    dateTime: string;
    toLog: string;
    tag: string;
    constructor(toLog: string);
    logItem(toLog: string): string;
    abstract assembleLog(item: string): string;
}
