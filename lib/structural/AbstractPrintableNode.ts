import { Effect } from "../effects/Effect";
import { Expression } from "../Expression";
import { PrintNode } from "./PrintNode";
import { Scope } from "./Scope";

export abstract class AbstractPrintableNode<T extends AbstractPrintableNode<T, E>, E extends Effect<T>> extends Expression<T> {

    draw(scope: Scope, aes: PrintNode): void {
        let x = this.getEffect(scope, aes);
        x.draw();
    };

    abstract getEffect(context: Scope, aes: PrintNode): E
}
