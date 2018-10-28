import { Effect } from "../effects/Effect";

export interface Module {
    readonly _name: string; // Module name
    readonly _nextModule: string; // Lesson that this checkpoint belongs to
    readonly _goal: any; // What needs to be completed?
    readonly _instructions: string; // Instructions for student
    readonly _starterCode?: string; // Optional starter code

    /**
     * Checks if the module goals are fulfilled
     * @param document The HTML document
     */
    checkGoal(document: Document, effects: Effect<any>[]): boolean;
}
