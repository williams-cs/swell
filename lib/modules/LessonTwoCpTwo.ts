import { Module } from "./Module";
import { Effect } from "../effects/Effect";
import { StringEffect } from "../effects/StringEffect";

export class LessonTwoCpTwo implements Module {
    readonly _name: string = "Lesson 2 Checkpoint 2: Shapes and String";
    readonly _nextModule: string = 'l2c3';
    readonly _goal: any;
    readonly _constraint: string = 'none';
    readonly _instructions: string =
    `<p> So we can draw a circle and change it. But what if we want to draw both a circle and a word? </p>
    <p> Well, simple! Just write another print statement in the CODE area! </p>
    <p> GOAL: Draw 2 circles and a word on the CANVAS. </p>
    <p> HINT: Remember that the numbers right inside the ellipse(_,_) statement change the circle's sizes.`;

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
