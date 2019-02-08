import { Effect } from "../effects/Effect";
import { Expression } from "../Expression";
import { PrintNode } from "./PrintNode";
import { Scope } from "./Scope";

export abstract class AbstractPrintableNode<T extends AbstractPrintableNode<T, E>, E extends Effect<T>> extends Expression<T> {

    draw(scope: Scope, aes: PrintNode): void {
        this.getEffect(scope, aes).draw();
    };

    abstract getEffect(context: Scope, aes: PrintNode): E
}
