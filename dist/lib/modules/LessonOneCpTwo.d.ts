import { Checkpoint } from "./Checkpoint";
import { Effect } from "../effects/Effect";
export declare class LessonOneCpTwo extends Checkpoint {
    readonly _name: string;
    readonly _prevModule: string;
    readonly _nextModule: string;
    readonly _goal: any;
    readonly _constraint: string;
    readonly _instructions: string;
    readonly _starterCode: string;
    _latestInstrIndex: number;
    constructor();
    x: number;
    y: number;
    drawGuides(ctx: CanvasRenderingContext2D): void;
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
