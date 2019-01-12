import { Module } from "./Module";
import { Instruction } from "./Instruction";
import { Effect } from "../effects/Effect";
import { EmojiEffect } from "../effects/EmojiEffect";
import { StringEffect } from "../effects/StringEffect";

export class LessonThreeCpSix extends Module {
    readonly _name: string = "l3c6";
    readonly _goal: any;
    readonly _constraint: string = 'none';
    readonly _instructions: string =
        `<p> GOAL: Create an if/else statement to print the correct claim about the sizes of the 2 emojis. </p>`;

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
        //let square_mid = Math.round(this.square_size / 2);
        let circ_xA = this.xA + 10;
        let circ_yA = this.yA + 10;
        let circ_xB = this.xB + 10;
        let circ_yB = this.yB + 10;

        this._starterCode =
            `a = ${this.a_size};
print(a, ${this.xA}, ${this.yA - 2 * this.font_size});
print(emoji("angel", a, a), ${circ_xA}, ${circ_yA});
b = ${this.b_size};
print(b, ${this.xB}, ${this.yA - 2 * this.font_size});
print(emoji("devil", b, b), ${circ_xB}, ${circ_yB});
print("The angel is smaller than the devil.", ${this.xA}, ${this.yA + this.square_size + this.font_size});`

        //setting up the Instructions
        let content = `Now that you know how to use <span class="inline-code">if/else</span> statements, let's put them all together!`;
        this._instrBoxes.push(new Instruction('code-editor', content, "50%", "10%"));
        content = 'Above we have the CODE to draw 2 emojis: an angel emoji with height and width <span class="inline-code">a</span>, and a devil emoji with height and width <span class="inline-code">b</span>.';
        this._instrBoxes.push(new Instruction('code-editor', content, "40%", "10%"));
        content = `However, currently the claim that <span class="inline-code">The angel is smaller than the devil.</span> is printed regardless of the emojis' actual sizes.`;
        this._instrBoxes.push(new Instruction('code-editor', content, "50%", "10%"));
        content = `Here's a challenge for you: Create an <span class="inline-code">if/else</span> statement to print <span class="inline-code">The angel is smaller than the devil.</span> when it is actually so, and print <span class="inline-code">The angel is bigger than the devil.</span> otherwise.`;
        this._instrBoxes.push(new Instruction('code-editor', content, "80%", "10%"));
        content = 'Congratulations! You just successfully wrote a complicated <span class="inline-code">if/else</span> statement!';
        this._instrBoxes.push(new Instruction('canvas-container', content, "90%", "10%"));
    }

    drawGuides(): void {
        this.ctx.beginPath();
        this.ctx.rect(this.xA, this.yA, this.square_size, this.square_size);
        this.ctx.strokeStyle = '#6C6C6C';
        this.ctx.stroke();

        this.ctx.font = this.font_size + "px Courier New";
        this.ctx.fillStyle = '#6C6C6C';
        this.ctx.fillText("Angel emoji", this.xA, this.yA - this.font_size);

        this.ctx.beginPath();
        this.ctx.rect(this.xB, this.yB, this.square_size, this.square_size);
        this.ctx.stroke();

        this.ctx.fillText("Devil emoji", this.xB, this.yB - this.font_size);
    }

    /**
     * A test on if/else statement
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
                let angel = null;
                let devil = null;

                //look for the 2 emojis
                for (let effect of effects) {
                    if (effect instanceof EmojiEffect) {
                        if (effect.x > this.xA && effect.x < this.xA + this.square_size && effect.y > this.yA && effect.y < this.yA + this.square_size) {
                            angel = effect;
                        } else if (effect.x > this.xB && effect.x < this.xB + this.square_size && effect.y > this.yB && effect.y < this.yB + this.square_size) {
                            devil = effect;
                        }
                    }
                }

                if (angel != null && devil != null) {
                    for (let effect of effects) {
                        if (effect instanceof StringEffect) {
                            let str = effect.str;
                            if ((str === "The angel is smaller than the devil." && angel.w < devil.w && angel.h < devil.h)
                                || (str === "The angel is bigger than the devil." && angel.w > devil.w && angel.h > devil.h)) {
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
