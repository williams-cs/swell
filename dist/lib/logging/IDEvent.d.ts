import { LogEvent } from './LogEvent';
export declare class IDEvent extends LogEvent<any> {
    constructor(toLog: string, x1: number, x2: number);
    assembleLog(): string;
}
