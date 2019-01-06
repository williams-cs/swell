import { Module } from "./Module";
import { Instruction } from "./Instruction";
import { Effect } from "../effects/Effect";
import { RectangleEffect } from "../effects/RectangleEffect";

export class LessonTwoCpFive extends Module {
    readonly _name: string = "l2c5";
    readonly _nextModule: string = 'l2c6';
    readonly _goal: any;
    readonly _constraint: string = 'none';
    readonly _instructions: string =
    `<p> GOAL: Create a variable c referring to an rect(75, 75), then write 2 print statements to print c. </p>`;

    readonly _starterCode =
        `a = "moo moo";
b = ellipse(100, 100);
print(b, 100, 100);`;

    _latestInstrIndex: number = 0;

    constructor(ctx: CanvasRenderingContext2D, editor: CodeMirror.Editor) {
        super(ctx, editor);
        let content = "Let's take this one step further: Create a new variable c, and make it refer to an rect(75, 75).";
        this._instrBoxes.push(new Instruction('code-editor', content, "50%", "10%"));
        content = "Now change the print statement to print c instead of b.";
        this._instrBoxes.push(new Instruction('code-editor', content, "40%", "10%"));
        content = "Finally, write print(c, 300, 100) underneath the existing print statement.";
        this._instrBoxes.push(new Instruction('code-editor', content, "50%", "10%"));
        content = 'Awesome, You are getting good at using variables! What you just did is to draw 2 rectangles, both named c!';
        this._instrBoxes.push(new Instruction('code-editor', content, "70%", "10%"));
    }

    /**
     * A lesson to print a string
     * goals: moving the text and observe the code
     * @param document the HTML document
     * @param effects the list of effects currently on the CANVAS
     */
    checkGoal(document: Document, effects: Effect<any>[]): boolean {
        let codeIsCorrect = false;
        let rectCount = 0;
        let code: string = this.editor.getValue();
        let assignment: RegExp = /c\s*=\s*rect\s*\(\s*[1-9][0-9]*\s*,\s*[1-9][0-9]*\s*\)\s*/g;
        let matchAssign: string[];
        let print: RegExp = /print\s*\(\s*c\s*,\s*[1-9][0-9]*\s*,\s*[1-9][0-9]*\s*\)/g;
        let matchPrint: string[];

        switch (this._latestInstrIndex) {
            case 0:
                //check for correct CODE
                matchAssign = code.match(assignment);
                if (matchAssign != null && matchAssign.length > 0) {
                    this._latestInstrIndex++;
                    this.renderLatestInstruction(document);
                }
                return false;

            case 1:
                //check for correct CODE
                matchAssign = code.match(assignment);
                matchPrint = code.match(print);
                codeIsCorrect = matchAssign != null && matchAssign.length > 0 && matchPrint != null && matchPrint.length >= 1;

                //check for correct CANVAS effects
                for (let effect of effects) {
                    if (effect instanceof RectangleEffect) {
                        rectCount += 1;
                    }
                }

                if (codeIsCorrect && rectCount >= 1) {
                    this._latestInstrIndex++;
                    this.renderLatestInstruction(document);
                }
                return false;

            case 2:
                //check for correct CODE
                matchAssign = code.match(assignment);
                matchPrint = code.match(print);
                codeIsCorrect = matchAssign != null && matchAssign.length > 0 && matchPrint != null && matchPrint.length >= 2;

                //check for correct CANVAS effects
                for (let effect of effects) {
                    if (effect instanceof RectangleEffect) {
                        rectCount += 1;
                    }
                }

                if (codeIsCorrect && rectCount >= 2) {
                    this._latestInstrIndex++;
                    this.renderLatestInstruction(document);
                }
                return false;

            default:
                return true;
        }




    }
}
