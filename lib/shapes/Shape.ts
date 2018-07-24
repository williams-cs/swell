import {ColorNode} from './ColorNode';
import { NumberNode } from '../prims/NumberNode';
import { Expression } from '../Expression';

export abstract class Shape{
    constructor(private _color: ColorNode, private _xPos: Expression<NumberNode>, private _yPos: Expression<NumberNode>){}
    get color(): ColorNode{
        return this._color;
    }
    set color(color: ColorNode){
        this._color = color;
    }
    
    get xPos(): Expression<NumberNode>{
        return this._xPos;
    }
    set xPos(xPos: Expression<NumberNode>){
        this._xPos = xPos;
    }

    get yPos(): Expression<NumberNode>{
        return this._yPos;
    }
    set yPos(yPos: Expression<NumberNode>){
        this.yPos = yPos;
    }

    abstract move(): void;
}