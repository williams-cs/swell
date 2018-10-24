"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const StringEffect_1 = require("../effects/StringEffect");
class LessonOneCpTwo {
    constructor() {
        this._name = "Lesson 1 Checkpoint 2: Changing Text";
        this._lesson = 1;
        this._instructions = `<p> Congratulations! You just told the computer to create words on the CANVAS!
    Now let's do something more interesting: click on the words you just created, and move it to the top left of the screen.</p>
    <p> GOAL: Move the words you just created to the center of the screen. </p>`;
    }
    /**
     * A lesson to print a string
     * goals: write any string on canvas
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
exports.LessonOneCpTwo = LessonOneCpTwo;
//# sourceMappingURL=LessonOneCpTwo.js.map