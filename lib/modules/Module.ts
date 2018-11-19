import { Effect } from "../effects/Effect";

export interface Module {
    readonly _name: string; // Module name
    readonly _prevModule?: string; // Name of previous checkpoint
    readonly _nextModule: string; // Name of next checkpoint
    readonly _goal: any; // What needs to be completed?
    readonly _constraint: string; // freezing either the Code or Canvas area
    readonly _instructions: string; // Instructions for student
    readonly _starterCode?: string; // Optional starter code

    /**
     * Checks if the module goals are fulfilled
     * @param document The HTML document
     */
    checkGoal(document: Document, effects: Effect<any>[]): boolean;
    /**
     * Create guides to help lesson instructions
     * @param ctx: the canvas 2D context
     */
    drawGuides?(ctx: CanvasRenderingContext2D): void;
}
