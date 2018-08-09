import { Expression } from "../Expression";
import { Scope } from "../structural/Scope";
import { Dimensions } from "../structural/Dimensions";
export interface Effect<T> {
    draw(context: Scope, dims: Dimensions, ast: Expression<any>): void;
    ast(): Expression<T>;
    update(): void;
    toSelString(): string;
    toDragString(): string;
    toIDString(): string;
    x: number;
    y: number;
    idObj: {
        readonly _id: number;
    };
    dims: Dimensions;
    selected: boolean;
    getJustDragged(): boolean;
    setJustDragged(val: boolean): void;
    initID(id: number): void;
    getID(): number;
    equalsVal(right: Expression<any> | Effect<any>): boolean;
}
