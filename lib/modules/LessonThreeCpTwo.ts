import { Module } from "./Module";
import { Effect } from "../effects/Effect";
import { EllipseEffect } from "../effects/EllipseEffect";

export class LessonThreeCpTwo implements Module {
    readonly _name: string = "l3c2";
    readonly _nextModule: string = 'l3c3';
    readonly _goal: any;
    readonly _constraint: string = 'none';
    readonly _instructions: string =
    `<p> Did you notice the claim that "a is less than 10" did not change? a is now 12 and clearly greater than 10! </p>
    <p> What we want is for the computer to only print "a is less than 10" ONLY when the value of a is truly less than 10. </p>
    <p> To do so, we use an if statement. Observe the CODE above. All we changed was to put in an if statement that checks whether a < 10. If a is, the code inside the curly braces {} are executed. </p>
    <p> Hit RUN now and see what happens. </p>
    <p> GOAL: RUN the CODE with a = 12. </p>`;

    readonly _starterCode: string =
    `a = 12;
print(a, 118, 63);
if(a < 10) {
  print("a is less than 10", 103, 143);
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
