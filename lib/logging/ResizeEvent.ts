import {LogEvent} from './LogEvent';
import { Effect } from '../effects/Effect';

export class ResizeEvent extends LogEvent<any>{
    toPrint: string;

    /**
     * Constructor for Resize Event, used when an object on the canvas is resized
     * @param toLog String representation of the object to be logged
     */
    constructor(toLog: Effect<any>){
        super(toLog);
        this.tag = "resize";
    }

    /**
     * Assembles log message of form "Resized obj from size x1, y1 to size x2, y2" for rects and ellipses
     * or of form "Resized obj from size x1 to size y1" for strings
     * Has date and time attached
     */
    assembleLog(): string{
        return '';
        /*
        if(this.x2 != undefined && this.y2 != undefined){
            this.toPrint = "Resized " + this.toLog + " from size " + this.x1.toString() + " by " + this.y1.toString()
            + " to size " + this.x2.toString() + " by " + this.y2.toString();
        } else{
            this.toPrint = "Resized " + this.toLog + " from size " + this.x1.toString() + " to size " + this.y1.toString();
        }
        return this.logItem(this.toPrint);
        */
    }

    eventType() : string {
        return "ResizeEvent";
    }

    toJSON(): string {
        return '';
        /*
        if(this.x2 != undefined && this.y2 != undefined){
            return "{ on: '" + this.toLog + "', from_x: '" + this.x1 + "', from_y: '" + this.y1 + "', to_x: '" + this.x2 + "', to_y: '" + this.y2 + "' }";
        } else{
            // I don't understand this. Why this.y1?
            return "{ on: '" + this.toLog + "', from_x: '" + this.x1 + "', to_y: '" + this.y1 + "' }";
        }
        */
    }

    logRemotely(uid: string, data: string, checkpoint: string, parses: boolean, doNotLog: boolean, time?: string): void {
        LogEvent.logToRemoteServer(this.eventType(), uid, data, checkpoint, parses, doNotLog, time);
    }
}
