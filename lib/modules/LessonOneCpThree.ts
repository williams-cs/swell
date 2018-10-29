import { Module } from "./Module";
import { Effect } from "../effects/Effect";
import { StringEffect } from "../effects/StringEffect";

export class LessonOneCpThree implements Module {
    readonly _name: string = "Lesson 1 Checkpoint 3: Use Code to Move Text";
    readonly _nextModule: string = 'l1c4';
    readonly _goal: any;
    readonly _constraint: string = 'canvas';
    readonly _instructions: string =
    `<p> Yep! Moving the words actually change numbers in your CODE. </p>
    <p> Now the CANVAS has been frozen! Try changing your CODE to see if you can move the words to the bottom right corner. </p>
    <p> GOAL: Move the words to the bottom right of the CANVAS. </p>
    <p> HINT: Change one of the 2 numbers at a time, then click RUN to see how that changes the CANVAS.`;

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
