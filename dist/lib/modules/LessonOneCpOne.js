"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Instruction_1 = require("./Instruction");
class LessonOneCpOne {
    constructor() {
        this._name = "l1c1";
        this._nextModule = 'l1c2';
        this._constraint = 'none';
        this._instructions = `<p> To begin, let’s tell the computer to write something on the CANVAS. </p>
    <p> GOAL: write on the CANVAS. </p>
    <p> HINT: type in the CODE box: print("Hello, world!"), then hit the RUN button. </p>`;
        this._instrBoxes = [];
        this._instrIndex = 0;
        let content = "First, let's tell the computer to print something on the CANVAS. Click on the CODE box here.";
        this._instrBoxes.push(new Instruction_1.Instruction('code', content));
        content = 'Now type `print("Hello")` in this CODE box.';
        this._instrBoxes.push(new Instruction_1.Instruction('code', content));
        content = 'Notice that what you typed causes the computer to print the world "Hello" on the CANVAS here. Congratulations! You just wrote your first line of code!';
        this._instrBoxes.push(new Instruction_1.Instruction('canvas', content));
    }
    /**
     * render the current instruction of this checkpoint
     * @param document The HTML document
     */
    renderInstruction(document) {
        let instruction = this._instrBoxes[this._instrIndex];
        let instrDiv = document.createElement("div");
        instrDiv.className = "instruction";
        instrDiv.innerText = instruction._content;
        instrDiv.style.display = "block";
        let prevInstr = document.createElement("button");
        prevInstr.id = 'previous-instruction';
        prevInstr.innerText = "<";
        instrDiv.appendChild(prevInstr);
        let nextInstr = document.createElement("button");
        nextInstr.id = 'next-instruction';
        nextInstr.innerText = "<";
        instrDiv.appendChild(nextInstr);
        document.getElementById(instruction._location).appendChild(instrDiv);
    }
    /**
     * A lesson to print a string
     * goals: write any string on CANVAS
     * @param document: The HTML document
     * @param effects: the list of effects currently on the CANVAS
     */
    checkGoal(document, effects) {
        /*
        for (let effect of effects) {
          if (effect instanceof StringEffect) {
            if (effect.str !== "") {
              return true;
            }
          }
        }
        */
        return false;
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