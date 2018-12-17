import { Instruction } from "./Instruction";
import { Effect } from "../effects/Effect";
export declare abstract class Module {
    readonly _name: string;
    readonly _prevModule?: string;
    readonly _nextModule: string;
    readonly _goal: any;
    readonly _constraint: string;
    readonly _instructions: string;
    _starterCode?: string;
    ctx: CanvasRenderingContext2D;
    readonly _instrBoxes?: Instruction[];
    _instrIndex?: number;
    _latestInstrIndex: number;
    constructor(ctx: CanvasRenderingContext2D);
    /**
     * Checks if the module goals are fulfilled
     * @param document The HTML document
     */
    abstract checkGoal(document: Document, effects: Effect<any>[]): boolean;
    /**
     * Create guides to help lesson instructions
     * @param ctx the canvas 2D context
     */
    drawGuides?(): void;
    renderLatestInstruction(document: Document): void;
    renderNextInstruction(document: Document): void;
    renderPrevInstruction(document: Document): void;
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
