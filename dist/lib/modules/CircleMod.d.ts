import { Module } from "./Module";
export declare class CircleMod implements Module {
    readonly _name: string;
    readonly _goal: any;
    readonly _instructions: string;
    constructor();
    checkGoal(document: Document, canvas: HTMLCanvasElement): boolean;
    dist(x1: number, y1: number, x2: number, y2: number): number;
}
