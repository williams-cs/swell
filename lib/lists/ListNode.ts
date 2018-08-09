import { Expression } from "../Expression";
import { Scope } from "../structural/Scope";
//import { ListHead } from "./ListHead";

export class ListNode implements Expression<ListNode>{
    private _list: Expression<any>[];
    private _newLine : boolean = false;
    private _ws : string;

    constructor(list: Expression<any>[], ws? : string){
        this._list = list;
        this._ws = ws;
        if (ws == undefined){
            this._ws = "";
        }
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
        return this._ws + '[' + list + ']';
    }

    equalsVal(right: Expression<any>): boolean{
        if(right instanceof ListNode){
            for(let i = 0; i < this.list.length; i++){
                if(!(this.list[i].equalsVal(right.list[i]))){
                    return false;
                }
            }
            return true;
        }
        return false;
    }

    draw(){
        throw new Error("Cannot draw a ListNode");
    }
    get list(): Expression<any>[]{
        return this._list;
    }
    newLine() : boolean {
        return this._newLine;
    }
}