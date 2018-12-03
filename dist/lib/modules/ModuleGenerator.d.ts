import { Module } from "./Module";
export declare class ModuleGenerator {
    readonly checkpointConstructors: Map<string, () => Module>;
    checkpoints: Map<string, Module>;
    constructor();
    generateCheckpoint(cp: string): Module;
}
