import {LogEvent} from './LogEvent';

export class IDEvent extends LogEvent<any>{
    constructor(toLog: string, x1: number, x2: number){
        super(toLog, x1, x2);
        this.tag = "ID";
    }
    
    // message should be of form "Assigned ID # to obj at x, y"
    assembleLog(): string{
        let toPrint = "Assigned ID " + this.toLog + " at " + this.x1.toString() + ", " + this.y1.toString();
        return this.logItem(toPrint);
    }
}