import { Module } from "./Module";
import { Effect } from "../effects/Effect";
import { EllipseEffect } from "../effects/EllipseEffect";

export class LessonFourCpOne extends Module {
    readonly _name: string = "l4c1";
    readonly _goal: any;
    readonly _constraint: string = 'none';
    readonly _instructions: string =
        `<p> You've made it to the FINAL CHALLENGES! Complete these challenges to earn ETERNAL GLORY! </p>
    <p> Throughout this Hour of Code, you have learned: </p>
    <p> - How to print a word, circle, rectangle, and curve. </p>
    <p> - How to store any of the value above in a variable. </p>
    <p> - How to use if/else statement to check a condition about a variable. </p>
    <p> Each of the following challenges will test these concepts. Let's dive right in! </p>
    <p> Print a circle and put its height and width in one of the boxes to the side. Then print a rectangle and put its height and width in the box. </p>
    <p> CHALLENGE: Print a circle and rectangle. Put their respective width and height in the boxes provided. </p>`;

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
