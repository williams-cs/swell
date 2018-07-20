import {Option, Some, None} from 'space-lift'
import { Effect } from '../effects/Effect';

export class Scope{
    private _map: Map<string, Option<any>>; 
    private _parent: Scope;
    private _retValID: Option<string> = None;
    private _canvas: Option<HTMLCanvasElement> = None;
    private _effects: Effect<any>[];
    private _myState: {
        dragoffx: number,
        dragoffy: number,
        initDistance: number,
        selection: any,
        dragging: boolean,
        resizing: boolean
    };
    private _eventLog: string[] = [];
    private _hadFunEval: boolean = false;
    //public globalFunID = Math.random();
    public globalFunID = 10000000;

    constructor(parent: Scope, effects?: Effect<any>[], myState?: {dragoffx: number,dragoffy: number,initDistance: number,selection: any,dragging: boolean,resizing: boolean}){
        this._map = new Map();
        this._parent = parent;
        this._effects = effects || null;
        this._myState = myState || null;
        if(this._parent != null && this._parent._hadFunEval) this._hadFunEval = true; // copy function eval flag from parent
    }

    copy(){
        let s = new Scope(this._parent);
        s.map = new Map(this._map);
        s.effects = this._effects;
        s.myState = this._myState;
        s.eventLog = this._eventLog;
        return s;
    }

    declare(name: string){
        //console.log("declaring variable " + name);
        if(this._map.has(name)){
            throw new Error("Scope already has var with name " + name);
        }
        this._map.set(name,None);
    }

    // Assign/reassign value
    assign(name: string, val: any): void{
        //console.log("assigning value " + val + " for variable " + name + ".");
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

    get canvas() : Option<HTMLCanvasElement> {
        return this._canvas;
    }
    set canvas(val: Option<HTMLCanvasElement>) {
        this._canvas = val;
    }

    get effects(): Effect<any>[] {
        return this._effects;
    }
    set effects(arr: Effect<any>[]) {
        this._effects = arr;
    }

    get myState(): any {
        return this._myState;
    }
    set myState(state: any){
        this._myState = state;
    }

    get eventLog(): string[] {
        return this._eventLog;
    }
    set eventLog(update: string[]){
        this._eventLog = update;
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