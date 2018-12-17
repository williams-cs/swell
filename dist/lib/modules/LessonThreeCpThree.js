"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Module_1 = require("./Module");
const StringEffect_1 = require("../effects/StringEffect");
class LessonThreeCpThree extends Module_1.Module {
    constructor() {
        super(...arguments);
        this._name = "l3c3";
        this._nextModule = 'l3c4';
        this._constraint = 'none';
        this._instructions = `<p> if statements allow you to run a block of code inside the curly braces {} ONLY when the condition inside the if() clause is true. </p>
    <p> Let's have a quick challenge: observe the CODE above. Make it so that the line "b is greater than 20" is only printed on the CANVAS when b is actually greater than 20. </p>
    <p> GOAL: Make the line "b is greater than 20" only be printed on the CANVAS when b is actually greater than 20. Change b to test the if() statement. </p>`;
        this._starterCode = `b = 8;
if(b < 10) {
\tprint("b is greater than 20.", 103, 143);
}`;
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
        let code = document.getElementById("input").value;
        if (code != null) {
            let regex = /if\s*\(\s*b\s*>\s*20\s*\)/;
            let match = code.match(regex);
            codeIsCorrect = match != null && match.length > 0;
        }
        //check for correct CANVAS effects
        let canvasIsCorrect = false;
        for (let effect of effects) {
            if (effect instanceof StringEffect_1.StringEffect && effect.str === "b is greater than 20.") {
                canvasIsCorrect = true;
                break;
            }
        }
        return codeIsCorrect && canvasIsCorrect;
    }
}
exports.LessonThreeCpThree = LessonThreeCpThree;
//# sourceMappingURL=LessonThreeCpThree.js.map