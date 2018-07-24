"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class LogEvent {
    constructor(toLog, x1, y1, x2, y2) {
        this.toLog = toLog;
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
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