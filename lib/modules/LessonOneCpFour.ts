import { Module } from "./Module";
import { Instruction } from "./Instruction";
import { Effect } from "../effects/Effect";
import { StringEffect } from "../effects/StringEffect";

export class LessonOneCpFour extends Module {
    readonly _name: string = "l1c4";
    readonly _goal: any;
    readonly _constraint: string = 'canvas';
    readonly _instructions: string =
        `<p> GOAL: Print the word "cool" on the CANVAS, and put it inside the box at the center of the CANVAS. </p>`;

    readonly _starterCode: string = `print("happy", 100, 100)`;

    _latestInstrIndex: number = 1;

    x: number;
    y: number;
    square_size: number = 100;
    font_size: number = 20;

    constructor(ctx: CanvasRenderingContext2D, editor: CodeMirror.Editor) {
        super(ctx, editor);
        this.x = Math.round((ctx.canvas.width - this.square_size) / 2);
        this.y = Math.round((ctx.canvas.height - this.square_size) / 2);
        let content = "In real life, computer scientists often can only change their CODE to affect the CANVAS, instead of interacting with the CANVAS directly.";
        this._instrBoxes.push(new Instruction('code-editor', content, "30%", "10%"));
        content = "Let's have a challenge. Can you figure out how to write CODE to print the word 'cool' inside the box at the center of the CANVAS?";
        this._instrBoxes.push(new Instruction('code-editor', content, "80%", "10%"));
        content = "Congratulations! You finished your first coding challenge!";
        this._instrBoxes.push(new Instruction('canvas-container', content, "80%", "10%"));
    }

    drawGuides(): void {
        this.ctx.beginPath();
        this.ctx.rect(this.x, this.y, this.square_size, this.square_size);
        this.ctx.strokeStyle = '#6C6C6C';
        this.ctx.stroke();

        this.ctx.font = this.font_size + "px Courier New";
        this.ctx.fillStyle = '#6C6C6C';
        this.ctx.fillText("Put word", this.x, this.y - 2 * this.font_size);
        this.ctx.fillText("in here", this.x, this.y - this.font_size);
    }

    /**
     * A lesson to print a string
     * goals: moving the text and observe the code
     * @param document The HTML document
     * @param effects the list of effects currently on the CANVAS
     */
    checkGoal(document: Document, effects: Effect<any>[]): boolean {
        switch (this._latestInstrIndex) {
            case 1:
                for (let effect of effects) {
                    if (effect instanceof StringEffect && effect.str === "cool") {
                        if ((effect.x > this.x && effect.x < this.x + this.square_size) && (effect.y > this.y && effect.y < this.y + this.square_size)) {
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
