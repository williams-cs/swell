import { Module } from "./Module";
import { Instruction } from "./Instruction";
import { Effect } from "../effects/Effect";
import { StringEffect } from "../effects/StringEffect";

export class LessonOneCpOne extends Module {
    readonly _name: string = "l1c1";
    readonly _goal: any;
    readonly _constraint: string = 'none';
    readonly _instructions: string =
        `<p> GOAL: Write 'happy' on the CANVAS. </p>`;

    readonly _starterCode: string = ``;

    _latestInstrIndex: number = 0;

    constructor(ctx: CanvasRenderingContext2D, editor: CodeMirror.Editor) {
        super(ctx, editor);
        let content = "First, let's tell the computer to print something on the CANVAS. Click on the CODE box.";
        this._instrBoxes.push(new Instruction('code-editor', content, "70%", "10%"));
        content = 'Great! Now type <span class="inline-code">print("happy");</span> in this CODE box.';
        this._instrBoxes.push(new Instruction('code-editor', content, "40%", "10%"));
        content = 'Notice that what you typed causes the computer to print the word "happy" on the CANVAS here. Congratulations! You just wrote your first line of code!';
        this._instrBoxes.push(new Instruction('canvas-container', content, "65%", "10%"));
    }

    /**
     * A lesson to print a string
     * @param document The HTML document
     * @param effects the list of effects currently on the CANVAS
     */
    checkGoal(document: Document, effects: Effect<any>[]): boolean {
        switch (this._latestInstrIndex) {
            case 0:
                if (document.activeElement === this.editor.getInputField() && this._latestInstrIndex == 0) {
                    this._latestInstrIndex++;
                    this.renderLatestInstruction(document);
                }
                return false;

            case 1:
                let regex: RegExp = /print\s*\(\s*\"happy\"\s*\)/;
                let match = this.editor.getValue().match(regex);
                if (match != null && match.length > 0) {
                    this._latestInstrIndex++;
                    this.renderLatestInstruction(document);
                }
                return false;

            default:
                return true;
        }
    }
}
