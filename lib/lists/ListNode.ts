import { Expression } from "../Expression";
import { Scope } from "../structural/Scope";
//import { ListHead } from "./ListHead";

export class ListNode implements Expression<ListNode>{
    private _list: Expression<any>[];
    private _newLine : boolean = false;

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

    toString() : string {
        let list  = '';
        for (let i =0 ; i < this._list.length-1; i++) {
            list += this._list[i].toString() + ", ";
        }
        list += this._list[this._list.length-1].toString();
        return '[' + list + ']';
    }

    draw(){

    }
    get list(): Expression<any>[]{
        return this._list;
    }
    newLine() : boolean {
        return this._newLine;
    }
}