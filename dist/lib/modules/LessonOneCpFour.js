"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const StringEffect_1 = require("../effects/StringEffect");
class LessonOneCpFour {
    constructor() {
        this._name = "Lesson 1 Checkpoint 4: Print Ellipse";
        this._nextModule = 'l2c1';
        this._constraint = 'none';
        this._instructions = `<p> Yay! You're on a roll! Notice that changing the first number moves the words left or right, while changing the right number move them up or down. </p>
    <p> Finally, it'd be more fun if the computer could put more than just words on the CANVAS. Replace the words in the print statement with an ellipse(100,100) function. </p>
    <p> GOAL: Highlight the word in the print statement, then remove it with ellipse(100,100). KEEP THE REST OF THE CODE THE SAME. </p>`;
    }
    /**
     * A lesson to print a string
     * goals: moving the text and observe the code
     * @param document The HTML document
     */
    checkGoal(document, effects) {
        for (let effect of effects) {
            if (effect instanceof StringEffect_1.StringEffect) {
                if (effect.str !== "") {
                    if (effect.x < 10 && effect.y < 70) {
                        return true;
                    }
                }
            }
        }
        return false;
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
exports.LessonOneCpFour = LessonOneCpFour;
//# sourceMappingURL=LessonOneCpFour.js.map