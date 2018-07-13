import { Ellipse } from './Ellipse';
//import {Node} from './Node';
import { Shape } from './Shape';
import { Expression } from '../Expression';
import { ColorNode } from './ColorNode';
import { Scope } from '..';
import { NumberNode } from '../prims/NumberNode';
import { EllipseEffect } from '../effects/EllipseEffect';

export class EllipseNode extends Shape implements Expression<EllipseNode>{
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

    draw(context: Scope, x: number, y: number): void {
        let e = new EllipseEffect(this);
        e.draw(context, x, y);
    }

    eval(context: Scope): EllipseNode {
        return this;
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