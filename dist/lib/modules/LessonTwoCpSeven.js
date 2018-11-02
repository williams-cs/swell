"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class LessonTwoCpSeven {
    constructor() {
        this._name = "l2c7";
        this._nextModule = 'l2c7';
        this._constraint = 'none';
        this._instructions = `<p> Changing one circle changes c, which will then in turn change the other circle! </p>
    <p> Now let's put all we have learned to practice. </p>
    <p> Create a caterpillar in the shape of the given outlines. </p>
    <p> CHALLENGE: Create a caterpillar. </p>
    <p> HINT: Remember to use variables to print a lot of identical circles quickly! </p>`;
    }
    /**
     * A lesson to print a string
     * goals: moving the text and observe the code
     * @param document: The HTML document
     * @param effects: the list of effects currently on the CANVAS
     */
    checkGoal(document, effects) {
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
exports.LessonTwoCpSeven = LessonTwoCpSeven;
//# sourceMappingURL=LessonTwoCpSeven.js.map