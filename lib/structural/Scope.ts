import {Option, Some, None} from 'space-lift'

export class Scope{
    private _map: Map<string, Option<any>>; 
    private _parent: Scope;
    private _retValID: Option<string> = None;
    private _hadFunEval: boolean = false;
    public globalFunID = 100000000;
    //private _doc: Option<Document>;

    constructor(parent: Scope){
        this._map = new Map();
        this._parent = parent;
        if(this._parent != null && this._parent._hadFunEval) this._hadFunEval = true; // copy function eval flag from parent
        //this._doc = parent.doc;
    }

    copy(){
        let s = new Scope(this._parent);
        s.map = new Map(this._map);
        return s;
    }

    declare(name: string){
        if(this._map.has(name)){
            throw new Error("Scope already has var with name " + name);
        }
        this._map.set(name,None);
    }

    // Assign/reassign value
    assign(name: string, val: any): void{
        this._map.set(name,Some(val)); //Some(val)?
    }

    // look up value in context
    lookup(name: string, context: Scope): any{
        if(context.map.has(name)){
            if(context.map.get(name).isDefined()){
                return (context.map.get(name).get()); //extra get to manage Some()
            }
        }

        if(!(context.parent == null)){
            return this.lookup(name, context.parent);
        }
        throw new Error("Variable could not be found.");
    }

    retIDLookup(): any {
        //console.log("retValID: " + this._retValID);
        if(this._retValID.isDefined()){
            return this._retValID.get();
        } else {
            if(this._parent){
                return this._parent.retIDLookup();
            } else {
                throw new Error("Unknown caller.");
            }
        }
    }

    get map(): Map<string, Option<any>>{
        return this._map;
    }
    set map(m: Map<string, Option<any>>){
        this._map = m;
    }

    get parent(): Scope{
        return this._parent;
    }

    get retValID(): Option<string>{
        return this._retValID;
    }
    set retValID(val: Option<string>){
        this._retValID = val;
    }

    get hadFunEval(): boolean{
        return this._hadFunEval;
    }
    set hadFunEval(val: boolean){
        this._hadFunEval = val;
    }

/*
    get doc(): Option<Document>{
        return this._doc;
    }
    set doc(doc: Option<Document>){
        this._doc = doc;
    }
    */
    // Declares with val of None

}