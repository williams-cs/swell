import { Option } from 'space-lift';
export declare class Scope {
    private _map;
    private _parent;
    private _retValID;
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
}
