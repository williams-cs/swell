import {Option, Some, None} from 'space-lift'

export class Scope{
    private _map: Map<string, Option<any>>;
    private _parent: Scope;

    constructor(parent: Scope){
        this._map = new Map();
        this._parent = parent;
    }

    // Declares with val of None
    declare(name: string){
        if(this._map.has(name)){
            throw new Error("Scope already has var with name " + name);
        }
        this._map.set(name,None);
    }

    // Assign/reassign value
    assign(name: string, val: any): void{
        this._map.set(name,Some(val));
    }

    lookup(name: string): any{
        console.log("Scope received name: " + name);
        // Receiving name correctly... is it ever getting added to map?
        if(!(this._map.has(name))){
            throw new Error("Scope has no var with name " + name);
        }
        if(!(this._map.get(name).isDefined())){
            throw new Error("Var " + name + " is not defined");
        }
        return (this._map.get(name));
    }
    // add get, set, etc
}