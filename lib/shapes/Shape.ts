import {ColorNode} from './ColorNode';
import {PosNode} from '../PosNode';

export abstract class Shape{
    constructor(private _color: ColorNode, private _xPos: PosNode, private _yPos: PosNode){}
    get color(): ColorNode{
        return this._color;
    }
    set color(color: ColorNode){
        this._color = color;
    }
    
    get xPos(): PosNode{
        return this._xPos;
    }
    set xPos(xPos: PosNode){
        this._xPos = xPos;
    }

    get yPos(): PosNode{
        return this._yPos;
    }
    set yPos(yPos: PosNode){
        this.yPos = yPos;
    }

    abstract move(): void;
}