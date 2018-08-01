import {LogEvent} from './LogEvent';

export class SelectEvent extends LogEvent<any>{
    constructor(toLog: string[]){
        super(toLog);
        this.tag = "select";
    }
    
    assembleLog(): string {
        let toPrint = "Selected " + this.toLog;
        return this.logItem(toPrint);
    }
}