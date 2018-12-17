"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Module_1 = require("./Module");
const EllipseEffect_1 = require("../effects/EllipseEffect");
class LessonTwoCpSix extends Module_1.Module {
    constructor() {
        super(...arguments);
        this._name = "l2c6";
        this._nextModule = 'l2c7';
        this._constraint = 'code';
        this._instructions = `<p> Now that you have drawn 2 circles both are called c, let's see what happens when you try to modify one of them. </p>
    <p> Click on one of the circles on the CANVAS, and try make it bigger. Observe what happens to your declaration of c. </p>
    <p> GOAL: Enlarge one of the circles referred to by c on the CANVAS. </p>`;
    }
    /**
     * A lesson to print a string
     * goals: moving the text and observe the code
     * @param document: The HTML document
     * @param effects: the list of effects currently on the CANVAS
     */
    checkGoal(document, effects) {
        for (let effect of effects) {
            if (effect instanceof EllipseEffect_1.EllipseEffect) {
                if (effect.w > 250 && effect.h > 250) {
                    return true;
                }
            }
        }
        return false;
    }
}
exports.LessonTwoCpSix = LessonTwoCpSix;
//# sourceMappingURL=LessonTwoCpSix.js.map