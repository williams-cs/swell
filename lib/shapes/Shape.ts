import {ColorNode} from './ColorNode';
import { NumberNode } from '../prims/NumberNode';

export abstract class Shape{
    constructor(private _color: ColorNode, private _xPos: NumberNode, private _yPos: NumberNode){}
    get color(): ColorNode{
        return this._color;
    }
    set color(color: ColorNode){
        this._color = color;
    }
    
    get xPos(): NumberNode{
        return this._xPos;
    }
    set xPos(xPos: NumberNode){
        this._xPos = xPos;
    }

    get yPos(): NumberNode{
        return this._yPos;
    }
    set yPos(yPos: NumberNode){
        this.yPos = yPos;
    }

    abstract move(): void;
}