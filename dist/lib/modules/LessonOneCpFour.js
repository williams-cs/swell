"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Module_1 = require("./Module");
const Instruction_1 = require("./Instruction");
const StringEffect_1 = require("../effects/StringEffect");
class LessonOneCpFour extends Module_1.Module {
    constructor(ctx, editor) {
        super(ctx, editor);
        this._name = "l1c4";
        this._constraint = 'canvas';
        this._instructions = `<p> CHALLENGE: Print the word "moo" on the CANVAS, and put it inside the box at the center of the CANVAS. </p>`;
        this._latestInstrIndex = 3;
        this.square_size = 100;
        this.font_size = 20;
        this.x = Math.round((ctx.canvas.width - this.square_size) / 2);
        this.y = Math.round((ctx.canvas.height - this.square_size) / 2);
        let content = "In real life, computer scientists often can only change their CODE to affect the CANVAS, instead of interacting with the CANVAS directly.";
        this._instrBoxes.push(new Instruction_1.Instruction('code-editor', content, "30%", "10%"));
        content = "Anyone, including you, is cut out to be a computer scientist! Let's have a challenge.";
        this._instrBoxes.push(new Instruction_1.Instruction('code-editor', content, "50%", "10%"));
        content = "The CANVAS is temporarily frozen. You can no longer interact with objects drawn on it.";
        this._instrBoxes.push(new Instruction_1.Instruction('code-editor', content, "80%", "10%"));
        content = "Can you figure out how to write CODE to print the word 'moo' inside the box at the center of the CANVAS?";
        this._instrBoxes.push(new Instruction_1.Instruction('code-editor', content, "80%", "10%"));
        content = "Congratulations! You finished your first coding challenge!";
        this._instrBoxes.push(new Instruction_1.Instruction('canvas-container', content, "80%", "10%"));
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
     * @param effects the list of effects currently on the CANVAS
     */
    checkGoal(document, effects) {
        switch (this._latestInstrIndex) {
            case 3:
                for (let effect of effects) {
                    if (effect instanceof StringEffect_1.StringEffect && effect.str === "moo") {
                        if ((effect.x > this.x && effect.x < this.x + this.square_size) && (effect.y > this.y && effect.y < this.y + this.square_size)) {
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
exports.LessonOneCpFour = LessonOneCpFour;
//# sourceMappingURL=LessonOneCpFour.js.map