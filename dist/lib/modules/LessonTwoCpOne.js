"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const StringEffect_1 = require("../effects/StringEffect");
class LessonTwoCpOne {
    constructor() {
        this._name = "Lesson 2 Checkpoint 1: Printing Shapes";
        this._nextModule = 'l2c2';
        this._constraint = 'none';
        this._instructions = `<p> Previously you learn that putting an ellipse(100, 100) function in the print statement creates a circle on the CANVAS. </p>
    <p> What are the numbers (100, 100) for? I'm glad you asked... </p>
    <p> Because the CODE area is frozen again! Drag one of the 9 white tips around the circle to see how the number changes! </p>
    <p> GOAL: Make the circle wider but shorter. </p>`;
        this._starterCode = `
    print(ellipse(100, 100), 50, 70)`;
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
exports.LessonTwoCpOne = LessonTwoCpOne;
//# sourceMappingURL=LessonTwoCpOne.js.map