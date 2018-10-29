import { Module } from "./Module";
import { Effect } from "../effects/Effect";
import { StringEffect } from "../effects/StringEffect";

export class LessonTwoCpOne implements Module {
    readonly _name: string = "Lesson 2 Checkpoint 1: Printing Shapes";
    readonly _nextModule: string = 'l2c2';
    readonly _goal: any;
    readonly _constraint: string = 'none';
    readonly _instructions: string =
    `<p> Previously you learn that putting an ellipse(100, 100) function in the print statement creates a circle on the CANVAS. </p>
    <p> What are the numbers (100, 100) for? I'm glad you asked... </p>
    <p> Because the CODE area is frozen again! Drag one of the 9 white tips around the circle to see how the number changes! </p>
    <p> GOAL: Make the circle wider but shorter. </p>`;

    readonly _starterCode: string = `
    print(ellipse(100, 100), 50, 70)`;

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
