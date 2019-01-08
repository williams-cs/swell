import { Module } from "./Module";
import { Instruction } from "./Instruction";
import { Effect } from "../effects/Effect";
import { StringEffect } from "../effects/StringEffect";

export class LessonThreeCpFour extends Module {
    readonly _name: string = "l3c4";
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
        let content = `You can put an inequality condition inside the brackets of <span class="inline-code">if()</span>, such as <span class="inline-code">a < 5</span> or <span class="inline-code">b > 20</span>.`;
        this._instrBoxes.push(new Instruction('code-editor', content, "50%", "10%"));
        content = `You can also use an equality condition. Observe the CODE above with <span class="inline-code">c == 8</span>. The 2 equal signs <span class="inline-code">==</span> mean that you are checking whether <span class="inline-code">c</span> is EXACTLY EQUAL to <span class="inline-code">8</span> or not.`;
        this._instrBoxes.push(new Instruction('code-editor', content, "40%", "10%"));
        content = `Let's have a small challenge: Can you change the value of <span class="inline-code">c</span> so that the claim <span class="inline-code">c is equal to 8.</span> is printed on the CANVAS?`;
        this._instrBoxes.push(new Instruction('code-editor', content, "50%", "10%"));
        content = `That's correct! the code inside the braces <span class="inline-code">{}</span> of the <span class="inline-code">if</span> statement only runs when <span class="inline-code">c</span> is exactly equal to 8!`;
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
