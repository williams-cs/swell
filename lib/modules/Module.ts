export interface Module {
    name: string; // Module name
    predicate: any; // What needs to be completed?
    instructions: string; // Instructions for student
    starterCode?: string; // Optional starter code

    checkGoal(): boolean; // Check if module is complete

} 