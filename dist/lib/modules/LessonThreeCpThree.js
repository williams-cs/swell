"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EllipseEffect_1 = require("../effects/EllipseEffect");
class LessonThreeCpThree {
    constructor() {
        this._name = "l3c3";
        this._nextModule = 'l3c4';
        this._constraint = 'none';
        this._instructions = `<p> Yes! The claim disappears once you put in the check. if statements allow you to perform a block of code inside the curly braces {} ONLY when the condition inside the if() clause is true. </p>
    <p> Let's have a quick challenge: obser the CODE above. Make it so that the line "b is greater than 20" is only printed on the CANVAS when b is actually greater than 20. </p>
    <p> GOAL: Make the line "b is greater than 20" only be printed on the CANVAS when b is actually greater than 20. </p>`;
        this._starterCode = `b = 8;
if(b < 10) {
  print("b is greater than 20.", 103, 143);
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
exports.LessonThreeCpThree = LessonThreeCpThree;
//# sourceMappingURL=LessonThreeCpThree.js.map