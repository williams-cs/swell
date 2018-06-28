import {Ellipse} from './Ellipse';
//import {Node} from './Node';
import {Shape} from './Shape';
import {Expression} from '../Expression';
import {ColorNode} from './ColorNode';
import {Scope} from '../Scope';
import { NumberNode } from '../prims/NumberNode';

export class EllipseNode extends Shape implements Expression<Ellipse>{
    //private ellipse: Ellipse;
    //private parent: Node;
    //public xPos: PosNode;
    //public yPos: PosNode;
    private _width: NumberNode;
    private _height: NumberNode; 

    constructor(//ellipse: Ellipse, 
        color: ColorNode, xPos: NumberNode, yPos: NumberNode, width: NumberNode, height: NumberNode){
    //this.ellipse = ellipse;
    // Make width and height NumNodes?
    super(color, xPos, yPos);
    this._width = width;
    this._height = height;
    }

    draw(context: Scope): void {
    
    }

    eval(context: Scope): any {
        // how evaluate to an ellipse?
        return null;
    }

    move(): void{}

    get width(): NumberNode{
        return this._width;
    }
    set width(width: NumberNode){
        this._width = width;
    }

    get heigth(): NumberNode{
        return this._height;
    }
    set height(height: NumberNode){
        this._height = height;
    }
    // get methods? 
}