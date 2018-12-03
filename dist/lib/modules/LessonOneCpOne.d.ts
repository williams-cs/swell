import { Module } from "./Module";
import { Instruction } from "./Instruction";
import { Effect } from "../effects/Effect";
export declare class LessonOneCpOne implements Module {
    readonly _name: string;
    readonly _nextModule: string;
    readonly _goal: any;
    readonly _constraint: string;
    readonly _instructions: string;
    readonly _instrBoxes: Instruction[];
    _instrIndex: number;
    _latestInstrIndex: number;
    constructor();
    /**
     * A lesson to print a string
     * goals: write any string on CANVAS
     * @param document: The HTML document
     * @param effects: the list of effects currently on the CANVAS
     */
    checkGoal(document: Document, effects: Effect<any>[]): boolean;
    nextInstruction(document: Document): void;
    prevInstruction(document: Document): void;
    /**
     * render the current instruction of this checkpoint
     * @param document The HTML document
     */
    renderInstruction(document: Document): void;
    /**
     * Returns the module name
     */
    readonly name: string;
    /**
     * Returns the module instructions
     */
    readonly instructions: string;
}
