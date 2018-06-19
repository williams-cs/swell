import {Expression} from './Expression';
//import{Node} from './Node';

// Nodes representing strings
// Should abstract Node class implement Expression?

export class StringNode implements Expression<string>{
    public str: string;
    constructor(str: string){
        this.str = str;
    };

    eval(): string {
        return this.str;
    }
}