import {Node} from './Node';
import {Expression} from './Expression';

// A Position Node

export class PosNode extends Node implements Expression<number>{
    public val: number;
    constructor(parent: Node, val: number){
        super(parent);
        this.val = val;
    }

    eval(): number {
        return this.val;
    }
}