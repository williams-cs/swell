import { Module } from "./Module";
import { Instruction } from "./Instruction";
import { Effect } from "../effects/Effect";
import { StringEffect } from "../effects/StringEffect";

export class LessonThreeCpThree extends Module {
    readonly _name: string = "l3c3";
    readonly _nextModule: string = 'l3c4';
    readonly _goal: any;
    readonly _constraint: string = 'none';
    readonly _instructions: string =
        `<p> GOAL: Make the line "b is greater than 20" only be printed on the CANVAS when b is actually greater than 20. </p>`;

    readonly _starterCode: string =
        `b = 8;
if(b < 10) {
\tprint("b is greater than 20.", 103, 143);
}`;

    _latestInstrIndex: number = 1;

    constructor(ctx: CanvasRenderingContext2D, editor: CodeMirror.Editor) {
        super(ctx, editor);
        let content = "if statements allow you to run a block of code inside the curly braces {} ONLY when the condition inside the if() clause is true.";
        this._instrBoxes.push(new Instruction('code-editor', content, "50%", "10%"));
        content = `Let's have a quick challenge: observe the CODE above. Change the code inside the {} so that the line "b is greater than 20" is only printed on the CANVAS when b is actually greater than 20.`;
        this._instrBoxes.push(new Instruction('code-editor', content, "40%", "10%"));
        content = "Your CODE seems correct! Now change the value of b to 50 to test it.";
        this._instrBoxes.push(new Instruction('code-editor', content, "50%", "10%"));
        content = 'The claim is printed with the correct value of b! Good job!';
        this._instrBoxes.push(new Instruction('canvas-container', content, "70%", "10%"));
    }

    /**
     * A lesson leading into conditionals
     * goals: moving the text and observe the code
     * @param document the HTML document
     * @param effects the list of effects currently on the CANVAS
     */
    checkGoal(document: Document, effects: Effect<any>[]): boolean {
        let codeIsCorrect = false;
        let canvasIsCorrect = false;
        let code: string = this.editor.getValue();
        let regex: RegExp;
        let match: string[];

        switch (this._latestInstrIndex) {
            case 1:
                //check for correct CODE
                regex = /if\s*\(\s*b\s*>\s*20\s*\)/;
                match = code.match(regex);
                if (match != null && match.length > 0) {
                    this._latestInstrIndex++;
                    this.renderLatestInstruction(document);
                }
                return false;

            case 2:
                //check for correct CODE
                regex = /if\s*\(\s*b\s*>\s*20\s*\)/;
                match = code.match(regex);
                let assign: RegExp = /b\s*=\s*50\s*/;
                let matchAssign = code.match(assign);
                codeIsCorrect = match != null && match.length > 0 && matchAssign != null && matchAssign.length > 0;

                //check for correct CANVAS effects
                for (let effect of effects) {
                    if (effect instanceof StringEffect && effect.str === "b is greater than 20.") {
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
