import {Ellipse} from './Ellipse';
//import {Node} from './Node';
import {Shape} from './Shape';
import {Expression} from '../Expression';
import {PosNode} from '../PosNode';
import {ColorNode} from './ColorNode';

export class EllipseNode extends Shape implements Expression<Ellipse>{
    //private ellipse: Ellipse;
    //private parent: Node;
    //public xPos: PosNode;
    //public yPos: PosNode;
    public width: PosNode;
    public height: PosNode; 

    constructor(//ellipse: Ellipse, 
        color: ColorNode, xPos: PosNode, yPos: PosNode, width: PosNode, height: PosNode){
    //this.ellipse = ellipse;
    super(color, xPos, yPos);
    this.width = width;
    this.height = height;
    }

    // get methods? 

    eval(): any {
        // how evaluate to an ellipse?
        return null;
    }

    move(): void{}
}