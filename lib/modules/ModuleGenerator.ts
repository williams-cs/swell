import { Module } from "./Module";
import { LessonOneCpOne, LessonOneCpTwo, LessonOneCpThree, LessonOneCpFour } from '../../index';
import { LessonTwoCpOne, LessonTwoCpTwo, LessonTwoCpThree, LessonTwoCpFour, LessonTwoCpFive, LessonTwoCpSix, LessonTwoCpSeven } from '../../index';
import { LessonThreeCpOne, LessonThreeCpTwo, LessonThreeCpThree, LessonThreeCpFour, LessonThreeCpFive, LessonThreeCpSix } from '../../index';
import { LessonFourCpOne, LessonFourCpTwo } from '../../index';

export class ModuleGenerator {
    readonly checkpointConstructors: Map<string, () => Module> = new Map([
      ['l1c1', () => new LessonOneCpOne()],
      ['l1c2', () => new LessonOneCpTwo()],
      ['l1c3', () => new LessonOneCpThree()],
      ['l1c4', () => new LessonOneCpFour()],
      ['l2c1', () => new LessonTwoCpOne()],
      ['l2c2', () => new LessonTwoCpTwo()],
      ['l2c3', () => new LessonTwoCpThree()],
      ['l2c4', () => new LessonTwoCpFour()],
      ['l2c5', () => new LessonTwoCpFive()],
      ['l2c6', () => new LessonTwoCpSix()],
      ['l2c7', () => new LessonTwoCpSeven()],
      ['l3c1', () => new LessonThreeCpOne()],
      ['l3c2', () => new LessonThreeCpTwo()],
      ['l3c3', () => new LessonThreeCpThree()],
      ['l3c4', () => new LessonThreeCpFour()],
      ['l3c5', () => new LessonThreeCpFive()],
      ['l3c6', () => new LessonThreeCpSix()],
      ['l4c1', () => new LessonFourCpOne()],
      ['l4c2', () => new LessonFourCpTwo()]
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

    constructor() {
    }

    generateCheckpoint(cp: string): Module {
      let checkpoint = this.checkpoints.get(cp);
      if (checkpoint != null) {
        return checkpoint;
      }

      checkpoint = this.checkpointConstructors.get(cp)();
      this.checkpoints.set(cp, checkpoint);
      return checkpoint;
    }
 }
