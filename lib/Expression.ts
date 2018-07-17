import {Scope} from './structural/Scope';
import { NumberNode } from './prims/NumberNode';

export interface Expression <T>{
    //export abstract class Node{
        eval(parent: Scope): T;
        draw(context: Scope, x: number, y: number): void;
        //get(): T;
        //set(value: T): void;
}