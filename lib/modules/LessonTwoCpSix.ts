import { Module } from "./Module";
import { Instruction } from "./Instruction";
import { Effect } from "../effects/Effect";
import { EmojiEffect } from "../effects/EmojiEffect";

export class LessonTwoCpSix extends Module {
    readonly _name: string = "l2c6";
    readonly _goal: any;
    readonly _constraint: string = 'code';
    readonly _instructions: string =
        `<p> GOAL: Enlarge one of the circles referred to by c on the CANVAS. </p>`;

    readonly _starterCode =
    `a = emoji("angry", 100, 100);
b = emoji("cool", 100, 100);
c = emoji("pirate", 75, 75);
print(c, 100, 100);
print(c, 300, 100)`;

    _latestInstrIndex: number = 1;

    //put box at top-left of CANVAS
    x: number = 25;
    y: number = 25;
    square_size: number = 250;
    font_size: number = 20;

    constructor(ctx: CanvasRenderingContext2D, editor: CodeMirror.Editor) {
        super(ctx, editor);
        let content = `Now that you have 2 pirate emojis both named <span class="inline-code">c</span>, let's see what happens when you try to change one of them.`;
        this._instrBoxes.push(new Instruction('code-editor', content, "50%", "10%"));
        content = `Click on one of the emojis on the CANVAS, and make it bigger than the box. Watch what happens to the code for <span class="inline-code">c</span>.`;
        this._instrBoxes.push(new Instruction('code-editor', content, "70%", "10%"));
        content = `Did you see what happened? Changing one emoji changes what <span class="inline-code">c</span> means in your CODE!`;
        this._instrBoxes.push(new Instruction('code-editor', content, "50%", "10%"));
        content = 'Also, changing one emoji changes the other emoji! The 2 emojis referred to by <span class="inline-code">c</span> are actually the same emoji!';
        this._instrBoxes.push(new Instruction('canvas-container', content, "70%", "10%"));
    }

    drawGuides(): void {
        this.ctx.beginPath();
        this.ctx.rect(this.x, this.y, this.square_size, this.square_size);
        this.ctx.strokeStyle = '#6C6C6C';
        this.ctx.stroke();

        this.ctx.font = this.font_size + "px Courier New";
        this.ctx.fillStyle = '#6C6C6C';
        this.ctx.fillText("Make emoji", this.x, this.y + this.font_size);
        this.ctx.fillText("bigger than this box", this.x, this.y + 2 * this.font_size);
    }

    /**
     * A lesson to print a string
     * goals: moving the text and observe the code
     * @param document the HTML document
     * @param effects the list of effects currently on the CANVAS
     */
    checkGoal(document: Document, effects: Effect<any>[]): boolean {
        switch (this._latestInstrIndex) {
            case 1:
                for (let effect of effects) {
                    if (effect instanceof EmojiEffect) {
                        if (effect.w > 250 && effect.h > 250) {
                            this._latestInstrIndex = 3;
                            this.renderNextInstruction(document);
                            break;
                        }
                    }
                }
                return false;

            default:
                return true;
        }
    }
}
