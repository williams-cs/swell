import { Expression } from "../Expression";
import { Scope } from "../structural/Scope";
import { Dimensions } from "../structural/Dimensions";
import { PrintNode } from "../structural/PrintNode";

export interface Effect<T>{
    draw(context: Scope, dims: Dimensions, ast: Expression<any>): void; // draws object
    ast(): Expression<T>; // returns expression that created obj
    update(): void;
    toSelString(): string; // returns string for selection logging
    toDragString(): string; // returns string for dragging
    //updateAST(): Expression<T>; // returns a new expression after manipulation
    //log(): string;
    x: number;
    y: number;
    idObj: {readonly _id: number, setID: boolean}; // the ID of the effect
    dims: Dimensions;
    selected: boolean;
    getJustDragged(): boolean;
    setJustDragged(val: boolean): void;
    initID(id: number): void;
    getID(): number;
    getSetID(): boolean;
    equalsVal(right: Expression<any> | Effect<any>): boolean;
}