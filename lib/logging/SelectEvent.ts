import {LogEvent} from './LogEvent';

export class SelectEvent extends LogEvent<any>{
    constructor(toLogArray: string[], x1: number, y1: number){
        super(toLogArray, x1, y1);
        this.tag = "select";
    }
    
    assembleLog(): string {
        let toPrint = "Selected " + this.toLog + " at " + this.x1.toString() + ", " + this.y1.toString();
        return this.logItem(toPrint);
    }
}