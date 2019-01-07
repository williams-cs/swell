import { Module } from "./Module";
import { Instruction } from "./Instruction";
import { Effect } from "../effects/Effect";
import { EllipseEffect } from "../effects/EllipseEffect";
import { StringEffect } from "../effects/StringEffect";

export class LessonThreeCpSix extends Module {
    readonly _name: string = "l3c6";
    readonly _nextModule: string = 'l3c6';
    readonly _goal: any;
    readonly _constraint: string = 'none';
    readonly _instructions: string =
        `<p> GOAL: Create an if/else statement to print the correct claim about the sizes of the 2 circles. </p>`;

    _latestInstrIndex: number = 3;

    xA: number;
    yA: number;
    xB: number;
    yB: number;
    a_size: number;
    b_size: number;
    square_size: number;
    font_size: number = 20;

    constructor(ctx: CanvasRenderingContext2D, editor: CodeMirror.Editor) {
        //setting up the CODE and CANVAS
        super(ctx, editor);
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
print("Circle A is smaller than circle B.", ${this.xA}, ${this.yA + this.square_size + this.font_size});`

        //setting up the Instructions
        let content = "Now that you know how to use if/else statements, let's put them all together!";
        this._instrBoxes.push(new Instruction('code-editor', content, "50%", "10%"));
        content = 'Above we have the CODE to draw 2 circles: circle A has height and width a, and circle B has height and width b.';
        this._instrBoxes.push(new Instruction('code-editor', content, "40%", "10%"));
        content = `However, currently the claim that "Circle A is smaller than circle B." is printed regardless of the circles' actual sizes.`;
        this._instrBoxes.push(new Instruction('code-editor', content, "50%", "10%"));
        content = `Here's a challenge for you: Create an if/else statement to print "Circle A is smaller than circle B." when it is actually so, and print "Circle A is bigger than circle B" otherwise.`;
        this._instrBoxes.push(new Instruction('code-editor', content, "80%", "10%"));
        content = 'Congratulations! You just successfully wrote a complicated if/else statement!';
        this._instrBoxes.push(new Instruction('canvas-container', content, "70%", "10%"));
    }

    drawGuides(): void {
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
     * @param document the HTML document
     * @param effects the list of effects currently on the CANVAS
     */
    checkGoal(document: Document, effects: Effect<any>[]): boolean {
        switch (this._latestInstrIndex) {
            case 3:
                //check for correct CODE
                let codeIsCorrect = false;
                let code: string = this.editor.getValue();
                let regex1: RegExp = /if\s*\(\s*a\s*[<>]\s*b\s*\)/;
                let regex2: RegExp = /if\s*\(\s*b\s*[<>]\s*a\s*\)/;
                let match1 = code.match(regex1);
                let match2 = code.match(regex2);
                codeIsCorrect = (match1 != null && match1.length > 0) || (match2 != null && match2.length > 0);

                //check for correct CANVAS effects
                let canvasIsCorrect = false;
                let circleA = null;
                let circleB = null;

                //look for circles A and B
                for (let effect of effects) {
                    if (effect instanceof EllipseEffect) {
                        if (effect.x > this.xA && effect.x < this.xA + this.square_size && effect.y > this.yA && effect.y < this.yA + this.square_size) {
                            circleA = effect;
                        } else if (effect.x > this.xB && effect.x < this.xB + this.square_size && effect.y > this.yB && effect.y < this.yB + this.square_size) {
                            circleB = effect;
                        }
                    }
                }

                if (circleA != null && circleB != null) {
                    for (let effect of effects) {
                        if (effect instanceof StringEffect) {
                            let str = effect.str;
                            if ((str === "Circle A is smaller than circle B." && circleA.w < circleB.w && circleA.h < circleB.h)
                                || (str === "Circle A is bigger than circle B." && circleA.w > circleB.w && circleA.h > circleB.h)) {
                                canvasIsCorrect = true;
                                break;
                            }
                        }
                    }
                }

                if (codeIsCorrect && canvasIsCorrect) {
                    this._latestInstrIndex++;
                    this.renderLatestInstruction(document);
                }
                return false;

            default:
                return true;
        }

    }
}
