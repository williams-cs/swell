"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const LogEvent_1 = require("./LogEvent");
class DragEvent extends LogEvent_1.LogEvent {
    constructor(toLog, x1, y1, x2, y2) {
        super(toLog, x1, y1, x2, y2);
        this.tag = "drag";
    }
    assembleLog() {
        let toPrint = "Dragged " + this.toLog + " from " + this.x1.toString() + ", " + this.y1.toString() + " to " + this.x2.toString() + ", " + this.y2.toString();
        return this.logItem(toPrint);
    }
}
exports.DragEvent = DragEvent;
//# sourceMappingURL=DragEvent.js.map