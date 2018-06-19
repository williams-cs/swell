import {ColorNode} from './ColorNode';
import {Shape} from './Shape';
import {PosNode} from './PosNode';

export class Ellipse extends Shape{
    protected width: number;
    protected height: number;

    constructor(color: ColorNode, xPos: PosNode, yPos: PosNode, width: number, height: number){
        super (color, xPos, yPos);
        this.width = width;
        this.height = height;
    };
    move(){};
}
