import { Module } from "./Module";
export declare class LessonOneCpOne implements Module {
    readonly _name: string;
    readonly _goal: any;
    readonly _instructions: string;
    constructor();
    /**
     * A module to draw a circle
     * goals: width = height and x and y are between 150 and 350
     * @param document The HTML document
     */
    checkGoal(document: Document): boolean;
    /**
     * Returns the distance between two (x,y) points
     * @param x1 The first point x coordinate
     * @param y1 The first point y coordinate
     * @param x2 The second point x coordinate
     * @param y2 The second point y coordinate
     */
    dist(x1: number, y1: number, x2: number, y2: number): number;
    /**
     * Returns the module name
     */
    readonly name: string;
    /**
     * Returns the module instructions
     */
    readonly instructions: string;
}
