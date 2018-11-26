import { Module } from "./Module";
import { Effect } from "../effects/Effect";
import { EllipseEffect } from "../effects/EllipseEffect";

export class LessonThreeCpSix implements Module {
    readonly _name: string = "l3c6";
    readonly _nextModule: string = 'l4c1';
    readonly _goal: any;
    readonly _constraint: string = 'none';
    readonly _instructions: string =
    `<p> Now that you know how to use if/else statements, let's put them all together! </p>
    <p> Above we have the CODE to draw 2 circles: circle A has height and width a, and circle B has height and width b. </p>
    <p> However, currently the claim that "Circle A is smaller than circle B." regardless of the circles' actual sizes. </p>
    <p> Create an if/else statement to print "Circle A is smaller than circle B." when it is actually so, and print "Circle A is bigger than circle B" otherwise. </p>
    <p> CHALLENGE: Create an if/else statement to print the correct claim about the sizes of the 2 circles. </p>`;

    readonly _starterCode: string =
    `a = 200;
print(a, 111, 103);
print(ellipse(a, a), 132, 287);
b = 100;
print(b, 337, 104);
print(ellipse(b, b), 371, 248);
print("Circle A is smaller than circle B.", 45, 453);
`;

    constructor(){
    }

    /**
     * A lesson leading into conditionals
     * goals: moving the text and observe the code
     * @param document: The HTML document
     * @param effects: the list of effects currently on the CANVAS
     */
    checkGoal(document: Document, effects: Effect<any>[]): boolean {
        //check for correct CODE
        let codeIsCorrect = false;
        let code = (document.getElementById("input") as HTMLInputElement).value;
        if (code != null) {
            let regex: RegExp = /if/;
            let match = code.match(regex);
            codeIsCorrect = match != null && match.length > 0;
        }

        //check for correct CANVAS effects
        let canvasIsCorrect = true;
        for (let effect of effects) {
          if (effect instanceof EllipseEffect) {

          }
        }

        return codeIsCorrect && canvasIsCorrect;
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
