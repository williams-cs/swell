"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EllipseEffect_1 = require("../effects/EllipseEffect");
const StringEffect_1 = require("../effects/StringEffect");
class LessonThreeCpSix {
    constructor() {
        this._name = "l3c6";
        this._nextModule = 'l4c1';
        this._constraint = 'none';
        this._instructions = `<p> Now that you know how to use if/else statements, let's put them all together! </p>
    <p> Above we have the CODE to draw 2 circles: circle A has height and width a, and circle B has height and width b. </p>
    <p> However, currently the claim that "Circle A is smaller than circle B." regardless of the circles' actual sizes. </p>
    <p> Create an if/else statement to print "Circle A is smaller than circle B." when it is actually so, and print "Circle A is bigger than circle B" otherwise. </p>
    <p> CHALLENGE: Create an if/else statement to print the correct claim about the sizes of the 2 circles. </p>`;
        this._starterCode = `a = 200;
print(a, 111, 103);
print(ellipse(a, a), 131, 263);
b = 100;
print(b, 337, 104);
print(ellipse(b, b), 371, 248);
print("Circle A is smaller than circle B.", 45, 453);
`;
        this.xA = 20;
        this.yA = 150;
        this.xB = this.xA + 225 + 10;
        this.yB = 150;
    }
    drawGuides(ctx) {
        ctx.beginPath();
        ctx.rect(this.xA, this.yA, 225, 225);
        ctx.strokeStyle = '#6C6C6C';
        ctx.stroke();
        ctx.font = 20 + "px Courier New";
        ctx.fillStyle = '#6C6C6C';
        ctx.fillText("Circle A", this.xA, this.yA - 20);
        ctx.beginPath();
        ctx.rect(this.xB, this.yB, 225, 225);
        ctx.stroke();
        ctx.fillText("Circle B", this.xB, this.yB - 20);
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
                if (effect.x > this.xA && effect.x < this.xA + 225 && effect.y > this.yA && effect.y < this.yA + 225) {
                    circleA = effect;
                }
                else if (effect.x > this.xB && effect.x < this.xB + 225 && effect.y > this.yB && effect.y < this.yB + 225) {
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
exports.LessonThreeCpSix = LessonThreeCpSix;
//# sourceMappingURL=LessonThreeCpSix.js.map