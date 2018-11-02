import { Module } from "./Module";
import { Effect } from "../effects/Effect";
import { EllipseEffect } from "../effects/EllipseEffect";

export class LessonTwoCpFour implements Module {
    readonly _name: string = "l2c4";
    readonly _nextModule: string = 'l2c5';
    readonly _goal: any;
    readonly _constraint: string = 'none';
    readonly _instructions: string =
    `<p> There's no limit to how many print statements the computer can understand, so you can write 1000 print statements, and the computer will draw 1000 things on the CANVAS for you! </p>
    <p> Time to take your coding to the next level. Let's learn about variables. </p>
    <p> Variables are simply names you give to the things that you draw. </p>
    <p> For example, take a look at the code above. Change the a in the print statement to b, and observe what happened on the CANVAS. </p>
    <p> GOAL: Change a to b in the print statement. </p>`;

    readonly _starterCode = `a = "moo moo";
    b = ellipse(100, 100);
    print(a, 50, 70);`;

    constructor(){
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
          let regex: RegExp = /print\s*\(\s*b\s*,\s*[1-9][0-9]*\s*,\s*[1-9][0-9]*\s*\);/;
          let match = code.match(regex);
          codeIsCorrect = match != null && match.length > 0;
      }

      //check for correct CANVAS effects
      let canvasIsCorrect = true;
      for (let effect of effects) {
        if (!canvasIsCorrect && effect instanceof EllipseEffect) {
          canvasIsCorrect = true;
          break;
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
