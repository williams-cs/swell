import { Option } from 'space-lift';
import { Effect } from '../effects/Effect';
export declare class Scope {
    private _map;
    private _parent;
    private _retValID;
    private _canvas;
    private _effects;
    private _myState;
    private _hadFunEval;
    globalFunID: number;
    constructor(parent: Scope);
    copy(): Scope;
    declare(name: string): void;
    assign(name: string, val: any): void;
    lookup(name: string, context: Scope): any;
    retIDLookup(): any;
    map: Map<string, Option<any>>;
    readonly parent: Scope;
    retValID: Option<string>;
    canvas: Option<HTMLCanvasElement>;
    effects: Effect<any>[];
    readonly myState: any;
    hadFunEval: boolean;
}
