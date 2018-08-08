"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const LogEvent_1 = require("./LogEvent");
class DragEvent extends LogEvent_1.LogEvent {
    // constructor(toLog: string, x1: number, y1: number, x2: number, y2: number){
    //     super(toLog, x1, y1, x2, y2);
    //     this.tag = "drag";
    // }
    constructor(toLog) {
        super(toLog);
        this.tag = "drag";
    }
    assembleLog() {
        let toPrint = "Dragged " + this.toLog.toDragString();
        return this.logItem(toPrint);
    }
}
exports.DragEvent = DragEvent;
//# sourceMappingURL=DragEvent.js.map