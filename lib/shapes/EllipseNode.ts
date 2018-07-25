import { Shape } from './Shape';
import { Expression } from '../Expression';
import { ColorNode } from './ColorNode';
import { Scope } from '../structural/Scope';
import { NumberNode } from '../prims/NumberNode';
import { EllipseEffect } from '../effects/EllipseEffect';
import { Dimensions } from '../structural/Dimensions';
import { PrintNode } from '../structural/PrintNode';

export class EllipseNode implements Expression<EllipseNode> {
    private _width: Expression<NumberNode>;
    private _height: Expression<NumberNode>; 
    
    constructor(width: Expression<NumberNode>, height: Expression<NumberNode>){
        this._width = width;
        this._height = height;
    }

    draw(context: Scope, dims: Dimensions, ast: Expression<any>): void {
        let radius = this._width.eval(context).val / 2;
        dims.radius = new NumberNode(radius);
        let e = new EllipseEffect(this);
        e.draw(context, dims, ast);
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