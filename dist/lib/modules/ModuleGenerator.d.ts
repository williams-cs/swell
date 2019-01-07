/// <reference types="codemirror" />
import { Module } from "./Module";
export declare class ModuleGenerator {
    curConstructors: Map<string, (ctx: CanvasRenderingContext2D, editor: CodeMirror.Editor) => Module>;
    checkpoints: Map<string, Module>;
    constructor();
    createModule(cp: string, ctx: CanvasRenderingContext2D, editor: CodeMirror.Editor): Module;
}
