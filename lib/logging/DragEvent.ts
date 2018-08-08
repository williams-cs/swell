import {LogEvent} from './LogEvent';
import { Effect } from '../effects/Effect';

export class DragEvent extends LogEvent<any>{
    // constructor(toLog: string, x1: number, y1: number, x2: number, y2: number){
    //     super(toLog, x1, y1, x2, y2);
    //     this.tag = "drag";
    // }
    constructor(toLog: Effect<any>){
        super(toLog);
        this.tag = "drag";
    }
    
    assembleLog(): string{
        let toPrint = "Dragged " + (this.toLog as Effect<any>).toDragString();
        return this.logItem(toPrint);
    }
}