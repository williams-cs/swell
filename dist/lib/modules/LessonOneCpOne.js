"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Instruction_1 = require("./Instruction");
class LessonOneCpOne {
    constructor() {
        this._name = "l1c1";
        this._nextModule = 'l1c2';
        this._constraint = 'none';
        this._instructions = `<p> Write 'Hello' on the CANVAS. </p>`;
        this._instrBoxes = [];
        this._instrIndex = 0;
        this._latestInstrIndex = 0;
        let content = "First, let's tell the computer to print something on the CANVAS. Click on the CODE box.";
        this._instrBoxes.push(new Instruction_1.Instruction('code', content, "50%", "10%"));
        content = 'Now type `print("Hello")` in this CODE box.';
        this._instrBoxes.push(new Instruction_1.Instruction('code', content, "50%", "10%"));
        content = 'Notice that what you typed causes the computer to print the word "Hello" on the CANVAS here. Congratulations! You just wrote your first line of code!';
        this._instrBoxes.push(new Instruction_1.Instruction('canvas', content, "65%", "10%"));
    }
    /**
     * A lesson to print a string
     * goals: write any string on CANVAS
     * @param document: The HTML document
     * @param effects: the list of effects currently on the CANVAS
     */
    checkGoal(document, effects) {
        let input = document.getElementById('input');
        console.log("instrIndex in checkGoal: " + this._instrIndex);
        switch (this._instrIndex) {
            case 0:
                if (document.activeElement === input && this._latestInstrIndex == 0) {
                    this._latestInstrIndex++;
                    this.nextInstruction(document);
                }
                return false;
                break;
            case 1:
                let regex = /print\s*\(\s*\"Hello\"\s*\)/;
                let match = input.value.match(regex);
                if (match != null && match.length > 0 && this._latestInstrIndex == 1) {
                    this._latestInstrIndex++;
                    this.nextInstruction(document);
                }
                return false;
                break;
            default:
                return true;
                break;
        }
        return false;
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
exports.LessonOneCpOne = LessonOneCpOne;
//# sourceMappingURL=LessonOneCpOne.js.map