import { Module } from "./Module";
import { Instruction } from "./Instruction";
import { Effect } from "../effects/Effect";
import { StringEffect } from "../effects/StringEffect";

export class LessonThreeCpTwo extends Module {
    readonly _name: string = "l3c2";
    readonly _nextModule: string = 'l3c3';
    readonly _goal: any;
    readonly _constraint: string = 'none';
    readonly _instructions: string =
        `<p> GOAL: Change the value of a around and observe what happens. </p>`;

    readonly _starterCode: string =
        `a = 12;
print(a, 118, 63);
if(a < 10) {
\tprint("a is less than 10", 103, 143);
}`;

    _latestInstrIndex: number = 2;

    constructor(ctx: CanvasRenderingContext2D, editor: CodeMirror.Editor) {
        super(ctx, editor);
        let content = `Let's teach the computer to print the sentence <span class="inline-code">a is less than 10</span> ONLY when <span class="inline-code">a</span> is truly less than 10.`;
        this._instrBoxes.push(new Instruction('code-editor', content, "50%", "10%"));
        content = 'We will use something called an <span class="inline-code">if</span> statement. Observe the CODE above. All we added was an <span class="inline-code">if</span> statement that checks whether <span class="inline-code">a < 10</span>. If a is less than 10, the code inside the curly braces <span class="inline-code">{}</span> will be executed.';
        this._instrBoxes.push(new Instruction('code-editor', content, "40%", "10%"));
        content = `Let's investigate what this statement does. First, change the value of <span class="inline-code">a</span> to <span class="inline-code">8</span>. Observe what happens.`;
        this._instrBoxes.push(new Instruction('code-editor', content, "50%", "10%"));
        content = `Did you see the correct claim is printed on the CANVAS? Now let's change the value of <span class="inline-code">a</span> to, say, <span class="inline-code">25</span>.`;
        this._instrBoxes.push(new Instruction('code-editor', content, "40%", "10%"));
        content = 'The claim about <span class="inline-code">a</span> disappears! Finally, change the value of <span class="inline-code">a</span> to <span class="inline-code">0</span>.';
        this._instrBoxes.push(new Instruction('canvas-container', content, "70%", "10%"));
        content = 'The claim appears again! The <span class="inline-code">if</span> statement makes the computer constantly check the value of <span class="inline-code">a</span>, and only print the claim when the condition inside the brackets <span class="inline-code">()</span> is satisfied!';
        this._instrBoxes.push(new Instruction('code-editor', content, "50%", "10%"));
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
                regex = /a\s*=\s*8\s*/;
                match = code.match(regex);
                codeIsCorrect = match != null && match.length > 0;

                //check for correct CANVAS effects
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

            case 3:
                //check for correct CODE
                regex = /a\s*=\s*25\s*/;
                match = code.match(regex);
                codeIsCorrect = match != null && match.length > 0;

                //check for correct CANVAS effects
                for (let effect of effects) {
                    if (effect instanceof StringEffect && effect.str === "a is less than 10") {
                        canvasIsCorrect = true;
                        break;
                    }
                }

                if (codeIsCorrect && !canvasIsCorrect) {
                    this._latestInstrIndex++;
                    this.renderLatestInstruction(document);
                }
                return false;

            case 4:
                //check for correct CODE
                regex = /a\s*=\s*0\s*/;
                match = code.match(regex);
                codeIsCorrect = match != null && match.length > 0;

                //check for correct CANVAS effects
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
