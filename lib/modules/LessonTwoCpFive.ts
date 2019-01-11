import { Module } from "./Module";
import { Instruction } from "./Instruction";
import { Effect } from "../effects/Effect";
import { EmojiEffect } from "../effects/EmojiEffect";

export class LessonTwoCpFive extends Module {
    readonly _name: string = "l2c5";
    readonly _goal: any;
    readonly _constraint: string = 'none';
    readonly _instructions: string =
    `<p> GOAL: Create a variable c referring to an emoji("pirate", 75, 75), then write 2 print statements to print c. </p>`;

    readonly _starterCode =
    `a = emoji("angry", 100, 100);
b = emoji("cool", 100, 100);
print(b, 100, 100);`;

    _latestInstrIndex: number = 0;

    constructor(ctx: CanvasRenderingContext2D, editor: CodeMirror.Editor) {
        super(ctx, editor);
        let content = `Let's take this one step further: Create a new variable <span class="inline-code">c</span>, and make it refer to an <span class="inline-code">emoji("pirate", 75, 75)</span>.`;
        this._instrBoxes.push(new Instruction('code-editor', content, "50%", "10%"));
        content = `Now change the <span class="inline-code">print</span> statement to print <span class="inline-code">c</span> instead of <span class="inline-code">b</span>.`;
        this._instrBoxes.push(new Instruction('code-editor', content, "40%", "10%"));
        content = `Finally, write <span class="inline-code">print(c, 300, 100);</span> underneath the existing <span class="inline-code">print</span> statement.`;
        this._instrBoxes.push(new Instruction('code-editor', content, "50%", "10%"));
        content = 'Awesome, you are getting good at using variables! You just drew 2 pirate emojis, both named <span class="inline-code">c</span>!';
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
        let emojiCount = 0;
        let code: string = this.editor.getValue();
        let assignment: RegExp = /c\s*=\s*emoji\s*\(\s*"pirate"\s*,\s*[1-9][0-9]*\s*,\s*[1-9][0-9]*\s*\)\s*/g;
        let matchAssign: string[];
        let print: RegExp = /print\s*\(\s*c\s*,\s*100\s*,\s*100\s*\)/g;
        let print2: RegExp = /print\s*\(\s*c\s*,\s*300\s*,\s*100\s*\)/g;
        let matchPrint: string[];
        let matchPrint2: string[];

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
                    if (effect instanceof EmojiEffect) {
                        emojiCount += 1;
                    }
                }

                if (codeIsCorrect && emojiCount >= 1) {
                    this._latestInstrIndex++;
                    this.renderLatestInstruction(document);
                }
                return false;

            case 2:
                //check for correct CODE
                matchAssign = code.match(assignment);
                matchPrint = code.match(print);
                matchPrint2 = code.match(print2);
                codeIsCorrect = matchAssign != null && matchAssign.length > 0 && matchPrint != null && matchPrint.length >= 1 && matchPrint2 != null && matchPrint2.length >= 1;

                //check for correct CANVAS effects
                for (let effect of effects) {
                    if (effect instanceof EmojiEffect) {
                        emojiCount += 1;
                    }
                }

                if (codeIsCorrect && emojiCount >= 2) {
                    this._latestInstrIndex++;
                    this.renderLatestInstruction(document);
                }
                return false;

            default:
                return true;
        }
    }
}
