"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Module_1 = require("./Module");
const Instruction_1 = require("./Instruction");
const EllipseEffect_1 = require("../effects/EllipseEffect");
class LessonTwoCpFive extends Module_1.Module {
    constructor(ctx, editor) {
        super(ctx, editor);
        this._name = "l2c5";
        this._constraint = 'none';
        this._instructions = `<p> GOAL: Create a variable c referring to an ellipse(75, 75), then write 2 print statements to print c. </p>`;
        this._starterCode = `a = "moo moo";
b = ellipse(100, 100);
print(b, 100, 100);`;
        this._latestInstrIndex = 0;
        let content = `Let's take this one step further: Create a new variable <span class="inline-code">c</span>, and make it refer to an <span class="inline-code">ellipse(75, 75)</span>.`;
        this._instrBoxes.push(new Instruction_1.Instruction('code-editor', content, "50%", "10%"));
        content = `Now change the <span class="inline-code">print</span> statement to print <span class="inline-code">c</span> instead of <span class="inline-code">b</span>.`;
        this._instrBoxes.push(new Instruction_1.Instruction('code-editor', content, "40%", "10%"));
        content = `Finally, write <span class="inline-code">print(c, 300, 100);</span> underneath the existing <span class="inline-code">print</span> statement.`;
        this._instrBoxes.push(new Instruction_1.Instruction('code-editor', content, "50%", "10%"));
        content = 'Awesome, You are getting good at using variables! What you just did is to draw 2 circles, both named <span class="inline-code">c</span>!';
        this._instrBoxes.push(new Instruction_1.Instruction('code-editor', content, "70%", "10%"));
    }
    /**
     * A lesson to print a string
     * goals: moving the text and observe the code
     * @param document the HTML document
     * @param effects the list of effects currently on the CANVAS
     */
    checkGoal(document, effects) {
        let codeIsCorrect = false;
        let ellipseCount = 0;
        let code = this.editor.getValue();
        let assignment = /c\s*=\s*ellipse\s*\(\s*[1-9][0-9]*\s*,\s*[1-9][0-9]*\s*\)\s*/g;
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
                    if (effect instanceof EllipseEffect_1.EllipseEffect) {
                        ellipseCount += 1;
                    }
                }
                if (codeIsCorrect && ellipseCount >= 1) {
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
                    if (effect instanceof EllipseEffect_1.EllipseEffect) {
                        ellipseCount += 1;
                    }
                }
                if (codeIsCorrect && ellipseCount >= 2) {
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