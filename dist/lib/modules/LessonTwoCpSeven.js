"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const NumberEffect_1 = require("../effects/NumberEffect");
const EllipseEffect_1 = require("../effects/EllipseEffect");
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
        for (let effect of effects) {
            if (effect instanceof NumberEffect_1.NumberEffect && effect.num != null) {
                if (effect.x > this.x && effect.x < this.x + 100 && effect.y > this.y && effect.y < this.y + 100) {
                    let val = effect.num;
                    for (let effect2 of effects) {
                        if (effect2 instanceof EllipseEffect_1.EllipseEffect && (val == effect2.w || val == effect2.h)) {
                            return true;
                        }
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
exports.LessonTwoCpSeven = LessonTwoCpSeven;
//# sourceMappingURL=LessonTwoCpSeven.js.map