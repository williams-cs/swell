import { Module } from "./Module";
import { Checkpoint } from "./Checkpoint";
import { Instruction } from "./Instruction";
import { Effect } from "../effects/Effect";
import { StringEffect } from "../effects/StringEffect";

export class LessonOneCpOne extends Checkpoint {
    readonly _name: string = "l1c1";
    readonly _nextModule: string = 'l1c2';
    readonly _goal: any;
    readonly _constraint: string = 'none';
    readonly _instructions: string =
    `<p> GOAL: Write 'Hello' on the CANVAS. </p>`;

    _latestInstrIndex: number = 0;

    constructor() {
      super();

      let content = "First, let's tell the computer to print something on the CANVAS. Click on the CODE box.";
      this._instrBoxes.push(new Instruction('code-editor', content, "70%", "10%"));
      content = 'Great! Now type `print("Hello")` in this CODE box.';
      this._instrBoxes.push(new Instruction('code-editor', content, "40%", "10%"));
      content = 'Notice that what you typed causes the computer to print the word "Hello" on the CANVAS here. Congratulations! You just wrote your first line of code!';
      this._instrBoxes.push(new Instruction('canvas-container', content, "65%", "10%"));
    }

    /**
     * A lesson to print a string
     * goals: write any string on CANVAS
     * @param document The HTML document
     * @param effects the list of effects currently on the CANVAS
     */
    checkGoal(document: Document, effects: Effect<any>[]): boolean {
        let input = document.getElementById('input') as HTMLInputElement;

        /*
        let regex: RegExp = /print\s*\(\s*\"Hello\"\s*\)/;
        let match = input.value.match(regex);
        if (match != null && match.length > 0) {
          return true;
        }
        return false;
        */

        console.log("instrIndex in checkGoal: " + this._instrIndex);
        switch(this._latestInstrIndex) {
          case 0:
            if (document.activeElement === input && this._latestInstrIndex == 0) {
              this._latestInstrIndex++;
              this.renderLatestInstruction(document);
            }
            return false;
            break;

          case 1:
            let regex: RegExp = /print\s*\(\s*\"Hello\"\s*\)/;
            let match = input.value.match(regex);
            if (match != null && match.length > 0 && this._latestInstrIndex == 1) {
              this._latestInstrIndex++;
              this.renderLatestInstruction(document);
            }
            return false;
            break;

          default:
            return true;
            break;
        }

        return false;
    }

    /**
     * Returns the module name
     */
    get name(): string {
        return this._name;
    }
    /**
     * Returns the module instructions
     */
    get instructions(): string {
        return this._instructions;
    }
}
