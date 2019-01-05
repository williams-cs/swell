import { Module } from "./Module";
import { Instruction } from "./Instruction";
import { Effect } from "../effects/Effect";
import { EllipseEffect } from "../effects/EllipseEffect";
import { StringEffect } from "../effects/StringEffect";

export class LessonTwoCpThree extends Module {
    readonly _name: string = "l2c3";
    readonly _nextModule: string = 'l2c4';
    readonly _goal: any;
    readonly _constraint: string = 'none';
    readonly _instructions: string =
        `<p> GOAL: Draw 2 circles and a word on the CANVAS. </p>`;

    readonly _starterCode: string = `print(ellipse(100, 100), 120, 150);\n`;

    _latestInstrIndex: number = 1;

    constructor(ctx: CanvasRenderingContext2D, editor: CodeMirror.Editor) {
        super(ctx, editor);
        let content = "What if we want to draw more than only 1 circle?";
        this._instrBoxes.push(new Instruction('code-editor', content, "50%", "10%"));
        content = "First copy the print statement on the first line and paste it on the second line above.";
        this._instrBoxes.push(new Instruction('code-editor', content, "40%", "10%"));
        content = "Hm, that should have created a second circle right? Let's try to fix this by changing the 120 above to 200.";
        this._instrBoxes.push(new Instruction('code-editor', content, "50%", "10%"));
        content = "Yep! One circle was on top of the other this entire time! In the future, be mindful of this.";
        this._instrBoxes.push(new Instruction('code-editor', content, "50%", "10%"));
        content = "Now let's have a quick challenge: in addition to the 2 circles, write a word on the canvas. Do you remember how to print a word?";
        this._instrBoxes.push(new Instruction('code-editor', content, "50%", "10%"));
        content = "There's no limit to how many print statements the computer can understand, so you can write 1000 print statements, and the computer will draw 1000 things on the CANVAS for you!";
        this._instrBoxes.push(new Instruction('canvas-container', content, "70%", "10%"));
    }

    /**
     * A lesson to print a string
     * goals: moving the text and observe the code
     * @param document the HTML document
     * @param effects the list of effects currently on the CANVAS
     */
    checkGoal(document: Document, effects: Effect<any>[]): boolean {
        let circleCount = 0;
        switch (this._latestInstrIndex) {
            case 1:
                for (let effect of effects) {
                    if (effect instanceof EllipseEffect) {
                        circleCount += 1;
                    }
                }
                if (circleCount >= 2) {
                  this._latestInstrIndex++;
                  this.renderLatestInstruction(document);
                }
                return false;

            case 2:
                let moved = false;
                for (let effect of effects) {
                    if (effect instanceof EllipseEffect) {
                        if (effect.x  == 200) {
                            moved = true;
                        }
                        circleCount += 1;
                    }
                }
                if ((circleCount >= 2) && moved) {
                  this._latestInstrIndex += 2;
                  this.renderNextInstruction(document);
                }
                return false;

            case 4:
                let stringExists = false;
                for (let effect of effects) {
                    if (!stringExists) {
                        stringExists = effect instanceof StringEffect && effect.str !== "";
                    }

                    if (effect instanceof EllipseEffect) {
                        circleCount += 1;
                    }
                }
                if ((circleCount >= 2) && stringExists) {
                  this._latestInstrIndex += 1;
                  this.renderLatestInstruction(document);
                }
                return false;

            default:
                return true;
        }
        /*
        let stringExists = false;
        let circleCount = 0;

        for (let effect of effects) {
            if (!stringExists) {
                stringExists = effect instanceof StringEffect && effect.str !== "";
            }

            if (effect instanceof EllipseEffect) {
                circleCount += 1;
            }
        }

        return stringExists && circleCount >= 2;
        */
    }
}
