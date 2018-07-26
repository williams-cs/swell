import {LogEvent} from './LogEvent';

export class ClickEvent extends LogEvent<any>{
    constructor(toLog: string, x1: number, y1: number){
        super(toLog, x1, y1);
        this.tag = "click";
    }
    
    assembleLog(): string{
        let toPrint = "Clicked on " + this.toLog + " at " + this.x1.toString() + ", " + this.y1.toString();
        return this.logItem(toPrint);
    }
}