import {LogEvent} from './LogEvent';
import { Effect } from '../effects/Effect';

export class DragEvent extends LogEvent<any>{
    private _toPrint: string;

    /**
     * Constructor for a Drag Event, which logs when an object on the canvas is dragged
     * @param toLog The effect to log
     */
    constructor(toLog: Effect<any>){
        super(toLog);
        this.tag = "drag";
        this._toPrint = this.assembleString();
    }

    /**
     * Assembles a log string using the Effect's toDragString() method
     */
    assembleString(): string {
        this._toPrint = (this.toLog as Effect<any>).toDragString();
        return this._toPrint;
    }

    /**
     * Assembles and returns final log message of form "Dragged obj from x1, y1 to x2, y2"
     * with date and time attached
     */
    assembleLog(): string{
        let print = "Dragged " + this._toPrint;
        return this.logItem(print);
    }

    eventType() : string {
        return "DragEvent";
    }

    toJSON(): string {
        return "{ on: '" + (this.toLog as Effect<any>).toDragString() + "' }";
    }

    logRemotely(uid: string, data: string, checkpoint: string, parses: boolean, doNotLog: boolean, time?: string): void {
        LogEvent.logToRemoteServer(this.eventType(), uid, data, checkpoint, parses, doNotLog, time);
    }

}
