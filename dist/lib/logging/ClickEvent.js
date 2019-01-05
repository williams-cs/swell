"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const LogEvent_1 = require("./LogEvent");
class ClickEvent extends LogEvent_1.LogEvent {
    /**
     * Constructor for a Click Event, which logs when an object on the canvas is clicked
     * @param toLog The string representation of the object to log
     * @param x1 The x coordinate of the object to log
     * @param y1 The y coordinate of the object to log
     */
    constructor(toLog, x1, y1) {
        super(toLog, x1, y1);
        this.tag = "click";
    }
    /**
     * Assembles and returns message of form "Clicked on obj at x, y" with date and time attached
     */
    assembleLog() {
        let toPrint = "Clicked on " + this.toLog + " at " + this.x1.toString() + ", " + this.y1.toString();
        return this.logItem(toPrint);
    }
    eventType() {
        return "ClickEvent";
    }
    toJSON() {
        return "{ on: '" + this.toLog + "', x: '" + this.x1 + "', y: '" + this.y1 + "' }";
    }
}
exports.ClickEvent = ClickEvent;
//# sourceMappingURL=ClickEvent.js.map