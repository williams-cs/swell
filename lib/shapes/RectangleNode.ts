import { Expression } from '../Expression';
import { Scope } from '../structural/Scope';
import { NumberNode } from '../prims/NumberNode';
import { RectangleEffect } from '../effects/RectangleEffect';
import { Dimensions } from '../structural/Dimensions';

export class RectangleNode implements Expression<RectangleNode> {
    private _width: Expression<NumberNode>;
    private _height: Expression<NumberNode>; 
    private _newLine : boolean = false;
    private _ws : string;
    
    constructor(width: Expression<NumberNode>, height: Expression<NumberNode>, ws : string){
        this._width = width;
        this._height = height;
        this._ws = ws;
    }

    draw(context: Scope, dims: Dimensions, ast: Expression<any>): void {
        dims.width = new NumberNode(this._width.eval(context).val, "");
        dims.height = new NumberNode(this._height.eval(context).val, "");
        let e = new RectangleEffect(this);
        e.draw(context, dims, ast);
    }

    eval(context: Scope): RectangleNode {
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
        return this._ws + "rect(" + this._width.toString() + ", " + this._height.toString() + ")";
    }
    // get methods? 
}