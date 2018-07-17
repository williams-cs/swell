import {ColorNode} from './ColorNode';
import { Expression } from '../Expression';
import { NumberNode } from '../prims/NumberNode';

// export class Ellipse extends Shape implements Effect<any>{
export class Ellipse {
    private _width: NumberNode;
    private _height: NumberNode;
    public value: any;

    constructor(color: ColorNode, xPos: NumberNode, yPos: NumberNode, width: NumberNode, height: NumberNode){
        // super (color, xPos, yPos);
        this._width = width;
        this._height = height;
    };
    //get and set
    //also is this actually necessary?
    move(){};

    draw(){};

    ast(): Expression<any>{
        return null;
    };
}
