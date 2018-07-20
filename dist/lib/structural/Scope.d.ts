import { Option } from 'space-lift';
import { Effect } from '../effects/Effect';
export declare class Scope {
    private _map;
    private _parent;
    private _retValID;
    private _canvas;
    private _effects;
    private _myState;
    private _eventLog;
    private _hadFunEval;
    globalFunID: number;
    constructor(parent: Scope, effects?: Effect<any>[], myState?: {
        dragoffx: number;
        dragoffy: number;
        initDistance: number;
        selection: any;
        dragging: boolean;
        resizing: boolean;
    });
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
    myState: any;
    eventLog: string[];
    hadFunEval: boolean;
}
