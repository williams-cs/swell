"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Module_1 = require("./Module");
const Instruction_1 = require("./Instruction");
const EllipseEffect_1 = require("../effects/EllipseEffect");
const StringEffect_1 = require("../effects/StringEffect");
class LessonTwoCpThree extends Module_1.Module {
    constructor(ctx, editor) {
        super(ctx, editor);
        this._name = "l2c3";
        this._constraint = 'none';
        this._instructions = `<p> GOAL: Draw 2 circles and a word on the CANVAS. </p>`;
        this._starterCode = `print(ellipse(100, 100), 120, 150);\n`;
        this._latestInstrIndex = 1;
        let content = "What if we want to draw more than only 1 circle?";
        this._instrBoxes.push(new Instruction_1.Instruction('code-editor', content, "50%", "10%"));
        content = `First copy the <span class="inline-code">print</span> statement on the first line and paste it on the second line above.`;
        this._instrBoxes.push(new Instruction_1.Instruction('code-editor', content, "40%", "10%"));
        content = `Hm, that should have created a second circle right? Let's try to fix this by changing the <span class="inline-code">120</span> above to <span class="inline-code">200</span>.`;
        this._instrBoxes.push(new Instruction_1.Instruction('code-editor', content, "50%", "10%"));
        content = "Yep! One circle was on top of the other this entire time! In the future, be mindful of this.";
        this._instrBoxes.push(new Instruction_1.Instruction('code-editor', content, "50%", "10%"));
        content = "Now let's have a quick challenge: in addition to the 2 circles, write a word on the canvas. Do you remember how to print a word?";
        this._instrBoxes.push(new Instruction_1.Instruction('code-editor', content, "50%", "10%"));
        content = `There's no limit to how many <span class="inline-code">print</span> statements the computer can understand, so you can write 1000 <span class="inline-code">print</span> statements, and the computer will draw 1000 things on the CANVAS for you!`;
        this._instrBoxes.push(new Instruction_1.Instruction('canvas-container', content, "70%", "10%"));
    }
    /**
     * A lesson to print a string
     * goals: moving the text and observe the code
     * @param document the HTML document
     * @param effects the list of effects currently on the CANVAS
     */
    checkGoal(document, effects) {
        let circleCount = 0;
        switch (this._latestInstrIndex) {
            case 1:
                for (let effect of effects) {
                    if (effect instanceof EllipseEffect_1.EllipseEffect) {
                        circleCount += 1;
                    }
                }
                if (circleCount >= 2) {
                    this._latestInstrIndex++;
                    this.renderLatestInstruction(document);
                }
                return false;
            case 2:
                let moved = false;
                for (let effect of effects) {
                    if (effect instanceof EllipseEffect_1.EllipseEffect) {
                        if (effect.x == 200) {
                            moved = true;
                        }
                        circleCount += 1;
                    }
                }
                if ((circleCount >= 2) && moved) {
                    this._latestInstrIndex += 2;
                    this.renderNextInstruction(document);
                }
                return false;
            case 4:
                let stringExists = false;
                for (let effect of effects) {
                    if (!stringExists) {
                        stringExists = effect instanceof StringEffect_1.StringEffect && effect.str !== "";
                    }
                    if (effect instanceof EllipseEffect_1.EllipseEffect) {
                        circleCount += 1;
                    }
                }
                if ((circleCount >= 2) && stringExists) {
                    this._latestInstrIndex += 1;
                    this.renderLatestInstruction(document);
                }
                return false;
            default:
                return true;
        }
    }
}
exports.LessonTwoCpThree = LessonTwoCpThree;
//# sourceMappingURL=LessonTwoCpThree.js.map