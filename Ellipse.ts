import {Shape} from './shape';

export class Ellipse extends Shape{
    protected width: number;
    protected height: number;

    constructor(xPos: number, yPos: number, width: number, height: number){
        super (xPos, yPos);
        this.width = width;
        this.height = height;
    };
    move(){};
}
