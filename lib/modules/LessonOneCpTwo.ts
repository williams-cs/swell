import { Module } from "./Module";
import { Effect } from "../effects/Effect";
import { StringEffect } from "../effects/StringEffect";

export class LessonOneCpTwo implements Module {
    readonly _name: string = "l1c2";
    readonly _nextModule: string = 'l1c3';
    readonly _goal: any;
    readonly _constraint: string = 'code';
    readonly _instructions: string =
    `<p> You just told the computer to write words on the CANVAS! </p>
    <p> Now let's do something more interesting: click on the words on the CANVAS, then move it to the top left of the screen. Observe what happens to your code. </p>
    <p> GOAL: Move the words you just created to the top left of the screen. </p>`;

    constructor(){
    }

    drawGuides(context: CanvasRenderingContext2D): void {
      context.beginPath();
      context.rect(188, 50, 200, 100);
      context.strokeStyle = 'black';
      context.stroke();
    }

    /**
     * A lesson to print a string
     * goals: moving the text and observe the code
     * @param document The HTML document
     * @param effects: the list of effects currently on the CANVAS
     */
    checkGoal(document: Document, effects: Effect<any>[]): boolean {
        for (let effect of effects) {
          if (effect instanceof StringEffect && effect.str !== "") {
            if (effect.x < 10 && effect.y < 70) {
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
