"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EllipseEffect_1 = require("../effects/EllipseEffect");
class LessonTwoCpOne {
    constructor() {
        this._name = "l2c1";
        this._nextModule = 'l2c2';
        this._constraint = 'none';
        this._instructions = `<p> Printing only words is kinda boring, so let's learn to print some shapes on the CANVAS! </p>
    <p> In the print statement, replace "moo" with ellipse(100,100). Hit the RUN button to see what happens. </p>
    <p> GOAL: replace "moo" with ellipse(100,100) in the print statement above. </p>
    <p> HINT: Highlight "moo" - including the double quotes ", and replace that with ellipse(100, 100). KEEP EVERYTHING ELSE THE SAME. </p>`;
        this._starterCode = `
    print("moo", 50, 70)`;
    }
    /**
     * A lesson to print a string
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
        let canvasIsCorrect = false;
        for (let effect of effects) {
            if (effect instanceof EllipseEffect_1.EllipseEffect) {
                canvasIsCorrect = true;
                break;
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
exports.LessonTwoCpOne = LessonTwoCpOne;
//# sourceMappingURL=LessonTwoCpOne.js.map