import { Shape } from './Shape';
import { Expression } from '../Expression';
import { ColorNode } from './ColorNode';
import { Scope } from '../structural/Scope';
import { NumberNode } from '../prims/NumberNode';
import { EllipseEffect } from '../effects/EllipseEffect';

export class EllipseNode extends Shape implements Expression<EllipseNode>{
    private _width: Expression<NumberNode>;
    private _height: Expression<NumberNode>; 
    
    constructor(//ellipse: Ellipse, 
        color: ColorNode, xPos: Expression<NumberNode>, yPos: Expression<NumberNode>, width: Expression<NumberNode>, height: Expression<NumberNode>){
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

    get width(): Expression<NumberNode>{
        return this._width;
    }
    set width(width: Expression<NumberNode>){
        this._width = width;
    }

    get heigth(): Expression<NumberNode>{
        return this._height;
    }
    set height(height: Expression<NumberNode>){
        this._height = height;
    }
    // get methods? 
}