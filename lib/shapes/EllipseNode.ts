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
    private _width: PosNode;
    private _height: PosNode; 

    constructor(//ellipse: Ellipse, 
        color: ColorNode, xPos: PosNode, yPos: PosNode, width: PosNode, height: PosNode){
    //this.ellipse = ellipse;
    // Make width and height NumNodes?
    super(color, xPos, yPos);
    this._width = width;
    this._height = height;
    }

    get width(): PosNode{
        return this._width;
    }
    set width(width: PosNode){
        this._width = width;
    }

    get heigth(): PosNode{
        return this._height;
    }
    set height(height: PosNode){
        this._height = height;
    }
    // get methods? 

    eval(): any {
        // how evaluate to an ellipse?
        return null;
    }

    move(): void{}
}