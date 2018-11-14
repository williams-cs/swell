"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EllipseEffect_1 = require("../effects/EllipseEffect");
class LessonThreeCpFive {
    constructor() {
        this._name = "l3c5";
        this._nextModule = 'l3c6';
        this._constraint = 'none';
        this._instructions = `<p> So we print a message to the CANVAS anytime c is exactly equal to 8. </p>
    <p> What if we want to print another message, "c is not equal to 8" any time c is not equal to 8. </p>
    <p> We do so by using an else statement. Observe the CODE above. </p>
    <p> When the condition inside the if() statement is satisfied, the code block inside the {} immediately after it would run. </p>
    <p> When that condition is not satisfied, the code block inside the {} after else statement would run. </p>
    <p> GOAL: Change the value of c so that the line "c is NOT equal to 8." is printed on the CANVAS. </p>`;
        this._starterCode = `c = 8;
if(c == 8) {
  print("c is equal to 8.", 103, 143);
} else {
  print("c is NOT equal to 8.", 103, 143);
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
        let code = document.getElementById("input").value;
        if (code != null) {
            let regex = /print\s*\(\s*ellipse\s*\(\s*[1-9][0-9]*\s*,\s*[1-9][0-9]*\s*\)\s*,\s*[1-9][0-9]*\s*,\s*[1-9][0-9]*\s*\);/;
            let match = code.match(regex);
            codeIsCorrect = match != null && match.length > 0;
        }
        //check for correct CANVAS effects
        let canvasIsCorrect = true;
        for (let effect of effects) {
            if (effect instanceof EllipseEffect_1.EllipseEffect) {
            }
        }
        return codeIsCorrect && canvasIsCorrect;
    }
    /**
     * Returns the module name
     */
    get name() {
        return this._name;
    }
    /**
     * Returns the module instructions
     */
    get instructions() {
        return this._instructions;
    }
}
exports.LessonThreeCpFive = LessonThreeCpFive;
//# sourceMappingURL=LessonThreeCpFive.js.map