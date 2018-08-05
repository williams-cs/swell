import { LogEvent } from './LogEvent';
import { Effect } from '../effects/Effect';
export declare class SelectEvent extends LogEvent<any> {
    private _toPrint;
    constructor(toLog: Effect<any>[]);
    assembleStrings(): string;
    assembleLog(): string;
}
