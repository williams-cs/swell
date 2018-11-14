import { Module } from "./Module";
import { Effect } from "../effects/Effect";
import { EllipseEffect } from "../effects/EllipseEffect";

export class LessonThreeCpFour implements Module {
    readonly _name: string = "l3c4";
    readonly _nextModule: string = 'l3c5';
    readonly _goal: any;
    readonly _constraint: string = 'none';
    readonly _instructions: string =
    `<p> You can put an inequality condition in the if() clause, such as "a < 5" or "b > 20". </p>
    <p> You can also use an equality condition. Observe the CODE above with "c == 8". The 2 equal signs mean that you are checking whether c is exactly equal to 8 or not. </p>
    <p> Change the value of c so that the line "c is equal to 8." is printed on the CANVAS. </p>
    <p> GOAL: Change the value of c so that the line "c is equal to 8." is printed on the CANVAS. </p>`;

    readonly _starterCode: string =
    `c = 100;
if(c == 8) {
  print("c is equal to 8.", 103, 143);
}`;

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
            let regex: RegExp = /print\s*\(\s*ellipse\s*\(\s*[1-9][0-9]*\s*,\s*[1-9][0-9]*\s*\)\s*,\s*[1-9][0-9]*\s*,\s*[1-9][0-9]*\s*\);/;
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