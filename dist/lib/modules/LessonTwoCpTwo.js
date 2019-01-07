"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Module_1 = require("./Module");
const Instruction_1 = require("./Instruction");
const EllipseEffect_1 = require("../effects/EllipseEffect");
class LessonTwoCpTwo extends Module_1.Module {
    constructor(ctx, editor) {
        super(ctx, editor);
        this._name = "l2c2";
        this._nextModule = 'l2c3';
        this._constraint = 'none';
        this._instructions = `<p> GOAL: Fit the circle inside the given box. </p>`;
        this._starterCode = `print(ellipse(100, 100), 120, 150);`;
        this._latestInstrIndex = 0;
        this.y = 10;
        this.rect_h = 50;
        this.rect_w = 100;
        this.font_size = 20;
        this.x = Math.round((ctx.canvas.width - this.rect_w) / 2);
        let content = "What are the numbers (100, 100) next to ellipse for? Let's find out by first clicking on the circle on the CANVAS.";
        this._instrBoxes.push(new Instruction_1.Instruction('canvas-container', content, "80%", "10%"));
        content = "Now drag the 8 tips around the cirlce to resize it, then drag it inside the given box. Observe the CODE above.";
        this._instrBoxes.push(new Instruction_1.Instruction('code-editor', content, "50%", "10%"));
        content = "Yep! Those numbers inside ellipse(_,_) change the dimension of the circle! Note that you can also directly retype these numbers in the CODE area, without touching the CANVAS.";
        this._instrBoxes.push(new Instruction_1.Instruction('code-editor', content, "50%", "10%"));
    }
    drawGuides() {
        this.ctx.beginPath();
        this.ctx.rect(this.x, this.y, this.rect_w, this.rect_h);
        this.ctx.strokeStyle = '#6C6C6C';
        this.ctx.stroke();
        this.ctx.font = this.font_size + "px Courier New";
        this.ctx.fillStyle = '#6C6C6C';
        this.ctx.fillText("Fit circle", this.x, this.y - 2 * this.font_size);
        this.ctx.fillText("in here", this.x, this.y - this.font_size);
    }
    /**
     *
     * @param document The HTML document
     * @param effects the list of effects currently on the CANVAS
     */
    checkGoal(document, effects) {
        switch (this._latestInstrIndex) {
            case 0:
                for (let effect of effects) {
                    if (effect instanceof EllipseEffect_1.EllipseEffect && effect.selected) {
                        this._latestInstrIndex++;
                        this.renderLatestInstruction(document);
                    }
                }
                return false;
            case 1:
                for (let effect of effects) {
                    if (effect instanceof EllipseEffect_1.EllipseEffect) {
                        if (effect.x > this.x && effect.x < this.x + this.rect_w
                            && effect.y > this.y && effect.y < this.y + this.rect_h
                            && effect.w < this.rect_w && effect.h < this.rect_h) {
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
exports.LessonTwoCpTwo = LessonTwoCpTwo;
//# sourceMappingURL=LessonTwoCpTwo.js.map