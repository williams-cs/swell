import { Module } from "./Module";
import { Instruction } from "./Instruction";
import { Effect } from "../effects/Effect";
import { StringEffect } from "../effects/StringEffect";

export class LessonOneCpThree extends Module {
    readonly _name: string = "l1c3";
    readonly _goal: any;
    readonly _constraint: string = 'canvas';
    readonly _instructions: string =
        `<p> GOAL: Move the word around the CANVAS solely by changing your CODE. </p>`;

    readonly _starterCode: string = `print("happy", 100, 100)`;

    _latestInstrIndex: number = 0;

    x: number;
    y: number = 10;
    square_size = 100;
    font_size = 20;

    constructor(ctx: CanvasRenderingContext2D, editor: CodeMirror.Editor) {
        super(ctx, editor);
        this.x = ctx.canvas.width - this.square_size - this.y;
        let content = `Now, we can also use the CODE to tell the computer where to print on the CANVAS. In the <span class="inline-code">print</span> statement above, change the first <span class="inline-code">100</span> to <span class="inline-code">200</span>. Observe what happens.`;
        this._instrBoxes.push(new Instruction('code-editor', content, "30%", "10%"));
        content = "Changing those numbers in the CODE moves the word on CANVAS! Now, can you change the number around to put the word inside the box provided?";
        this._instrBoxes.push(new Instruction('canvas-container', content, "70%", "10%"));
        content = `Good job! You just learned how to use a <span class="inline-code">print</span> statement!`;
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
     * A lesson to print a string
     * goals: moving the text and observe the code
     * @param document The HTML document
     * @param effects: the list of effects currently on the CANVAS
     */
    checkGoal(document: Document, effects: Effect<any>[]): boolean {
        switch (this._latestInstrIndex) {
            case 0:
                let regex: RegExp = /print\s*\(\s*\".*\"\s*,\s*200\s*,\s*100\s*\)/;
                let match = this.editor.getValue().match(regex);
                if (match != null && match.length > 0) {
                    this._latestInstrIndex++;
                    this.renderLatestInstruction(document);
                }
                return false;

            case 1:
                for (let effect of effects) {
                    if (effect instanceof StringEffect && effect.str !== "") {
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
