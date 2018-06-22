import {ColorNode} from './ColorNode';
import {Shape} from './Shape';
import {PosNode} from '../prims/PosNode';

export class Ellipse extends Shape{
    private width: number;
    private height: number;

    constructor(color: ColorNode, xPos: PosNode, yPos: PosNode, width: number, height: number){
        super (color, xPos, yPos);
        this.width = width;
        this.height = height;
    };
    //get and set
    //also is this actually necessary?
    move(){};
}
