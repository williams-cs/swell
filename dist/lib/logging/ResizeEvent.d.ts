import { LogEvent } from './LogEvent';
export declare class ResizeEvent extends LogEvent<any> {
    toPrint: string;
    constructor(toLog: string, x1: number, y1: number, x2?: number, y2?: number);
    assembleLog(): string;
}
