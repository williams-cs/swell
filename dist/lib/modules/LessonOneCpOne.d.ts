/// <reference types="codemirror" />
import { Module } from "./Module";
import { Effect } from "../effects/Effect";
export declare class LessonOneCpOne extends Module {
    readonly _name: string;
    readonly _goal: any;
    readonly _constraint: string;
    readonly _instructions: string;
    readonly _starterCode: string;
    _latestInstrIndex: number;
    constructor(ctx: CanvasRenderingContext2D, editor: CodeMirror.Editor);
    /**
     * A lesson to print a string
     * goals: write any string on CANVAS
     * @param document The HTML document
     * @param effects the list of effects currently on the CANVAS
     */
    checkGoal(document: Document, effects: Effect<any>[]): boolean;
}
