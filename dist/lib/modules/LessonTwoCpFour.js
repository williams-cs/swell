"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EllipseEffect_1 = require("../effects/EllipseEffect");
class LessonTwoCpFour {
    constructor() {
        this._name = "l2c4";
        this._nextModule = 'l2c5';
        this._constraint = 'none';
        this._instructions = `<p> There's no limit to how many print statements the computer can understand, so you can write 1000 print statements, and the computer will draw 1000 things on the CANVAS for you! </p>
    <p> Time to take your coding to the next level. Let's learn about variables. </p>
    <p> Variables are simply names you give to the things that you draw. </p>
    <p> For example, take a look at the code above. Change the a in the print statement to b, and observe what happened on the CANVAS. </p>
    <p> GOAL: Change a to b in the print statement. </p>`;
        this._starterCode = `a = "moo moo";\nb = ellipse(100, 100);\nprint(a, 50, 70);`;
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
            let regex = /print\s*\(\s*b\s*,\s*[1-9][0-9]*\s*,\s*[1-9][0-9]*\s*\);/;
            let match = code.match(regex);
            codeIsCorrect = match != null && match.length > 0;
        }
        //check for correct CANVAS effects
        let canvasIsCorrect = true;
        for (let effect of effects) {
            if (!canvasIsCorrect && effect instanceof EllipseEffect_1.EllipseEffect) {
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
exports.LessonTwoCpFour = LessonTwoCpFour;
//# sourceMappingURL=LessonTwoCpFour.js.map