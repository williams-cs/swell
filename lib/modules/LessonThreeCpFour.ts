import { Module } from "./Module";
import { Instruction } from "./Instruction";
import { Effect } from "../effects/Effect";
import { StringEffect } from "../effects/StringEffect";

export class LessonThreeCpFour extends Module {
    readonly _name: string = "l3c4";
    readonly _nextModule: string = 'l3c5';
    readonly _goal: any;
    readonly _constraint: string = 'none';
    readonly _instructions: string =
        `<p> GOAL: Change the value of c so that the line "c is equal to 8." is printed on the CANVAS. </p>`;

    readonly _starterCode: string =
        `c = 100;
if(c == 8) {
\tprint("c is equal to 8.", 103, 143);
}`;

    _latestInstrIndex: number = 2;

    constructor(ctx: CanvasRenderingContext2D, editor: CodeMirror.Editor) {
        super(ctx, editor);
        let content = `You can put an inequality condition in the if() clause, such as "a < 5" or "b > 20".`;
        this._instrBoxes.push(new Instruction('code-editor', content, "50%", "10%"));
        content = `You can also use an equality condition. Observe the CODE above with "c == 8". The 2 equal signs mean that you are checking whether c is exactly equal to 8 or not.`;
        this._instrBoxes.push(new Instruction('code-editor', content, "40%", "10%"));
        content = `Let's have a small challenge: Can you change the value of c so that the line "c is equal to 8." is printed on the CANVAS?`;
        this._instrBoxes.push(new Instruction('code-editor', content, "50%", "10%"));
        content = `That's correct! the code inside the braces {} of the if statement only runs when c is exactly 8!`;
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
            case 2:
                //check for correct CODE
                let codeIsCorrect = false;
                let code: string = this.editor.getValue();
                let regex: RegExp = /c\s*=\s*8\s*/;
                let match = code.match(regex);
                codeIsCorrect = match != null && match.length > 0;

                //check for correct CANVAS effects
                let canvasIsCorrect = false;
                for (let effect of effects) {
                    if (effect instanceof StringEffect && effect.str === "c is equal to 8.") {
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
