"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const LogEvent_1 = require("./LogEvent");
class SelectEvent extends LogEvent_1.LogEvent {
    constructor(toLog) {
        super(toLog);
        this.tag = "select";
    }
    assembleLog() {
        let toPrint = "Selected " + this.toLog;
        return this.logItem(toPrint);
    }
}
exports.SelectEvent = SelectEvent;
//# sourceMappingURL=SelectEvent.js.map