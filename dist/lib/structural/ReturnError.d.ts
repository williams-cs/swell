export declare class ReturnError<T> extends Error {
    retVal: T;
    ID: string;
    /**
     * Constructor for ReturnError, a custom error class that we abuse to return values
     * @param retVal The value to be returned
     * @param ID The ID of the value to be returned
     */
    constructor(retVal: T, ID: string);
}
