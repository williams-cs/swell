"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const StringEffect_1 = require("../effects/StringEffect");
class LessonOneCpOne {
    constructor() {
        this._name = "Lesson 1 Checkpoint 1: Saying Hi";
        this._instructions = `<p> To begin, let’s tell the computer to write something on the CANVAS! </p>
    <p> ……… </p>
    <p> HINT: write in the CODE box print("Hello, world!") </p>`;
    }
    /**
     * A lesson to print a string
     * goals: write any string on canvas
     * @param document The HTML document
     */
    checkGoal2(document, effects) {
        for (let effect of effects) {
            if (effect instanceof StringEffect_1.StringEffect) {
                if (effect.str !== "") {
                    return true;
                }
            }
        }
        return false;
    }
    /**
     * A lesson to print a string
     * goals: write any string on canvas
     * @param document The HTML document
     */
    checkGoal(document) {
        let input = document.getElementById('input');
        let inputtext = input.value;
        let goal1 = false;
        let goal2 = false;
        let numbers;
        if (inputtext != null) {
            //let hits = inputtext.match(new RegExp("\\^print\\(ellipse\\("));
            //console.log("hits: " + hits);
            //if(hits != null && hits.length === 1) {
            if (inputtext.includes("print(ellipse(") && inputtext.includes(");")) { // rough way of checking
                goal1 = true;
                console.log("goal 1 met");
            }
            var nums = inputtext.match(/\d+/g);
            if (nums != null) {
                numbers = nums.map(Number);
            }
            if (numbers != null && numbers[0] === numbers[1] && 150 <= numbers[2] && 350 >= numbers[2]
                && 150 <= numbers[3] && 350 >= numbers[3]) {
                console.log("goal 2 met");
                goal2 = true;
            }
            return (goal1 && goal2);
        }
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
exports.LessonOneCpOne = LessonOneCpOne;
//# sourceMappingURL=LessonOneCpOne.js.map