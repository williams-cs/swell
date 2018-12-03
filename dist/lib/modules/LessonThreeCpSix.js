"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EllipseEffect_1 = require("../effects/EllipseEffect");
class LessonThreeCpSix {
    constructor() {
        this._name = "l3c6";
        this._nextModule = 'l4c1';
        this._constraint = 'none';
        this._instructions = `<p> Now that you know how to use if/else statements, let's put them all together! </p>
    <p> Above we have the CODE to draw 2 circles: circle A has height and width a, and circle B has height and width b. </p>
    <p> However, currently the claim that "Circle A is smaller than circle B." regardless of the circles' actual sizes. </p>
    <p> Create an if/else statement to print "Circle A is smaller than circle B." when it is actually so, and print "Circle A is bigger than circle B" otherwise. </p>
    <p> CHALLENGE: Create an if/else statement to print the correct claim about the sizes of the 2 circles. </p>`;
        this._starterCode = `a = 200;
print(a, 111, 103);
print(ellipse(a, a), 132, 287);
b = 100;
print(b, 337, 104);
print(ellipse(b, b), 371, 248);
print("Circle A is smaller than circle B.", 45, 453);
`;
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
exports.LessonThreeCpSix = LessonThreeCpSix;
//# sourceMappingURL=LessonThreeCpSix.js.map