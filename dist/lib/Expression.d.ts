import { Scope } from './structural/Scope';
import { Dimensions } from './structural/Dimensions';
import { PrintNode } from './structural/PrintNode';
export interface Expression<T> {
    eval(parent: Scope): T;
    draw(context: Scope, x: number, y: number, dims: Dimensions, ast: PrintNode): void;
}
