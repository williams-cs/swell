import { Module } from "./Module";
import { Instruction } from "./Instruction";
import { Effect } from "../effects/Effect";
import { StringEffect } from "../effects/StringEffect";

export class LessonThreeCpFive extends Module {
    readonly _name: string = "l3c5";
    readonly _goal: any;
    readonly _constraint: string = 'none';
    readonly _instructions: string =
        `<p> GOAL: Change the value of c around to see what is printed on the canvas. </p>`;

    readonly _starterCode: string =
        `c = 75;
print(emoji("heart-eyes", c, c), 25, 25);
if(c < 100) {
\tprint("The emoji is smaller than the box.", 25, 220);
} else {
\tprint("The emoji is bigger than the box.", 25, 220);
}`;

    _latestInstrIndex: number = 3;

    x: number = 10;
    y: number = 10;
    square_size: number = 100;
    font_size: number = 20;

    constructor(ctx: CanvasRenderingContext2D, editor: CodeMirror.Editor) {
        super(ctx, editor);
        let content = `Now, let's say we already have an <span class="inline-code">if</span> statement to print a claim whenever an emoji is smaller than the box provided.`;
        this._instrBoxes.push(new Instruction('code-editor', content, "50%", "10%"));
        content = `What if we want to print another claim, <span class="inline-code">The emoji is bigger than the box</span> any time the emoji actually bigger than the box?`;
        this._instrBoxes.push(new Instruction('code-editor', content, "40%", "10%"));
        content = `Observe the CODE above. When the condition inside the brackets <span class="inline-code">if()</span> is satisfied, the code block inside the braces <span class="inline-code">{}</span> right after it would run.`;
        this._instrBoxes.push(new Instruction('code-editor', content, "50%", "10%"));
        content = `What would happen if we change the value of <span class="inline-code">c</span>? In the CODE above, change the value of <span class="inline-code">c</span> to <span class="inline-code">125</span> and observe what happens.`;
        this._instrBoxes.push(new Instruction('code-editor', content, "70%", "10%"));
        content = `Did you notice the claim printed here changed? When the condition inside the <span class="inline-code">if</span> statement is not satisfied, the second code block inside the braces <span class="inline-code">{}</span> after the <span class="inline-code">else</span> statement would run instead!`;
        this._instrBoxes.push(new Instruction('canvas-container', content, "70%", "10%"));
        content = `To get a better idea, change the value of <span class="inline-code">c</span> back to <span class="inline-code">65</span>.`;
        this._instrBoxes.push(new Instruction('code-editor', content, "70%", "10%"));
        content = `Did you see the claim changed again? Now, change the value of <span class="inline-code">c</span> to <span class="inline-code">160</span>.`;
        this._instrBoxes.push(new Instruction('code-editor', content, "50%", "10%"));
        content = `Hope you get the hang of what an <span class="inline-code">else</span> statement does by this point! As long as the condition inside the <span class="inline-code">if</span> statement is not met, the code block inside the second braces <span class="inline-code">else{}</span> would run instead of the first code block.`;
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
        let codeIsCorrect = false;
        let canvasIsCorrect = false;
        let code: string = this.editor.getValue();
        let regex: RegExp;
        let match: string[];

        switch (this._latestInstrIndex) {
            case 3:
                //check for correct CODE
                //let regex = /c\s*=\s*[^8]\s*/;
                regex = /c\s*=\s*125\s*/;
                match = code.match(regex);
                codeIsCorrect = match != null && match.length > 0;

                //check for correct CANVAS effects
                for (let effect of effects) {
                    if (effect instanceof StringEffect && effect.str === "The emoji is bigger than the box.") {
                        canvasIsCorrect = true;
                        break;
                    }
                }

                if (codeIsCorrect && canvasIsCorrect) {
                    this._latestInstrIndex = 5;
                    this.renderNextInstruction(document);
                }
                return false;

            case 5:
                //check for correct CODE
                regex = /c\s*=\s*65\s*/;
                match = code.match(regex);
                codeIsCorrect = match != null && match.length > 0;

                //check for correct CANVAS effects
                for (let effect of effects) {
                    if (effect instanceof StringEffect && effect.str === "The emoji is smaller than the box.") {
                        canvasIsCorrect = true;
                        break;
                    }
                }

                if (codeIsCorrect && canvasIsCorrect) {
                    this._latestInstrIndex++;
                    this.renderLatestInstruction(document);
                }
                return false;

            case 6:
                //check for correct CODE
                regex = /c\s*=\s*160\s*/;
                match = code.match(regex);
                codeIsCorrect = match != null && match.length > 0;

                //check for correct CANVAS effects
                for (let effect of effects) {
                    if (effect instanceof StringEffect && effect.str === "The emoji is bigger than the box.") {
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
