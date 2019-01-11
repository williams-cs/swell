import { Module } from "./Module";
import { Instruction } from "./Instruction";
import { Effect } from "../effects/Effect";
import { StringEffect } from "../effects/StringEffect";

export class LessonThreeCpOne extends Module {
    readonly _name: string = "l3c1";
    readonly _goal: any;
    readonly _constraint: string = 'none';
    readonly _instructions: string =
        `<p> GOAL: Change the value of a to 150. </p>`;

    readonly _starterCode: string =
    `a = 75;
print(emoji("skull", a, a), 25, 25);
print("The skull is smaller than the box.", 25, 220)`;

    _latestInstrIndex: number = 3;

    x: number = 10;
    y: number = 10;
    square_size: number = 100;
    font_size: number = 20;

    constructor(ctx: CanvasRenderingContext2D, editor: CodeMirror.Editor) {
        super(ctx, editor);
        let content = "We learned to tell the computer to print a lot of things. Now, let's teach it to make some decisions on its own.";
        this._instrBoxes.push(new Instruction('code-editor', content, "50%", "10%"));
        content = 'Look at the CODE above. We let <span class="inline-code">a = 75</span>, then we use it to refer to the dimension of a skull emoji. Then we print the line <span class="inline-code">The skull is smaller than the box.</span>.';
        this._instrBoxes.push(new Instruction('code-editor', content, "40%", "10%"));
        content = `Since <span class="inline-code">a</span> is 75, and the box's width is 100, we know the printed claim is correct. But what would happen if we change the value of a to, say, 150?`;
        this._instrBoxes.push(new Instruction('code-editor', content, "50%", "10%"));
        content = `Change the value of <span class="inline-code">a</span> to <span class="inline-code">150</span>. Observe what happens.`;
        this._instrBoxes.push(new Instruction('code-editor', content, "40%", "10%"));
        content = 'Do you notice that the claim <span class="inline-code">The skull is smaller than the box</span> did not change? The skull now clearly looks bigger than the box! Yet our computer does not know to stop printing the wrong claim!';
        this._instrBoxes.push(new Instruction('canvas-container', content, "70%", "10%"));
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
                let regex: RegExp = /a\s*=\s*150\s*/;
                let match = code.match(regex);
                codeIsCorrect = match != null && match.length > 0;

                //check for correct CANVAS effects
                let canvasIsCorrect = false;
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
