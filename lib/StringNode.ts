import {Expression} from './Expression';
import{Node} from './Node';

// Nodes representing strings
// Should abstract Node class implement Expression?

export class StringNode extends Node implements Expression <string>{
    public str: string;
    constructor(parent: Node, str: string){
        super(parent);
        this.str = str;
    };

    eval(): string {
        return this.str;
    }
    
    /*
    get parent(): Node{
        return this.parent;
    }
    */
}