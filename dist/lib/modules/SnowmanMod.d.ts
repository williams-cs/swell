import { Module } from "./Module";
import { Effect } from "../effects/Effect";
export declare class SnowmanMod implements Module {
    readonly _name: string;
    readonly _nextModule: string;
    readonly _goal: any;
    readonly _constraint: string;
    readonly _instructions: string;
    /**
     * Constructor for the Snowman module
     */
    constructor();
    /**
     * Checks goals and returns true if fulfilled, false otherwise
     * Goals: Three ellipses, circular, not too far away
     * @param document
     */
    checkGoal(document: Document, effects: Effect<any>[]): boolean;
    /**
     * Returns the distance between two (x,y) points
     * @param x1 The first point x coordinate
     * @param y1 The first point y coordinate
     * @param x2 The second point x coordinate
     * @param y2 The second point y coordinate
     */
    dist(x1: number, y1: number, x2: number, y2: number): number;
}
