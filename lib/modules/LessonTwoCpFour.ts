import { Module } from "./Module";
import { Effect } from "../effects/Effect";
import { StringEffect } from "../effects/StringEffect";

export class LessonTwoCpFour implements Module {
    readonly _name: string = "Lesson 2 Checkpoint 4: Going Circular";
    readonly _nextModule: string = 'l2c5';
    readonly _goal: any;
    readonly _constraint: string = 'none';
    readonly _instructions: string =
    `<p> Did you see the words on the CANVAS changed? </p>
    <p> In our code, we make the variable a refer to the words "moo moo", and the variable b refer an ellipse(100, 100). </p>
    <p> As a result, when we tell the computer to print a, it will print "moo moo", and when we tell the computer to print b, it will print the circle. </p>
    <p> Let's take this one step further: Create a new variable c, and make it refer to ellipse(100, 100). Then write 2 statements to print c. What do you think would happen? </p>
    <p> GOAL: Create a variable c referring to an ellipse(100, 100), then write 2 statements to print c. </p>`;

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
