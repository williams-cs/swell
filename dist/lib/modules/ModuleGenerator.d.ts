import { Module } from "./Module";
export declare class ModuleGenerator {
    ctx: CanvasRenderingContext2D;
    curConstructors: Map<string, () => Module>;
    readonly dmConstructors: Map<string, () => Module>;
    readonly nonDmConstructors: Map<string, () => Module>;
    checkpoints: Map<string, Module>;
    constructor(ctx: CanvasRenderingContext2D, isDM: boolean);
    generateCheckpoint(cp: string): Module;
}
