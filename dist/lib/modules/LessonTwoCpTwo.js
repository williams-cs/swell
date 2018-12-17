"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Module_1 = require("./Module");
const EllipseEffect_1 = require("../effects/EllipseEffect");
class LessonTwoCpTwo extends Module_1.Module {
    constructor() {
        super(...arguments);
        this._name = "l2c2";
        this._nextModule = 'l2c3';
        this._constraint = 'code';
        this._instructions = `<p> We can write ellipse(100, 100) in the print statement to draw a circle on the CANVAS. </p>
    <p> What are the numbers (100, 100) for? I'm glad you asked... </p>
    <p> Because the CODE area is frozen again! Drag one of the 9 white tips around the circle on the CANVAS to see how the number changes! </p>
    <p> GOAL: Make the circle wider but shorter. </p>`;
    }
    /*
    `<p> So we can draw a circle and change it. But what if we want to draw both a circle and a word? </p>
    <p> Well, simple! Just write another print statement in the CODE area! </p>
    <p> GOAL: Draw 2 circles and a word on the CANVAS. </p>
    <p> HINT: Remember that the numbers right inside the ellipse(_,_) statement change the circle's sizes.`;
*/
    /**
     * A lesson to print a string
     * goals: moving the text and observe the code
     * @param document The HTML document
     * @param effects: the list of effects currently on the CANVAS
     */
    checkGoal(document, effects) {
        for (let effect of effects) {
            if (effect instanceof EllipseEffect_1.EllipseEffect) {
                if (effect.w > 200 && effect.h < 80) {
                    return true;
                }
            }
        }
        return false;
    }
}
exports.LessonTwoCpTwo = LessonTwoCpTwo;
//# sourceMappingURL=LessonTwoCpTwo.js.map