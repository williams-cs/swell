import {ColorNode} from '../shapes/ColorNode';
import { NumberNode } from '../prims/NumberNode';
import { Expression } from '../Expression';

export abstract class Shape{
    /**
     * Abstract class constructor for a Shape
     * @param _color The shape color
     * @param _xPos The x coordinate of the shape
     * @param _yPos The y coordinate of the shape
     */
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