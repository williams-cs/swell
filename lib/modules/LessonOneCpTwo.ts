import { Module } from "./Module";
import { Effect } from "../effects/Effect";
import { StringEffect } from "../effects/StringEffect";

export class LessonOneCpTwo implements Module {
    readonly _name: string = "Lesson 1 Checkpoint 2: Changing Text";
    readonly _lesson: number = 1;
    readonly _goal: any;
    readonly _instructions: string =
    `<p> Congratulations! You just told the computer to create words on the CANVAS!
    Now let's do something more interesting: click on the words you just created, and move it to the top left of the screen.</p>
    <p> GOAL: Move the words you just created to the center of the screen. </p>`;

    constructor(){
    }

    /**
     * A lesson to print a string
     * goals: write any string on canvas
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
