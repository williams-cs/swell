import { Module } from "./Module";
import { Instruction } from "./Instruction";
import { Effect } from "../effects/Effect";
import { EmojiEffect } from "../effects/EmojiEffect";

export class LessonTwoCpTwo extends Module {
    readonly _name: string = "l2c2";
    readonly _goal: any;
    readonly _constraint: string = 'none';
    readonly _instructions: string =
        `<p>Lesson 2 - Checkpoint 2</p>` +
        `<p>GOAL: Fit the emoji inside the given box.</p>`;

    readonly _starterCode: string = `print(emoji("angry", 100, 100), 120, 150);`;

    _latestInstrIndex: number = 0;

    x: number;
    y: number = 10;
    rect_h: number = 50;
    rect_w: number = 100;
    font_size: number = 20;

    constructor(ctx: CanvasRenderingContext2D, editor: CodeMirror.Editor) {
        super(ctx, editor);
        this.x = Math.round((ctx.canvas.width - this.rect_w) / 2);
        let content = `What do the numbers <span class="inline-code">100, 100</span> next to the word <span class="inline-code">"angry"</span> do? Let's find out by first clicking on the emoji on the CANVAS.`;
        this._instrBoxes.push(new Instruction('canvas-container', content, "80%", "10%", true));
        content = "Now drag one of the 8 tips around the emoji to resize it. Try to fit the emoji entirely inside the given box. Watch what happens with the CODE.";
        this._instrBoxes.push(new Instruction('code-editor', content, "50%", "10%"));
        content = `Yep! Those numbers change the size of the emoji!`;
        this._instrBoxes.push(new Instruction('code-editor', content, "50%", "10%"));
    }

    drawGuides(): void {
        this.ctx.beginPath();
        this.ctx.rect(this.x, this.y, this.rect_w, this.rect_h);
        this.ctx.strokeStyle = '#6C6C6C';
        this.ctx.stroke();

        this.ctx.font = this.font_size + "px Courier New";
        this.ctx.fillStyle = '#6C6C6C';
        this.ctx.fillText("Fit emoji", this.x, this.y - 2 * this.font_size);
        this.ctx.fillText("in here", this.x, this.y - this.font_size);
    }

    /**
     * A lesson on size parameters for emojis, taught with DM
     * @param document the HTML document
     * @param effects the list of effects currently on the CANVAS
     */
    checkGoal(document: Document, effects: Effect<any>[]): boolean {
        switch (this._latestInstrIndex) {
            case 0:
                for (let effect of effects) {
                    if (effect instanceof EmojiEffect && effect.isSelected) {
                        this._latestInstrIndex++;
                        this.renderLatestInstruction(document);
                    }
                }
                return false;

            case 1:
                for (let effect of effects) {
                    if (effect instanceof EmojiEffect) {
                        if (effect.x > this.x && effect.x < this.x + this.rect_w
                            && effect.y > this.y && effect.y < this.y + this.rect_h
                            && effect.w < this.rect_w && effect.h < this.rect_h) {
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
