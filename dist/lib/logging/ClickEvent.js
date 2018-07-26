"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const LogEvent_1 = require("./LogEvent");
class ClickEvent extends LogEvent_1.LogEvent {
    constructor(toLog, x1, y1) {
        super(toLog, x1, y1);
        this.tag = "click";
    }
    assembleLog() {
        let toPrint = "Clicked on " + this.toLog + " at " + this.x1.toString() + ", " + this.y1.toString();
        return this.logItem(toPrint);
    }
}
exports.ClickEvent = ClickEvent;
//# sourceMappingURL=ClickEvent.js.map