"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Module_1 = require("./Module");
const Instruction_1 = require("./Instruction");
const EllipseEffect_1 = require("../effects/EllipseEffect");
class LessonTwoCpSix extends Module_1.Module {
    constructor(ctx, editor) {
        super(ctx, editor);
        this._name = "l2c6";
        this._constraint = 'code';
        this._instructions = `<p> GOAL: Enlarge one of the circles referred to by c on the CANVAS. </p>`;
        this._starterCode = `a = "moo moo";
b = ellipse(100, 100);
c = ellipse(75, 75);
print(c, 100, 100);
print(c, 300, 100)`;
        this._latestInstrIndex = 1;
        //put box at top-left of CANVAS
        this.x = 25;
        this.y = 25;
        this.square_size = 250;
        this.font_size = 20;
        let content = `Now that you have drawn 2 circles both are called <span class="inline-code">c</span>, let's see what happens when you try to modify one of them.`;
        this._instrBoxes.push(new Instruction_1.Instruction('code-editor', content, "50%", "10%"));
        content = `Click on one of the circles on the CANVAS, and try make it bigger. Observe what happens to your declaration of <span class="inline-code">c</span>.`;
        this._instrBoxes.push(new Instruction_1.Instruction('code-editor', content, "70%", "10%"));
        content = `Did you see what happened? Changing one circle changes what <span class="inline-code">c</span> is in your CODE!`;
        this._instrBoxes.push(new Instruction_1.Instruction('code-editor', content, "50%", "10%"));
        content = 'Furthermore, that change also affected the other circle on the CANVAS! The 2 circle referred to by <span class="inline-code">c</span> are always identical, no matter what!';
        this._instrBoxes.push(new Instruction_1.Instruction('canvas-container', content, "70%", "10%"));
    }
    drawGuides() {
        this.ctx.beginPath();
        this.ctx.rect(this.x, this.y, this.square_size, this.square_size);
        this.ctx.strokeStyle = '#6C6C6C';
        this.ctx.stroke();
        this.ctx.font = this.font_size + "px Courier New";
        this.ctx.fillStyle = '#6C6C6C';
        this.ctx.fillText("Make circle", this.x, this.y + this.font_size);
        this.ctx.fillText("bigger than this box", this.x, this.y + 2 * this.font_size);
    }
    /**
     * A lesson to print a string
     * goals: moving the text and observe the code
     * @param document the HTML document
     * @param effects the list of effects currently on the CANVAS
     */
    checkGoal(document, effects) {
        switch (this._latestInstrIndex) {
            case 1:
                for (let effect of effects) {
                    if (effect instanceof EllipseEffect_1.EllipseEffect) {
                        if (effect.w > 250 && effect.h > 250) {
                            this._latestInstrIndex = 3;
                            this.renderNextInstruction(document);
                            break;
                        }
                    }
                }
                return false;
            default:
                return true;
        }
    }
}
exports.LessonTwoCpSix = LessonTwoCpSix;
//# sourceMappingURL=LessonTwoCpSix.js.map