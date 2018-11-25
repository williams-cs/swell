import { Effect } from "../effects/Effect";

export class Instruction {
    //readonly _name: string; // Module name
    readonly _location: string; // Name of the div to put this instruction in
    readonly _content: string; // Content of the instruction

    constructor(location: string, content: string) {
      this._location = location;
      this._content = content;
    }

    /**
     * Checks if the requirement of this instruction is fulfilled
     * @param document The HTML document
     * @param effects The current effect array of the lesson
     */
    //checkProgress(document: Document, effects: Effect<any>[]): boolean;
}
