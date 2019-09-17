import { AbstractBuiltinFunctionNode } from "../funhouse/AbstractBuiltinFunctionNode";
import { Effect } from "../effects/Effect";
import { PrintNode } from "./PrintNode";
import { Scope } from "./Scope";

export abstract class AbstractPrintableFunctionNode<T extends AbstractPrintableFunctionNode<T, E>, E extends Effect<T>> extends AbstractBuiltinFunctionNode<T> {

    draw(scope: Scope, aes: PrintNode): void {
        this.getEffect(scope, aes).draw();
    };

    abstract getEffect(context: Scope, aes: PrintNode): E
}
