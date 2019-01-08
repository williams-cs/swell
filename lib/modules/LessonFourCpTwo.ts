import { Module } from "./Module";
import { Effect } from "../effects/Effect";
import { EllipseEffect } from "../effects/EllipseEffect";

export class LessonFourCpTwo extends Module {
    readonly _name: string = "l4c2";
    readonly _goal: any;
    readonly _constraint: string = 'none';
    readonly _instructions: string =
        `<p> Yes! You got this! </p>
    <p> Now let's put those skills in if/else statements to work! </p>
    <p> Create a pair of if/else statements to print out to the CANVAS a claim of whether the circle is positioned ABOVE or BELOW the rectangle. </p>
    <p> CHALLENGE: Print a claim that states whether circle is ABOVE or BELOW the rectangle. </p>
    <p> HINT: Remember that the numbers in the print() statements determine the position of the shapes being printed. </p>`;

    /**
     * A lesson leading into conditionals
     * goals: moving the text and observe the code
     * @param document: The HTML document
     * @param effects: the list of effects currently on the CANVAS
     */
    checkGoal(document: Document, effects: Effect<any>[]): boolean {
        //check for correct CODE
        let codeIsCorrect = false;
        let code: string = this.editor.getValue();
        let regex: RegExp = /print\s*\(\s*ellipse\s*\(\s*[1-9][0-9]*\s*,\s*[1-9][0-9]*\s*\)\s*,\s*[1-9][0-9]*\s*,\s*[1-9][0-9]*\s*\);/;
        let match = code.match(regex);
        codeIsCorrect = match != null && match.length > 0;

        //check for correct CANVAS effects
        let canvasIsCorrect = true;
        for (let effect of effects) {
            if (effect instanceof EllipseEffect) {

            }
        }

        return codeIsCorrect && canvasIsCorrect;
    }
}
