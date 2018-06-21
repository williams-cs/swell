import {Scope} from './Scope';

export interface Expression <T>{
    //export abstract class Node{
        eval(parent?: Scope): T;
        //get(): T;
        //set(value: T): void;
}