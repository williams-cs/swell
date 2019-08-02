import { EffectUtils } from "./EffectUtils";
import { Effect } from "./Effect";
import { Expression } from "../Expression";
import { LogEvent } from "../logging/LogEvent";
import { PrintNode } from "../structural/PrintNode";
import { Scope } from "../structural/Scope";
import GUIDE = EffectUtils.GUIDE;

export class CanvasState {

    private _cursorOwnerID : number | undefined;

    constructor() {
        this._cursorOwnerID = undefined;
    }

    get cursorOwnerID() : number {
        return this._cursorOwnerID;
    }

    set cursorOwnerID(id : number) {
        this._cursorOwnerID = id;
    }

    reset() {
        this._cursorOwnerID = undefined;
    }
 
}