import { Module } from "./Module";
import { Effect } from "../effects/Effect";
import { EllipseEffect } from "../effects/EllipseEffect";

export class LessonThreeCpOne implements Module {
    readonly _name: string = "l3c1";
    readonly _nextModule: string = 'l3c2';
    readonly _goal: any;
    readonly _constraint: string = 'none';
    readonly _instructions: string =
    `<p> We learned to tell the computer to print a lot of things. Unfortunately, the computer is kinda bad at math. </p>
    <p> Look at the CODE above. We let a = 5, then we print the value of a to the CANVAS. Then we print the line "a is less than 10". </p>
    <p> Since a = 5, and 5 < 10, we know that a is less than 10. But what would happen if we change the value of a to, say, 12? </p>
    <p> GOAL: change the value of a to 12. </p>
    <p> HINT: You can do this by changing the line a = 5 in the CODE area, or you can click on the number 5 on the CANVAS. </p>`;

    readonly _starterCode: string =
    `a = 5;
print(a, 118, 63);
print("a is less than 10", 103, 143);`;

    constructor(){
    }

    /**
     * A lesson leading into conditionals
     * goals: moving the text and observe the code
     * @param document: The HTML document
     * @param effects: the list of effects currently on the CANVAS
     */
    checkGoal(document: Document, effects: Effect<any>[]): boolean {
        //check for correct CODE
        let codeIsCorrect = false;
        let code = (document.getElementById("input") as HTMLInputElement).value;
        if (code != null) {
            let regex: RegExp = /a\s*=\s*12\s*/;
            let match = code.match(regex);
            codeIsCorrect = match != null && match.length > 0;
        }

        //check for correct CANVAS effects
        let canvasIsCorrect = true;
        for (let effect of effects) {
          if (effect instanceof EllipseEffect) {

          }
        }

        return codeIsCorrect && canvasIsCorrect;
    }

    /**
     * Returns the module name
     */
    get name(): string {
        return this._name;
    }
    /**
     * Returns the module instructions
     */
    get instructions(): string {
        return this._instructions;
    }
}
