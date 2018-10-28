"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SnowmanMod {
    /**
     * Constructor for the Snowman module
     */
    constructor() {
        this._name = "Do You Want to Build a Snowman?";
        this._nextModule = '';
        this._instructions = "Draw three ellipses to make a snowman!";
    }
    /**
     * Checks goals and returns true if fulfilled, false otherwise
     * Goals: Three ellipses, circular, not too far away
     * @param document
     */
    checkGoal(document, effects) {
        let inputbox = document.getElementById('input');
        let inputtext = inputbox.value;
        let goal1 = false;
        let goal2 = false;
        let hits = inputtext.match(new RegExp("\\b" + "print(ellipse("));
        if (hits.length === 3)
            goal1 = true;
        var numbers = inputtext.match(/\d+/g).map(Number);
        if (numbers.length >= 12) {
            let dist1 = this.dist(numbers[2], numbers[3], numbers[6], numbers[7]) < 0.8 * (numbers[2] + numbers[5]) / 2; // if distances between ellipses is within threshold, correct
            let dist2 = this.dist(numbers[6], numbers[7], numbers[10], numbers[11]) < 0.8 * (numbers[5] + numbers[9]) / 2;
            if (dist1 && dist2)
                goal2 = true; // If dist between top and bottom
        }
        return (goal1 && goal2);
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
}
exports.SnowmanMod = SnowmanMod;
//# sourceMappingURL=SnowmanMod.js.map