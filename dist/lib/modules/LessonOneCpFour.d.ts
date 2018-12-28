/// <reference types="codemirror" />
import { Module } from "./Module";
import { Effect } from "../effects/Effect";
export declare class LessonOneCpFour extends Module {
    readonly _name: string;
    readonly _prevModule: string;
    readonly _nextModule: string;
    readonly _goal: any;
    readonly _constraint: string;
    readonly _instructions: string;
    _latestInstrIndex: number;
    x: number;
    y: number;
    square_size: number;
    font_size: number;
    constructor(ctx: CanvasRenderingContext2D, editor: CodeMirror.Editor);
    drawGuides(): void;
    /**
     * A lesson to print a string
     * goals: moving the text and observe the code
     * @param document The HTML document
     * @param effects: the list of effects currently on the CANVAS
     */
    checkGoal(document: Document, effects: Effect<any>[]): boolean;
}
