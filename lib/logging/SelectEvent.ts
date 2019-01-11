import {LogEvent} from './LogEvent';
import { Effect } from '../effects/Effect';

export class SelectEvent extends LogEvent<any>{
    private _toPrint: string;

    /**
     * Constructor for a Selection Event, used when multiple objects on the canvas are selected
     * @param toLog The array of objects selected
     */
    constructor(toLog: Effect<any>[]){
        super(toLog);
        this.tag = "select";
        this._toPrint = this.assembleStrings();
    }

    /**
     * Assembles and returns a string representation of all the objects selected
     */
    assembleStrings(): string {
        let logStrings: string[] = [];
        for(let elem of (this.toLog as Effect<any>[])){
            logStrings.push(elem.toSelString());
        }
        return "Selected" + logStrings;
    }

    /**
     * Returns the message with date and time attached
     */
    assembleLog(): string {
        return this.logItem(this._toPrint);
    }

    eventType() : string {
        return "SelectEvent";
    }

    toJSON(): string {
        return "{ on: '" + this.logItem(this._toPrint) + "' }";
    }

    logRemotely(uid: string, data: string, checkpoint: string, parses: boolean, doNotLog: boolean): void{};
}
