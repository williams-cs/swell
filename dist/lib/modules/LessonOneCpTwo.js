"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const StringEffect_1 = require("../effects/StringEffect");
class LessonOneCpTwo {
    constructor() {
        this._name = "l1c2";
        this._nextModule = 'l1c3';
        this._constraint = 'code';
        this._instructions = `<p> You just told the computer to write words on the CANVAS! </p>
    <p> Now let's do something more interesting: click on the words on the CANVAS, then drag it inside the box at the top-right corner. Observe what happens to your code. </p>
    <p> GOAL: Move the words you just created inside the top-right box. </p>`;
    }
    drawGuides(ctx) {
        ctx.beginPath();
        ctx.rect(390, 10, 100, 100);
        ctx.strokeStyle = '#6C6C6C';
        ctx.stroke();
        ctx.font = 20 + "px Courier New";
        ctx.fillStyle = '#6C6C6C';
        ctx.fillText("Put text", 390, 130);
        ctx.fillText("in here", 390, 150);
    }
    /**
     * A lesson to print a string
     * goals: moving the text and observe the code
     * @param document The HTML document
     * @param effects: the list of effects currently on the CANVAS
     */
    checkGoal(document, effects) {
        for (let effect of effects) {
            if (effect instanceof StringEffect_1.StringEffect && effect.str !== "") {
                if (effect.x < 10 && effect.y < 70) {
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
exports.LessonOneCpTwo = LessonOneCpTwo;
//# sourceMappingURL=LessonOneCpTwo.js.map