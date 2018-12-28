/// <reference types="codemirror" />
import { Module } from "./Module";
import { Effect } from "../effects/Effect";
export declare class LessonTwoCpTwo extends Module {
    readonly _name: string;
    readonly _nextModule: string;
    readonly _goal: any;
    readonly _constraint: string;
    readonly _instructions: string;
    readonly _starterCode: string;
    _latestInstrIndex: number;
    x: number;
    y: number;
    rect_h: number;
    rect_w: number;
    font_size: number;
    constructor(ctx: CanvasRenderingContext2D, editor: CodeMirror.Editor);
    drawGuides(): void;
    /**
     *
     * @param document The HTML document
     * @param effects the list of effects currently on the CANVAS
     */
    checkGoal(document: Document, effects: Effect<any>[]): boolean;
}
