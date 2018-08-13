"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const LogEvent_1 = require("./LogEvent");
class SelectEvent extends LogEvent_1.LogEvent {
    /**
     * Constructor for a Selection Event, used when multiple objects on the canvas are selected
     * @param toLog The array of objects selected
     */
    constructor(toLog) {
        super(toLog);
        this.tag = "select";
        this._toPrint = this.assembleStrings();
    }
    /**
     * Assembles and returns a string representation of all the objects selected
     */
    assembleStrings() {
        let logStrings = [];
        for (let elem of this.toLog) {
            logStrings.push(elem.toSelString());
        }
        return "Selected" + logStrings;
    }
    /**
     * Returns the message with date and time attached
     */
    assembleLog() {
        return this.logItem(this._toPrint);
    }
}
exports.SelectEvent = SelectEvent;
//# sourceMappingURL=SelectEvent.js.map