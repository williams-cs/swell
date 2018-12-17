import { Module } from "./Module";
import { Effect } from "../effects/Effect";
import { EllipseEffect } from "../effects/EllipseEffect";

export class LessonTwoCpTwo extends Module {
    readonly _name: string = "l2c2";
    readonly _nextModule: string = 'l2c3';
    readonly _goal: any;
    readonly _constraint: string = 'code';
    readonly _instructions: string =
    `<p> We can write ellipse(100, 100) in the print statement to draw a circle on the CANVAS. </p>
    <p> What are the numbers (100, 100) for? I'm glad you asked... </p>
    <p> Because the CODE area is frozen again! Drag one of the 9 white tips around the circle on the CANVAS to see how the number changes! </p>
    <p> GOAL: Make the circle wider but shorter. </p>`;
    /*
    `<p> So we can draw a circle and change it. But what if we want to draw both a circle and a word? </p>
    <p> Well, simple! Just write another print statement in the CODE area! </p>
    <p> GOAL: Draw 2 circles and a word on the CANVAS. </p>
    <p> HINT: Remember that the numbers right inside the ellipse(_,_) statement change the circle's sizes.`;
*/

    /**
     * A lesson to print a string
     * goals: moving the text and observe the code
     * @param document The HTML document
     * @param effects: the list of effects currently on the CANVAS
     */
    checkGoal(document: Document, effects: Effect<any>[]): boolean {
        for (let effect of effects) {
          if (effect instanceof EllipseEffect) {
            if (effect.w > 200 && effect.h < 80) {
              return true;
            }
          }
        }
        return false;
    }
}
