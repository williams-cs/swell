import { Module } from "./Module";
import { Instruction } from "./Instruction";
import { Effect } from "../effects/Effect";
import { StringEffect } from "../effects/StringEffect";

export class LessonOneCpOne implements Module {
    readonly _name: string = "l1c1";
    readonly _nextModule: string = 'l1c2';
    readonly _goal: any;
    readonly _constraint: string = 'none';
    readonly _instructions: string =
    `<p> Computers can do wonderful things, but they unfortunately don't understand English. </p>
    <p> However, they understand computer code, so let's learn how to write code that instruct the computer to do things! </p>
    <p> On the CODE area above, write print("Hello") </p>
    <p> GOAL: Write 'Hello' on the CANVAS. </p>`;

    readonly _instrBoxes: Instruction[] = [];
    _instrIndex: number = 0;
    _latestInstrIndex: number = 0;

    constructor() {
      let content = "First, let's tell the computer to print something on the CANVAS. Click on the CODE box.";
      this._instrBoxes.push(new Instruction('code', content, "30%", "10%"));
      content = 'Now type `print("Hello")` in this CODE box.';
      this._instrBoxes.push(new Instruction('code', content, "30%", "10%"));
      content = 'Notice that what you typed causes the computer to print the word "Hello" on the CANVAS here. Congratulations! You just wrote your first line of code!';
      this._instrBoxes.push(new Instruction('canvas', content, "65%", "10%"));
    }

    /**
     * A lesson to print a string
     * goals: write any string on CANVAS
     * @param document: The HTML document
     * @param effects: the list of effects currently on the CANVAS
     */
    checkGoal(document: Document, effects: Effect<any>[]): boolean {
        let input = document.getElementById('input') as HTMLInputElement;

        let regex: RegExp = /print\s*\(\s*\"Hello\"\s*\)/;
        let match = input.value.match(regex);
        if (match != null && match.length > 0) {
          return true;
        }
        return false;
        /*
        console.log("instrIndex in checkGoal: " + this._instrIndex);
        switch(this._instrIndex) {

          case 0:
            if (document.activeElement === input && this._latestInstrIndex == 0) {
              this._latestInstrIndex++;
              this.nextInstruction(document);
            }
            return false;
            break;

          case 1:
            let regex: RegExp = /print\s*\(\s*\"Hello\"\s*\)/;
            let match = input.value.match(regex);
            if (match != null && match.length > 0 && this._latestInstrIndex == 1) {
              this._latestInstrIndex++;
              this.nextInstruction(document);
            }
            return false;
            break;

          default:
            return true;
            break;
        }

        return false;
        */
    }

    nextInstruction(document: Document): void {
      this._instrIndex = (this._instrIndex + 1 < this._instrBoxes.length) ? this._instrIndex + 1 : this._instrIndex;
      this.renderInstruction(document);
    }

    prevInstruction(document: Document): void {
      this._instrIndex = (this._instrIndex - 1 >= 0) ? this._instrIndex - 1 : this._instrIndex;
      this.renderInstruction(document);
    }

    /**
     * render the current instruction of this checkpoint
     * @param document The HTML document
     */
    renderInstruction(document: Document): void {
        let curInstruction = document.getElementById("instruction");
        if (curInstruction != null) {
          curInstruction.remove();
        }

        let instruction = this._instrBoxes[this._instrIndex];

        let instrDiv = document.createElement("div");
        instrDiv.className = "instruction";
        instrDiv.id = 'instruction';
        instrDiv.innerText = instruction._content;
        instrDiv.style.top = instruction._top;
        instrDiv.style.left = instruction._left;
        instrDiv.style.display = "block";

        let prevInstr = document.createElement("button");
        prevInstr.id = 'previous-instruction';
        prevInstr.innerText = "<";
        let thisModule = this;
        prevInstr.onclick = function() {
          console.log("instrIndex " + thisModule._instrIndex);
          thisModule.prevInstruction(document);
        }
        if (this._instrIndex == 0) {
          prevInstr.style.background = "#D8D8D8";
          prevInstr.disabled = true;
        }
        instrDiv.appendChild(prevInstr);

        let nextInstr = document.createElement("button");
        nextInstr.id = 'next-instruction';
        nextInstr.innerText = ">";
        nextInstr.onclick = function() {
          console.log("instrIndex " + thisModule._instrIndex);
          thisModule.nextInstruction(document);
        }
        if (this._instrIndex == this._instrBoxes.length || this._instrIndex == this._latestInstrIndex) {
          nextInstr.style.background = "#D8D8D8";
          nextInstr.disabled = true;
        }
        instrDiv.appendChild(nextInstr);

        document.getElementById(instruction._location).appendChild(instrDiv);
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
