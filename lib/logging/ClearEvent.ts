import {LogEvent} from './LogEvent';

export class ClearEvent extends LogEvent<any>{
    
    /**
     * Constructor for the Clear Event, which logs when the canvas is cleared
     * @param toLog What to log (spoiler: nothing)
     */
    constructor(toLog?: string){
        super(toLog);
        this.tag = "clear";
    }
    
    /**
     * Assembles and returns message "Console cleared" with date and time attached
     */
    assembleLog(): string{
        let toPrint = "Console cleared";
        return this.logItem(toPrint);
    }
}