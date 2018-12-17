"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Module_1 = require("./Module");
const EllipseEffect_1 = require("../effects/EllipseEffect");
const StringEffect_1 = require("../effects/StringEffect");
class LessonTwoCpThree extends Module_1.Module {
    constructor() {
        super(...arguments);
        this._name = "l2c3";
        this._nextModule = 'l2c4';
        this._constraint = 'none';
        this._instructions = `<p> So we can draw a circle and change it. But what if we want to draw both circles and words? </p>
    <p> Well, simple! Just write more print statements in the CODE area! </p>
    <p> GOAL: Draw 2 circles and a word on the CANVAS. </p>
    <p> HINT: Remember that the numbers right inside the ellipse(_,_) statement change the circle's sizes.`;
    }
    /**
     * A lesson to print a string
     * goals: moving the text and observe the code
     * @param document: The HTML document
     * @param effects: the list of effects currently on the CANVAS
     */
    checkGoal(document, effects) {
        let stringExists = false;
        let circleCount = 0;
        for (let effect of effects) {
            if (!stringExists) {
                stringExists = effect instanceof StringEffect_1.StringEffect && effect.str !== "";
            }
            if (effect instanceof EllipseEffect_1.EllipseEffect) {
                circleCount += 1;
            }
        }
        return stringExists && circleCount >= 2;
    }
}
exports.LessonTwoCpThree = LessonTwoCpThree;
//# sourceMappingURL=LessonTwoCpThree.js.map