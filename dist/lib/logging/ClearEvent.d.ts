import { LogEvent } from './LogEvent';
export declare class ClearEvent extends LogEvent<any> {
    constructor(toLog?: string);
    assembleLog(): string;
}
