import { Module } from "./Module";
import { Effect } from "../effects/Effect";
import { EllipseEffect } from "../effects/EllipseEffect";

export class LessonTwoCpFive implements Module {
    readonly _name: string = "l2c5";
    readonly _nextModule: string = 'l2c6';
    readonly _goal: any;
    readonly _constraint: string = 'none';
    readonly _instructions: string =
    `<p> Did you see the words on the CANVAS changed? </p>
    <p> In our code, we make variable a refer to the words "moo moo", and variable b refer to an ellipse(100, 100). </p>
    <p> As a result, when we tell the computer to print a, it will print "moo moo", and when we tell the computer to print b, it will print a circle. </p>
    <p> Let's take this one step further: Create a new variable c, and make it refer to an ellipse(100, 100). Then write 2 statements to print c. What do you think would happen? </p>
    <p> GOAL: Create a variable c referring to an ellipse(100, 100), then write 2 print statements to print c. </p>`;
/*
    `<p> Now that you have drawn 2 circles both are called c, let's see what happens when you try to modify one of them. </p>
    <p> Click on one of the circles referred to by c, and try resize it. Observe what happens to your declaration of c. </p>
    <p> GOAL: Resize one of the circles referred to by c. </p>`;
*/
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
          let assignment: RegExp = /c\s*=\s*ellipse\s*\(\s*[1-9][0-9]*\s*,\s*[1-9][0-9]*\s*\)\s*;/g;
          let matchAssign = code.match(assignment);
          let print: RegExp = /print\s*\(\s*c\s*,\s*[1-9][0-9]*\s*,\s*[1-9][0-9]*\s*\);/g;
          let matchPrint = code.match(print);
          codeIsCorrect = matchAssign != null && matchAssign.length > 0 && matchPrint != null && matchPrint.length >= 2;
      }

      //check for correct CANVAS effects
      let circleCount = 0;
      for (let effect of effects) {
        if (effect instanceof EllipseEffect) {
          circleCount += 1;
        }
      }

      return codeIsCorrect && circleCount >= 2;
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
