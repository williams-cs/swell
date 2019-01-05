"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class LogEvent {
    /**
     * Abstract class constructor for a Log Event. Registers event time.
     * @param toLog The string, object, or array of objects to be logged
     * @param x1 Initial x position, if applicable
     * @param y1 Initial y position, if applicable
     * @param x2 Final x position, if applicable
     * @param y2 Final y position, if applicable
     */
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
    /**
     * Attaches date and time to log message
     * @param toLog The log message
     */
    logItem(toLog) {
        return " " + this._dateTime + ": " + toLog;
    }
    /**
     * Returns date-time string
     */
    get dateTime() {
        return this._dateTime;
    }
    /**
     * Returns string or effect(s) to be logged
     */
    get toLog() {
        return this._toLog;
    }
    /**
     * Returns event tag
     */
    get tag() {
        return this._tag;
    }
    /**
     * Sets tag string
     */
    set tag(tag) {
        this._tag = tag;
    }
    /**
     * Returns x1
     */
    get x1() {
        return this._x1;
    }
    /**
     * Returns y1
     */
    get y1() {
        return this._y1;
    }
    /**
     * Returns x2
     */
    get x2() {
        return this._x2;
    }
    /**
     * Returns y2
     */
    get y2() {
        return this._y2;
    }
    /**
     * Logs to a remote server.
     */
    static logToRemoteServer(eventtype, uid, data) {
        // modified from: https://stackoverflow.com/a/10073788/480764
        function pad(n, width) {
            let padWith = '0';
            let nstr = n.toString();
            return nstr.length >= width ? nstr : new Array(width - nstr.length + 1).join(padWith) + nstr;
        }
        let date = new Date();
        let year = date.getFullYear().toString();
        let month = pad(date.getMonth() + 1, 2);
        let day = pad(date.getDay(), 2);
        let hour = pad(date.getHours(), 2);
        let minutes = pad(date.getMinutes(), 2);
        let seconds = pad(date.getSeconds(), 2);
        let payload = new FormData();
        payload.append('uid', uid);
        payload.append('data', data);
        payload.append('eventtype', eventtype);
        // MUST USE THE FOLLOWING DATE FORMAT
        // payload.append('time', '2019-01-01 16:36:00');
        payload.append('time', year + '-' + month + '-' + day + ' ' + hour + ':' + minutes + ':' + seconds);
        let xhr = new XMLHttpRequest();
        xhr.open("POST", "http://localhost:3000/events", true);
        xhr.send(payload);
    }
}
exports.LogEvent = LogEvent;
//# sourceMappingURL=LogEvent.js.map