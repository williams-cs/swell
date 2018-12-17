import { Module } from "./Module";
import { Checkpoint } from "./Checkpoint";
import { Instruction } from "./Instruction";
import { Effect } from "../effects/Effect";
import { StringEffect } from "../effects/StringEffect";

export class LessonOneCpThree extends Module {
    readonly _name: string = "l1c3";
    readonly _prevModule: string = 'l1c2';
    readonly _nextModule: string = 'l1c4';
    readonly _goal: any;
    readonly _constraint: string = 'canvas';
    readonly _instructions: string =
    `<p> GOAL: Move the word around the CANVAS by solely changing your CODE. </p>`;

    readonly _starterCode: string = `print("Hello", 100, 100)`;

    _latestInstrIndex: number = 0;

    x: number = 10;
    y: number;
    square_size = 100;
    font_size = 20;

    constructor(ctx: CanvasRenderingContext2D) {
      super(ctx);
      this.y = ctx.canvas.height - this.square_size - this.x;

      let content = "Moving things on the CANVAS changes the CODE. What if we change the CODE? In the print statement above, change the first 100 to 200. Observe the CANVAS.";
      this._instrBoxes.push(new Instruction('code-editor', content, "30%", "10%"));
      content = "Changing those numbers in the CODE moves the word on CANVAS! Now, try move this word inside the top-right box by changing your CODE alone.";
      this._instrBoxes.push(new Instruction('canvas-container', content, "70%", "10%"));
      content = "Yay! You've learned how to tell the computer to write for you!";
      this._instrBoxes.push(new Instruction('code-editor', content, "50%", "10%"));
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
/*
        for (let effect of effects) {
          if (effect instanceof StringEffect && effect.str !== "") {
            if (effect.x > this.x && effect.x < this.x + this.square_size && effect.y > this.y && effect.y < this.y + this.square_size) {
              return true;
            }
          }
        }
        return false;
*/
        let input = document.getElementById('input') as HTMLInputElement;
        //console.log("instrIndex in checkGoal: " + this._instrIndex);
        switch(this._latestInstrIndex) {
          case 0:
            let regex: RegExp = /print\s*\(\s*\".*\"\s*,\s*200\s*,\s*100\s*\)/;
            let match = input.value.match(regex);
            if (match != null && match.length > 0) {
              this._latestInstrIndex++;
              this.renderLatestInstruction(document);
            }
            return false;
            break;

          case 1:
            for (let effect of effects) {
              if (effect instanceof StringEffect && effect.str !== "") {
                if (effect.x > this.x && effect.x < this.x + 100 && effect.y > this.y && effect.y < this.y + 100) {
                  this._latestInstrIndex++;
                  this.renderLatestInstruction(document);
                }
              }
            }
            return false;
            break;

          default:
            return true;
            break;
        }

        return false;
    }
}
