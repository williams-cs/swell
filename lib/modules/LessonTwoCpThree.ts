import { Module } from "./Module";
import { Instruction } from "./Instruction";
import { Effect } from "../effects/Effect";
import { EmojiEffect } from "../effects/EmojiEffect";

export class LessonTwoCpThree extends Module {
    readonly _name: string = "l2c3";
    readonly _goal: any;
    readonly _constraint: string = 'none';
    readonly _instructions: string =
        `<p>Lesson 2 - Checkpoint 3</p>` +
        `<p>GOAL: Draw 2 emojis on the CANVAS.</p>`;

    readonly _starterCode: string = `print(emoji("wink", 100, 100), 120, 150);\n`;

    _latestInstrIndex: number = 1;

    constructor(ctx: CanvasRenderingContext2D, editor: CodeMirror.Editor) {
        super(ctx, editor);
        let content = "What if we want to draw more than 1 emoji?";
        this._instrBoxes.push(new Instruction('code-editor', content, "50%", "10%"));
        content = `First copy the <span class="inline-code">print</span> statement on the first line and paste it into the second line in the CODE above.`;
        this._instrBoxes.push(new Instruction('code-editor', content, "40%", "10%"));
        content = `Hmm... that should have created a second emoji, right? What happens if we change the number <span class="inline-code">120</span> in the second line of CODE to <span class="inline-code">300</span>? Give it a try.`;
        this._instrBoxes.push(new Instruction('code-editor', content, "50%", "10%"));
        content = "Hey! An emoji was hiding behind the other emoji! In the future, watch out.  Any shape can hide behind any other shape.";
        this._instrBoxes.push(new Instruction('code-editor', content, "50%", "10%"));
        content = "Now let's have a quick challenge: make one of the emojis a happy face, and the other one a sad face. Do you remember how to do that?";
        this._instrBoxes.push(new Instruction('code-editor', content, "50%", "10%"));
        content = `There's no limit to how many emojis the computer can draw. You could <span class="inline-code">print</span> 1,000 emojis if you wanted!`;
        this._instrBoxes.push(new Instruction('canvas-container', content, "70%", "10%"));
    }

    /**
     * A lesson to print a string
     * goals: moving the text and observe the code
     * @param document the HTML document
     * @param effects the list of effects currently on the CANVAS
     */
    checkGoal(document: Document, effects: Effect<any>[]): boolean {
        let emojiCount = 0;
        switch (this._latestInstrIndex) {
            case 1:
                for (let effect of effects) {
                    if (effect instanceof EmojiEffect) {
                        emojiCount += 1;
                    }
                }
                if (emojiCount >= 2) {
                  this._latestInstrIndex++;
                  this.renderLatestInstruction(document);
                }
                return false;

            case 2:
                let moved = false;
                for (let effect of effects) {
                    if (effect instanceof EmojiEffect) {
                        if (effect.x  == 300) {
                            moved = true;
                        }
                        emojiCount += 1;
                    }
                }
                if ((emojiCount >= 2) && moved) {
                  this._latestInstrIndex += 2;
                  this.renderNextInstruction(document);
                }
                return false;

            case 4:
                let sadExists = false;
                let happyExists = false;
                for (let effect of effects) {
                  if (effect instanceof EmojiEffect) {
                        if (effect.name === "happy") {
                            happyExists = true;
                        }

                        if (effect.name === "sad") {
                            sadExists = true;
                        }

                        emojiCount += 1;
                    }
                }
                if ((emojiCount >= 2) && sadExists && happyExists) {
                  this._latestInstrIndex += 1;
                  this.renderLatestInstruction(document);
                }
                return false;

            default:
                return true;
        }
    }
}
