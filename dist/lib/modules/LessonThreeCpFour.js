"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const StringEffect_1 = require("../effects/StringEffect");
class LessonThreeCpFour {
    constructor() {
        this._name = "l3c4";
        this._nextModule = 'l3c5';
        this._constraint = 'none';
        this._instructions = `<p> You can put an inequality condition in the if() clause, such as "a < 5" or "b > 20". </p>
    <p> You can also use an equality condition. Observe the CODE above with "c == 8". The 2 equal signs mean that you are checking whether c is exactly equal to 8 or not. </p>
    <p> Change the value of c so that the line "c is equal to 8." is printed on the CANVAS. </p>
    <p> GOAL: Change the value of c so that the line "c is equal to 8." is printed on the CANVAS. </p>`;
        this._starterCode = `c = 100;
if(c == 8) {
  print("c is equal to 8.", 103, 143);
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
            let regex = /c\s*=\s*8\s*/;
            let match = code.match(regex);
            codeIsCorrect = match != null && match.length > 0;
        }
        //check for correct CANVAS effects
        let canvasIsCorrect = false;
        for (let effect of effects) {
            if (effect instanceof StringEffect_1.StringEffect && effect.str === "c is equal to 8.") {
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
exports.LessonThreeCpFour = LessonThreeCpFour;
//# sourceMappingURL=LessonThreeCpFour.js.map