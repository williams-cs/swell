"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Checkpoint {
    constructor() {
        this._instrBoxes = [];
        this._instrIndex = 0;
        this._latestInstrIndex = 0;
    }
    nextInstruction(document) {
        this._instrIndex = (this._instrIndex + 1 < this._instrBoxes.length) ? this._instrIndex + 1 : this._instrIndex;
        this.renderInstruction(document);
    }
    prevInstruction(document) {
        this._instrIndex = (this._instrIndex - 1 >= 0) ? this._instrIndex - 1 : this._instrIndex;
        this.renderInstruction(document);
    }
    /**
     * render the current instruction of this checkpoint
     * @param document The HTML document
     */
    renderInstruction(document) {
        let curInstruction = document.getElementById("instruction");
        if (curInstruction != null) {
            curInstruction.remove();
        }
        let instruction = this._instrBoxes[this._instrIndex];
        let instrDiv = document.createElement("div");
        instrDiv.className = "instruction";
        instrDiv.id = 'instruction';
        instrDiv.innerText = instruction._content;
        instrDiv.style.top = instruction._top;
        instrDiv.style.left = instruction._left;
        instrDiv.style.display = "block";
        let prevInstr = document.createElement("button");
        prevInstr.id = 'previous-instruction';
        prevInstr.innerText = "<";
        let thisModule = this;
        prevInstr.onclick = function () {
            console.log("instrIndex " + thisModule._instrIndex);
            thisModule.prevInstruction(document);
        };
        if (this._instrIndex == 0) {
            prevInstr.style.background = "#D8D8D8";
            prevInstr.disabled = true;
        }
        instrDiv.appendChild(prevInstr);
        let nextInstr = document.createElement("button");
        nextInstr.id = 'next-instruction';
        nextInstr.innerText = ">";
        nextInstr.onclick = function () {
            console.log("instrIndex " + thisModule._instrIndex);
            thisModule.nextInstruction(document);
        };
        if (this._instrIndex == this._instrBoxes.length || this._instrIndex == this._latestInstrIndex) {
            nextInstr.style.background = "#D8D8D8";
            nextInstr.disabled = true;
        }
        instrDiv.appendChild(nextInstr);
        document.getElementById(instruction._location).appendChild(instrDiv);
    }
}
exports.Checkpoint = Checkpoint;
//# sourceMappingURL=Checkpoint.js.map