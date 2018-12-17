"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Module_1 = require("./Module");
const EllipseEffect_1 = require("../effects/EllipseEffect");
class LessonFourCpTwo extends Module_1.Module {
    constructor() {
        super(...arguments);
        this._name = "l4c2";
        this._nextModule = 'l4c2';
        this._constraint = 'none';
        this._instructions = `<p> Yes! You got this! </p>
    <p> Now let's put those skills in if/else statements to work! </p>
    <p> Create a pair of if/else statements to print out to the CANVAS a claim of whether the circle is positioned ABOVE or BELOW the rectangle. </p>
    <p> CHALLENGE: Print a claim that states whether circle is ABOVE or BELOW the rectangle. </p>
    <p> HINT: Remember that the numbers in the print() statements determine the position of the shapes being printed. </p>`;
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
}
exports.LessonFourCpTwo = LessonFourCpTwo;
//# sourceMappingURL=LessonFourCpTwo.js.map