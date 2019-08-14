export class CanvasState {

    /**
     * Property of CanvasState, a class that manages which 
     * effect is currently controlling the cursor
     */
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