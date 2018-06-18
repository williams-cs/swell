import {Expression} from './Expression';
import{Node} from './Node';

export class NumberNode extends Node implements Expression <number>{
    public val: number;
    constructor(parent: Node | null, val: number){
        super(parent);
        this.val = val;
    };

    eval(): number {
        return this.val;
    }
}