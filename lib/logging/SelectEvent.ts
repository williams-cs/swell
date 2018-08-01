import {LogEvent} from './LogEvent';
import { Effect } from '../effects/Effect';

export class SelectEvent extends LogEvent<any>{
    constructor(toLog: Effect<any>[]){
        super(toLog);
        this.tag = "select";
    }
    
    assembleLog(): string {
        let toPrint = "Selected " + this.toLog;
        return this.logItem(toPrint);
    }
}