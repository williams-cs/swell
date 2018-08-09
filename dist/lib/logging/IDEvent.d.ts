import { LogEvent } from './LogEvent';
export declare class IDEvent extends LogEvent<any> {
    constructor(toLog: string);
    assembleLog(): string;
}
