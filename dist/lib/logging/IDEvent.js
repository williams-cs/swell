"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const LogEvent_1 = require("./LogEvent");
class IDEvent extends LogEvent_1.LogEvent {
    /**
     * A constructor for an ID event, used when an object gets assigned an ID
     * @param toLog The effect to log
     */
    constructor(toLog) {
        super(toLog);
        this.tag = "ID";
        this._toPrint = this.assembleString();
    }
    /**
     * Assembles string using the effect's toIDString() method
     */
    assembleString() {
        this._toPrint = this.toLog.toIDString();
        return this._toPrint;
    }
    /**
     * Assembles message of form "Assigned ID # to obj at x, y" with date and time attached
     */
    assembleLog() {
        let print = "Assigned ID " + this._toPrint;
        return this.logItem(print);
    }
    eventType() {
        return "IDEvent";
    }
    toJSON() {
        return "{ on: '" + this.toLog.toIDString() + "' }";
    }
}
exports.IDEvent = IDEvent;
//# sourceMappingURL=IDEvent.js.map