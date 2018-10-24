import { Module } from "./Module";
import { Effect } from "../effects/Effect";
import { StringEffect } from "../effects/StringEffect";

export class LessonOneCpOne implements Module {
    readonly _name: string = "Lesson 1 Checkpoint 1: Saying Hi";
    readonly _lesson: number = 1;
    readonly _goal: any;
    readonly _instructions: string =
    `<p> To begin, let’s tell the computer to write something on the CANVAS! </p>
    <p> GOAL: write on the CANVAS. </p>
    <p> HINT: type in the CODE box: print("Hello, world!"), then hit the RUN button. </p>`;

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
