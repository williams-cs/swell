"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Module_1 = require("./Module");
const StringEffect_1 = require("../effects/StringEffect");
class LessonThreeCpOne extends Module_1.Module {
    constructor() {
        super(...arguments);
        this._name = "l3c1";
        this._nextModule = 'l3c2';
        this._constraint = 'none';
        this._instructions = `<p> We learned to tell the computer to print a lot of things. Unfortunately, the computer is kinda bad at math. </p>
    <p> Look at the CODE above. We let a = 5, then we print the value of a to the CANVAS. Then we print the line "a is less than 10". </p>
    <p> Since a = 5, and 5 < 10, we know that a is less than 10. But what would happen if we change the value of a to, say, 12? </p>
    <p> GOAL: change the value of a to 12. </p>
    <p> HINT: You can do this by changing the line a = 5 in the CODE area, or you can click on the number 5 on the CANVAS. </p>`;
        this._starterCode = `a = 5;
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
            let regex = /a\s*=\s*12\s*/;
            let match = code.match(regex);
            codeIsCorrect = match != null && match.length > 0;
        }
        //check for correct CANVAS effects
        let canvasIsCorrect = true;
        for (let effect of effects) {
            if (effect instanceof StringEffect_1.StringEffect && effect.str === "a is less than 10") {
                //canvasIsCorrect = true;
                //break;
            }
        }
        return codeIsCorrect && canvasIsCorrect;
    }
}
exports.LessonThreeCpOne = LessonThreeCpOne;
//# sourceMappingURL=LessonThreeCpOne.js.map