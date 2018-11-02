import { Module } from "./Module";
import { Effect } from "../effects/Effect";
import { EllipseEffect } from "../effects/EllipseEffect";

export class LessonTwoCpSeven implements Module {
    readonly _name: string = "l2c7";
    readonly _nextModule: string = 'l2c7';
    readonly _goal: any;
    readonly _constraint: string = 'none';
    readonly _instructions: string =
    `<p> Changing one circle changes c, which will then in turn change the other circle! </p>
    <p> Now let's put all we have learned to practice. </p>
    <p> Create a caterpillar in the shape of the given outlines. </p>
    <p> CHALLENGE: Create a caterpillar. </p>
    <p> HINT: Remember to use variables to print a lot of identical circles quickly! </p>`;

    constructor(){
    }

    /**
     * A lesson to print a string
     * goals: moving the text and observe the code
     * @param document: The HTML document
     * @param effects: the list of effects currently on the CANVAS
     */
    checkGoal(document: Document, effects: Effect<any>[]): boolean {
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
