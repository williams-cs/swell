"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class LogEvent {
    constructor(toLog) {
        this.toLog = toLog;
    }
    logItem(toLog) {
        let today = new Date();
        let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        this.dateTime = date + ' ' + time;
        return this.dateTime + ": " + toLog;
    }
}
exports.LogEvent = LogEvent;
//# sourceMappingURL=LogEvent.js.map