import {LogEvent} from './LogEvent';

export class ResizeEvent extends LogEvent<any>{
    //toLog: string;
    toPrint: string;

    constructor(toLog: string, x1: number, y1: number, x2?: number, y2?: number){
        super(toLog, x1, y1, x2, y2);
        this.tag = "resize";
    }
    
    assembleLog(): string{
        // let today = new Date();
        // let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        // let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        // let dateTime = date + ' ' + time;
        if(this.x2 != undefined && this.y2 != undefined){
            this.toPrint = "Resized " + this.toLog + " from size " + this.x1.toString() + " by " + this.y1.toString() 
            + " to size " + this.x2.toString() + " by " + this.y2.toString();
        } else{
            this.toPrint = "Resized " + this.toLog + " from size " + this.x1.toString() + " to size " + this.y1.toString();
        }
        return this.logItem(this.toPrint);
    }
}