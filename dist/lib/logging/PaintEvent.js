"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const LogEvent_1 = require("./LogEvent");
class PaintEvent extends LogEvent_1.LogEvent {
    //toLog: string;
    constructor(toLog) {
        super(toLog);
        this.tag = "paint";
    }
    assembleLog() {
        let toPrint = "Painted " + this.toLog;
        return this.logItem(toPrint);
    }
}
exports.PaintEvent = PaintEvent;
//# sourceMappingURL=PaintEvent.js.map