import {LogEvent} from './LogEvent';

export class ClearEvent extends LogEvent{
    //toLog: string;
    constructor(toLog?: string){
        super(toLog);
    }
    
    assembleLog(): string{
        let toPrint = "Console cleared";
        return this.logItem(toPrint);
    }
}