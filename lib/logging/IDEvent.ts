import {LogEvent} from './LogEvent';

export class IDEvent extends LogEvent<any>{
    constructor(toLog: string){
        super(toLog);
        this.tag = "ID";
    }
    
    // message should be of form "Assigned ID # to obj at x, y"
    assembleLog(): string{
        let toPrint = "Assigned ID " + this.toLog;
        return this.logItem(toPrint);
    }
}