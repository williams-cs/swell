import { Module } from "./Module";
import { Effect } from "../effects/Effect";
export declare class LessonTwoCpOne implements Module {
    readonly _name: string;
    readonly _nextModule: string;
    readonly _goal: any;
    readonly _constraint: string;
    readonly _instructions: string;
    readonly _starterCode: string;
    constructor();
    /**
     * A lesson to print a string
     * goals: moving the text and observe the code
     * @param document The HTML document
     * @param effects: the list of effects currently on the CANVAS
     */
    checkGoal(document: Document, effects: Effect<any>[]): boolean;
    /**
     * Returns the module name
     */
    readonly name: string;
    /**
     * Returns the module instructions
     */
    readonly instructions: string;
}
