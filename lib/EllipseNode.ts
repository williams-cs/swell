import{Ellipse} from './Ellipse';
import {Node} from './Node';
import {Expression} from './Expression';
import {PosNode} from './PosNode';

export class EllipseNode extends Node implements Expression<Ellipse>{
    //private ellipse: Ellipse;
    //private parent: Node;
    public xPos: Node;
    public yPos: Node;
    public width: Node;
    public height: Node; 

    constructor(//ellipse: Ellipse, 
        parent: Node, xPos: PosNode, yPos: PosNode, width: PosNode, height: PosNode){
    super(parent);
    //this.ellipse = ellipse;
    this.xPos = xPos;
    this.yPos = yPos;
    this.width = width;
    this.height = height;
    }

    eval(): Ellipse {
        // how evaluate to an ellipse?
        return null;
    }
}