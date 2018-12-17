import { Instruction } from "./Instruction";
import { Effect } from "../effects/Effect";

export abstract class Module {
    readonly _name: string; // Module name
    readonly _prevModule?: string; // Name of previous checkpoint
    readonly _nextModule: string; // Name of next checkpoint
    readonly _goal: any; // What needs to be completed?
    readonly _constraint: string; // freezing either the Code or Canvas area
    readonly _instructions: string; // Instructions for student
    _starterCode?: string; // Optional starter code
    ctx: CanvasRenderingContext2D; // Canvas for drawing

    readonly _instrBoxes?: Instruction[];
    _instrIndex?: number;

    constructor(ctx: CanvasRenderingContext2D) {
      this.ctx = ctx;
    }

    /**
     * Checks if the module goals are fulfilled
     * @param document The HTML document
     */
    abstract checkGoal(document: Document, effects: Effect<any>[]): boolean;

    /**
     * Create guides to help lesson instructions
     * @param ctx: the canvas 2D context
     */
    drawGuides?(): void {};

    /**
     * render the current instruction of this checkpoint
     * @param document The HTML document
     */
    renderInstruction?(document: Document): void;
    renderLatestInstruction?(document: Document): any;
    renderNextInstruction?(document: Document): any;
    renderPrevInstruction?(document: Document): any;

    /**
     * Returns the module name
     */
    get name(): string {
        return this._name;
    }

    /**
     * Returns the module instructions
     */
    get instructions(): string {
        return this._instructions;
    }

    //instrBoxes(): Instruction[];
    //instrIndex(): number;
}
