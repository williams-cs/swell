"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const LogEvent_1 = require("./LogEvent");
class SelectEvent extends LogEvent_1.LogEvent {
    constructor(toLog) {
        super(toLog);
        this.tag = "select";
        this._toPrint = this.assembleStrings();
    }
    assembleStrings() {
        let logStrings = [];
        for (let elem of this.toLog) {
            logStrings.push(elem.toString());
        }
        return "Selected" + logStrings;
    }
    assembleLog() {
        return this.logItem(this._toPrint);
    }
}
exports.SelectEvent = SelectEvent;
//# sourceMappingURL=SelectEvent.js.map