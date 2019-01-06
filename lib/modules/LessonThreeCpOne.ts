import { Module } from "./Module";
import { Instruction } from "./Instruction";
import { Effect } from "../effects/Effect";
import { StringEffect } from "../effects/StringEffect";

export class LessonThreeCpOne extends Module {
    readonly _name: string = "l3c1";
    readonly _nextModule: string = 'l3c2';
    readonly _goal: any;
    readonly _constraint: string = 'none';
    readonly _instructions: string =
        `<p> GOAL: Change the value of a to 12. </p>`;

    readonly _starterCode: string =
        `a = 5;
print(a, 118, 63);
print("a is less than 10", 103, 143);`;

    _latestInstrIndex: number = 3;

    constructor(ctx: CanvasRenderingContext2D, editor: CodeMirror.Editor) {
        super(ctx, editor);
        let content = "We learned to tell the computer to print a lot of things. Now, let's teach it to make some decisions on its own.";
        this._instrBoxes.push(new Instruction('code-editor', content, "50%", "10%"));
        content = 'Look at the CODE above. We let a = 5, then we print the value of a to the CANVAS. Then we print the line "a is less than 10".';
        this._instrBoxes.push(new Instruction('code-editor', content, "40%", "10%"));
        content = "Since a = 5, and 5 < 10, we know that a is less than 10. But what would happen if we change the value of a to, say, 12?";
        this._instrBoxes.push(new Instruction('code-editor', content, "50%", "10%"));
        content = "Change the value of a to 12. Observe what happens on the CANVAS.";
        this._instrBoxes.push(new Instruction('code-editor', content, "40%", "10%"));
        content = 'Do you notice the claim that "a is less than 10" did not change? a is now 12 and clearly greater than 10! Yet our computer does not know to not print the wrong claim!';
        this._instrBoxes.push(new Instruction('canvas-container', content, "70%", "10%"));
    }

    /**
     * A lesson leading into conditionals
     * goals: moving the text and observe the code
     * @param document the HTML document
     * @param effects the list of effects currently on the CANVAS
     */
    checkGoal(document: Document, effects: Effect<any>[]): boolean {
        switch (this._latestInstrIndex) {
            case 3:
                //check for correct CODE
                let codeIsCorrect = false;
                let code: string = this.editor.getValue();
                let regex: RegExp = /a\s*=\s*12\s*/;
                let match = code.match(regex);
                codeIsCorrect = match != null && match.length > 0;

                //check for correct CANVAS effects
                let canvasIsCorrect = false;
                for (let effect of effects) {
                    if (effect instanceof StringEffect && effect.str === "a is less than 10") {
                        canvasIsCorrect = true;
                        break;
                    }
                }

                if (codeIsCorrect && canvasIsCorrect) {
                    this._latestInstrIndex++;
                    this.renderLatestInstruction(document);
                }
                return false;

            default:
                return true;
        }
    }
}
