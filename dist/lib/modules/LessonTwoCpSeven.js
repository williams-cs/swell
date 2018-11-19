"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class LessonTwoCpSeven {
    constructor() {
        this._name = "l2c7";
        this._nextModule = 'l3c1';
        this._constraint = 'none';
        this._instructions = `<p> Changing one circle changes c, which will then in turn change the other circle! </p>
    <p> Now let's put all we have learned to practice. </p>
    <p> Create a circle, and print out the size of that circle in the given box. </p>
    <p> IF we ever change the circle, we want the number in the box to change, too! </p>
    <p> CHALLENGE: Create a circle and print its size in the given box. </p>`;
        this.x = 10;
        this.y = 430;
    }
    drawGuides(ctx) {
        ctx.beginPath();
        ctx.rect(this.x, this.y, 100, 100);
        ctx.strokeStyle = '#6C6C6C';
        ctx.stroke();
        ctx.font = 20 + "px Courier New";
        ctx.fillStyle = '#6C6C6C';
        ctx.fillText("Put circle's size", this.x, 390);
        ctx.fillText("in here", this.x, 410);
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