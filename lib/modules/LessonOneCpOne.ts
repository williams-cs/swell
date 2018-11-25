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
    `<p> To begin, let’s tell the computer to write something on the CANVAS. </p>
    <p> GOAL: write on the CANVAS. </p>
    <p> HINT: type in the CODE box: print("Hello, world!"), then hit the RUN button. </p>`;

    readonly _instrBoxes: Instruction[] = [];
    _instrIndex: number = 0;

    constructor() {
      let content = "First, let's tell the computer to print something on the CANVAS. Click on the CODE box here.";
      this._instrBoxes.push(new Instruction('code', content));
      content = 'Now type `print("Hello")` in this CODE box.';
      this._instrBoxes.push(new Instruction('code', content));
      content = 'Notice that what you typed causes the computer to print the world "Hello" on the CANVAS here. Congratulations! You just wrote your first line of code!';
      this._instrBoxes.push(new Instruction('canvas', content));
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
        instrDiv.style.display = "block";

        let prevInstr = document.createElement("button");
        prevInstr.id = 'previous-instruction';
        prevInstr.innerText = "<";
        let thisModule = this;
        prevInstr.onclick = function() {
          console.log("instrIndex" + thisModule._instrIndex);
          thisModule.prevInstruction(document);
        }
        instrDiv.appendChild(prevInstr);

        let nextInstr = document.createElement("button");
        nextInstr.id = 'next-instruction';
        nextInstr.innerText = ">";
        nextInstr.onclick = function() {
          console.log("instrIndex" + thisModule._instrIndex);
          thisModule.nextInstruction(document);
        }
        instrDiv.appendChild(nextInstr);

        document.getElementById(instruction._location).appendChild(instrDiv);
    }

    /**
     * A lesson to print a string
     * goals: write any string on CANVAS
     * @param document: The HTML document
     * @param effects: the list of effects currently on the CANVAS
     */
    checkGoal(document: Document, effects: Effect<any>[]): boolean {
        /*
        for (let effect of effects) {
          if (effect instanceof StringEffect) {
            if (effect.str !== "") {
              return true;
            }
          }
        }
        */
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
