import { Module } from "./Module";
import { Effect } from "../effects/Effect";
export declare class LessonThreeCpSix extends Module {
    readonly _name: string;
    readonly _nextModule: string;
    readonly _goal: any;
    readonly _constraint: string;
    readonly _instructions: string;
    xA: number;
    yA: number;
    xB: number;
    yB: number;
    a_size: number;
    b_size: number;
    square_size: number;
    font_size: number;
    constructor(ctx: CanvasRenderingContext2D);
    drawGuides(): void;
    /**
     * A lesson leading into conditionals
     * goals: moving the text and observe the code
     * @param document: The HTML document
     * @param effects: the list of effects currently on the CANVAS
     */
    checkGoal(document: Document, effects: Effect<any>[]): boolean;
}
