"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const StringEffect_1 = require("../effects/StringEffect");
class LessonOneCpOne {
    constructor() {
        this._name = "Lesson 1 Checkpoint 1: Saying Hi";
        this._nextModule = 'l1c2';
        this._constraint = 'none';
        this._instructions = `<p> To begin, let’s tell the computer to write something on the CANVAS. </p>
    <p> GOAL: write on the CANVAS. </p>
    <p> HINT: type in the CODE box: print("Hello, world!"), then hit the RUN button. </p>`;
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
exports.LessonOneCpOne = LessonOneCpOne;
//# sourceMappingURL=LessonOneCpOne.js.map