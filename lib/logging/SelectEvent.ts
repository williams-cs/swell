import {LogEvent} from './LogEvent';
import { Effect } from '../effects/Effect';

export class SelectEvent extends LogEvent<any>{
    private _toPrint: string;

    constructor(toLog: Effect<any>[]){
        super(toLog);
        this.tag = "select";
        this._toPrint = this.assembleStrings();
    }
    
    assembleStrings(): string {
        let logStrings: string[] = [];
        for(let elem of this.toLog){
            logStrings.push(elem.toString());
        }
        return "Selected" + logStrings;
    }

    assembleLog(): string {
        return this.logItem(this._toPrint);
    }
}