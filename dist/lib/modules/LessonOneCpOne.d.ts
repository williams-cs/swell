import { Module } from "./Module";
import { Effect } from "../effects/Effect";
export declare class LessonOneCpOne implements Module {
    readonly _name: string;
    readonly _goal: any;
    readonly _instructions: string;
    constructor();
    /**
     * A lesson to print a string
     * goals: write any string on canvas
     * @param document The HTML document
     */
    checkGoal2(document: Document, effects: Effect<any>[]): boolean;
    /**
     * A lesson to print a string
     * goals: write any string on canvas
     * @param document The HTML document
     */
    checkGoal(document: Document): boolean;
    /**
     * Returns the module name
     */
    readonly name: string;
    /**
     * Returns the module instructions
     */
    readonly instructions: string;
}