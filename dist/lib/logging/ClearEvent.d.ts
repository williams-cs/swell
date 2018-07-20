import { LogEvent } from './LogEvent';
export declare class ClearEvent extends LogEvent {
    constructor(toLog?: string);
    assembleLog(): string;
}
