import { LogEvent } from './LogEvent';
import { Effect } from '../effects/Effect';
export declare class SelectEvent extends LogEvent<any> {
    constructor(toLog: Effect<any>[]);
    assembleLog(): string;
}
