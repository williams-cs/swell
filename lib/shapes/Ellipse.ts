import {ColorNode} from './ColorNode';
import {Shape} from './Shape';
import { Effect } from '../Ignore for now/Effect';
import { Expression } from '../Expression';
import { NumberNode } from '../prims/NumberNode';

export class Ellipse extends Shape implements Effect<any>{
    private _width: number;
    private _height: number;
    public value: any;

    constructor(color: ColorNode, xPos: NumberNode, yPos: NumberNode, width: number, height: number){
        super (color, xPos, yPos);
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
