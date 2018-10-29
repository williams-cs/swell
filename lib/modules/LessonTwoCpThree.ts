import { Module } from "./Module";
import { Effect } from "../effects/Effect";
import { StringEffect } from "../effects/StringEffect";

export class LessonTwoCpThree implements Module {
    readonly _name: string = "Lesson 2 Checkpoint 3: Using Variables";
    readonly _nextModule: string = 'l2c4';
    readonly _goal: any;
    readonly _constraint: string = 'none';
    readonly _instructions: string =
    `<p> There's no limit to how many print statements the computer can understand, so you can write 1000 print statements, and the computer will draw 1000 things on the CANVAS for you! </p>
    <p> Now it's time to take your coding to the next level. Let's learn about variables. </p>
    <p> Variables are simply names you give to the things that you draw. </p>
    <p> For example, take a look at the code above. Change the a in the print statement to b, and observe what happened on the CANVAS. </p>
    <p> GOAL: Change a to b in the print statement. </p>`;

    readonly _starterCode = `
    a = "moo moo"
    b = ellipse(100, 100)
    print(a, 50, 70)`;

    constructor(){
    }

    /**
     * A lesson to print a string
     * goals: moving the text and observe the code
     * @param document The HTML document
     */
    checkGoal(document: Document, effects: Effect<any>[]): boolean {
        for (let effect of effects) {
          if (effect instanceof StringEffect) {
            if (effect.str !== "") {
              if (effect.x < 10 && effect.y < 70) {
                return true;
              }
            }
          }
        }
        return false;
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
