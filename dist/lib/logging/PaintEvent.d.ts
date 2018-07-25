import { LogEvent } from './LogEvent';
export declare class PaintEvent extends LogEvent<any> {
    constructor(toLog: string);
    assembleLog(): string;
}
