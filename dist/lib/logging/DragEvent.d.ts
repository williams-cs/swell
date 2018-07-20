import { LogEvent } from './LogEvent';
export declare class DragEvent extends LogEvent {
    constructor(toLog: string, x1: number, y1: number, x2: number, y2: number);
    assembleLog(): string;
}
