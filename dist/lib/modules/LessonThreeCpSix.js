"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Module_1 = require("./Module");
const EllipseEffect_1 = require("../effects/EllipseEffect");
const StringEffect_1 = require("../effects/StringEffect");
class LessonThreeCpSix extends Module_1.Module {
    constructor(ctx) {
        super(ctx);
        this._name = "l3c6";
        this._nextModule = 'l4c1';
        this._constraint = 'none';
        this._instructions = `<p> Now that you know how to use if/else statements, let's put them all together! </p>
    <p> Above we have the CODE to draw 2 circles: circle A has height and width a, and circle B has height and width b. </p>
    <p> However, currently the claim that "Circle A is smaller than circle B." regardless of the circles' actual sizes. </p>
    <p> Create an if/else statement to print "Circle A is smaller than circle B." when it is actually so, and print "Circle A is bigger than circle B" otherwise. </p>
    <p> CHALLENGE: Create an if/else statement to print the correct claim about the sizes of the 2 circles. </p>`;
        this.font_size = 20;
        this.a_size = Math.round(Math.min(ctx.canvas.width, ctx.canvas.height) * 0.4);
        this.b_size = Math.round(this.a_size / 2);
        this.square_size = this.a_size + Math.round(Math.min(ctx.canvas.width, ctx.canvas.height) * 0.1);
        this.yA = Math.round((ctx.canvas.height - this.square_size) / 2);
        this.yB = this.yA;
        this.xA = Math.round(ctx.canvas.width / 2) - this.square_size - 10;
        this.xB = this.xA + this.square_size + 10;
        let square_mid = Math.round(this.square_size / 2);
        let circ_xA = this.xA + square_mid;
        let circ_yA = this.yA + square_mid;
        let circ_xB = this.xB + square_mid;
        let circ_yB = this.yB + square_mid;
        this._starterCode =
            `a = ${this.a_size};
print(a, ${this.xA}, ${this.yA - 2 * this.font_size});
print(ellipse(a, a), ${circ_xA}, ${circ_yA});
b = ${this.b_size};
print(b, ${this.xB}, ${this.yA - 2 * this.font_size});
print(ellipse(b, b), ${circ_xB}, ${circ_yB});
print("Circle A is smaller than circle B.", ${this.xA}, ${this.yA + this.square_size + this.font_size});`;
    }
    drawGuides() {
        this.ctx.beginPath();
        this.ctx.rect(this.xA, this.yA, this.square_size, this.square_size);
        this.ctx.strokeStyle = '#6C6C6C';
        this.ctx.stroke();
        this.ctx.font = this.font_size + "px Courier New";
        this.ctx.fillStyle = '#6C6C6C';
        this.ctx.fillText("Circle A", this.xA, this.yA - this.font_size);
        this.ctx.beginPath();
        this.ctx.rect(this.xB, this.yB, this.square_size, this.square_size);
        this.ctx.stroke();
        this.ctx.fillText("Circle B", this.xB, this.yB - this.font_size);
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
            /*
            if(a < b) {
              print("Circle A is smaller than circle B.", 45, 453);
            } else {
              print("Circle A is bigger than circle B.", 45, 453);
            }*/
            let regex1 = /if\s*\(\s*a\s*[<>]\s*b\s*\)/;
            let regex2 = /if\s*\(\s*b\s*[<>]\s*a\s*\)/;
            let match1 = code.match(regex1);
            let match2 = code.match(regex2);
            codeIsCorrect = (match1 != null && match1.length > 0) || (match2 != null && match2.length > 0);
        }
        //check for correct CANVAS effects
        let canvasIsCorrect = false;
        let circleA = null;
        let circleB = null;
        //look for circles A and B
        for (let effect of effects) {
            if (effect instanceof EllipseEffect_1.EllipseEffect) {
                if (effect.x > this.xA && effect.x < this.xA + this.square_size && effect.y > this.yA && effect.y < this.yA + this.square_size) {
                    circleA = effect;
                }
                else if (effect.x > this.xB && effect.x < this.xB + this.square_size && effect.y > this.yB && effect.y < this.yB + this.square_size) {
                    circleB = effect;
                }
            }
        }
        if (circleA != null && circleB != null) {
            for (let effect of effects) {
                if (effect instanceof StringEffect_1.StringEffect) {
                    let str = effect.str;
                    if ((str === "Circle A is smaller than circle B." && circleA.w < circleB.w && circleA.h < circleB.h)
                        || (str === "Circle A is bigger than circle B." && circleA.w > circleB.w && circleA.h > circleB.h)) {
                        canvasIsCorrect = true;
                        break;
                    }
                }
            }
        }
        return codeIsCorrect && canvasIsCorrect;
    }
}
exports.LessonThreeCpSix = LessonThreeCpSix;
//# sourceMappingURL=LessonThreeCpSix.js.map