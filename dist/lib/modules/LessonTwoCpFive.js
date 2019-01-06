"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Module_1 = require("./Module");
const Instruction_1 = require("./Instruction");
const RectangleEffect_1 = require("../effects/RectangleEffect");
class LessonTwoCpFive extends Module_1.Module {
    constructor(ctx, editor) {
        super(ctx, editor);
        this._name = "l2c5";
        this._nextModule = 'l2c6';
        this._constraint = 'none';
        this._instructions = `<p> GOAL: Create a variable c referring to an rect(100, 100), then write 2 print statements to print c. </p>`;
        this._starterCode = `a = "moo moo";
b = ellipse(100, 100);
print(b, 100, 100);`;
        this._latestInstrIndex = 0;
        let content = "Let's take this one step further: Create a new variable c, and make it refer to an rect(150, 150).";
        this._instrBoxes.push(new Instruction_1.Instruction('code-editor', content, "50%", "10%"));
        content = "Now change the print statement to print c instead of b.";
        this._instrBoxes.push(new Instruction_1.Instruction('code-editor', content, "40%", "10%"));
        content = "Finally, write print(c, 300, 300) underneath the existing print statement.";
        this._instrBoxes.push(new Instruction_1.Instruction('code-editor', content, "50%", "10%"));
        content = 'Awesome, You are getting good at using variables! What you just did is to draw 2 rectangles, both named c!';
        this._instrBoxes.push(new Instruction_1.Instruction('canvas-container', content, "70%", "10%"));
    }
    /**
     * A lesson to print a string
     * goals: moving the text and observe the code
     * @param document the HTML document
     * @param effects the list of effects currently on the CANVAS
     */
    checkGoal(document, effects) {
        let codeIsCorrect = false;
        let rectCount = 0;
        let code = this.editor.getValue();
        let assignment = /c\s*=\s*rect\s*\(\s*[1-9][0-9]*\s*,\s*[1-9][0-9]*\s*\)\s*/g;
        let matchAssign;
        let print = /print\s*\(\s*c\s*,\s*[1-9][0-9]*\s*,\s*[1-9][0-9]*\s*\)/g;
        let matchPrint;
        switch (this._latestInstrIndex) {
            case 0:
                //check for correct CODE
                matchAssign = code.match(assignment);
                if (matchAssign != null && matchAssign.length > 0) {
                    this._latestInstrIndex++;
                    this.renderLatestInstruction(document);
                }
                return false;
            case 1:
                //check for correct CODE
                matchAssign = code.match(assignment);
                matchPrint = code.match(print);
                codeIsCorrect = matchAssign != null && matchAssign.length > 0 && matchPrint != null && matchPrint.length >= 1;
                //check for correct CANVAS effects
                for (let effect of effects) {
                    if (effect instanceof RectangleEffect_1.RectangleEffect) {
                        rectCount += 1;
                    }
                }
                if (codeIsCorrect && rectCount >= 1) {
                    this._latestInstrIndex++;
                    this.renderLatestInstruction(document);
                }
                return false;
            case 2:
                //check for correct CODE
                matchAssign = code.match(assignment);
                matchPrint = code.match(print);
                codeIsCorrect = matchAssign != null && matchAssign.length > 0 && matchPrint != null && matchPrint.length >= 2;
                //check for correct CANVAS effects
                for (let effect of effects) {
                    if (effect instanceof RectangleEffect_1.RectangleEffect) {
                        rectCount += 1;
                    }
                }
                if (codeIsCorrect && rectCount >= 2) {
                    this._latestInstrIndex++;
                    this.renderLatestInstruction(document);
                }
                return false;
            default:
                return true;
        }
    }
}
exports.LessonTwoCpFive = LessonTwoCpFive;
//# sourceMappingURL=LessonTwoCpFive.js.map