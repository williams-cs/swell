import {Scope} from './structural/Scope';
import { NumberNode } from './prims/NumberNode';
import { Dimensions } from './structural/Dimensions';
import { PrintNode } from './structural/PrintNode';

export interface Expression <T>{
    //export abstract class Node{
        eval(parent: Scope): T;
        draw(context: Scope, x: number, y: number, dims: Dimensions, ast: PrintNode): void;
        //get(): T;
        //set(value: T): void;
}