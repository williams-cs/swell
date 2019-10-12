import { Module } from "./Module";
import { Instruction } from "./Instruction";
import { Effect } from "../effects/Effect";
import { StringEffect } from "../effects/StringEffect";

export class LessonThreeCpThree extends Module {
    readonly _name: string = "l3c3";
    readonly _goal: any;
    readonly _constraint: string = 'none';
    readonly _instructions: string =
        `<p>Lesson 3 - Checkpoint 3</p>` +
        `<p>GOAL: Make the line "The pirate is bigger than the box." only be printed
        on the CANVAS when the pirate emoji is actually bigger than the box.</p>`;

    readonly _starterCode: string =
        `b = 50
print(emoji("pirate", b, b), x=80, y=80)
if(b < 75) {
  print("The pirate is bigger than the box.", x=220, y=250)
}`;

    _latestInstrIndex: number = 1;

    x: number = 10;
    y: number = 10;
    square_size: number = 150;
    font_size: number = 20;

    constructor(ctx: CanvasRenderingContext2D, editor: CodeMirror.Editor) {
        super(ctx, editor);
        let content = `<span class="inline-code">if</span> statements allow you to run a block of code inside the curly braces <span class="inline-code">{}</span> ONLY when the condition inside the brackets <span class="inline-code">if ()</span> is <span class="red-text">true</span>.`;
        this._instrBoxes.push(new Instruction('code-editor', content, "50%", "10%", true));
        content = `Let's try a challenge: change the CODE inside the brackets <span class="inline-code">if ()</span> so that the claim <span class="inline-code">The pirate is bigger than the box</span> is only printed when the printed emoji is actually bigger than the box.`;
        this._instrBoxes.push(new Instruction('code-editor', content, "40%", "10%"));
        content = `Your CODE looks correct! Now change the value of <span class="inline-code">b</span> from <span class="inline-code">50</span> to <span class="inline-code">200</span> to test that it runs correctly.`;
        this._instrBoxes.push(new Instruction('code-editor', content, "50%", "10%"));
        content = 'The claim is printed when <span class="inline-code">b</span> is bigger than the box! Good job!';
        this._instrBoxes.push(new Instruction('canvas-container', content, "80%", "10%"));
    }

    drawGuides(): void {
        this.ctx.beginPath();
        this.ctx.rect(this.x, this.y, this.square_size, this.square_size);
        this.ctx.strokeStyle = '#6C6C6C';
        this.ctx.stroke();

        this.ctx.font = this.font_size + "px Courier New";
        this.ctx.fillStyle = '#6C6C6C';
        this.ctx.fillText("Box with", this.x, this.y + this.square_size + this.font_size);
        this.ctx.fillText("width 150", this.x, this.y + this.square_size + 2 * this.font_size);
    }

    /**
     * A test on writing if statement
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
            case 1:
                //check for correct CODE
                regex = /if\s*\(\s*b\s*>\s*150\s*\)/;
                match = code.match(regex);
                if (match != null && match.length > 0) {
                    this._latestInstrIndex++;
                    this.renderLatestInstruction(document);
                }
                return false;

            case 2:
                //check for correct CODE
                regex = /if\s*\(\s*b\s*>\s*150\s*\)/;
                match = code.match(regex);
                let assign: RegExp = /b\s*=\s*200\s*/;
                let matchAssign = code.match(assign);
                codeIsCorrect = match != null && match.length > 0 && matchAssign != null && matchAssign.length > 0;

                //check for correct CANVAS effects
                for (let effect of effects) {
                    if (effect instanceof StringEffect && effect.val === "The pirate is bigger than the box.") {
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
