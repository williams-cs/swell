"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const StringEffect_1 = require("../effects/StringEffect");
class LessonOneCpFour {
    constructor() {
        this._name = "l1c4";
        this._prevModule = 'l1c2';
        this._nextModule = 'l2c1';
        this._constraint = 'canvas';
        this._instructions = `<p> Note that changing the first number in the print statement moves the words left or right, while changing the second number move them up or down. </p>
    <p> Now time for a challenge! Print the word "moo" on the CANVAS, and put it right in the center of the entire CANVAS. </p>
    <p> CHALLENGE: Print the word "moo" in the center of the CANVAS. </p>
    <p> HINT: Write print("moo", 50, 50) in the CODE area first, then change the numbers inside that print statement. </p>`;
    }
    /**
     * A lesson to print a string
     * goals: moving the text and observe the code
     * @param document The HTML document
     * @param effects: the list of effects currently on the CANVAS
     */
    checkGoal(document, effects) {
        for (let effect of effects) {
            if (effect instanceof StringEffect_1.StringEffect && effect.str === "moo") {
                if ((effect.x > 200 && effect.x < 300) && (effect.y > 200 && effect.y < 300)) {
                    return true;
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