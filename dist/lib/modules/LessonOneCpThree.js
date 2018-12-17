"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Module_1 = require("./Module");
const Instruction_1 = require("./Instruction");
const StringEffect_1 = require("../effects/StringEffect");
class LessonOneCpThree extends Module_1.Module {
    constructor(ctx) {
        super(ctx);
        this._name = "l1c3";
        this._prevModule = 'l1c2';
        this._nextModule = 'l1c4';
        this._constraint = 'canvas';
        this._instructions = `<p> GOAL: Move the word around the CANVAS solely by changing your CODE. </p>`;
        this._starterCode = `print("Hello", 100, 100)`;
        this._latestInstrIndex = 0;
        this.y = 10;
        this.square_size = 100;
        this.font_size = 20;
        this.x = ctx.canvas.width - this.square_size - this.y;
        let content = "Moving things on the CANVAS changes the CODE. What if we change the CODE? In the print statement above, change the first 100 to 200. Observe the CANVAS.";
        this._instrBoxes.push(new Instruction_1.Instruction('code-editor', content, "30%", "10%"));
        content = "Changing those numbers in the CODE moves the word on CANVAS! Now, try move this word inside the top-right box by changing your CODE alone.";
        this._instrBoxes.push(new Instruction_1.Instruction('canvas-container', content, "70%", "10%"));
        content = "Yay! You've learned how to tell the computer to write for you!";
        this._instrBoxes.push(new Instruction_1.Instruction('code-editor', content, "50%", "10%"));
    }
    drawGuides() {
        this.ctx.beginPath();
        this.ctx.rect(this.x, this.y, this.square_size, this.square_size);
        this.ctx.strokeStyle = '#6C6C6C';
        this.ctx.stroke();
        this.ctx.font = this.font_size + "px Courier New";
        this.ctx.fillStyle = '#6C6C6C';
        this.ctx.fillText("Put word", this.x, this.y - 2 * this.font_size);
        this.ctx.fillText("in here", this.x, this.y - this.font_size);
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
                    if (effect.x > this.x && effect.x < this.x + this.square_size && effect.y > this.y && effect.y < this.y + this.square_size) {
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
}
exports.LessonOneCpThree = LessonOneCpThree;
//# sourceMappingURL=LessonOneCpThree.js.map