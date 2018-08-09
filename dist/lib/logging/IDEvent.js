"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const LogEvent_1 = require("./LogEvent");
class IDEvent extends LogEvent_1.LogEvent {
    constructor(toLog) {
        super(toLog);
        this.tag = "ID";
        this._toPrint = this.assembleString();
    }
    assembleString() {
        this._toPrint = this.toLog.toIDString();
        return this._toPrint;
    }
    // message should be of form "Assigned ID # to obj at x, y"
    assembleLog() {
        let print = "Assigned ID " + this._toPrint;
        return this.logItem(print);
    }
}
exports.IDEvent = IDEvent;
//# sourceMappingURL=IDEvent.js.map