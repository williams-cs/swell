import { Expression } from "../Expression";
import { Scope } from './Scope';
import { Dimensions } from './Dimensions';
import { Effect } from '../effects/Effect';

export abstract class AbstractPrintableNode<T extends AbstractPrintableNode<T, E>, E extends Effect<T>> extends Expression<T> {

    constructor(ws: string = "") {
        super(ws);
    }

    abstract draw(context: Scope, dims: Dimensions): void;

    abstract getEffect(scope: Scope, dims: Dimensions): E
}
