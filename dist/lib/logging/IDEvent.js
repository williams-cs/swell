"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const LogEvent_1 = require("./LogEvent");
class IDEvent extends LogEvent_1.LogEvent {
    constructor(toLog) {
        super(toLog);
        this.tag = "ID";
    }
    // message should be of form "Assigned ID # to obj at x, y"
    assembleLog() {
        let toPrint = "Assigned ID " + this.toLog;
        return this.logItem(toPrint);
    }
}
exports.IDEvent = IDEvent;
//# sourceMappingURL=IDEvent.js.map