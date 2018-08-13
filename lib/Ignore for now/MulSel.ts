export class MulSel{
    private _mulSel: boolean;
    constructor(){}

    get mulSel(): boolean{
        return this._mulSel
    }
    set mulSel(val: boolean){
        this._mulSel = val;
    }
}