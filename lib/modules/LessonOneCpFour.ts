import { Module } from "./Module";
import { Effect } from "../effects/Effect";
import { StringEffect } from "../effects/StringEffect";

export class LessonOneCpFour implements Module {
    readonly _name: string = "l1c4";
    readonly _prevModule: string = 'l1c2';
    readonly _nextModule: string = 'l2c1';
    readonly _goal: any;
    readonly _constraint: string = 'canvas';
    readonly _instructions: string =
    `<p> Note that changing the first number in the print statement moves the words left or right, while changing the second number move them up or down. </p>
    <p> Now time for a challenge! Print the word "moo" on the CANVAS, and put it right in the center of the entire CANVAS. </p>
    <p> CHALLENGE: Print the word "moo" in the center of the CANVAS. </p>
    <p> HINT: Write print("moo", 50, 50) in the CODE area first, then change the numbers inside that print statement. </p>`;

    constructor(){
    }

    /**
     * A lesson to print a string
     * goals: moving the text and observe the code
     * @param document The HTML document
     * @param effects: the list of effects currently on the CANVAS
     */
    checkGoal(document: Document, effects: Effect<any>[]): boolean {
        for (let effect of effects) {
          if (effect instanceof StringEffect && effect.str === "moo") {
            if ((effect.x > 200 && effect.x < 240) && (effect.y > 230 && effect.y < 300)) {
              return true;
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
