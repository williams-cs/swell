"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const StringEffect_1 = require("../effects/StringEffect");
class LessonTwoCpSix {
    constructor() {
        this._name = "Lesson 2 Checkpoint 6: Drawing Caterpillar";
        this._nextModule = 'l2c6';
        this._constraint = 'code';
        this._instructions = `<p> Changing one circle changes c, which will then in turn change the other circle! </p>
    <p> Now let's put all we have learned to practice. </p>
    <p> Create a caterpillar in the shape of the given outlines. </p>
    <p> GOAL: Create a caterpillar. </p>`;
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
exports.LessonTwoCpSix = LessonTwoCpSix;
//# sourceMappingURL=LessonTwoCpSix.js.map