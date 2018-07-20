"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const LogEvent_1 = require("./LogEvent");
class DragEvent extends LogEvent_1.LogEvent {
    constructor(toLog) {
        super(toLog);
    }
    assembleLog() {
        let toPrint = "Dragged " + this.toLog;
        return this.logItem(toPrint);
    }
}
exports.DragEvent = DragEvent;
//# sourceMappingURL=DragEvent.js.map