import { Module } from "./Module";
import { Instruction } from "./Instruction";
import { Effect } from "../effects/Effect";
import { StringEffect } from "../effects/StringEffect";

export class LessonOneCpThree extends Module {
    readonly _name: string = "l1c3";
    readonly _goal: any;
    readonly _constraint: string = 'canvas';
    readonly _instructions: string =
        `<p>Lesson 1 - Checkpoint 3</p>` +
        `<p>GOAL: Move the word around the CANVAS solely by changing your CODE.</p>`;

    readonly _starterCode: string = `print("happy", x=100, y=100)`;

    _latestInstrIndex: number = 0;

    x: number;
    y: number = 10;
    square_size = 100;
    font_size = 20;

    constructor(ctx: CanvasRenderingContext2D, editor: CodeMirror.Editor) {
        super(ctx, editor);
        this.x = ctx.canvas.width - this.square_size - this.y;
        let content = `We can also use the CODE to tell the computer where to print on the CANVAS. In the <span class="inline-code">print</span> statement above, change <span class="inline-code">x=100</span> to <span class="inline-code">x=200</span>. Observe what happens.`;
        this._instrBoxes.push(new Instruction('code-editor', content, "30%", "10%"));
        content = "Changing those numbers in the CODE moves the word on CANVAS! Try changing the number to move the word inside the box.";
        this._instrBoxes.push(new Instruction('canvas-container', content, "70%", "10%"));
        content = `Great job! You just learned how to use a <span class="inline-code">print</span> statement! Again, remember, changing the <span class="red-text">first number</span> moves the word <span class="red-text">left</span> and <span class="red-text">right</span>. Changing the <span class="blue-text">second number</span> moves the word <span class="blue-text">up</span> and <span class="blue-text">down</span>.`;
        this._instrBoxes.push(new Instruction('code-editor', content, "50%", "10%"));
    }

    drawGuides(): void {
        this.ctx.beginPath();
        this.ctx.rect(this.x, this.y, this.square_size, this.square_size);
        this.ctx.strokeStyle = '#6C6C6C';
        this.ctx.stroke();

        this.ctx.font = this.font_size + "px Courier New";
        this.ctx.fillStyle = '#6C6C6C';
        this.ctx.fillText("Put word", this.x, this.y + this.square_size + this.font_size);
        this.ctx.fillText("in here", this.x, this.y + this.square_size + 2 * this.font_size);
    }

    /**
     * A lesson on location parameters, taught with textual code editing
     * @param document the HTML document
     * @param effects the list of effects currently on the CANVAS
     */
    checkGoal(document: Document, effects: Effect<any>[]): boolean {
        switch (this._latestInstrIndex) {
            case 0:
                let regex: RegExp = /print\s*\(\s*\".*\"\s*,\s*(x\s*=\s*)?200\s*,\s*(y\s*=\s*)?[1-9][0-9]*\s*\)/;
                let match = this.editor.getValue().match(regex);
                if (match != null && match.length > 0) {
                    this._latestInstrIndex++;
                    this.renderLatestInstruction(document);
                }
                return false;

            case 1:
                for (let effect of effects) {
                    if (effect instanceof StringEffect && effect.val !== "") {
                        if (effect.x > this.x && effect.x < this.x + this.square_size && effect.y > this.y && effect.y < this.y + this.square_size) {
                            this._latestInstrIndex++;
                            this.renderLatestInstruction(document);
                        }
                    }
                }
                return false;

            default:
                return true;
        }
    }
}
