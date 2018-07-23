import { LogEvent } from './LogEvent';
export declare class PaintEvent extends LogEvent {
    constructor(toLog: string);
    assembleLog(): string;
}
