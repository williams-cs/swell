import {Expression} from './Expression';
//import{Node} from './Node';

// Nodes representing numbers
// Should abstract Node class implement Expression?

export class NumberNode implements Expression <number>{
    public val: number;

    constructor(val: number){
        //super(parent);
        this.val = val;
    };

    eval(): number {
        return this.val;
    }

    /*
    get parent(): Node{
        return this.parent;
    }
    */
}