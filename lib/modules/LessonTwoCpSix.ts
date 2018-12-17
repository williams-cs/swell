import { Module } from "./Module";
import { Effect } from "../effects/Effect";
import { EllipseEffect } from "../effects/EllipseEffect";

export class LessonTwoCpSix extends Module {
    readonly _name: string = "l2c6";
    readonly _nextModule: string = 'l2c7';
    readonly _goal: any;
    readonly _constraint: string = 'code';
    readonly _instructions: string =
    `<p> Now that you have drawn 2 circles both are called c, let's see what happens when you try to modify one of them. </p>
    <p> Click on one of the circles on the CANVAS, and try make it bigger. Observe what happens to your declaration of c. </p>
    <p> GOAL: Enlarge one of the circles referred to by c on the CANVAS. </p>`;

    /**
     * A lesson to print a string
     * goals: moving the text and observe the code
     * @param document: The HTML document
     * @param effects: the list of effects currently on the CANVAS
     */
    checkGoal(document: Document, effects: Effect<any>[]): boolean {
      for (let effect of effects) {
        if (effect instanceof EllipseEffect) {
          if (effect.w > 250 && effect.h > 250) {
            return true;
          }
        }
      }
      return false;
    }
}
