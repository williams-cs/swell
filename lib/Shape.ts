import {ColorNode} from './ColorNode';
import {PosNode} from './PosNode';

export abstract class Shape{
    constructor(public color: ColorNode, public xPos: PosNode, public yPos: PosNode){}
   abstract move(): void;
}