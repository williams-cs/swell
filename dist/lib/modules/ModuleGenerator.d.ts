import { Module } from "./Module";
export declare class ModuleGenerator {
    curConstructors: Map<string, () => Module>;
    readonly dmConstructors: Map<string, () => Module>;
    readonly nonDmConstructors: Map<string, () => Module>;
    checkpoints: Map<string, Module>;
    constructor(isDM: boolean);
    generateCheckpoint(cp: string): Module;
}
