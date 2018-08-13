"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const LogEvent_1 = require("./LogEvent");
class PaintEvent extends LogEvent_1.LogEvent {
    /**
     * Constructor for a Paint Event, used when an object is painted on the canvas
     * @param toLog The string representation of the object to be logged
     * @param x1 The x position of the object
     * @param y1 The y position of the object
     */
    constructor(toLog, x1, y1) {
        super(toLog, x1, y1);
        this.tag = "paint";
    }
    /**
     * Assembles and returns message of form "Painted obj at x, y" with date and time attached
     */
    assembleLog() {
        let toPrint = "Painted " + this.toLog + " at " + this.x1.toString() + ", " + this.y1.toString();
        return this.logItem(toPrint);
    }
}
exports.PaintEvent = PaintEvent;
//# sourceMappingURL=PaintEvent.js.map