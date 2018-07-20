"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const LogEvent_1 = require("./LogEvent");
class ClearEvent extends LogEvent_1.LogEvent {
    //toLog: string;
    constructor(toLog) {
        super(toLog);
    }
    assembleLog() {
        let toPrint = "Console cleared";
        return this.logItem(toPrint);
    }
}
exports.ClearEvent = ClearEvent;
//# sourceMappingURL=ClearEvent.js.map