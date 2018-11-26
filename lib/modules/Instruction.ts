import { Effect } from "../effects/Effect";

export class Instruction {
    //readonly _name: string; // Module name
    readonly _location: string; // Name of the div to put this instruction in
    readonly _content: string; // Content of the instruction
    readonly _top: string; // Position of the instruction
    readonly _left: string; // Position of the instruction

    constructor(location: string, content: string, top: string, left: string) {
      this._location = location;
      this._content = content;
      this._top = top;
      this._left = left;
    }
}
