import { Instruction } from "./Instruction";
import { Effect } from "../effects/Effect";
export interface Module {
    readonly _name: string;
    readonly _prevModule?: string;
    readonly _nextModule: string;
    readonly _goal: any;
    readonly _constraint: string;
    readonly _instructions: string;
    readonly _starterCode?: string;
    readonly _instrBoxes?: Instruction[];
    _instrIndex?: number;
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
    /**
     * render the current instruction of this checkpoint
     * @param document The HTML document
     */
    renderInstruction?(document: Document): void;
}
