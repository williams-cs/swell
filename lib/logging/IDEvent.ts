import {LogEvent} from './LogEvent';
import { Effect } from '../effects/Effect';

export class IDEvent extends LogEvent<any>{
    private _toPrint: string;

    constructor(toLog: Effect<any>){
        super(toLog);
        this.tag = "ID";
        this._toPrint = this.assembleString();
    }
    
    assembleString(): string {
        this._toPrint = (this.toLog as Effect<any>).toIDString();
        return this._toPrint;
    }
    
    // message should be of form "Assigned ID # to obj at x, y"
    assembleLog(): string{
        let print = "Assigned ID " + this._toPrint;
        return this.logItem(print);
    }
}