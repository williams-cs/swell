import { Module } from "./Module";
import { Effect } from "../effects/Effect";
import { StringEffect } from "../effects/StringEffect";

export class LessonOneCpFour implements Module {
    readonly _name: string = "Lesson 1 Checkpoint 4: Print Ellipse";
    readonly _nextModule: string = 'l2c1';
    readonly _goal: any;
    readonly _constraint: string = 'none';
    readonly _instructions: string =
    `<p> Yay! You're on a roll! Notice that changing the first number moves the words left or right, while changing the right number move them up or down. </p>
    <p> Finally, it'd be more fun if the computer could put more than just words on the CANVAS. Replace the words in the print statement with an ellipse(100,100) function. </p>
    <p> GOAL: Highlight the word in the print statement, then remove it with ellipse(100,100). KEEP THE REST OF THE CODE THE SAME. </p>`;

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
