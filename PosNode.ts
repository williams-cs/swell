import{Node} from './node';

export class PosNode extends Node{
    public val: number;
    constructor(parent: Node, val: number){
        super(parent);
        this.val = val;
    }
}