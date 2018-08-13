export class ReturnError<T> extends Error{
    /**
     * Constructor for ReturnError, a custom error class that we abuse to return values
     * @param retVal The value to be returned
     * @param ID The ID of the value to be returned
     */
    constructor(public retVal: T, public ID: string){
        super(ID);
        Object.setPrototypeOf(this, ReturnError.prototype);
    }
}