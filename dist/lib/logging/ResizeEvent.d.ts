import { LogEvent } from './LogEvent';
export declare class ResizeEvent extends LogEvent<any> {
    constructor(toLog: string, x1: number, y1: number);
    assembleLog(): string;
}
