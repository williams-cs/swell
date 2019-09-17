import {LogEvent} from './LogEvent';

export class PaintEvent extends LogEvent<any>{

    /**
     * Constructor for a Paint Event, used when an object is painted on the canvas
     * @param toLog The string representation of the object to be logged
     * @param x1 The x position of the object
     * @param y1 The y position of the object
     */
    constructor(toLog: string, x1: number, y1: number){
        super(toLog,x1,y1);
        this.tag = "paint";
    }

    /**
     * Assembles and returns message of form "Painted obj at x, y" with date and time attached
     */
    assembleLog(): string {
        let toPrint = "Painted " + this.toLog + " at " + this.x1.toString() + ", " + this.y1.toString();
        return this.logItem(toPrint);
    }

    eventType() : string {
        return "PaintEvent";
    }

    toJSON(): string {
        return "{ on: '" + this.toLog + "', x: '" + this.x1 + "', y: '" + this.y1 + "' }";
    }

    logRemotely(uid: string, data: string, checkpoint: string, parses: boolean, doNotLog: boolean, time?: string): void{};

}
