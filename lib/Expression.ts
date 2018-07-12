import {Scope} from './structural/Scope';

export interface Expression <T>{
    //export abstract class Node{
        eval(parent: Scope): T;
        draw(context: Scope): void;
        //get(): T;
        //set(value: T): void;
}