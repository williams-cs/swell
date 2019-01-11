import {LogEvent} from './LogEvent';
import { Effect } from '../effects/Effect';

export class IDEvent extends LogEvent<any>{
    private _toPrint: string;

    /**
     * A constructor for an ID event, used when an object gets assigned an ID
     * @param toLog The effect to log
     */
    constructor(toLog: Effect<any>){
        super(toLog);
        this.tag = "ID";
        this._toPrint = this.assembleString();
    }

    /**
     * Assembles string using the effect's toIDString() method
     */
    assembleString(): string {
        this._toPrint = (this.toLog as Effect<any>).toIDString();
        return this._toPrint;
    }

    /**
     * Assembles message of form "Assigned ID # to obj at x, y" with date and time attached
     */
    assembleLog(): string {
        let print = "Assigned ID " + this._toPrint;
        return this.logItem(print);
    }

    eventType() : string {
        return "IDEvent";
    }

    toJSON(): string {
        return "{ on: '" + (this.toLog as Effect<any>).toIDString() + "' }";
    }

    logRemotely(uid: string, data: string, checkpoint: string, parses: boolean, doNotLog: boolean): void{};

}
