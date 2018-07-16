import {ColorNode, Expression, NumberNode} from '../..';

// export class Ellipse extends Shape implements Effect<any>{
export class Ellipse {
    private _width: number;
    private _height: number;
    public value: any;

    constructor(color: ColorNode, xPos: NumberNode, yPos: NumberNode, width: number, height: number){
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
