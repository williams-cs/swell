"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ListNode {
    //private _list: Expression<any>[];
    //private _headID: string;
    // TODO: List interface/class
    constructor(val, tail, id) {
        //this._head = head;
        this._val = val;
        this._tail = tail;
        //this._list = [];
        //this._headID = v4();
    }
    eval(context) {
        // binds list to context if top of list
        /*
        if(!context.map.get("headID")){
            console.log("declaring");
            context.declare("headID");
            context.assign("headID",this._list);
        }
        */
        /*
        if(!(context.map.get(this._id))){
            console.log("declaring " + this._id);
            context.declare(this._id);
            context.assign(this._id,this._list);
        }
        */
        // update list in context
        context.lookup(this._head.id, context).push(this._val.eval(context));
        context.assign(this._head.id, context.lookup(this._head.id, context));
        // if list continues, continues to add
        if (this._tail != null) {
            return this._tail.eval(context);
        }
        return context.lookup(this._head.id, context);
    }
    draw() {
    }
    get head() {
        return this._head;
    }
    get val() {
        return this._val;
    }
    get tail() {
        return this._tail;
    }
}
exports.ListNode = ListNode;
