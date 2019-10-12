import { Module } from "./Module";
import { Instruction } from "./Instruction";
import { Effect } from "../effects/Effect";
import { EmojiEffect } from "../effects/EmojiEffect";

export class LessonThreeCpFour extends Module {
    readonly _name: string = "l3c4";
    readonly _goal: any;
    readonly _constraint: string = 'none';
    readonly _instructions: string =
        `<p>Lesson 3 - Checkpoint 4</p>` +
        `<p>GOAL: Allow only happy emojis to be printed on the CANVAS.</p>`;

    readonly _starterCode: string =
        `c = "devil"
if(c == "devil") {
  print(emoji(c, 100, 100), x=80, y=80)
}`;

    _latestInstrIndex: number = 2;

    x: number = 10;
    y: number = 10;
    square_size: number = 150;
    font_size: number = 20;

    constructor(ctx: CanvasRenderingContext2D, editor: CodeMirror.Editor) {
        super(ctx, editor);
        let content = `You can put an inequality condition inside the brackets of <span class="inline-code">if()</span>, such as <span class="inline-code">a < 75</span> or <span class="inline-code">b > 200</span>.`;
        this._instrBoxes.push(new Instruction('code-editor', content, "50%", "10%", true));
        content = `You can also check for a word. Observe the CODE above with <span class="inline-code">c == "devil"</span>. The 2 equal signs <span class="inline-code">==</span> mean that you are checking whether <span class="inline-code">c</span> is exactly the word <span class="inline-code">"devil"</span> or not.`;
        this._instrBoxes.push(new Instruction('code-editor', content, "40%", "10%", true));
        content = `Let's have a small challenge: Can you change the condition inside the brackets <span class="inline-code">if()</span> so that only a happy emoji can be printed?`;
        this._instrBoxes.push(new Instruction('code-editor', content, "50%", "10%"));
        content = `Your CODE seems correct! Now change the value of <span class="inline-code">c</span> to <span class="inline-code">"happy"</span> to test that it runs correctly.`;
        this._instrBoxes.push(new Instruction('code-editor', content, "50%", "10%"));
        content = `That's correct! The code inside the braces <span class="inline-code">{}</span> of the <span class="inline-code">if</span> statement only runs when <span class="inline-code">c</span> is exactly the word <span class="inline-code">"happy"</span>!`;
        this._instrBoxes.push(new Instruction('canvas-container', content, "70%", "10%"));
    }

    drawGuides(): void {
        this.ctx.beginPath();
        this.ctx.rect(this.x, this.y, this.square_size, this.square_size);
        this.ctx.strokeStyle = '#6C6C6C';
        this.ctx.stroke();

        this.ctx.font = this.font_size + "px Courier New";
        this.ctx.fillStyle = '#6C6C6C';
        this.ctx.fillText("This is", this.x, this.y + this.square_size + this.font_size);
        this.ctx.fillText("a happy emoji", this.x, this.y + this.square_size + 2 * this.font_size);
    }

    /**
     * A lesson on checking string equality
     * @param document the HTML document
     * @param effects the list of effects currently on the CANVAS
     */
    checkGoal(document: Document, effects: Effect<any>[]): boolean {
        let condition = /if\s*\(\s*c\s*==\s*"happy"\s*\)/;
        let assignment: RegExp = /c\s*=\s*"happy"\s*/;
        let code: string = this.editor.getValue();
        let matchCond: string[];

        switch (this._latestInstrIndex) {
            case 2:
                //check for correct CODE
                matchCond = code.match(condition);

                if (matchCond != null && matchCond.length > 0) {
                    this._latestInstrIndex++;
                    this.renderLatestInstruction(document);
                }
                return false;

            case 3:
                //check for correct CODE
                let codeIsCorrect = false;
                let matchAssign = code.match(assignment);
                matchCond = code.match(condition);
                codeIsCorrect = matchAssign != null && matchAssign.length > 0 && matchCond != null && matchCond.length > 0;

                //check for correct CANVAS effects
                let canvasIsCorrect = false;
                for (let effect of effects) {
                    if (effect instanceof EmojiEffect && effect.type === "happy") {
                        canvasIsCorrect = true;
                        break;
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
