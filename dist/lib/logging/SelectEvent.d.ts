import { LogEvent } from './LogEvent';
export declare class SelectEvent extends LogEvent<any> {
    constructor(toLog: string[]);
    assembleLog(): string;
}
