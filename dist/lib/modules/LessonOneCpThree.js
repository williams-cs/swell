"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Checkpoint_1 = require("./Checkpoint");
const Instruction_1 = require("./Instruction");
const StringEffect_1 = require("../effects/StringEffect");
class LessonOneCpThree extends Checkpoint_1.Checkpoint {
    constructor() {
        super();
        this._name = "l1c3";
        this._prevModule = 'l1c2';
        this._nextModule = 'l1c4';
        this._constraint = 'canvas';
        this._instructions = `<p> GOAL: Move the word around the CANVAS by solely changing your CODE. </p>`;
        this._starterCode = `print("Hello", 100, 100)`;
        this._latestInstrIndex = 0;
        this.x = 350;
        this.y = 10;
        let content = "Moving things on the CANVAS changes the CODE. What if we change the CODE? In the print statement above, change the first 100 to 200. Observe the CANVAS.";
        this._instrBoxes.push(new Instruction_1.Instruction('code-editor', content, "30%", "10%"));
        content = "Changing those numbers in the CODE moves the word on CANVAS! Now, try move this word inside the top-right box by changing your CODE alone.";
        this._instrBoxes.push(new Instruction_1.Instruction('canvas-container', content, "70%", "10%"));
        content = "Yay! You've learned how to tell the computer to write for you!";
        this._instrBoxes.push(new Instruction_1.Instruction('code-editor', content, "50%", "10%"));
    }
    drawGuides(ctx) {
        ctx.beginPath();
        ctx.rect(this.x, this.y, 100, 100);
        ctx.strokeStyle = '#6C6C6C';
        ctx.stroke();
        ctx.font = 20 + "px Courier New";
        ctx.fillStyle = '#6C6C6C';
        ctx.fillText("Drag word", this.x, this.y + 120);
        ctx.fillText("in here", this.x, this.y + 140);
    }
    /**
     * A lesson to print a string
     * goals: moving the text and observe the code
     * @param document The HTML document
     * @param effects: the list of effects currently on the CANVAS
     */
    checkGoal(document, effects) {
        /*
                for (let effect of effects) {
                  if (effect instanceof StringEffect && effect.str !== "") {
                    if (effect.x > this.x && effect.x < this.x + 100 && effect.y > this.y && effect.y < this.y + 100) {
                      return true;
                    }
                  }
                }
                return false;
        */
        let input = document.getElementById('input');
        //console.log("instrIndex in checkGoal: " + this._instrIndex);
        switch (this._latestInstrIndex) {
            case 0:
                let regex = /print\s*\(\s*\".*\"\s*,\s*200\s*,\s*100\s*\)/;
                let match = input.value.match(regex);
                if (match != null && match.length > 0) {
                    this._latestInstrIndex++;
                    this.renderLatestInstruction(document);
                }
                return false;
                break;
            case 1:
                for (let effect of effects) {
                    if (effect instanceof StringEffect_1.StringEffect && effect.str !== "") {
                        if (effect.x > this.x && effect.x < this.x + 100 && effect.y > this.y && effect.y < this.y + 100) {
                            this._latestInstrIndex++;
                            this.renderLatestInstruction(document);
                        }
                    }
                }
                return false;
                break;
            default:
                return true;
                break;
        }
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
exports.LessonOneCpThree = LessonOneCpThree;
//# sourceMappingURL=LessonOneCpThree.js.map