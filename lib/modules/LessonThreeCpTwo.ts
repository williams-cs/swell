import { Module } from "./Module";
import { Effect } from "../effects/Effect";
import { StringEffect } from "../effects/StringEffect";

export class LessonThreeCpTwo extends Module {
    readonly _name: string = "l3c2";
    readonly _nextModule: string = 'l3c3';
    readonly _goal: any;
    readonly _constraint: string = 'none';
    readonly _instructions: string =
        `
    <p> What we want is for the computer to only print "a is less than 10" ONLY when the value of a is truly less than 10. </p>
    <p> To do so, we use an if statement. Observe the CODE above. All we changed was to put in an if statement that checks whether a < 10. If a is, the code inside the curly braces {} are executed. </p>
    <p> Change the value of a to 12, 10, 8 and observe what happens. </p>
    <p> GOAL: RUN the CODE with a = 12 or 10 or 8. </p>`;

    readonly _starterCode: string =
        `a = 12;
print(a, 118, 63);
if(a < 10) {
\tprint("a is less than 10", 103, 143);
}`;

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
        let regex: RegExp = /a\s*=\s*8\s*/;
        let match = code.match(regex);
        codeIsCorrect = match != null && match.length > 0;

        //check for correct CANVAS effects
        let canvasIsCorrect = false;
        for (let effect of effects) {
            if (effect instanceof StringEffect && effect.str === "a is less than 10") {
                canvasIsCorrect = true;
                break;
            }
        }

        return codeIsCorrect && canvasIsCorrect;
    }
}
