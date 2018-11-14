"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EllipseEffect_1 = require("../effects/EllipseEffect");
class LessonThreeCpOne {
    constructor() {
        this._name = "l3c1";
        this._nextModule = 'l3c2';
        this._constraint = 'none';
        this._instructions = `<p> We learn to tell the computer to print a lot of things. Unfortunately, the computer is kinda bad at math. </p>
    <p> Look at the CODE above. We let a = 5, then we print the value of a to the CANVAS. Then we print the line "a is less than 10". </p>
    <p> Since a = 5, and 5 < 10, we know that a is less than 10. But what would happen if we change the value of a to, say, 12? </p>
    <p> GOAL: change the value of a to 12. </p>
    <p> HINT: You can do this by changing the line a = 5 in the CODE area, or you can click on the number 5 on the CANVAS. </p>`;
        this._starterCode = `a = 10;
print(a, 118, 63);
print("a is less than 10", 103, 143);`;
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
exports.LessonThreeCpOne = LessonThreeCpOne;
//# sourceMappingURL=LessonThreeCpOne.js.map