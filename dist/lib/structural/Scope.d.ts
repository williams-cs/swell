import { Option } from 'space-lift';
import { Effect } from '../effects/Effect';
import { LogEvent } from '../logging/LogEvent';
export declare class Scope {
    private _varBindings;
    private _parent;
    private _retValID;
    private _canvas;
    private _effects;
    private _myState;
    private _mulSelected;
    private _mulSelArray;
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
    }, eventLog?: LogEvent<any>[]);
    copy(): Scope;
    declare(name: string): void;
    assign(name: string, val: any): void;
    lookup(name: string, context: Scope): any;
    retIDLookup(): any;
    varBindings: Map<string, Option<any>>;
    readonly parent: Scope;
    retValID: Option<string>;
    canvas: Option<HTMLCanvasElement>;
    effects: Effect<any>[];
    myState: any;
    eventLog: LogEvent<any>[];
    readonly mulSelected: any;
    mulSelArray: Effect<any>[];
    hadFunEval: boolean;
}
