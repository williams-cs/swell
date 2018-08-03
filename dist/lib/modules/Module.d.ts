export interface Module {
    readonly _name: string;
    readonly _goal: any;
    readonly _instructions: string;
    readonly _starterCode?: string;
    checkGoal(document: Document, canvas: HTMLCanvasElement): boolean;
}
