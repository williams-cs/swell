"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Module_1 = require("./Module");
const Instruction_1 = require("./Instruction");
const NumberEffect_1 = require("../effects/NumberEffect");
const EllipseEffect_1 = require("../effects/EllipseEffect");
class LessonTwoCpSeven extends Module_1.Module {
    constructor(ctx, editor) {
        super(ctx, editor);
        this._name = "l2c7";
        this._nextModule = 'l3c1';
        this._constraint = 'none';
        this._instructions = `<p> CHALLENGE: Create a circle and print out its size. </p>`;
        this._starterCode = `a = 50;
print(ellipse(100, 100), 125, 175);`;
        this._latestInstrIndex = 1;
        this.x = 10;
        this.square_size = 250;
        this.font_size = 20;
        this.y = ctx.canvas.height - this.square_size - this.x;
        let content = `Let's learn one final thing about variables. Observe the code above: we connect the variable <span class="inline-code">a</span> to the number <span class="inline-code">50</span>, and we also have a <span class="inline-code">print</span> statement to print an ellipse.`;
        this._instrBoxes.push(new Instruction_1.Instruction('code-editor', content, "50%", "10%"));
        content = `Replace the two numbers <span class="inline-code">100</span> inside the <span class="inline-code">print</span> statement with the letter <span class="inline-code">a</span>. Observe what happens.`;
        this._instrBoxes.push(new Instruction_1.Instruction('code-editor', content, "40%", "10%"));
        content = `Did you see the circle on CANVAS become smaller? The variable <span class="inline-code">a</span> is tied to the number <span class="inline-code">50</span>, so now the circle has dimension <span class="inline-code">a</span>!`;
        this._instrBoxes.push(new Instruction_1.Instruction('code-editor', content, "50%", "10%"));
        content = `Let's add one last bit of CODE: write something to print the value of <span class="inline-code">a</span> on the CANVAS.`;
        this._instrBoxes.push(new Instruction_1.Instruction('code-editor', content, "40%", "10%"));
        content = "That's correct! Finally, click on the circle on the CANVAS, and make it bigger than the box provided. Observe what happened to the printed number.";
        this._instrBoxes.push(new Instruction_1.Instruction('code-editor', content, "50%", "10%"));
        content = "Did you see the printed number change? You have successfully connected 2 elements on the CANVAS together - a circle and a number - by a variable! Remember this lesson about variables in the future when you need to link different things on CANVAS together!";
        this._instrBoxes.push(new Instruction_1.Instruction('code-editor', content, "70%", "10%"));
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
        let codeIsCorrect = false;
        let canvasIsCorrect = false;
        let code = this.editor.getValue();
        switch (this._latestInstrIndex) {
            case 1:
                //check for correct CODE
                let regex = new RegExp('print\\s*\\(\\s*ellipse\\s*\\(\\s*a\\s*,\\s*a\\s*\\)\\s*,\\s*[1-9][0-9]*\\s*,\\s*[1-9][0-9]*\\s*\\)');
                let match = code.match(regex);
                codeIsCorrect = match != null && match.length > 0;
                //check for correct CANVAS effects
                for (let effect of effects) {
                    if (effect instanceof EllipseEffect_1.EllipseEffect) {
                        canvasIsCorrect = true;
                        break;
                    }
                }
                if (codeIsCorrect && canvasIsCorrect) {
                    this._latestInstrIndex = 3;
                    this.renderNextInstruction(document);
                }
                return false;
            case 3:
                for (let effect of effects) {
                    if (effect instanceof NumberEffect_1.NumberEffect && effect.num != null) {
                        let val = effect.num;
                        for (let effect2 of effects) {
                            if (effect2 instanceof EllipseEffect_1.EllipseEffect && (val == effect2.w || val == effect2.h)) {
                                this._latestInstrIndex++;
                                this.renderLatestInstruction(document);
                            }
                        }
                    }
                }
                return false;
            case 4:
                let circle;
                for (let effect of effects) {
                    if (effect instanceof NumberEffect_1.NumberEffect && effect.num != null) {
                        let val = effect.num;
                        for (let effect2 of effects) {
                            if (effect2 instanceof EllipseEffect_1.EllipseEffect && (val == effect2.w || val == effect2.h) && val > this.square_size) {
                                this._latestInstrIndex++;
                                this.renderLatestInstruction(document);
                            }
                        }
                    }
                }
                return false;
            default:
                return true;
        }
    }
}
exports.LessonTwoCpSeven = LessonTwoCpSeven;
//# sourceMappingURL=LessonTwoCpSeven.js.map