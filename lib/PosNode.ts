//import {Node} from './Node';
import {Expression} from './Expression';

// A Position Node

export class PosNode implements Expression<number>{
    public val: number;
    constructor(val: number){
        this.val = val;
    }

    eval(): number {
        return this.val;
    }
}