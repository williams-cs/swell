"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const LogEvent_1 = require("./LogEvent");
class ResizeEvent extends LogEvent_1.LogEvent {
    //toLog: string;
    constructor(toLog) {
        super(toLog);
    }
    assembleLog() {
        // let today = new Date();
        // let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        // let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        // let dateTime = date + ' ' + time;
        let toPrint = "Resized " + this.toLog;
        return this.logItem(toPrint);
    }
}
exports.ResizeEvent = ResizeEvent;
//# sourceMappingURL=ResizeEvent.js.map