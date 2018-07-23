import { Scope } from './structural/Scope';
import { Dimensions } from './structural/Dimensions';
export interface Expression<T> {
    eval(parent: Scope): T;
    draw(context: Scope, dims: Dimensions, ast: Expression<any>): void;
}
