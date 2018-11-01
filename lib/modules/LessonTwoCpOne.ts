import { Module } from "./Module";
import { Effect } from "../effects/Effect";
import { EllipseEffect } from "../effects/EllipseEffect";

export class LessonTwoCpOne implements Module {
    readonly _name: string = "l2c1";
    readonly _nextModule: string = 'l2c2';
    readonly _goal: any;
    readonly _constraint: string = 'none';
    readonly _instructions: string =
    `<p> Printing only words is kinda boring, so let's learn to print some shapes on the CANVAS! </p>
    <p> In the print statement, replace "moo" with ellipse(100,100). Hit the RUN button to see what happens. </p>
    <p> GOAL: replace "moo" with ellipse(100,100) in the print statement above. </p>
    <p> HINT: Highlight "moo" - including the double quotes ", and replace that with ellipse(100, 100). KEEP EVERYTHING ELSE THE SAME. </p>`;

    readonly _starterCode: string = `
    print("moo", 50, 70)`;

    constructor(){
    }

    /**
     * A lesson to print a string
     * goals: moving the text and observe the code
     * @param document The HTML document
     * @param effects: the list of effects currently on the CANVAS
     */
    checkGoal(document: Document, effects: Effect<any>[]): boolean {
        //check for correct CODE
        let codeIsCorrect = false;
        let code = (document.getElementById("input") as HTMLInputElement).value;
        if (code != null) {
            console.log("CODE: " + code);
            //let regex: RegExp = /print\s*\(\s*ellipse\s*\(\s*[1-9][0-9]*\s*,\s*[1-9][0-9]*\s*\)\s*[1-9][0-9]*\s*,\s*[1-9][0-9]*\s*\)\s*;/;
            let regex: RegExp = /print\s*\(\s*ellipse\s*\(\s*[1-9][0-9]*\s*,\s*[1-9][0-9]*\s*\)\s*,\s*[1-9][0-9]*\s*,\s*[1-9][0-9]*\s*\);/;
            let match = code.match(regex);
            console.log("Match: " + match);
            codeIsCorrect = match != null && match.length > 0;
            /*
            var nums = inputtext.match(/\d+/g)
            if(nums != null) {
                numbers = nums.map(Number);
            */
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
