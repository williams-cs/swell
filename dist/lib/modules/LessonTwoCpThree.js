"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const StringEffect_1 = require("../effects/StringEffect");
class LessonTwoCpThree {
    constructor() {
        this._name = "Lesson 2 Checkpoint 3: Using Variables";
        this._nextModule = 'l2c4';
        this._constraint = 'none';
        this._instructions = `<p> There's no limit to how many print statements the computer can understand, so you can write 1000 print statements, and the computer will draw 1000 things on the CANVAS for you! </p>
    <p> Now it's time to take your coding to the next level. Let's learn about variables. </p>
    <p> Variables are simply names you give to the things that you draw. </p>
    <p> For example, take a look at the code above. Change the a in the print statement to b, and observe what happened on the CANVAS. </p>
    <p> GOAL: Change a to b in the print statement. </p>`;
        this._starterCode = `
    a = "moo moo"
    b = ellipse(100, 100)
    print(a, 50, 70)`;
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
exports.LessonTwoCpThree = LessonTwoCpThree;
//# sourceMappingURL=LessonTwoCpThree.js.map