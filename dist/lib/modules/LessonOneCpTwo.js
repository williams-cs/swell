"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Module_1 = require("./Module");
const Instruction_1 = require("./Instruction");
const StringEffect_1 = require("../effects/StringEffect");
class LessonOneCpTwo extends Module_1.Module {
    constructor(ctx, editor) {
        super(ctx, editor);
        this._name = "l1c2";
        this._prevModule = 'l1c2';
        this._nextModule = 'l1c3';
        this._constraint = 'code';
        this._instructions = `<p> GOAL: Move the words you just created to explore how it affects your code. </p>`;
        this._starterCode = `print("Hello", 100, 100)`;
        this._latestInstrIndex = 1;
        this.y = 10;
        this.square_size = 100;
        this.font_size = 20;
        this.x = ctx.canvas.width - this.square_size - this.y;
        let content = `Notice the numbers added inside the brackets <span class="inline-code">()</span> of your print statement? They specify where your computer should write the word on the CANVAS.`;
        this._instrBoxes.push(new Instruction_1.Instruction('code-editor', content, "30%", "10%"));
        content = "To understand what they do, first click on the word currently on the CANVAS and drag it around.";
        this._instrBoxes.push(new Instruction_1.Instruction('canvas-container', content, "70%", "10%"));
        content = "Now drag the word into the top-right box on the CANVAS.";
        this._instrBoxes.push(new Instruction_1.Instruction('canvas-container', content, "80%", "10%"));
        content = "Did you notice that the numbers inside the print statement change? Now drag the word into the top-left box on the CANVAS.";
        this._instrBoxes.push(new Instruction_1.Instruction('code-editor', content, "30%", "10%"));
        content = 'These numbers indicate the location on the CANVAS where the computer should draw the word! The first number changes when the word moves left and right. The second number changes when the word moves up and down.';
        this._instrBoxes.push(new Instruction_1.Instruction('code-editor', content, "30%", "10%"));
    }
    drawGuides() {
        this.ctx.beginPath();
        this.ctx.rect(this.x, this.y, this.square_size, this.square_size);
        this.ctx.strokeStyle = '#6C6C6C';
        this.ctx.stroke();
        this.ctx.font = this.font_size + "px Courier New";
        this.ctx.fillStyle = '#6C6C6C';
        this.ctx.fillText("Put word", this.x, this.y + this.square_size + this.font_size);
        this.ctx.fillText("in here", this.x, this.y + this.square_size + 2 * this.font_size);
    }
    /**
     * A lesson to print a string
     * goals: moving the text and observe the code
     * @param document The HTML document
     * @param effects: the list of effects currently on the CANVAS
     */
    checkGoal(document, effects) {
        switch (this._latestInstrIndex) {
            case 0:
                return false;
            case 1:
                for (let effect of effects) {
                    if (effect instanceof StringEffect_1.StringEffect && effect.str !== "" && effect.selected) {
                        this._latestInstrIndex++;
                        this.renderLatestInstruction(document);
                    }
                }
                return false;
            case 2:
                for (let effect of effects) {
                    if (effect instanceof StringEffect_1.StringEffect && effect.str !== "") {
                        if (effect.x > this.x && effect.x < this.x + this.square_size && effect.y > this.y && effect.y < this.y + this.square_size) {
                            this.x = 10;
                            this._latestInstrIndex++;
                            this.renderLatestInstruction(document);
                        }
                    }
                }
                return false;
            case 3:
                for (let effect of effects) {
                    if (effect instanceof StringEffect_1.StringEffect && effect.str !== "") {
                        if (effect.x > this.x && effect.x < this.x + this.square_size && effect.y > this.y && effect.y < this.y + this.square_size) {
                            this._latestInstrIndex++;
                            this.renderLatestInstruction(document);
                        }
                    }
                }
                return false;
            default:
                return true;
        }
    }
}
exports.LessonOneCpTwo = LessonOneCpTwo;
//# sourceMappingURL=LessonOneCpTwo.js.map