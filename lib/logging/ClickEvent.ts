import {LogEvent} from './LogEvent';

export class ClickEvent extends LogEvent<any>{

    /**
     * Constructor for a Click Event, which logs when an object on the canvas is clicked
     * @param toLog The string representation of the object to log
     * @param x1 The x coordinate of the object to log
     * @param y1 The y coordinate of the object to log
     */
    constructor(toLog: string, x1: number, y1: number){
        super(toLog, x1, y1);
        this.tag = "click";
    }

    /**
     * Assembles and returns message of form "Clicked on obj at x, y" with date and time attached
     */
    assembleLog(): string{
        let toPrint = "Clicked on " + this.toLog + " at " + this.x1.toString() + ", " + this.y1.toString();
        return this.logItem(toPrint);
    }

    eventType() : string {
        return "ClickEvent";
    }

    toJSON(): string {
        return "{ on: '" + this.toLog + "', x: '" + this.x1 + "', y: '" + this.y1 + "' }";
    }

    logRemotely(uid: string, data: string, checkpoint: string, parses: boolean, doNotLog: boolean, time?: string): void{};

}
