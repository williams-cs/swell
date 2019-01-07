"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Module_1 = require("./Module");
const Instruction_1 = require("./Instruction");
const StringEffect_1 = require("../effects/StringEffect");
class LessonThreeCpThree extends Module_1.Module {
    constructor(ctx, editor) {
        super(ctx, editor);
        this._name = "l3c3";
        this._nextModule = 'l3c4';
        this._constraint = 'none';
        this._instructions = `<p> GOAL: Make the line "b is greater than 20" only be printed on the CANVAS when b is actually greater than 20. </p>`;
        this._starterCode = `b = 8;
if(b < 10) {
\tprint("b is greater than 20.", 103, 143);
}`;
        this._latestInstrIndex = 1;
        let content = "if statements allow you to run a block of code inside the curly braces {} ONLY when the condition inside the if() clause is true.";
        this._instrBoxes.push(new Instruction_1.Instruction('code-editor', content, "50%", "10%"));
        content = `Let's have a quick challenge: observe the CODE above. Change the code inside the {} so that the line "b is greater than 20" is only printed on the CANVAS when b is actually greater than 20.`;
        this._instrBoxes.push(new Instruction_1.Instruction('code-editor', content, "40%", "10%"));
        content = "Your CODE seems correct! Now change the value of b to 50 to test it.";
        this._instrBoxes.push(new Instruction_1.Instruction('code-editor', content, "50%", "10%"));
        content = 'The claim is printed with the correct value of b! Good job!';
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
            case 1:
                //check for correct CODE
                regex = /if\s*\(\s*b\s*>\s*20\s*\)/;
                match = code.match(regex);
                if (match != null && match.length > 0) {
                    this._latestInstrIndex++;
                    this.renderLatestInstruction(document);
                }
                return false;
            case 2:
                //check for correct CODE
                regex = /if\s*\(\s*b\s*>\s*20\s*\)/;
                match = code.match(regex);
                let assign = /b\s*=\s*50\s*/;
                let matchAssign = code.match(assign);
                codeIsCorrect = match != null && match.length > 0 && matchAssign != null && matchAssign.length > 0;
                //check for correct CANVAS effects
                for (let effect of effects) {
                    if (effect instanceof StringEffect_1.StringEffect && effect.str === "b is greater than 20.") {
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
exports.LessonThreeCpThree = LessonThreeCpThree;
//# sourceMappingURL=LessonThreeCpThree.js.map