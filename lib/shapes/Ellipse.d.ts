import { ColorNode } from './ColorNode';
import { Shape } from './Shape';
import { Effect } from '../Ignore for now/Effect';
import { Expression } from '../Expression';
import { NumberNode } from '../prims/NumberNode';
export declare class Ellipse extends Shape implements Effect<any> {
    private _width;
    private _height;
    value: any;
    constructor(color: ColorNode, xPos: NumberNode, yPos: NumberNode, width: number, height: number);
    move(): void;
    draw(): void;
    ast(): Expression<any>;
}
