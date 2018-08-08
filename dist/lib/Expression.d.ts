import { Scope } from './structural/Scope';
import { Dimensions } from './structural/Dimensions';
import { Effect } from './effects/Effect';
export interface Expression<T> {
    eval(parent: Scope): T;
    draw(context: Scope, dims: Dimensions, ast: Expression<any>): void;
    toString(): string;
    newLine(): boolean;
    equalsVal(right: Expression<any> | Effect<any>): boolean;
}
