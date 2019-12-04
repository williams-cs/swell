import { Module } from "./Module";
import { Instruction } from "./Instruction";
import { Effect } from "../effects/Effect";

//let lesson = require("./test.json");
// console.log(lesson.name);
// console.log(lesson.goal);
// console.log(lesson.constraint);
// console.log(lesson.instructions.map(function(text: string){return "'<p>"+text+"</p>'"}).join("+"));

export class LessonMaker extends Module{
    readonly _name: string;
    readonly _goal: any;
    readonly _constraint: string;
    readonly _instructions: string;
    readonly _starterCode: string;
    _latestInstrIndex: number;

    static async generateFromJSON(ctx: CanvasRenderingContext2D, editor: CodeMirror.Editor, url: string): Promise<LessonMaker>{
        let response = await fetch(url);
        let lesson = await response.json();
        return new LessonMaker(ctx, editor, lesson);
    }

    constructor(ctx: CanvasRenderingContext2D, editor: CodeMirror.Editor, lesson: any) {
        super(ctx, editor);
        this._name = lesson.name;
        this._goal = lesson.goal;
        this._constraint = lesson.constraint;
        this._instructions = lesson.instructions.map(function(text: string){return "'<p>"+text+"</p>'"}).join("+");
        this._starterCode = lesson.starterCode;
        this._latestInstrIndex = lesson.latestInstructionIndex;
        let instructionsList = lesson.lessonInstructions;
        for (let i=0; i < instructionsList.length; i++){
            this._instrBoxes.push(new Instruction(instructionsList[i].location,
                                                  instructionsList[i].content,
                                                  instructionsList[i].top,
                                                  instructionsList[i].left,
                                                  instructionsList[i].skippable))
        }
    }
    /**
     * A lesson to print a string
     * @param document the HTML document
     * @param effects the list of effects currently on the CANVAS
     */
    checkGoal(document: Document, effects: Effect<any>[]): boolean {
        switch (this._latestInstrIndex) {
            case 0:
                if (document.activeElement === this.editor.getInputField() && this._latestInstrIndex == 0) {
                    this._latestInstrIndex++;
                    this.renderLatestInstruction(document);
                }
                return false;

            case 1:
                let regex: RegExp = /print\s*\(\s*\"happy\"\s*\)/;
                let match = this.editor.getValue().match(regex);
                if (match != null && match.length > 0) {
                    this._latestInstrIndex++;
                    this.renderLatestInstruction(document);
                }
                return false;

            default:
                return true;
        }
    }
}