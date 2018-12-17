import { Module } from "./Module";
import { Instruction } from "./Instruction";
import { Effect } from "../effects/Effect";
import { StringEffect } from "../effects/StringEffect";

export class LessonOneCpTwo extends Module {
    readonly _name: string = "l1c2";
    readonly _prevModule: string = 'l1c2';
    readonly _nextModule: string = 'l1c3';
    readonly _goal: any;
    readonly _constraint: string = 'code';
    readonly _instructions: string =
    `<p> GOAL: Move the words you just created to explore how it affects your code. </p>`;

    readonly _starterCode: string = `print("Hello", 100, 100)`;

    _latestInstrIndex: number = 1;

    x: number;
    y: number = 10;
    square_size: number = 100;
    font_size = 20;

    constructor(ctx: CanvasRenderingContext2D) {
      super(ctx);
      this.x = ctx.canvas.width - this.square_size - this.y;

      let content = "Notice the numbers added inside the () of your print statement? They specify where your computer should write the word on the CANVAS.";
      this._instrBoxes.push(new Instruction('code-editor', content, "30%", "10%"));
      content = "To understand what they do, first click on the word currently on the CANVAS and drag it around.";
      this._instrBoxes.push(new Instruction('canvas-container', content, "70%", "10%"));
      content = "Now drag the word into the top-right box on the CANVAS.";
      this._instrBoxes.push(new Instruction('canvas-container', content, "80%", "10%"));
      content = "Did you notice that the numbers inside the print statement change? Now drag the word into the top-left box on the CANVAS.";
      this._instrBoxes.push(new Instruction('code-editor', content, "30%", "10%"));
      content = 'These numbers indicate the location on the CANVAS where the computer should draw the word! The first number changes when the word moves left and right. The second number changes when the word moves up and down.';
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
      this.ctx.fillText("in here", this.x, this.y + this.square_size + 2*this.font_size);
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
        console.log("instrIndex in checkGoal: " + this._instrIndex);
        switch(this._latestInstrIndex) {
          case 0:
            return false;
            break;

          case 1:
            for (let effect of effects) {
              if (effect instanceof StringEffect && effect.str !== "" && effect.selected) {
                this._latestInstrIndex++;
                this.renderLatestInstruction(document);
              }
            }
            return false;
            break;

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
            break;

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
              break;

          default:
            return true;
            break;
        }

        return false;
    }
}
