"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CircleMod {
    constructor() {
        this._name = "The Circle";
        this._instructions = "Draw a circle in the middle of the screen!";
    }
    // goals: width = height and x and y are between 150 and 350
    checkGoal(document) {
        let inputbox = document.getElementById('input');
        let inputtext = inputbox.value;
        let goal1 = false;
        let goal2 = false;
        let numbers;
        if (inputtext != null) {
            let hits = inputtext.match(new RegExp("\\^print\\(ellipse\\("));
            if (hits != null && hits.length === 1)
                goal1 = true;
            var nums = inputtext.match(/\d+/g);
            if (nums != null) {
                numbers = nums.map(Number);
            }
            if (numbers != null && numbers[0] === numbers[1] && 150 <= numbers[2] && 350 >= numbers[2]
                && 150 <= numbers[3] && 350 >= numbers[3])
                return (goal1 && goal2);
        }
        // if math works out
    }
    dist(x1, y1, x2, y2) {
        return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
    }
    get name() {
        return this._name;
    }
    get instructions() {
        return this._instructions;
    }
}
exports.CircleMod = CircleMod;
//# sourceMappingURL=CircleMod.js.map