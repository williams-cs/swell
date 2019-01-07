import { Module } from "./Module";
import { Instruction } from "./Instruction";
import { Effect } from "../effects/Effect";
import { EllipseEffect } from "../effects/EllipseEffect";
import { RectangleEffect } from "../effects/RectangleEffect";
import { LineEffect } from "../effects/LineEffect";

export class LessonTwoCpOne extends Module {
    readonly _name: string = "l2c1";
    readonly _nextModule: string = 'l2c2';
    readonly _goal: any;
    readonly _constraint: string = 'none';
    readonly _instructions: string =
        `<p> GOAL: replace "moo" in the print statement to draw different shapes. </p>`;

    readonly _starterCode: string = `print("moo", 100, 100)`;

    _latestInstrIndex: number = 0;

    constructor(ctx: CanvasRenderingContext2D, editor: CodeMirror.Editor) {
        super(ctx, editor);
        let content = `Now let's learn to print shapes on the CANVAS! In the <span class="inline-code">print</span> statement above, replace <span class="inline-code">moo</span> with <span class="inline-code">ellipse(100,100)</span>. Observe what happened on the CANVAS.`;
        this._instrBoxes.push(new Instruction('code-editor', content, "30%", "10%"));
        content = `Yep! You told the computer to draw a circle on the CANVAS. Now in the <span class="inline-code">print</span> statement, replace the word <span class="inline-code">ellipse</span> with <span class="inline-code">rect</span>.`;
        this._instrBoxes.push(new Instruction('code-editor', content, "30%", "10%"));
        content = `Finally, replace the word <span class="inline-code">rect</span> with <span class="inline-code">line</span>.`;
        this._instrBoxes.push(new Instruction('code-editor', content, "30%", "10%"));
        content = `By putting different things inside the <span class="inline-code">print</span> statement, you can tell the computer to draw different things on the CANVAS. Remember this lesson!`;
        this._instrBoxes.push(new Instruction('canvas-container', content, "70%", "10%"));
    }

    /**
     *
     * @param document The HTML document
     * @param effects the list of effects currently on the CANVAS
     */
    checkGoal(document: Document, effects: Effect<any>[]): boolean {
        let code = this.editor.getValue();
        switch (this._latestInstrIndex) {
            case 0:
                if (this.checkCodeAndCanvasEffect(code, "ellipse", effects)) {
                    this._latestInstrIndex++;
                    this.renderLatestInstruction(document);
                }
                return false;

            case 1:
                if (this.checkCodeAndCanvasEffect(code, "rect", effects)) {
                    this._latestInstrIndex++;
                    this.renderLatestInstruction(document);
                }
                return false;

            case 2:
                if (this.checkCodeAndCanvasEffect(code, "line", effects)) {
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
        let regex: RegExp = new RegExp('print\\s*\\(\\s*' + f + '\\s*\\(\\s*[1-9][0-9]*\\s*,\\s*[1-9][0-9]*\\s*\\)\\s*,\\s*[1-9][0-9]*\\s*,\\s*[1-9][0-9]*\\s*\\)');
        let match = code.match(regex);
        codeIsCorrect = match != null && match.length > 0;

        //check for correct CANVAS effects
        let canvasIsCorrect = false;
        switch (f) {
            case "ellipse":
                for (let effect of effects) {
                    if (effect instanceof EllipseEffect) {
                        canvasIsCorrect = true;
                        break;
                    }
                }
                break;

            case "rect":
                for (let effect of effects) {
                    if (effect instanceof RectangleEffect) {
                        canvasIsCorrect = true;
                        break;
                    }
                }
                break;

            case "line":
                for (let effect of effects) {
                    if (effect instanceof LineEffect) {
                        canvasIsCorrect = true;
                        break;
                    }
                }
                break;

        }

        if (codeIsCorrect && canvasIsCorrect) {
            console.log("moving on to next instruction");
        }

        return codeIsCorrect && canvasIsCorrect;
    }
}
