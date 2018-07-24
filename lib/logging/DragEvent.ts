import {LogEvent} from './LogEvent';

export class DragEvent extends LogEvent{
    constructor(toLog: string, x1: number, y1: number, x2: number, y2: number){
        super(toLog, x1, y1, x2, y2);
    }
    
    assembleLog(): string{
        let toPrint = "Dragged " + this.toLog + " from " + this.x1.toString() + ", " + this.y1.toString() + " to " + this.x2.toString() + ", " + this.y2.toString();
        return this.logItem(toPrint);
    }
}