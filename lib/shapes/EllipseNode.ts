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
    private _newLine : boolean = false;
    
    constructor(width: Expression<NumberNode>, height: Expression<NumberNode>){
        this._width = width;
        this._height = height;
    }

    draw(context: Scope, dims: Dimensions, ast: Expression<any>): void {
        dims.width = this._width;
        dims.height = this._height;
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

    get height(): Expression<NumberNode>{
        return this._height;
    }
    set height(height: Expression<NumberNode>){
        this._height = height;
    }

    newLine() : boolean {
        return this._newLine;
    }

    toString() : string {
        return "ellipse(" + this._width.toString() + ", " + this._height.toString() + ")"
    }
    // get methods? 
}