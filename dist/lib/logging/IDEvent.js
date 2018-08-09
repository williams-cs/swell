"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const LogEvent_1 = require("./LogEvent");
class IDEvent extends LogEvent_1.LogEvent {
    constructor(toLog, x1, x2) {
        super(toLog, x1, x2);
        this.tag = "ID";
    }
    // message should be of form "Assigned ID # to obj at x, y"
    assembleLog() {
        let toPrint = "Assigned ID " + this.toLog + " at " + this.x1.toString() + ", " + this.y1.toString();
        return this.logItem(toPrint);
    }
}
exports.IDEvent = IDEvent;
//# sourceMappingURL=IDEvent.js.map