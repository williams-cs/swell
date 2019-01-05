"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const LogEvent_1 = require("./LogEvent");
class ClearEvent extends LogEvent_1.LogEvent {
    /**
     * Constructor for the Clear Event, which logs when the canvas is cleared
     * @param toLog What to log (spoiler: nothing)
     */
    constructor(toLog) {
        super(toLog);
        this.tag = "clear";
    }
    /**
     * Assembles and returns message "Console cleared" with date and time attached
     */
    assembleLog() {
        let toPrint = "Console cleared";
        return this.logItem(toPrint);
    }
    eventType() {
        return "ClearEvent";
    }
    toJSON() {
        return "{}";
    }
}
exports.ClearEvent = ClearEvent;
//# sourceMappingURL=ClearEvent.js.map