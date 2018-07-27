export interface Module {
    name: string;
    predicate: any;
    instructions: string;
    starterCode?: string;
    checkGoal(): boolean;
}
