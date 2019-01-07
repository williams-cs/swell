"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Module_1 = require("./Module");
const Instruction_1 = require("./Instruction");
const EllipseEffect_1 = require("../effects/EllipseEffect");
class LessonTwoCpFour extends Module_1.Module {
    constructor(ctx, editor) {
        super(ctx, editor);
        this._name = "l2c4";
        this._nextModule = 'l2c5';
        this._constraint = 'none';
        this._instructions = `<p> GOAL: Change a to b in the print statement. </p>`;
        this._starterCode = `a = "moo moo";
b = ellipse(100, 100);
print(a, 100, 100);`;
        this._latestInstrIndex = 2;
        let content = "Time to take your coding to the next level. Let's learn about variables!";
        this._instrBoxes.push(new Instruction_1.Instruction('code-editor', content, "50%", "10%"));
        content = "Variables are simply names you give to the things that you draw.";
        this._instrBoxes.push(new Instruction_1.Instruction('code-editor', content, "40%", "10%"));
        content = "For example, take a look at the code above. Change the a in the print statement to b, and observe what happened on the CANVAS.";
        this._instrBoxes.push(new Instruction_1.Instruction('code-editor', content, "50%", "10%"));
        content = 'Did you see the CANVAS changed? In our code, we make variable a refer to the words "moo moo", and variable b refer to an ellipse(100, 100).';
        this._instrBoxes.push(new Instruction_1.Instruction('code-editor', content, "40%", "10%"));
        content = 'As a result, when we tell the computer to print a, it will print "moo moo", and when we tell the computer to print b, it will print a circle!';
        this._instrBoxes.push(new Instruction_1.Instruction('canvas-container', content, "70%", "10%"));
    }
    /**
     * A lesson to print a string
     * goals: moving the text and observe the code
     * @param document the HTML document
     * @param effects the list of effects currently on the CANVAS
     */
    checkGoal(document, effects) {
        switch (this._latestInstrIndex) {
            case 2:
                //check for correct CODE
                let codeIsCorrect = false;
                let code = this.editor.getValue();
                let regex = /print\s*\(\s*b\s*,\s*[1-9][0-9]*\s*,\s*[1-9][0-9]*\s*\);/;
                let match = code.match(regex);
                codeIsCorrect = match != null && match.length > 0;
                //check for correct CANVAS effects
                let canvasIsCorrect = true;
                for (let effect of effects) {
                    if (!canvasIsCorrect && effect instanceof EllipseEffect_1.EllipseEffect) {
                        canvasIsCorrect = true;
                        break;
                    }
                }
                if (codeIsCorrect && canvasIsCorrect) {
                    this._latestInstrIndex = 4;
                    this.renderNextInstruction(document);
                }
                return false;
            default:
                return true;
        }
    }
}
exports.LessonTwoCpFour = LessonTwoCpFour;
//# sourceMappingURL=LessonTwoCpFour.js.map