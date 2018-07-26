import {Scope} from './structural/Scope';
import { NumberNode } from './prims/NumberNode';
import { Dimensions } from './structural/Dimensions';
import { PrintNode } from './structural/PrintNode';

export interface Expression <T>{
    //export abstract class Node{
        eval(parent: Scope): T;
        draw(context: Scope, dims: Dimensions, ast: Expression<any>): void;
        toString() : string;
        newLine(): boolean;
        //get(): T;
        //set(value: T): void;
}