export class ReturnError<T> extends Error{
    constructor(public retVal: T, public ID: string){
        super(ID);
        Object.setPrototypeOf(this, ReturnError.prototype);
    }
}