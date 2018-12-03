"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const LogEvent_1 = require("./LogEvent");
class DragEvent extends LogEvent_1.LogEvent {
    /**
     * Constructor for a Drag Event, which logs when an object on the canvas is dragged
     * @param toLog The effect to log
     */
    constructor(toLog) {
        super(toLog);
        this.tag = "drag";
        this._toPrint = this.assembleString();
    }
    /**
     * Assembles a log string using the Effect's toDragString() method
     */
    assembleString() {
        this._toPrint = this.toLog.toDragString();
        return this._toPrint;
    }
    /**
     * Assembles and returns final log message of form "Dragged obj from x1, y1 to x2, y2"
     * with date and time attached
     */
    assembleLog() {
        let print = "Dragged " + this._toPrint;
        return this.logItem(print);
    }
}
exports.DragEvent = DragEvent;
//# sourceMappingURL=DragEvent.js.map