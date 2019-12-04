import { Module } from "./Module";
import { LessonMaker } from "../../index";
import { LessonOneCpOne, LessonOneCpTwo, LessonOneCpThree, LessonOneCpFour } from '../../index';
import { LessonTwoCpOne, LessonTwoCpTwo, LessonTwoCpThree, LessonTwoCpFour, LessonTwoCpFive, LessonTwoCpSix, LessonTwoCpSeven } from '../../index';
import { LessonThreeCpOne, LessonThreeCpTwo, LessonThreeCpThree, LessonThreeCpFour, LessonThreeCpFive, LessonThreeCpSix } from '../../index';
import { LessonFourCpOne, LessonFourCpTwo } from '../../index';

export class ModuleGenerator {

  /**
   * Generate the constructors for the lessons. This is an ayschronous function that
   * generates a lesson from a JSON file and adds it to the map of lesson constructors
   * so that it can be created upon modification in the view
   * @param lessons The lesson names
   * @param urls The urls for the lesson json files
   */
  async generateConstructors(ctx: CanvasRenderingContext2D, 
    editor: CodeMirror.Editor, 
    lessons: string[], 
    urls: string[], 
    curConstructors: Map<string, (ctx: CanvasRenderingContext2D, editor: CodeMirror.Editor) => Module>): Promise<void>{
      for (let i = 0; i < lessons.length; i++){
        let mod = await LessonMaker.generateFromJSON(ctx, editor, urls[i]);
        curConstructors.set(lessons[i], (ctx: CanvasRenderingContext2D, editor: CodeMirror.Editor) => mod);
      }
      return
  };

  urls: string[] = ["https://api.myjson.com/bins/hwcsk"];
  lessons: string[] = ['l1c1'];

  curConstructors: Map<string, (ctx: CanvasRenderingContext2D, editor: CodeMirror.Editor) => Module> = new Map([
    //['l1c1', (ctx: CanvasRenderingContext2D, editor: CodeMirror.Editor) => new LessonOneCpOne(ctx, editor)],
    // ['l1c2', (ctx: CanvasRenderingContext2D, editor: CodeMirror.Editor) => new LessonOneCpTwo(ctx, editor)],
    // ['l1c3', (ctx: CanvasRenderingContext2D, editor: CodeMirror.Editor) => new LessonOneCpThree(ctx, editor)],
    // ['l1c4', (ctx: CanvasRenderingContext2D, editor: CodeMirror.Editor) => new LessonOneCpFour(ctx, editor)],
    // ['l2c1', (ctx: CanvasRenderingContext2D, editor: CodeMirror.Editor) => new LessonTwoCpOne(ctx, editor)],
    // ['l2c2', (ctx: CanvasRenderingContext2D, editor: CodeMirror.Editor) => new LessonTwoCpTwo(ctx, editor)],
    // ['l2c3', (ctx: CanvasRenderingContext2D, editor: CodeMirror.Editor) => new LessonTwoCpThree(ctx, editor)],
    // ['l2c4', (ctx: CanvasRenderingContext2D, editor: CodeMirror.Editor) => new LessonTwoCpFour(ctx, editor)],
    // ['l2c5', (ctx: CanvasRenderingContext2D, editor: CodeMirror.Editor) => new LessonTwoCpFive(ctx, editor)],
    // ['l2c6', (ctx: CanvasRenderingContext2D, editor: CodeMirror.Editor) => new LessonTwoCpSix(ctx, editor)],
    // ['l2c7', (ctx: CanvasRenderingContext2D, editor: CodeMirror.Editor) => new LessonTwoCpSeven(ctx, editor)],
    // ['l3c1', (ctx: CanvasRenderingContext2D, editor: CodeMirror.Editor) => new LessonThreeCpOne(ctx, editor)],
    // ['l3c2', (ctx: CanvasRenderingContext2D, editor: CodeMirror.Editor) => new LessonThreeCpTwo(ctx, editor)],
    // ['l3c3', (ctx: CanvasRenderingContext2D, editor: CodeMirror.Editor) => new LessonThreeCpThree(ctx, editor)],
    // ['l3c4', (ctx: CanvasRenderingContext2D, editor: CodeMirror.Editor) => new LessonThreeCpFour(ctx, editor)],
    // ['l3c5', (ctx: CanvasRenderingContext2D, editor: CodeMirror.Editor) => new LessonThreeCpFive(ctx, editor)],
    // ['l3c6', (ctx: CanvasRenderingContext2D, editor: CodeMirror.Editor) => new LessonThreeCpSix(ctx, editor)],
    // ['l4c1', (ctx: CanvasRenderingContext2D, editor: CodeMirror.Editor) => new LessonFourCpOne(ctx, editor)],
    // ['l4c2', (ctx: CanvasRenderingContext2D, editor: CodeMirror.Editor) => new LessonFourCpTwo(ctx, editor)]
  ]);

  checkpoints: Map<string, Module> = new Map([
    ['l1c1', null],
    ['l1c2', null],
    ['l1c3', null],
    ['l1c4', null],
    ['l2c1', null],
    ['l2c2', null],
    ['l2c3', null],
    ['l2c4', null],
    ['l2c5', null],
    ['l2c6', null],
    ['l2c7', null],
    ['l3c1', null],
    ['l3c2', null],
    ['l3c3', null],
    ['l3c4', null],
    ['l3c5', null],
    ['l3c6', null],
    ['l4c1', null],
    ['l4c2', null]
  ]);

  constructor() {}

  createModule(cp: string, ctx: CanvasRenderingContext2D, editor: CodeMirror.Editor): Module {
    let checkpoint = this.checkpoints.get(cp);
    if (checkpoint != null) {
      return checkpoint;
    }
    checkpoint = this.curConstructors.get(cp)(ctx, editor);
    this.checkpoints.set(cp, checkpoint);
    return checkpoint;
  }

  resetModules(): void {
      this.checkpoints.forEach((value: Module, key: string) => {
          this.checkpoints.set(key, null);
      })
  }
 }
 
