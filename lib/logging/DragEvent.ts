import {LogEvent} from './LogEvent';

export class DragEvent extends LogEvent{
    constructor(toLog: string){
        super(toLog);
    }
    
    assembleLog(): string{
        let toPrint = "Dragged " + this.toLog;
        return this.logItem(toPrint);
    }
}