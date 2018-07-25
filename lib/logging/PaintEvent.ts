import {LogEvent} from './LogEvent';

export class PaintEvent extends LogEvent<any>{
    //toLog: string;
    constructor(toLog: string){
        super(toLog);
    }
    
    assembleLog(): string{
        let toPrint = "Painted " + this.toLog;
        return this.logItem(toPrint);
    }
}