import { LogEvent } from './LogEvent';
export declare class DragEvent extends LogEvent {
    constructor(toLog: string);
    assembleLog(): string;
}
