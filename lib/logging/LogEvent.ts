export abstract class LogEvent {
    dateTime: string;
    toLog: string;
    tag: string;

    constructor(toLog: string){
        this.toLog = toLog;
    }

    logItem(toLog: string): string {
        let today = new Date();
        let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        this.dateTime = date + ' ' + time;
        return this.dateTime + ": " + toLog;
    }

    abstract assembleLog(item: string): string;
}