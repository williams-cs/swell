"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//import { ListHead } from "./ListHead";
class ListNode {
    // TODO: List interface/class
    constructor(list) {
        this._list = list;
        this._evalList = [];
    }
    eval(context) {
        for (let expr of this._list) {
            this._evalList.push(expr.eval(context));
        }
        return this._evalList;
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
        /*
        // update list in context
        context.lookup(this._head.id,context).push(this._val.eval(context));
        context.assign(this._head.id,context.lookup(this._head.id,context));

        // if list continues, continues to add
        if(this._tail != null){
            return this._tail.eval(context);
        }
        return context.lookup(this._head.id, context);
        */
    }
    draw() {
    }
    get list() {
        return this._list;
    }
}
exports.ListNode = ListNode;
