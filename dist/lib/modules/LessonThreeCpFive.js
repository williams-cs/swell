"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Module_1 = require("./Module");
const Instruction_1 = require("./Instruction");
const StringEffect_1 = require("../effects/StringEffect");
class LessonThreeCpFive extends Module_1.Module {
    constructor(ctx, editor) {
        super(ctx, editor);
        this._name = "l3c5";
        this._nextModule = 'l3c6';
        this._constraint = 'none';
        this._instructions = `<p> GOAL: Change the value of c around to see when "c is NOT equal to 8." would be printed on the CANVAS. </p>`;
        this._starterCode = `c = 8;
if(c == 8) {
\tprint("c is equal to 8.", 103, 143);
} else {
\tprint("c is NOT equal to 8.", 103, 143);
}`;
        this._latestInstrIndex = 2;
        let content = `Now, what if we want to print another message, "c is not equal to 8" any time c is not equal to 8?`;
        this._instrBoxes.push(new Instruction_1.Instruction('code-editor', content, "50%", "10%"));
        content = `Observe the CODE above. When the condition inside the if() statement is satisfied, the code block inside the braces {} right after it would run.`;
        this._instrBoxes.push(new Instruction_1.Instruction('code-editor', content, "40%", "10%"));
        content = `What would happen if we change the value of c? In the CODE above, change the value of c to 5 and observe what happens.`;
        this._instrBoxes.push(new Instruction_1.Instruction('code-editor', content, "50%", "10%"));
        content = `Did you notice the claim printed here changed? When the condition inside the if statement is not satisfied, the second code block inside the braces {} after the else statement would run instead!`;
        this._instrBoxes.push(new Instruction_1.Instruction('canvas-container', content, "70%", "10%"));
        content = `To get a better idea, change the value of c back to 8.`;
        this._instrBoxes.push(new Instruction_1.Instruction('code-editor', content, "40%", "10%"));
        content = `Did you see the claim changed again? Now, change the value of c to 17.`;
        this._instrBoxes.push(new Instruction_1.Instruction('code-editor', content, "40%", "10%"));
        content = `Hope you get the hang of what an else statement does by this point! As long as the condition inside the if statement is not satisfied, the code block inside the second braces {} would run instead of the first code block.`;
        this._instrBoxes.push(new Instruction_1.Instruction('canvas-container', content, "70%", "10%"));
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
                //let regex = /c\s*=\s*[^8]\s*/;
                regex = /c\s*=\s*5\s*/;
                match = code.match(regex);
                codeIsCorrect = match != null && match.length > 0;
                //check for correct CANVAS effects
                for (let effect of effects) {
                    if (effect instanceof StringEffect_1.StringEffect && effect.str === "c is NOT equal to 8.") {
                        canvasIsCorrect = true;
                        break;
                    }
                }
                if (codeIsCorrect && canvasIsCorrect) {
                    this._latestInstrIndex = 4;
                    this.renderNextInstruction(document);
                }
                return false;
            case 4:
                //check for correct CODE
                regex = /c\s*=\s*8\s*/;
                match = code.match(regex);
                codeIsCorrect = match != null && match.length > 0;
                //check for correct CANVAS effects
                for (let effect of effects) {
                    if (effect instanceof StringEffect_1.StringEffect && effect.str === "c is equal to 8.") {
                        canvasIsCorrect = true;
                        break;
                    }
                }
                if (codeIsCorrect && canvasIsCorrect) {
                    this._latestInstrIndex++;
                    this.renderLatestInstruction(document);
                }
                return false;
            case 5:
                //check for correct CODE
                regex = /c\s*=\s*17\s*/;
                match = code.match(regex);
                codeIsCorrect = match != null && match.length > 0;
                //check for correct CANVAS effects
                for (let effect of effects) {
                    if (effect instanceof StringEffect_1.StringEffect && effect.str === "c is NOT equal to 8.") {
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
exports.LessonThreeCpFive = LessonThreeCpFive;
//# sourceMappingURL=LessonThreeCpFive.js.map