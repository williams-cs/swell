export class Scope{
    map: Map<string, any>;
    parent: Scope;

    constructor(map: Map<string, any>, 
        parent: Scope){
        this.map = map;
        this.parent = parent;
    }
}