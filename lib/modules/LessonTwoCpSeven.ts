import { Module } from "./Module";
import { Instruction } from "./Instruction";
import { Effect } from "../effects/Effect";
import { NumberEffect } from "../effects/NumberEffect";
import { EllipseEffect } from "../effects/EllipseEffect";

export class LessonTwoCpSeven extends Module {
    readonly _name: string = "l2c7";
    readonly _nextModule: string = 'l3c1';
    readonly _goal: any;
    readonly _constraint: string = 'none';
    readonly _instructions: string =
        `<p> CHALLENGE: Create a circle and print out its size. </p>`;

    readonly _starterCode =
        `a = 50;
print(ellipse(100, 100), 125, 175);`;

    _latestInstrIndex: number = 1;

    x: number = 10;
    y: number;
    square_size: number = 250;
    font_size = 20;

    constructor(ctx: CanvasRenderingContext2D, editor: CodeMirror.Editor) {
        super(ctx, editor);
        this.y = ctx.canvas.height - this.square_size - this.x;
        let content = "Let's learn one final thing about variables. Observe the code above: we connect the variable a to the number 50, and we also have a print statement to print an ellipse.";
        this._instrBoxes.push(new Instruction('code-editor', content, "50%", "10%"));
        content = "Replace the two numbers 100 inside the print statement with the letter a. Observe what happens.";
        this._instrBoxes.push(new Instruction('code-editor', content, "40%", "10%"));
        content = "Did you see the circle on CANVAS become smaller? The variable a is tied to the number 50, so now the circle has dimension a!";
        this._instrBoxes.push(new Instruction('code-editor', content, "50%", "10%"));
        content = "Let's add one last bit of CODE: write something to print the value of a on the CANVAS.";
        this._instrBoxes.push(new Instruction('code-editor', content, "40%", "10%"));
        content = "That's correct! Finally, click on the circle on the CANVAS, and make it bigger than the box provided. Observe what happened to the printed number.";
        this._instrBoxes.push(new Instruction('code-editor', content, "50%", "10%"));
        content = "Did you see the printed number change? You have successfully connected 2 elements on the CANVAS together - a circle and a number! Remember this lesson about variables in the future when you need to connect different things on the CANVAS together!";
        this._instrBoxes.push(new Instruction('code-editor', content, "70%", "10%"));
    }

    drawGuides(): void {
        this.ctx.beginPath();
        this.ctx.rect(this.x, this.y, this.square_size, this.square_size);
        this.ctx.strokeStyle = '#6C6C6C';
        this.ctx.stroke();

        this.ctx.font = this.font_size + "px Courier New";
        this.ctx.fillStyle = '#6C6C6C';
        this.ctx.fillText("Make circle", this.x, this.y + this.font_size);
        this.ctx.fillText("bigger than this box", this.x, this.y + 2 * this.font_size);
    }

    /**
     * A lesson to print a string
     * goals: moving the text and observe the code
     * @param document the HTML document
     * @param effects the list of effects currently on the CANVAS
     */
    checkGoal(document: Document, effects: Effect<any>[]): boolean {
        let codeIsCorrect = false;
        let canvasIsCorrect = false;
        let code: string = this.editor.getValue();

        switch (this._latestInstrIndex) {
            case 1:
                //check for correct CODE
                let regex: RegExp = new RegExp('print\\s*\\(\\s*ellipse\\s*\\(\\s*a\\s*,\\s*a\\s*\\)\\s*,\\s*[1-9][0-9]*\\s*,\\s*[1-9][0-9]*\\s*\\)');
                let match = code.match(regex);
                codeIsCorrect = match != null && match.length > 0;

                //check for correct CANVAS effects
                for (let effect of effects) {
                    if (effect instanceof EllipseEffect) {
                        canvasIsCorrect = true;
                        break;
                    }
                }

                if (codeIsCorrect && canvasIsCorrect) {
                    this._latestInstrIndex = 3;
                    this.renderNextInstruction(document);
                }
                return false;


            case 3:
                for (let effect of effects) {
                    if (effect instanceof NumberEffect && effect.num != null) {
                        let val = effect.num;
                        for (let effect2 of effects) {
                            if (effect2 instanceof EllipseEffect && (val == effect2.w || val == effect2.h)) {
                                this._latestInstrIndex++;
                                this.renderLatestInstruction(document);
                            }
                        }
                    }
                }
                return false;

            case 4:
                let circle: EllipseEffect;
                for (let effect of effects) {
                    if (effect instanceof NumberEffect && effect.num != null) {
                        let val = effect.num;
                        for (let effect2 of effects) {
                            if (effect2 instanceof EllipseEffect && (val == effect2.w || val == effect2.h) && val > this.square_size) {
                                this._latestInstrIndex++;
                                this.renderLatestInstruction(document);
                            }
                        }
                    }
                }
                return false;

            default:
                return true;
        }
    }
}
