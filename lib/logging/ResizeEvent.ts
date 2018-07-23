import {LogEvent} from './LogEvent';

export class ResizeEvent extends LogEvent{
    //toLog: string;
    constructor(toLog: string){
        super(toLog);
    }
    
    assembleLog(): string{
        // let today = new Date();
        // let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        // let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        // let dateTime = date + ' ' + time;
        let toPrint = "Resized " + this.toLog;
        return this.logItem(toPrint);
    }
}