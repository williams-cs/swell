import { Instruction } from "./Instruction";
import { Effect } from "../effects/Effect";

export abstract class Module {
    readonly _name: string; // Module name
    readonly _prevModule?: string; // Name of previous checkpoint
    readonly _nextModule: string; // Name of next checkpoint
    readonly _goal: any; // What needs to be completed?
    readonly _constraint: string; // freezing either the Code or Canvas area
    readonly _instructions: string; // Instructions for student
    _starterCode?: string; // Optional starter code
    ctx: CanvasRenderingContext2D; // Canvas for drawing
    editor: CodeMirror.Editor; // Editor

    readonly _instrBoxes?: Instruction[] = []; //series of tutorial instructions
    _instrIndex?: number = 0; //index of current instruction being displayed
    _latestInstrIndex: number = 0; //furthest instruction reached within this checkpoint

    constructor(ctx: CanvasRenderingContext2D, editor: CodeMirror.Editor) {
      this.ctx = ctx;
      this.editor = editor;
    }

    /**
     * Checks if the module goals are fulfilled
     * @param document The HTML document
     */
    abstract checkGoal(document: Document, effects: Effect<any>[]): boolean;

    /**
     * Create guides to help lesson instructions
     * @param ctx the canvas 2D context
     */
    drawGuides?(): void {};

    renderLatestInstruction(document: Document): void {
      this._instrIndex = this._latestInstrIndex;
      this.renderInstruction(document);
    }

    renderNextInstruction(document: Document): void {
      this._instrIndex = (this._instrIndex + 1 < this._instrBoxes.length) ? this._instrIndex + 1 : this._instrIndex;
      console.log("current instr: " + this._instrIndex);
      this.renderInstruction(document);
    }

    renderPrevInstruction(document: Document): void {
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

        console.log("instrIndex " + this._instrIndex);

        let instruction = this._instrBoxes[this._instrIndex];

        //render the instruction content
        let div = document.createElement("div");
        div.className = "instruction";
        div.id = 'instruction';
        div.innerHTML = instruction._content;
        div.style.top = instruction._top;
        div.style.left = instruction._left;
        div.style.display = "block";

        //render the buttons
        let innerDiv = document.createElement("div");
        let prevInstr = document.createElement("button");
        prevInstr.id = 'previous-instruction';
        prevInstr.innerText = "<";
        let thisModule = this;
        prevInstr.onclick = function() {
          thisModule.renderPrevInstruction(document);
        }
        if (this._instrIndex == 0) {
          prevInstr.style.background = "#D8D8D8";
          prevInstr.disabled = true;
        }
        innerDiv.appendChild(prevInstr);

        let nextInstr = document.createElement("button");
        nextInstr.id = 'next-instruction';
        nextInstr.innerText = ">";
        nextInstr.onclick = function() {
          thisModule.renderNextInstruction(document);
        }
        if (this._instrIndex == this._instrBoxes.length || this._instrIndex == this._latestInstrIndex) {
          nextInstr.style.background = "#D8D8D8";
          nextInstr.disabled = true;
        }
        innerDiv.appendChild(nextInstr);

        div.appendChild(innerDiv);

        document.getElementById(instruction._location).appendChild(div);
    }

    get numInstructions(): number {
      return this._instrBoxes.length;
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
