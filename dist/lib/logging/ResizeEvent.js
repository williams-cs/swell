"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const LogEvent_1 = require("./LogEvent");
class ResizeEvent extends LogEvent_1.LogEvent {
    /**
     * Constructor for Resize Event, used when an object on the canvas is resized
     * @param toLog String representation of the object to be logged
     * @param x1 Initial x dimension of the object, or initial font size
     * @param y1 Initial y dimension of the object, or final font size
     * @param x2 Final x dimension of the object
     * @param y2 Final y dimension of the object
     */
    constructor(toLog, x1, y1, x2, y2) {
        super(toLog, x1, y1, x2, y2);
        this.tag = "resize";
    }
    /**
     * Assembles log message of form "Resized obj from size x1, y1 to size x2, y2" for rects and ellipses
     * or of form "Resized obj from size x1 to size y1" for strings
     * Has date and time attached
     */
    assembleLog() {
        if (this.x2 != undefined && this.y2 != undefined) {
            this.toPrint = "Resized " + this.toLog + " from size " + this.x1.toString() + " by " + this.y1.toString()
                + " to size " + this.x2.toString() + " by " + this.y2.toString();
        }
        else {
            this.toPrint = "Resized " + this.toLog + " from size " + this.x1.toString() + " to size " + this.y1.toString();
        }
        return this.logItem(this.toPrint);
    }
    eventType() {
        return "ResizeEvent";
    }
    toJSON() {
        if (this.x2 != undefined && this.y2 != undefined) {
            return "{ on: '" + this.toLog + "', from_x: '" + this.x1 + "', from_y: '" + this.y1 + "', to_x: '" + this.x2 + "', to_y: '" + this.y2 + "' }";
        }
        else {
            // I don't understand this. Why this.y1?
            return "{ on: '" + this.toLog + "', from_x: '" + this.x1 + "', to_y: '" + this.y1 + "' }";
        }
    }
}
exports.ResizeEvent = ResizeEvent;
//# sourceMappingURL=ResizeEvent.js.map