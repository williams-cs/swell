"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Module_1 = require("./Module");
const StringEffect_1 = require("../effects/StringEffect");
class LessonThreeCpFive extends Module_1.Module {
    constructor() {
        super(...arguments);
        this._name = "l3c5";
        this._nextModule = 'l3c6';
        this._constraint = 'none';
        this._instructions = `<p> So we print a message to the CANVAS anytime c is exactly equal to 8. </p>
    <p> What if we want to print another message, "c is not equal to 8" any time c is not equal to 8? </p>
    <p> We do so by using an else statement. Observe the CODE above. </p>
    <p> When the condition inside the if() statement is satisfied, the code block inside the {} right after it would run. </p>
    <p> When that condition is not satisfied, the code block inside the {} after the else statement would run. </p>
    <p> GOAL: Change the value of c so that the line "c is NOT equal to 8." is printed on the CANVAS. </p>`;
        this._starterCode = `c = 8;
if(c == 8) {
\tprint("c is equal to 8.", 103, 143);
} else {
\tprint("c is NOT equal to 8.", 103, 143);
}`;
    }
    /**
     * A lesson leading into conditionals
     * goals: moving the text and observe the code
     * @param document: The HTML document
     * @param effects: the list of effects currently on the CANVAS
     */
    checkGoal(document, effects) {
        //check for correct CODE
        let codeIsCorrect = false;
        let code = this.editor.getValue();
        let regex = /c\s*=\s*[^8]\s*/;
        let match = code.match(regex);
        codeIsCorrect = match != null && match.length > 0;
        //check for correct CANVAS effects
        let canvasIsCorrect = false;
        for (let effect of effects) {
            if (effect instanceof StringEffect_1.StringEffect && effect.str === "c is NOT equal to 8.") {
                canvasIsCorrect = true;
                break;
            }
        }
        return codeIsCorrect && canvasIsCorrect;
    }
}
exports.LessonThreeCpFive = LessonThreeCpFive;
//# sourceMappingURL=LessonThreeCpFive.js.map