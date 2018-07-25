import {LogEvent} from './LogEvent';

export class ResizeEvent extends LogEvent<any>{
    //toLog: string;
    constructor(toLog: string, x1: number, y1: number){
        super(toLog, x1, y1);
        this.tag = "resize";
    }
    
    assembleLog(): string{
        // let today = new Date();
        // let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        // let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        // let dateTime = date + ' ' + time;
        let toPrint = "Resized " + this.toLog + " from size " + this.x1.toString() + " to size " + this.y1.toString();
        return this.logItem(toPrint);
    }
}