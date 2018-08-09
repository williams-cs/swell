import { LogEvent } from './LogEvent';
import { Effect } from '../effects/Effect';
export declare class IDEvent extends LogEvent<any> {
    private _toPrint;
    constructor(toLog: Effect<any>);
    assembleString(): string;
    assembleLog(): string;
}
