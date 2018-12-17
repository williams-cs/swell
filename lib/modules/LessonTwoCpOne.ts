import { Module } from "./Module";
import { Effect } from "../effects/Effect";
import { EllipseEffect } from "../effects/EllipseEffect";

export class LessonTwoCpOne extends Module {
    readonly _name: string = "l2c1";
    readonly _nextModule: string = 'l2c2';
    readonly _goal: any;
    readonly _constraint: string = 'none';
    readonly _instructions: string =
    `<p> Printing only words is kinda boring, so let's learn to print some shapes on the CANVAS! </p>
    <p> In the print statement, replace "moo" with ellipse(100,100). Hit the RUN button to see what happens. </p>
    <p> GOAL: replace "moo" with ellipse(100,100) in the print statement above. </p>
    <p> HINT: Highlight "moo" - including the double quotes ", and replace that with ellipse(100, 100). KEEP EVERYTHING ELSE THE SAME. </p>`;

    readonly _starterCode: string = `print("moo", 100, 100)`;

    constructor(ctx: CanvasRenderingContext2D) {
      super(ctx);
    }

    /**
     * A lesson to print a string
     * goals: moving the text and observe the code
     * @param document: The HTML document
     * @param effects: the list of effects currently on the CANVAS
     */
    checkGoal(document: Document, effects: Effect<any>[]): boolean {
        //check for correct CODE
        let codeIsCorrect = false;
        let code = (document.getElementById("input") as HTMLInputElement).value;
        if (code != null) {
            let regex: RegExp = /print\s*\(\s*ellipse\s*\(\s*[1-9][0-9]*\s*,\s*[1-9][0-9]*\s*\)\s*,\s*[1-9][0-9]*\s*,\s*[1-9][0-9]*\s*\)/;
            let match = code.match(regex);
            codeIsCorrect = match != null && match.length > 0;
        }

        //check for correct CANVAS effects
        let canvasIsCorrect = false;
        for (let effect of effects) {
          if (effect instanceof EllipseEffect) {
            canvasIsCorrect = true;
            break;
          }
        }

        return codeIsCorrect && canvasIsCorrect;
    }
}
