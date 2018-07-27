export interface Module {
    readonly _name: string; // Module name
    readonly _goal: any; // What needs to be completed?
    readonly _instructions: string; // Instructions for student
    readonly _starterCode?: string; // Optional starter code

    checkGoal(document: Document, canvas: HTMLCanvasElement): boolean; // Check if module is complete

} 