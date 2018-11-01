import { Module } from "./Module";
import { Effect } from "../effects/Effect";
import { EllipseEffect } from "../effects/EllipseEffect";
import { StringEffect } from "../effects/StringEffect";

export class LessonTwoCpThree implements Module {
    readonly _name: string = "l2c3";
    readonly _nextModule: string = 'l2c4';
    readonly _goal: any;
    readonly _constraint: string = 'none';
    readonly _instructions: string =
    `<p> So we can draw a circle and change it. But what if we want to draw both a circle and a word? </p>
    <p> Well, simple! Just put another print statement in the CODE area! </p>
    <p> GOAL: Draw 2 circles and a word on the CANVAS. </p>
    <p> HINT: Remember that the numbers right inside the ellipse(_,_) statement change the circle's sizes.`;

/*
    `<p> There's no limit to how many print statements the computer can understand, so you can write 1000 print statements, and the computer will draw 1000 things on the CANVAS for you! </p>
    <p> Now it's time to take your coding to the next level. Let's learn about variables. </p>
    <p> Variables are simply names you give to the things that you draw. </p>
    <p> For example, take a look at the code above. Change the a in the print statement to b, and observe what happened on the CANVAS. </p>
    <p> GOAL: Change a to b in the print statement. </p>`;
*/
/*
    readonly _starterCode = `
    a = "moo moo"
    b = ellipse(100, 100)
    print(a, 50, 70)`;
*/

    constructor(){
    }

    /**
     * A lesson to print a string
     * goals: moving the text and observe the code
     * @param document The HTML document
     * @param effects: the list of effects currently on the CANVAS
     */
    checkGoal(document: Document, effects: Effect<any>[]): boolean {
        let circleCount = 0;
        let stringExists = false;

        for (let effect of effects) {
          if (!stringExists) {
            stringExists = effect instanceof StringEffect && effect.str !== "";
          }

          if (effect instanceof EllipseEffect) {
            circleCount += 1;
          }
        }



        return stringExists && circleCount > 2;
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
