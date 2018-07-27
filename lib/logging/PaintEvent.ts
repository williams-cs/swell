import {LogEvent} from './LogEvent';

export class PaintEvent extends LogEvent<any>{
    //toLog: string;
    constructor(toLog: string, x1: number, y1: number){
        super(toLog,x1,y1);
        this.tag = "paint";
    }
    
    assembleLog(): string{
        let toPrint = "Painted " + this.toLog + " at " + this.x1.toString() + ", " + this.y1.toString();
        return this.logItem(toPrint);
    }
}