"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EllipseEffect_1 = require("../effects/EllipseEffect");
class LessonThreeCpTwo {
    constructor() {
        this._name = "l3c2";
        this._nextModule = 'l3c3';
        this._constraint = 'none';
        this._instructions = `<p> Did you notice the claim that "a is less than 10" did not change? a is now 12 and clearly greater than 10! </p>
    <p> What we want is for the computer to only print "a is less than 10" ONLY when the value of a is truly less than 10. </p>
    <p> To do so, we use an if statement. Observe the CODE above. All we changed was to put in an if statement that checks whether a < 10. If a is, the code inside the curly braces {} are executed. </p>
    <p> Hit RUN now and see what happens. </p>
    <p> GOAL: RUN the CODE with a = 12. </p>`;
        this._starterCode = `a = 12;
print(a, 118, 63);
if(a < 10) {
  print("a is less than 10", 103, 143);
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
exports.LessonThreeCpTwo = LessonThreeCpTwo;
//# sourceMappingURL=LessonThreeCpTwo.js.map