"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Module_1 = require("./Module");
const EllipseEffect_1 = require("../effects/EllipseEffect");
class LessonFourCpOne extends Module_1.Module {
    constructor() {
        super(...arguments);
        this._name = "l4c1";
        this._constraint = 'none';
        this._instructions = `<p> You've made it to the FINAL CHALLENGES! Complete these challenges to earn ETERNAL GLORY! </p>
    <p> Throughout this Hour of Code, you have learned: </p>
    <p> - How to print a word, circle, rectangle, and curve. </p>
    <p> - How to store any of the value above in a variable. </p>
    <p> - How to use if/else statement to check a condition about a variable. </p>
    <p> Each of the following challenges will test these concepts. Let's dive right in! </p>
    <p> Print a circle and put its height and width in one of the boxes to the side. Then print a rectangle and put its height and width in the box. </p>
    <p> CHALLENGE: Print a circle and rectangle. Put their respective width and height in the boxes provided. </p>`;
    }
    /**
     * A lesson leading into conditionals
     * goals: moving the text and observe the code
     * @param document: The HTML document
     * @param effects: the list of effects currently on the CANVAS
     */
    checkGoal(document, effects) {
        //check for correct CODE
        let codeIsCorrect = false;
        let code = this.editor.getValue();
        let regex = /print\s*\(\s*ellipse\s*\(\s*[1-9][0-9]*\s*,\s*[1-9][0-9]*\s*\)\s*,\s*[1-9][0-9]*\s*,\s*[1-9][0-9]*\s*\);/;
        let match = code.match(regex);
        codeIsCorrect = match != null && match.length > 0;
        //check for correct CANVAS effects
        let canvasIsCorrect = true;
        for (let effect of effects) {
            if (effect instanceof EllipseEffect_1.EllipseEffect) {
            }
        }
        return codeIsCorrect && canvasIsCorrect;
    }
}
exports.LessonFourCpOne = LessonFourCpOne;
//# sourceMappingURL=LessonFourCpOne.js.map