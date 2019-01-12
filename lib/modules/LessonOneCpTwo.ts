import { Module } from "./Module";
import { Instruction } from "./Instruction";
import { Effect } from "../effects/Effect";
import { StringEffect } from "../effects/StringEffect";

export class LessonOneCpTwo extends Module {
    readonly _name: string = "l1c2";
    readonly _goal: any;
    readonly _constraint: string = 'code';
    readonly _instructions: string =
        `<p> GOAL: Move the words you just created to explore how it affects your code. </p>`;

    readonly _starterCode: string = `print("happy", 100, 100)`;

    _latestInstrIndex: number = 1;

    x: number;
    y: number = 10;
    square_size: number = 100;
    font_size = 20;

    constructor(ctx: CanvasRenderingContext2D, editor: CodeMirror.Editor) {
        super(ctx, editor);
        this.x = ctx.canvas.width - this.square_size - this.y;
        let content = `Do you see the numbers inside the brackets <span class="inline-code">()</span> of the <span class="inline-code">print</span> statement? They tell your computer <u>where</u> it should print the word on the CANVAS.`;
        this._instrBoxes.push(new Instruction('code-editor', content, "30%", "10%"));
        content = `To understand what those numbers do, click on the word <span class="inline-code">happy</span> in the CANVAS and drag it around.`;
        this._instrBoxes.push(new Instruction('canvas-container', content, "70%", "10%"));
        content = "Now drag the word into the top-right box on the CANVAS.";
        this._instrBoxes.push(new Instruction('canvas-container', content, "80%", "10%"));
        content = `Did you notice that the numbers inside the <span class="inline-code">print</span> statement in the CODE window changed? Now drag the word into the top-left box on the CANVAS.`;
        this._instrBoxes.push(new Instruction('code-editor', content, "30%", "10%"));
        content = 'These numbers tell the computer where it should draw the word on the CANVAS! The <span class="red-text">first number</span> changes when the word moves <span class="red-text">left</span> and <span class="red-text">right</span>. The <span class="blue-text">second number</span> changes when the word moves <span class="blue-text">up</span> and <span class="blue-text">down</span>.';
        this._instrBoxes.push(new Instruction('code-editor', content, "30%", "10%"));
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
     * A lesson on location parameters, taught with DM
     * @param document the HTML document
     * @param effects the list of effects currently on the CANVAS
     */
    checkGoal(document: Document, effects: Effect<any>[]): boolean {
        switch (this._latestInstrIndex) {
            case 0:
                return false;

            case 1:
                for (let effect of effects) {
                    if (effect instanceof StringEffect && effect.str !== "" && effect.selected) {
                        this._latestInstrIndex++;
                        this.renderLatestInstruction(document);
                    }
                }
                return false;

            case 2:
                for (let effect of effects) {
                    if (effect instanceof StringEffect && effect.str !== "") {
                        if (effect.x > this.x && effect.x < this.x + this.square_size && effect.y > this.y && effect.y < this.y + this.square_size) {
                            this.x = 10;
                            this._latestInstrIndex++;
                            this.renderLatestInstruction(document);
                        }
                    }
                }
                return false;

            case 3:
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
