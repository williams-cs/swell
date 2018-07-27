"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const LogEvent_1 = require("./LogEvent");
class PaintEvent extends LogEvent_1.LogEvent {
    //toLog: string;
    constructor(toLog, x1, y1) {
        super(toLog, x1, y1);
        this.tag = "paint";
    }
    assembleLog() {
        let toPrint = "Painted " + this.toLog + " at " + this.x1.toString() + ", " + this.y1.toString();
        return this.logItem(toPrint);
    }
}
exports.PaintEvent = PaintEvent;
//# sourceMappingURL=PaintEvent.js.map