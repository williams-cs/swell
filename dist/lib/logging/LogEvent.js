"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class LogEvent {
    constructor(toLog, x1, y1, x2, y2) {
        let today = new Date();
        this._date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        this._time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        this._dateTime = this._date + ' ' + this._time;
        this._toLog = toLog;
        //this._toLogArray = toLogArray;
        this._x1 = x1;
        this._y1 = y1;
        this._x2 = x2;
        this._y2 = y2;
    }
    logItem(toLog) {
        return " " + this._dateTime + ": " + toLog;
    }
    get dateTime() {
        return this._dateTime;
    }
    get toLog() {
        return this._toLog;
    }
    get tag() {
        return this._tag;
    }
    set tag(tag) {
        this._tag = tag;
    }
    get x1() {
        return this._x1;
    }
    get y1() {
        return this._y1;
    }
    get x2() {
        return this._x2;
    }
    get y2() {
        return this._y2;
    }
}
exports.LogEvent = LogEvent;
//# sourceMappingURL=LogEvent.js.map