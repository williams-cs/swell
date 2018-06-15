import{Ellipse} from './ellipse';
import {Node} from './node';
import {PosNode} from './posNode';

export class EllipseNode extends Node {
    private ellipse: Ellipse;
    //private parent: Node;
    public xPos: Node;
    public yPos: Node;
    public width: Node;
    public height: Node; 

    constructor(ellipse: Ellipse, parent: Node, xPos: PosNode, yPos: PosNode, width: PosNode, height: PosNode){
        super(parent);
        this.ellipse = ellipse;
        this.xPos = xPos;
        this.yPos = yPos;
        this.width = width;
        this.height = height;
    }
}