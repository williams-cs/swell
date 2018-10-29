"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const StringEffect_1 = require("../effects/StringEffect");
class LessonTwoCpFour {
    constructor() {
        this._name = "Lesson 2 Checkpoint 4: Going Circular";
        this._nextModule = 'l2c5';
        this._constraint = 'none';
        this._instructions = `<p> Did you see the words on the CANVAS changed? </p>
    <p> In our code, we make the variable a refer to the words "moo moo", and the variable b refer an ellipse(100, 100). </p>
    <p> As a result, when we tell the computer to print a, it will print "moo moo", and when we tell the computer to print b, it will print the circle. </p>
    <p> Let's take this one step further: Create a new variable c, and make it refer to ellipse(100, 100). Then write 2 statements to print c. What do you think would happen? </p>
    <p> GOAL: Create a variable c referring to an ellipse(100, 100), then write 2 statements to print c. </p>`;
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
exports.LessonTwoCpFour = LessonTwoCpFour;
//# sourceMappingURL=LessonTwoCpFour.js.map