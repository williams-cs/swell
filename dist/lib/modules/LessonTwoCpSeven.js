"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Module_1 = require("./Module");
const NumberEffect_1 = require("../effects/NumberEffect");
const EllipseEffect_1 = require("../effects/EllipseEffect");
class LessonTwoCpSeven extends Module_1.Module {
    constructor(ctx) {
        super(ctx);
        this._name = "l2c7";
        this._nextModule = 'l3c1';
        this._constraint = 'none';
        this._instructions = `<p> Changing one circle changes c, which will then in turn change the other circle! </p>
    <p> Now let's put all we have learned to practice. </p>
    <p> Create a circle, and print out the size of that circle in the given box. </p>
    <p> IF we ever change the circle, we want the number in the box to change, too! </p>
    <p> CHALLENGE: Create a circle and print its size in the given box. </p>`;
        this.x = 10;
        this.square_size = 100;
        this.font_size = 20;
        this.y = ctx.canvas.height - this.square_size - this.x;
    }
    drawGuides() {
        this.ctx.beginPath();
        this.ctx.rect(this.x, this.y, this.square_size, this.square_size);
        this.ctx.strokeStyle = '#6C6C6C';
        this.ctx.stroke();
        this.ctx.font = this.font_size + "px Courier New";
        this.ctx.fillStyle = '#6C6C6C';
        this.ctx.fillText("Put circle's size", this.x, this.y - 2 * this.font_size);
        this.ctx.fillText("in here", this.x, this.y - this.font_size);
    }
    /**
     * A lesson to print a string
     * goals: moving the text and observe the code
     * @param document: The HTML document
     * @param effects: the list of effects currently on the CANVAS
     */
    checkGoal(document, effects) {
        for (let effect of effects) {
            if (effect instanceof NumberEffect_1.NumberEffect && effect.num != null) {
                if (effect.x > this.x && effect.x < this.x + this.square_size && effect.y > this.y && effect.y < this.y + this.square_size) {
                    let val = effect.num;
                    for (let effect2 of effects) {
                        if (effect2 instanceof EllipseEffect_1.EllipseEffect && (val == effect2.w || val == effect2.h)) {
                            return true;
                        }
                    }
                }
            }
        }
        return false;
    }
}
exports.LessonTwoCpSeven = LessonTwoCpSeven;
//# sourceMappingURL=LessonTwoCpSeven.js.map