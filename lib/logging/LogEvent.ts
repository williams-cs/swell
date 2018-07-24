export abstract class LogEvent {
    dateTime: string;
    toLog: string;
    tag: string;
    x1: number;
    y1: number;
    x2: number;
    y2: number;

    constructor(toLog: string, x1?: number, y1?: number, x2?: number, y2?: number){
        this.toLog = toLog;
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
    }

    logItem(toLog: string): string {
        let today = new Date();
        let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        this.dateTime = date + ' ' + time;
        return " " + this.dateTime + ": " + toLog;
    }

    abstract assembleLog(item: string): string;
}