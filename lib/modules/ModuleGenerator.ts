import { Module } from "./Module";
import { LessonOneCpOne, LessonOneCpTwo, LessonOneCpThree, LessonOneCpFour } from '../../index';
import { LessonTwoCpOne, LessonTwoCpTwo, LessonTwoCpThree, LessonTwoCpFour, LessonTwoCpFive, LessonTwoCpSix, LessonTwoCpSeven } from '../../index';
import { LessonThreeCpOne, LessonThreeCpTwo, LessonThreeCpThree, LessonThreeCpFour, LessonThreeCpFive, LessonThreeCpSix } from '../../index';
import { LessonFourCpOne, LessonFourCpTwo } from '../../index';

export class ModuleGenerator {
    ctx: CanvasRenderingContext2D;
    curConstructors: Map<string, () => Module>;
    readonly dmConstructors: Map<string, () => Module> = new Map([
      ['l1c1', () => new LessonOneCpOne(this.ctx)],
      ['l1c2', () => new LessonOneCpTwo(this.ctx)],
      ['l1c3', () => new LessonOneCpThree(this.ctx)],
      ['l1c4', () => new LessonOneCpFour(this.ctx)],
      ['l2c1', () => new LessonTwoCpOne(this.ctx)],
      ['l2c2', () => new LessonTwoCpTwo(this.ctx)],
      ['l2c3', () => new LessonTwoCpThree(this.ctx)],
      ['l2c4', () => new LessonTwoCpFour(this.ctx)],
      ['l2c5', () => new LessonTwoCpFive(this.ctx)],
      ['l2c6', () => new LessonTwoCpSix(this.ctx)],
      ['l2c7', () => new LessonTwoCpSeven(this.ctx)],
      ['l3c1', () => new LessonThreeCpOne(this.ctx)],
      ['l3c2', () => new LessonThreeCpTwo(this.ctx)],
      ['l3c3', () => new LessonThreeCpThree(this.ctx)],
      ['l3c4', () => new LessonThreeCpFour(this.ctx)],
      ['l3c5', () => new LessonThreeCpFive(this.ctx)],
      ['l3c6', () => new LessonThreeCpSix(this.ctx)],
      ['l4c1', () => new LessonFourCpOne(this.ctx)],
      ['l4c2', () => new LessonFourCpTwo(this.ctx)]
    ]);
    readonly nonDmConstructors: Map<string, () => Module> = new Map([
      ['l1c1', () => new LessonOneCpOne(this.ctx)],
      ['l1c2', () => new LessonOneCpThree(this.ctx)],
      ['l1c3', () => new LessonOneCpFour(this.ctx)],
      ['l2c1', () => new LessonTwoCpOne(this.ctx)],
      ['l2c2', () => new LessonTwoCpThree(this.ctx)],
      ['l2c3', () => new LessonTwoCpFour(this.ctx)],
      ['l2c4', () => new LessonTwoCpFive(this.ctx)],
      ['l2c5', () => new LessonTwoCpSeven(this.ctx)],
      ['l3c1', () => new LessonThreeCpOne(this.ctx)],
      ['l3c2', () => new LessonThreeCpTwo(this.ctx)],
      ['l3c3', () => new LessonThreeCpThree(this.ctx)],
      ['l3c4', () => new LessonThreeCpFour(this.ctx)],
      ['l3c5', () => new LessonThreeCpFive(this.ctx)],
      ['l3c6', () => new LessonThreeCpSix(this.ctx)],
      ['l4c1', () => new LessonFourCpOne(this.ctx)],
      ['l4c2', () => new LessonFourCpTwo(this.ctx)]
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

    constructor(ctx: CanvasRenderingContext2D, isDM: boolean) {
      this.ctx = ctx;
      if (isDM) {
        this.curConstructors = this.dmConstructors;
      } else {
        this.curConstructors = this.nonDmConstructors;
      }
    }

    generateCheckpoint(cp: string): Module {
      let checkpoint = this.checkpoints.get(cp);
      if (checkpoint != null) {
        return checkpoint;
      }

      checkpoint = this.curConstructors.get(cp)();
      this.checkpoints.set(cp, checkpoint);
      return checkpoint;
    }
 }
