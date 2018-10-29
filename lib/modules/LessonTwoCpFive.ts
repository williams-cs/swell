import { Module } from "./Module";
import { Effect } from "../effects/Effect";
import { StringEffect } from "../effects/StringEffect";

export class LessonTwoCpFive implements Module {
    readonly _name: string = "Lesson 2 Checkpoint 5: PDM with Variable";
    readonly _nextModule: string = 'l2c6';
    readonly _goal: any;
    readonly _constraint: string = 'code';
    readonly _instructions: string =
    `<p> Now that you have drawn 2 circles both are called c, let's see what happens when you try to modify one of them. </p>
    <p> Click on one of the circles referred to by c, and try resize it. Observe what happens to your declaration of c. </p>
    <p> GOAL: Resize one of the circles referred to by c. </p>`;

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
