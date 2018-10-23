"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class LessonOneCpOne {
    constructor() {
        this._name = "Saying Hi";
        this._instructions = `To begin, let’s tell the computer to write something on the CANVAS!\n
    ………\n
    HINT: write in the CODE box print("Hello, world!")`;
    }
    /**
     * A module to draw a circle
     * goals: width = height and x and y are between 150 and 350
     * @param document The HTML document
     */
    checkGoal(document) {
        let inputbox = document.getElementById('input');
        let inputtext = inputbox.value;
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
     * Returns the distance between two (x,y) points
     * @param x1 The first point x coordinate
     * @param y1 The first point y coordinate
     * @param x2 The second point x coordinate
     * @param y2 The second point y coordinate
     */
    dist(x1, y1, x2, y2) {
        return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
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