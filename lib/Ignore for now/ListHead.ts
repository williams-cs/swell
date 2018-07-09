/*
import { Expression } from '../Expression';
import { ListNode } from './ListNode';
import { Scope } from '../Scope';
import uuid = require('uuid');
import v4 = require('uuid/v4'); 

export class ListHead implements Expression<any>{
    private _val: Expression<any>;
    private _tail: ListNode;
    private _id: string;
    private _list: Expression<any>[];
    
    constructor(val: Expression<any>, tail: ListNode){
        this._val = val;
        this._tail = tail;
    }

    eval(context: Scope){
        this._id = v4();
        if(!context.map.get(this._id)){
            console.log("declaring");
            context.declare(this._id);
            context.assign(this._id,this._list);
        }
        context.lookup(this._id,context).push(this._val.eval(context));
        context.assign(this._id,this._list);
        if(this._tail != null){
            return this._tail.eval(context);
        }
    }

    draw(){

    }

    get id(): string{
        return this._id;
    }
}
*/