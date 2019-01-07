import { Module } from "./Module";
import { Instruction } from "./Instruction";
import { Effect } from "../effects/Effect";
import { StringEffect } from "../effects/StringEffect";

export class LessonThreeCpFive extends Module {
    readonly _name: string = "l3c5";
    readonly _nextModule: string = 'l3c6';
    readonly _goal: any;
    readonly _constraint: string = 'none';
    readonly _instructions: string =
        `<p> GOAL: Change the value of c around to see when "c is NOT equal to 8." would be printed on the CANVAS. </p>`;

    readonly _starterCode: string =
        `c = 8;
if(c == 8) {
\tprint("c is equal to 8.", 103, 143);
} else {
\tprint("c is NOT equal to 8.", 103, 143);
}`;

    _latestInstrIndex: number = 2;

    constructor(ctx: CanvasRenderingContext2D, editor: CodeMirror.Editor) {
        super(ctx, editor);
        let content = `Now, what if we want to print another message, <span class="inline-code">c is not equal to 8</span> any time <span class="inline-code">c</span> is not equal to 8?`;
        this._instrBoxes.push(new Instruction('code-editor', content, "50%", "10%"));
        content = `Observe the CODE above. When the condition inside the brackets of <span class="inline-code">if()</span> is satisfied, the code block inside the braces <span class="inline-code">{}</span> right after it would run.`;
        this._instrBoxes.push(new Instruction('code-editor', content, "40%", "10%"));
        content = `What would happen if we change the value of <span class="inline-code">c</span>? In the CODE above, change the value of <span class="inline-code">c</span> to <span class="inline-code">5</span> and observe what happens.`;
        this._instrBoxes.push(new Instruction('code-editor', content, "50%", "10%"));
        content = `Did you notice the claim printed here changed? When the condition inside the <span class="inline-code">if</span> statement is not satisfied, the second code block inside the braces <span class="inline-code">{}</span> after the <span class="inline-code">else</span> statement would run instead!`;
        this._instrBoxes.push(new Instruction('canvas-container', content, "70%", "10%"));
        content = `To get a better idea, change the value of <span class="inline-code">c</span> back to <span class="inline-code">8</span>.`;
        this._instrBoxes.push(new Instruction('code-editor', content, "40%", "10%"));
        content = `Did you see the claim changed again? Now, change the value of <span class="inline-code">c</span> to <span class="inline-code">17</span>.`;
        this._instrBoxes.push(new Instruction('code-editor', content, "40%", "10%"));
        content = `Hope you get the hang of what an <span class="inline-code">else</span> statement does by this point! As long as the condition inside the <span class="inline-code">if</span> statement is not satisfied, the code block inside the second braces <span class="inline-code">else{}</span> would run instead of the first code block.`;
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
            case 2:
                //check for correct CODE
                //let regex = /c\s*=\s*[^8]\s*/;
                regex = /c\s*=\s*5\s*/;
                match = code.match(regex);
                codeIsCorrect = match != null && match.length > 0;

                //check for correct CANVAS effects
                for (let effect of effects) {
                    if (effect instanceof StringEffect && effect.str === "c is NOT equal to 8.") {
                        canvasIsCorrect = true;
                        break;
                    }
                }

                if (codeIsCorrect && canvasIsCorrect) {
                    this._latestInstrIndex = 4;
                    this.renderNextInstruction(document);
                }
                return false;

            case 4:
                //check for correct CODE
                regex = /c\s*=\s*8\s*/;
                match = code.match(regex);
                codeIsCorrect = match != null && match.length > 0;

                //check for correct CANVAS effects
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

            case 5:
                //check for correct CODE
                regex = /c\s*=\s*17\s*/;
                match = code.match(regex);
                codeIsCorrect = match != null && match.length > 0;

                //check for correct CANVAS effects
                for (let effect of effects) {
                    if (effect instanceof StringEffect && effect.str === "c is NOT equal to 8.") {
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
