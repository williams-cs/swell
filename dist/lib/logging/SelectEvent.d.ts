import { LogEvent } from './LogEvent';
export declare class SelectEvent extends LogEvent<any> {
    constructor(toLogArray: string[], x1: number, y1: number);
    assembleLog(): string;
}
