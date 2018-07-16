import {Scope} from '..';

export interface Expression <T>{
    //export abstract class Node{
        eval(parent: Scope): T;
        draw(context: Scope, x: number, y: number): void;
        //get(): T;
        //set(value: T): void;
}