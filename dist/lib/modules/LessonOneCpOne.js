"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Module_1 = require("./Module");
const Instruction_1 = require("./Instruction");
class LessonOneCpOne extends Module_1.Module {
    constructor(ctx) {
        super(ctx);
        this._name = "l1c1";
        this._nextModule = 'l1c2';
        this._constraint = 'none';
        this._instructions = `<p> GOAL: Write 'Hello' on the CANVAS. </p>`;
        this._latestInstrIndex = 0;
        let content = "First, let's tell the computer to print something on the CANVAS. Click on the CODE box.";
        this._instrBoxes.push(new Instruction_1.Instruction('code-editor', content, "70%", "10%"));
        content = 'Great! Now type `print("Hello")` in this CODE box.';
        this._instrBoxes.push(new Instruction_1.Instruction('code-editor', content, "40%", "10%"));
        content = 'Notice that what you typed causes the computer to print the word "Hello" on the CANVAS here. Congratulations! You just wrote your first line of code!';
        this._instrBoxes.push(new Instruction_1.Instruction('canvas-container', content, "65%", "10%"));
    }
    /**
     * A lesson to print a string
     * goals: write any string on CANVAS
     * @param document The HTML document
     * @param effects the list of effects currently on the CANVAS
     */
    checkGoal(document, effects) {
        let input = document.getElementById('input');
        /*
        let regex: RegExp = /print\s*\(\s*\"Hello\"\s*\)/;
        let match = input.value.match(regex);
        if (match != null && match.length > 0) {
          return true;
        }
        return false;
        */
        console.log("instrIndex in checkGoal: " + this._instrIndex);
        switch (this._latestInstrIndex) {
            case 0:
                if (document.activeElement === input && this._latestInstrIndex == 0) {
                    this._latestInstrIndex++;
                    this.renderLatestInstruction(document);
                }
                return false;
                break;
            case 1:
                let regex = /print\s*\(\s*\"Hello\"\s*\)/;
                let match = input.value.match(regex);
                if (match != null && match.length > 0) {
                    this._latestInstrIndex++;
                    this.renderLatestInstruction(document);
                }
                return false;
                break;
            default:
                return true;
                break;
        }
        return false;
    }
}
exports.LessonOneCpOne = LessonOneCpOne;
//# sourceMappingURL=LessonOneCpOne.js.map