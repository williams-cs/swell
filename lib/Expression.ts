import {Scope} from './structural/Scope';
import { NumberNode } from './prims/NumberNode';
import { Dimensions } from './structural/Dimensions';
import { PrintNode } from './structural/PrintNode';

export interface Expression <T>{
    //export abstract class Node{
        //newLineTerminated;
        eval(parent: Scope): T;
        draw(context: Scope, dims: Dimensions, ast: Expression<any>): void;
        //get(): T;
        //set(value: T): void;
}