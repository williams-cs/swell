export abstract class Shape{
    constructor(public xPos: number, public yPos: number){}
   abstract move(): void;
}