import {LogEvent} from './LogEvent';
import { Effect } from '../effects/Effect';

export class CodeEvent extends LogEvent<any>{
    private _toPrint: string;

    constructor(toLog: string){
        super(toLog);
        this._toPrint = toLog;
    }

    /**
     * TODO: implement
     */
    assembleString(): string {
        return '';
    }

    /**
     * TODO: implement
     */
    assembleLog(): string{
        return '';
    }

    eventType() : string {
        return "CodeEvent";
    }

    toJSON(): string {
        return '';
    }

    logRemotely(uid: string, data: string, ip: string, checkpoint: string, parses: boolean): void {
        LogEvent.logToRemoteServer(this.eventType(), uid, data, ip, checkpoint, parses);
    }

}
