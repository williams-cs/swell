"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Module_1 = require("./Module");
const Instruction_1 = require("./Instruction");
const EllipseEffect_1 = require("../effects/EllipseEffect");
const RectangleEffect_1 = require("../effects/RectangleEffect");
const LineEffect_1 = require("../effects/LineEffect");
class LessonTwoCpOne extends Module_1.Module {
    constructor(ctx, editor) {
        super(ctx, editor);
        this._name = "l2c1";
        this._constraint = 'none';
        this._instructions = `<p> GOAL: replace "moo" in the print statement to draw different shapes. </p>`;
        this._starterCode = `print("moo", 100, 100)`;
        this._latestInstrIndex = 0;
        let content = `Now let's learn to print shapes on the CANVAS! In the <span class="inline-code">print</span> statement above, replace <span class="inline-code">moo</span> with <span class="inline-code">ellipse(100,100)</span>. Observe what happened on the CANVAS.`;
        this._instrBoxes.push(new Instruction_1.Instruction('code-editor', content, "30%", "10%"));
        content = `Yep! You told the computer to draw a circle on the CANVAS. Now in the <span class="inline-code">print</span> statement, replace the word <span class="inline-code">ellipse</span> with <span class="inline-code">rect</span>.`;
        this._instrBoxes.push(new Instruction_1.Instruction('code-editor', content, "30%", "10%"));
        content = `Finally, replace the word <span class="inline-code">rect</span> with <span class="inline-code">line</span>.`;
        this._instrBoxes.push(new Instruction_1.Instruction('code-editor', content, "30%", "10%"));
        content = `By putting different things inside the <span class="inline-code">print</span> statement, you can tell the computer to draw different things on the CANVAS. Remember this lesson!`;
        this._instrBoxes.push(new Instruction_1.Instruction('canvas-container', content, "70%", "10%"));
    }
    /**
     *
     * @param document The HTML document
     * @param effects the list of effects currently on the CANVAS
     */
    checkGoal(document, effects) {
        let code = this.editor.getValue();
        switch (this._latestInstrIndex) {
            case 0:
                if (this.checkCodeAndCanvasEffect(code, "ellipse", effects)) {
                    this._latestInstrIndex++;
                    this.renderLatestInstruction(document);
                }
                return false;
            case 1:
                if (this.checkCodeAndCanvasEffect(code, "rect", effects)) {
                    this._latestInstrIndex++;
                    this.renderLatestInstruction(document);
                }
                return false;
            case 2:
                if (this.checkCodeAndCanvasEffect(code, "line", effects)) {
                    this._latestInstrIndex++;
                    this.renderLatestInstruction(document);
                }
                return false;
            default:
                return true;
        }
    }
    checkCodeAndCanvasEffect(code, f, effects) {
        //check for correct CODE
        let codeIsCorrect = false;
        let regex = new RegExp('print\\s*\\(\\s*' + f + '\\s*\\(\\s*[1-9][0-9]*\\s*,\\s*[1-9][0-9]*\\s*\\)\\s*,\\s*[1-9][0-9]*\\s*,\\s*[1-9][0-9]*\\s*\\)');
        let match = code.match(regex);
        codeIsCorrect = match != null && match.length > 0;
        //check for correct CANVAS effects
        let canvasIsCorrect = false;
        switch (f) {
            case "ellipse":
                for (let effect of effects) {
                    if (effect instanceof EllipseEffect_1.EllipseEffect) {
                        canvasIsCorrect = true;
                        break;
                    }
                }
                break;
            case "rect":
                for (let effect of effects) {
                    if (effect instanceof RectangleEffect_1.RectangleEffect) {
                        canvasIsCorrect = true;
                        break;
                    }
                }
                break;
            case "line":
                for (let effect of effects) {
                    if (effect instanceof LineEffect_1.LineEffect) {
                        canvasIsCorrect = true;
                        break;
                    }
                }
                break;
        }
        if (codeIsCorrect && canvasIsCorrect) {
            console.log("moving on to next instruction");
        }
        return codeIsCorrect && canvasIsCorrect;
    }
}
exports.LessonTwoCpOne = LessonTwoCpOne;
//# sourceMappingURL=LessonTwoCpOne.js.map