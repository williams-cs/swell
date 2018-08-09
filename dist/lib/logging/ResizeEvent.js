"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const LogEvent_1 = require("./LogEvent");
class ResizeEvent extends LogEvent_1.LogEvent {
    constructor(toLog, x1, y1, x2, y2) {
        super(toLog, x1, y1, x2, y2);
        this.tag = "resize";
    }
    assembleLog() {
        // let today = new Date();
        // let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        // let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        // let dateTime = date + ' ' + time;
        if (this.x2 != undefined && this.y2 != undefined) {
            this.toPrint = "Resized " + this.toLog + " from size " + this.x1.toString() + " by " + this.y1.toString()
                + " to size " + this.x2.toString() + " by " + this.y2.toString();
        }
        else {
            this.toPrint = "Resized " + this.toLog + " from size " + this.x1.toString() + " to size " + this.y1.toString();
        }
        return this.logItem(this.toPrint);
    }
}
exports.ResizeEvent = ResizeEvent;
//# sourceMappingURL=ResizeEvent.js.map