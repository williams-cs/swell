"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const StringEffect_1 = require("../effects/StringEffect");
class LessonOneCpThree {
    constructor() {
        this._name = "l1c3";
        this._nextModule = 'l1c4';
        this._constraint = 'canvas';
        this._instructions = `<p> Yep! Moving the words actually change the numbers in your CODE. </p>
    <p> Now the CANVAS has been frozen! Try changing your CODE to see if you can move the words to the bottom right corner. </p>
    <p> GOAL: Move the words to the bottom right of the CANVAS. </p>
    <p> HINT: Change one of the 2 numbers at a time, then click RUN to see how that changes the CANVAS.`;
    }
    /**
     * A lesson to print a string
     * goals: moving the text and observe the code
     * @param document The HTML document
     * @param effects: the list of effects currently on the CANVAS
     */
    checkGoal(document, effects) {
        for (let effect of effects) {
            if (effect instanceof StringEffect_1.StringEffect && effect.str !== "") {
                if (effect.x > 470 && effect.y > 530) {
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
exports.LessonOneCpThree = LessonOneCpThree;
//# sourceMappingURL=LessonOneCpThree.js.map