import { AbstractTextEffect } from "./AbstractTextEffect";
import { StringNode } from "../prims/StringNode";

export class StringEffect extends AbstractTextEffect<StringNode> {

    readonly name: string = "string";

    /* Modification functions */

    modifyText(event: any): void {
        if (!this.isEditing) {
            return;
        }
        let interval: number = this.textMetrics.interval;
        let breakPoint: number = interval != 0 ? this.textMetrics.cursorPos / interval : 0;
        let firstHalf: string = this.node.val.substring(0, breakPoint);
        let secondHalf: string = this.node.val.substring(breakPoint);

        switch (event.keyCode) {
            case 37: // Arrow left
                if (this.textMetrics.initMousePos > this.x + interval/2) {
                    this.textMetrics.initMousePos -= interval;
                    this.modifyTextCursor();
                }
                break;
            case 39: // Arrow right
                if (this.textMetrics.initMousePos < this.x + this.textMetrics.width) {
                    this.textMetrics.initMousePos += interval;
                    this.modifyTextCursor();
                }
                break;
            case 8: // Backspace
                if (this.textMetrics.cursorPos > 0) {
                    firstHalf = firstHalf.substring(0, firstHalf.length - 1);
                    this.node.val = firstHalf + secondHalf;
                    this.textMetrics.initMousePos -= interval;
                    this.modifyTextCursor();
                }
                event.preventDefault(); // Backspacing on Firefox will go back to a previous page
                break;
            case 46: // Del
                secondHalf = secondHalf.substring(1, secondHalf.length);
                this.node.val = firstHalf + secondHalf;
                break;
            default:
                let keyName = event.key;
                if (keyName.length == 1) {
                    firstHalf += keyName;
                    this.node.val = firstHalf + secondHalf;
                    if (interval == 0) {
                        interval = this.ctx.measureText(this.node.val).width / this.node.val.length;
                    }
                    this.textMetrics.initMousePos += interval;
                    this.modifyTextCursor();
                }
        }
    }

    get val(): string {
        return this.node.val;
    }
}
