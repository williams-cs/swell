import { Module } from "./Module";
import { Instruction } from "./Instruction";
import { Effect } from "../effects/Effect";
import { NumberEffect } from "../effects/NumberEffect";
import { EmojiEffect } from "../effects/EmojiEffect";

export class LessonTwoCpSeven extends Module {
    readonly _name: string = "l2c7";
    readonly _goal: any;
    readonly _constraint: string = 'none';
    readonly _instructions: string =
        `<p>Lesson 2 - Checkpoint 7</p>` +
        `<p>CHALLENGE: Create an emoji and print out its size.</p>`;

    _latestInstrIndex: number = 1;

    dm: number;
    x: number;
    y: number;
    square_size: number = 250;
    font_size = 20;

    constructor(ctx: CanvasRenderingContext2D, editor: CodeMirror.Editor) {
        super(ctx, editor);
        this.x = ctx.canvas.width - this.square_size - 10;
        this.y = ctx.canvas.height - this.square_size - 10;

        this._starterCode =
            `a = 50
print(emoji("mustache", 100, 100), ${this.x + 10}, ${this.y + 10})`;

        //retrieve survey choice for dm or non-dm
        this.dm = 1;
        let val = localStorage.getItem('dm');
        if (val != null) {
            this.dm = parseInt(val);
        }

        let content = `Let's learn one last thing about variables. In the code above, we connected the variable <span class="inline-code">a</span> to the number <span class="inline-code">50</span>, and we also have a <span class="inline-code">print</span> statement to print a mustache emoji.`;
        this._instrBoxes.push(new Instruction('code-editor', content, "50%", "10%", true));
        content = `Replace the two numbers <span class="inline-code">100</span> inside the <span class="inline-code">print</span> statement with the variable <span class="inline-code">a</span>. Watch what happens.`;
        this._instrBoxes.push(new Instruction('code-editor', content, "40%", "10%"));
        content = `Did you see that the emoji got smaller? The variable <span class="inline-code">a</span> is tied to the number <span class="inline-code">50</span>, so now the emoji has size <span class="inline-code">a</span>!`;
        this._instrBoxes.push(new Instruction('code-editor', content, "50%", "10%", true));
        content = `Let's make one more change. Write CODE to <span class="inline-code">print</span> the value of <span class="inline-code">a</span> on the CANVAS.`;
        this._instrBoxes.push(new Instruction('code-editor', content, "40%", "10%"));
        if (this.dm == 1) {
            content = "That's correct! Finally, click on the emoji on the CANVAS, and make it bigger than the box provided. Watch what happens to the printed number.";
        } else {
            content = `That's correct! Finally, change the value of <span class="inline-code">a</span>, until the emoji is bigger than the box provided. Watch what happens to the printed number.`;
        }
        this._instrBoxes.push(new Instruction('code-editor', content, "50%", "10%"));
        content = "Did you see the printed number change? You have successfully connected 2 elements on the CANVAS together -- an emoji and a number -- by a variable! Remember this lesson about variables in the future when you need to link different things on CANVAS together!";
        this._instrBoxes.push(new Instruction('code-editor', content, "70%", "10%"));
    }

    drawGuides(): void {
        this.ctx.beginPath();
        this.ctx.rect(this.x, this.y, this.square_size, this.square_size);
        this.ctx.strokeStyle = '#6C6C6C';
        this.ctx.stroke();

        this.ctx.font = this.font_size + "px Courier New";
        this.ctx.fillStyle = '#6C6C6C';
        this.ctx.fillText("Make emoji", this.x, this.y - 2 * this.font_size);
        this.ctx.fillText("bigger than this box", this.x, this.y - this.font_size);
    }

    /**
     * A lesson to use a variable to connect different objects, taught using DM and non-DM
     * @param document the HTML document
     * @param effects the list of effects currently on the CANVAS
     */
    checkGoal(document: Document, effects: Effect<any>[]): boolean {
        let codeIsCorrect = false;
        let canvasIsCorrect = false;
        let code: string = this.editor.getValue();

        switch (this._latestInstrIndex) {
            case 1:
                //check for correct CODE
                let regex: RegExp = /print\s*\(\s*emoji\s*\(\s*"mustache"\s*,\s*a\s*,\s*a\s*\)\s*,\s*[1-9][0-9]*\s*,\s*[1-9][0-9]*\s*\)/g;
                let match = code.match(regex);
                codeIsCorrect = match != null && match.length > 0;

                //check for correct CANVAS effects
                for (let effect of effects) {
                    if (effect instanceof EmojiEffect) {
                        canvasIsCorrect = true;
                        break;
                    }
                }

                if (codeIsCorrect && canvasIsCorrect) {
                    this._latestInstrIndex = 3;
                    this.renderNextInstruction(document);
                }
                return false;


            case 3:
                for (let effect of effects) {
                    if (effect instanceof NumberEffect && effect.val != null) {
                        let val = effect.val;
                        for (let effect2 of effects) {
                            if (effect2 instanceof EmojiEffect && (val == effect2.w || val == effect2.h)) {
                                this._latestInstrIndex++;
                                this.renderLatestInstruction(document);
                            }
                        }
                    }
                }
                return false;

            case 4:
                for (let effect of effects) {
                    if (effect instanceof NumberEffect && effect.val != null) {
                        let val = effect.val;
                        for (let effect2 of effects) {
                            if (effect2 instanceof EmojiEffect && (val == effect2.w || val == effect2.h) && val > this.square_size) {
                                this._latestInstrIndex++;
                                this.renderLatestInstruction(document);
                            }
                        }
                    }
                }
                return false;

            default:
                return true;
        }
    }
}
