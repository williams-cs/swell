import { Module } from "./Module";
import { Instruction } from "./Instruction";
import { Effect } from "../effects/Effect";
import { StringEffect } from "../effects/StringEffect";

export class LessonThreeCpTwo extends Module {
    readonly _name: string = "l3c2";
    readonly _goal: any;
    readonly _constraint: string = 'none';
    readonly _instructions: string =
        `<p>Lesson 3 - Checkpoint 2</p>` +
        `<p>GOAL: Change the value of a and observe what happens.</p>`;

    readonly _starterCode: string =
        `a = 150;
print(emoji("skull", a, a), 25, 25);
if(a < 100) {
\tprint("The skull is smaller than the box.", 25, 220);
}`;

    _latestInstrIndex: number = 2;

    x: number = 10;
    y: number = 10;
    square_size: number = 100;
    font_size: number = 20;

    constructor(ctx: CanvasRenderingContext2D, editor: CodeMirror.Editor) {
        super(ctx, editor);
        let content = `Let's teach the computer to print the sentence <span class="inline-code">The skull is smaller than the box</span> ONLY when the printed skull emoji really is smaller the box.`;
        this._instrBoxes.push(new Instruction('code-editor', content, "50%", "10%"));
        content = `We will use something called an <span class="inline-code">if</span> statement. Observe the CODE above. We added an <span class="inline-code">if</span> statement. When <span class="inline-code">a < 100</span>, the code inside the curly braces <span class="inline-code">{}</span> will run.`;
        this._instrBoxes.push(new Instruction('code-editor', content, "40%", "10%"));
        content = `Let's investigate what <span class="inline-code">if</span> does. Change the value of <span class="inline-code">a</span> from <span class="inline-code">150</span> to <span class="inline-code">80</span>.`;
        this._instrBoxes.push(new Instruction('code-editor', content, "50%", "10%"));
        content = `Do you see the text is now printed on the CANVAS?  Let's change the value of <span class="inline-code">a</span> from <span class="inline-code">80</span> to <span class="inline-code">140</span>.`;
        this._instrBoxes.push(new Instruction('code-editor', content, "40%", "10%"));
        content = 'The text disappears! Finally, change the value of <span class="inline-code">a</span> from <span class="inline-code">140</span> to <span class="inline-code">20</span>.';
        this._instrBoxes.push(new Instruction('canvas-container', content, "70%", "10%"));
        content = 'The text comes back! The <span class="inline-code">if</span> statement makes the computer check the value of <span class="inline-code">a</span> before running the CODE inside the curly braces <span class="inline-code">{}</span>.';
        this._instrBoxes.push(new Instruction('code-editor', content, "50%", "10%"));
    }

    drawGuides(): void {
        this.ctx.beginPath();
        this.ctx.rect(this.x, this.y, this.square_size, this.square_size);
        this.ctx.strokeStyle = '#6C6C6C';
        this.ctx.stroke();

        this.ctx.font = this.font_size + "px Courier New";
        this.ctx.fillStyle = '#6C6C6C';
        this.ctx.fillText("Box with", this.x, this.y + this.square_size + this.font_size);
        this.ctx.fillText("width 100", this.x, this.y + this.square_size + 2 * this.font_size);
    }

    /**
     * A lesson to explore if statement
     * @param document the HTML document
     * @param effects the list of effects currently on the CANVAS
     */
    checkGoal(document: Document, effects: Effect<any>[]): boolean {
        let codeIsCorrect = false;
        let canvasIsCorrect = false;
        let code: string = this.editor.getValue();
        let regex: RegExp;
        let match: string[];

        switch (this._latestInstrIndex) {
            case 2:
                //check for correct CODE
                regex = /a\s*=\s*80\s*/;
                match = code.match(regex);
                codeIsCorrect = match != null && match.length > 0;

                //check for correct CANVAS effects
                for (let effect of effects) {
                    if (effect instanceof StringEffect && effect.str === "The skull is smaller than the box.") {
                        canvasIsCorrect = true;
                        break;
                    }
                }

                if (codeIsCorrect && canvasIsCorrect) {
                    this._latestInstrIndex++;
                    this.renderLatestInstruction(document);
                }
                return false;

            case 3:
                //check for correct CODE
                regex = /a\s*=\s*140\s*/;
                match = code.match(regex);
                codeIsCorrect = match != null && match.length > 0;

                //check for correct CANVAS effects
                for (let effect of effects) {
                    if (effect instanceof StringEffect && effect.str === "The skull is smaller than the box.") {
                        canvasIsCorrect = true;
                        break;
                    }
                }

                if (codeIsCorrect && !canvasIsCorrect) {
                    this._latestInstrIndex++;
                    this.renderLatestInstruction(document);
                }
                return false;

            case 4:
                //check for correct CODE
                regex = /a\s*=\s*20\s*/;
                match = code.match(regex);
                codeIsCorrect = match != null && match.length > 0;

                //check for correct CANVAS effects
                for (let effect of effects) {
                    if (effect instanceof StringEffect && effect.str === "The skull is smaller than the box.") {
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
