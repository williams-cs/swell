"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const StringEffect_1 = require("../effects/StringEffect");
class LessonTwoCpFive {
    constructor() {
        this._name = "Lesson 2 Checkpoint 5: PDM with Variable";
        this._nextModule = 'l2c6';
        this._constraint = 'code';
        this._instructions = `<p> Now that you have drawn 2 circles both are called c, let's see what happens when you try to modify one of them. </p>
    <p> Click on one of the circles referred to by c, and try resize it. Observe what happens to your declaration of c. </p>
    <p> GOAL: Resize one of the circles referred to by c. </p>`;
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
exports.LessonTwoCpFive = LessonTwoCpFive;
//# sourceMappingURL=LessonTwoCpFive.js.map