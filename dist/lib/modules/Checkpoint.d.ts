import { Instruction } from "./Instruction";
export declare abstract class Checkpoint {
    _instrBoxes: Instruction[];
    _instrIndex: number;
    _latestInstrIndex: number;
    renderLatestInstruction(document: Document): void;
    renderNextInstruction(document: Document): void;
    renderPrevInstruction(document: Document): void;
    /**
     * render the current instruction of this checkpoint
     * @param document The HTML document
     */
    renderInstruction(document: Document): void;
}
