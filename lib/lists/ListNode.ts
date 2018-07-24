import { Expression } from "../Expression";
import { Scope } from "../structural/Scope";
//import { ListHead } from "./ListHead";

export class ListNode implements Expression<ListNode>{
    private _list: Expression<any>[];

    constructor(list: Expression<any>[]){
        this._list = list;
    }

    eval(context: Scope): ListNode {
        let evalList : Expression<any>[] = [];
        for(let expr of this._list){
            evalList.push(expr.eval(context));
        }
        return new ListNode(evalList);
    }

    draw(){

    }
    get list(): Expression<any>[]{
        return this._list;
    }
}