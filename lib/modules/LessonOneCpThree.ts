import { Module } from "./Module";
import { Effect } from "../effects/Effect";
import { StringEffect } from "../effects/StringEffect";

export class LessonOneCpThree extends Module {
    readonly _name: string = "l1c3";
    readonly _prevModule: string = 'l1c2';
    readonly _nextModule: string = 'l1c4';
    readonly _goal: any;
    readonly _constraint: string = 'canvas';
    readonly _instructions: string =
    `<p> Yep! Moving the words actually change the numbers in your CODE. </p>
    <p> Now the CANVAS has been frozen! Try changing your CODE to see if you can move the words to the bottom right corner. </p>
    <p> GOAL: Move the words to the bottom right of the CANVAS. </p>
    <p> HINT: Change one of the 2 numbers at a time, then click RUN to see how that changes the CANVAS.`;

    x: number = 10;
    y: number;
    square_size = 100;
    font_size = 20;

    constructor(ctx: CanvasRenderingContext2D) {
      super(ctx);
      this.y = ctx.canvas.height - this.square_size - this.x;
    }

    drawGuides(): void {
      this.ctx.beginPath();
      this.ctx.rect(this.x, this.y, this.square_size, this.square_size);
      this.ctx.strokeStyle = '#6C6C6C';
      this.ctx.stroke();

      this.ctx.font = this.font_size + "px Courier New";
      this.ctx.fillStyle = '#6C6C6C';
      this.ctx.fillText("Put text", this.x, this.y - 2*this.font_size);
      this.ctx.fillText("in here", this.x, this.y - this.font_size);
    }

    /**
     * A lesson to print a string
     * goals: moving the text and observe the code
     * @param document The HTML document
     * @param effects: the list of effects currently on the CANVAS
     */
    checkGoal(document: Document, effects: Effect<any>[]): boolean {
        for (let effect of effects) {
          if (effect instanceof StringEffect && effect.str !== "") {
            if (effect.x > this.x && effect.x < this.x + this.square_size && effect.y > this.y && effect.y < this.y + this.square_size) {
              return true;
            }
          }
        }
        return false;
    }
}
