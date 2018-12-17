"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Module {
    constructor(ctx) {
        this._instrBoxes = []; //series of tutorial instructions
        this._instrIndex = 0; //index of current instruction being displayed
        this._latestInstrIndex = 0; //furthest instruction reached within this checkpoint
        this.ctx = ctx;
    }
    /**
     * Create guides to help lesson instructions
     * @param ctx the canvas 2D context
     */
    drawGuides() { }
    ;
    renderLatestInstruction(document) {
        this._instrIndex = this._latestInstrIndex;
        this.renderInstruction(document);
    }
    renderNextInstruction(document) {
        this._instrIndex = (this._instrIndex + 1 < this._instrBoxes.length) ? this._instrIndex + 1 : this._instrIndex;
        this.renderInstruction(document);
    }
    renderPrevInstruction(document) {
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
        console.log("instrIndex " + this._instrIndex);
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
            thisModule.renderPrevInstruction(document);
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
            thisModule.renderNextInstruction(document);
        };
        if (this._instrIndex == this._instrBoxes.length || this._instrIndex == this._latestInstrIndex) {
            nextInstr.style.background = "#D8D8D8";
            nextInstr.disabled = true;
        }
        instrDiv.appendChild(nextInstr);
        document.getElementById(instruction._location).appendChild(instrDiv);
    }
    /**
     * Returns the module name
     */
    get name() {
        return this._name;
    }
    /**
     * Returns the module instructions
     */
    get instructions() {
        return this._instructions;
    }
}
exports.Module = Module;
//# sourceMappingURL=Module.js.map