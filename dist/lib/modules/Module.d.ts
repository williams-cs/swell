import { Effect } from "../effects/Effect";
export interface Module {
    readonly _name: string;
    readonly _nextModule: string;
    readonly _goal: any;
    readonly _constraint: string;
    readonly _instructions: string;
    readonly _starterCode?: string;
    /**
     * Checks if the module goals are fulfilled
     * @param document The HTML document
     */
    checkGoal(document: Document, effects: Effect<any>[]): boolean;
}
