import { LogEvent } from './LogEvent';
import { Effect } from '../effects/Effect';
export declare class DragEvent extends LogEvent<any> {
    constructor(toLog: Effect<any>);
    assembleLog(): string;
}
