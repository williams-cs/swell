import { Module } from "./Module";
import { Instruction } from "./Instruction";
import { Effect } from "../effects/Effect";
import { EmojiEffect } from "../effects/EmojiEffect";

export class LessonTwoCpOne extends Module {
    readonly _name: string = "l2c1";
    readonly _goal: any;
    readonly _constraint: string = 'none';
    readonly _instructions: string =
        `<p> GOAL: replace "happy" in the print statement to draw emojis! </p>`;

    readonly _starterCode: string = `print("happy", 100, 100)`;

    _latestInstrIndex: number = 0;

    constructor(ctx: CanvasRenderingContext2D, editor: CodeMirror.Editor) {
        super(ctx, editor);
        let content = `Now let's learn to print emojis! In the <span class="inline-code">print</span> statement above, replace <span class="inline-code">"happy"</span> with <span class="inline-code">emoji("happy", 100, 100)</span>.`;
        this._instrBoxes.push(new Instruction('code-editor', content, "30%", "10%"));
        content = `Yay! You told the computer to draw your first emoji! The computer knows how to draw <em>many</em> emojis! In the <span class="inline-code">print</span> statement above, replace the word <span class="inline-code">"happy"</span> with <span class="inline-code">"sad"</span>, and see what happens.`;
        this._instrBoxes.push(new Instruction('code-editor', content, "30%", "10%"));
        content = `Finally, replace the word <span class="inline-code">"sad"</span> with <span class="inline-code">"angry"</span>.`;
        this._instrBoxes.push(new Instruction('code-editor', content, "30%", "10%"));
        content = `By putting different words inside the brackets <span class="inline-code">emoji()</span>, you can tell the computer to draw different emojis. Remember this lesson!`;
        this._instrBoxes.push(new Instruction('canvas-container', content, "70%", "10%"));
    }

    /**
     * A lesson to print emojis
     * @param document the HTML document
     * @param effects the list of effects currently on the CANVAS
     */
    checkGoal(document: Document, effects: Effect<any>[]): boolean {
        let code = this.editor.getValue();
        switch (this._latestInstrIndex) {
            case 0:
                if (this.checkCodeAndCanvasEffect(code, "happy", effects)) {
                    this._latestInstrIndex++;
                    this.renderLatestInstruction(document);
                }
                return false;

            case 1:
                if (this.checkCodeAndCanvasEffect(code, "sad", effects)) {
                    this._latestInstrIndex++;
                    this.renderLatestInstruction(document);
                }
                return false;

            case 2:
                if (this.checkCodeAndCanvasEffect(code, "angry", effects)) {
                    this._latestInstrIndex++;
                    this.renderLatestInstruction(document);
                }
                return false;

            default:
                return true;
        }
    }

    private checkCodeAndCanvasEffect(code: string, f: string, effects: Effect<any>[]): boolean {
        //check for correct CODE
        let codeIsCorrect = false;
        let regex: RegExp = new RegExp('print\\s*\\(\\s*emoji\\s*\\(\\s*"'+ f + '"\\s*,\\s*[1-9][0-9]*\\s*,\\s*[1-9][0-9]*\\s*\\)\\s*,\\s*[1-9][0-9]*\\s*,\\s*[1-9][0-9]*\\s*\\)');
        let match = code.match(regex);
        codeIsCorrect = match != null && match.length > 0;

        //check for correct CANVAS effects
        let canvasIsCorrect = false;
        for (let effect of effects) {
            if (effect instanceof EmojiEffect && effect.name === f) {
                canvasIsCorrect = true;
                break;
            }
        }

        if (codeIsCorrect && canvasIsCorrect) {
            console.log("moving on to next instruction");
        }

        return codeIsCorrect && canvasIsCorrect;
    }
}
