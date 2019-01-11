import { Module } from "./Module";
import { Instruction } from "./Instruction";
import { Effect } from "../effects/Effect";
import { EmojiEffect } from "../effects/EmojiEffect";

export class LessonTwoCpFour extends Module {
    readonly _name: string = "l2c4";
    readonly _goal: any;
    readonly _constraint: string = 'none';
    readonly _instructions: string =
        `<p> GOAL: Change a to b in the print statement. </p>`;

    readonly _starterCode =
        `a = emoji("angry", 100, 100);
b = emoji("cool", 100, 100);
print(a, 100, 100);`;

    _latestInstrIndex: number = 2;

    constructor(ctx: CanvasRenderingContext2D, editor: CodeMirror.Editor) {
        super(ctx, editor);
        let content = `Time to take your coding to the next level. Let's learn about <span class="red-text">variables</a>.`;
        this._instrBoxes.push(new Instruction('code-editor', content, "50%", "10%"));
        content = `A <span class="red-text">variable</span> is simply a <span class="red-text">name</span> you give to the things that you draw.`;
        this._instrBoxes.push(new Instruction('code-editor', content, "40%", "10%"));
        content = `For example, change the variable <span class="inline-code">a</span> in the <span class="inline-code">print</span> statement to <span class="inline-code">b</span>, and observe what happens on the CANVAS.`;
        this._instrBoxes.push(new Instruction('code-editor', content, "50%", "10%"));
        content = 'Do you notice that a different emoji is printed? In our code, we make variable <span class="inline-code">a</span> refer to an angry emoji, and variable <span class="inline-code">b</span> refer to a cool emoji.';
        this._instrBoxes.push(new Instruction('code-editor', content, "40%", "10%"));
        content = 'When we tell the computer to print <span class="inline-code">a</span>, it will print the angry emoji, and when we tell the computer to print <span class="inline-code">b</span>, it will print the cool emoji!';
        this._instrBoxes.push(new Instruction('canvas-container', content, "70%", "10%"));
    }

    /**
     * A lesson to print a string
     * goals: moving the text and observe the code
     * @param document the HTML document
     * @param effects the list of effects currently on the CANVAS
     */
    checkGoal(document: Document, effects: Effect<any>[]): boolean {
        switch (this._latestInstrIndex) {
            case 2:
                //check for correct CODE
                let codeIsCorrect = false;
                let code: string = this.editor.getValue();
                let regex: RegExp = /print\s*\(\s*b\s*,\s*[1-9][0-9]*\s*,\s*[1-9][0-9]*\s*\);/;
                let match = code.match(regex);
                codeIsCorrect = match != null && match.length > 0;

                //check for correct CANVAS effects
                let canvasIsCorrect = false;
                for (let effect of effects) {
                    if (effect instanceof EmojiEffect && effect.name === "cool") {
                        canvasIsCorrect = true;
                        break;
                    }
                }

                if (codeIsCorrect && canvasIsCorrect) {
                    this._latestInstrIndex = 4;
                    this.renderNextInstruction(document);
                }
                return false;

            default:
                return true;
        }

    }
}
