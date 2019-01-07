"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Module_1 = require("./Module");
const Instruction_1 = require("./Instruction");
const StringEffect_1 = require("../effects/StringEffect");
class LessonThreeCpTwo extends Module_1.Module {
    constructor(ctx, editor) {
        super(ctx, editor);
        this._name = "l3c2";
        this._nextModule = 'l3c3';
        this._constraint = 'none';
        this._instructions = `<p> GOAL: Change the value of a around and observe what happens. </p>`;
        this._starterCode = `a = 12;
print(a, 118, 63);
if(a < 10) {
\tprint("a is less than 10", 103, 143);
}`;
        this._latestInstrIndex = 2;
        let content = "Let's teach the computer to print the sentence a is less than 10 ONLY when a is truly less than 10.";
        this._instrBoxes.push(new Instruction_1.Instruction('code-editor', content, "50%", "10%"));
        content = 'We will use something called an if statement. Observe the CODE above. All we added was an if statement that checks whether a < 10. If a is less than 10, the code inside the curly braces {} will be executed.';
        this._instrBoxes.push(new Instruction_1.Instruction('code-editor', content, "40%", "10%"));
        content = "First, change the value of a to 8. Observe what happens.";
        this._instrBoxes.push(new Instruction_1.Instruction('code-editor', content, "50%", "10%"));
        content = "Did you see the correct statement appears on the CANVAS? Now let's change the value a to, say, 25.";
        this._instrBoxes.push(new Instruction_1.Instruction('code-editor', content, "40%", "10%"));
        content = 'The claim about a disappears! Finally, change the value of a to 0.';
        this._instrBoxes.push(new Instruction_1.Instruction('canvas-container', content, "70%", "10%"));
        content = 'The claim appears again! The if statement makes the computer constantly check the value of a, and only print the claim when the condition inside the braces {} is satisfied!';
        this._instrBoxes.push(new Instruction_1.Instruction('code-editor', content, "50%", "10%"));
    }
    /**
     * A lesson leading into conditionals
     * goals: moving the text and observe the code
     * @param document the HTML document
     * @param effects the list of effects currently on the CANVAS
     */
    checkGoal(document, effects) {
        let codeIsCorrect = false;
        let canvasIsCorrect = false;
        let code = this.editor.getValue();
        let regex;
        let match;
        switch (this._latestInstrIndex) {
            case 2:
                //check for correct CODE
                regex = /a\s*=\s*8\s*/;
                match = code.match(regex);
                codeIsCorrect = match != null && match.length > 0;
                //check for correct CANVAS effects
                for (let effect of effects) {
                    if (effect instanceof StringEffect_1.StringEffect && effect.str === "a is less than 10") {
                        canvasIsCorrect = true;
                        break;
                    }
                }
                if (codeIsCorrect && canvasIsCorrect) {
                    this._latestInstrIndex++;
                    this.renderLatestInstruction(document);
                }
                return false;
            case 3:
                //check for correct CODE
                regex = /a\s*=\s*25\s*/;
                match = code.match(regex);
                codeIsCorrect = match != null && match.length > 0;
                //check for correct CANVAS effects
                for (let effect of effects) {
                    if (effect instanceof StringEffect_1.StringEffect && effect.str === "a is less than 10") {
                        canvasIsCorrect = true;
                        break;
                    }
                }
                if (codeIsCorrect && !canvasIsCorrect) {
                    this._latestInstrIndex++;
                    this.renderLatestInstruction(document);
                }
                return false;
            case 4:
                //check for correct CODE
                regex = /a\s*=\s*0\s*/;
                match = code.match(regex);
                codeIsCorrect = match != null && match.length > 0;
                //check for correct CANVAS effects
                for (let effect of effects) {
                    if (effect instanceof StringEffect_1.StringEffect && effect.str === "a is less than 10") {
                        canvasIsCorrect = true;
                        break;
                    }
                }
                if (codeIsCorrect && canvasIsCorrect) {
                    this._latestInstrIndex++;
                    this.renderLatestInstruction(document);
                }
                return false;
            default:
                return true;
        }
    }
}
exports.LessonThreeCpTwo = LessonThreeCpTwo;
//# sourceMappingURL=LessonThreeCpTwo.js.map