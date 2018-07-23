import { LogEvent } from './LogEvent';
export declare class ResizeEvent extends LogEvent {
    constructor(toLog: string);
    assembleLog(): string;
}
