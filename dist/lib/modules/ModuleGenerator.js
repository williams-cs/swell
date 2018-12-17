"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../../index");
const index_2 = require("../../index");
const index_3 = require("../../index");
const index_4 = require("../../index");
class ModuleGenerator {
    constructor(ctx, isDM) {
        this.dmConstructors = new Map([
            ['l1c1', () => new index_1.LessonOneCpOne(this.ctx)],
            ['l1c2', () => new index_1.LessonOneCpTwo(this.ctx)],
            ['l1c3', () => new index_1.LessonOneCpThree(this.ctx)],
            ['l1c4', () => new index_1.LessonOneCpFour(this.ctx)],
            ['l2c1', () => new index_2.LessonTwoCpOne(this.ctx)],
            ['l2c2', () => new index_2.LessonTwoCpTwo(this.ctx)],
            ['l2c3', () => new index_2.LessonTwoCpThree(this.ctx)],
            ['l2c4', () => new index_2.LessonTwoCpFour(this.ctx)],
            ['l2c5', () => new index_2.LessonTwoCpFive(this.ctx)],
            ['l2c6', () => new index_2.LessonTwoCpSix(this.ctx)],
            ['l2c7', () => new index_2.LessonTwoCpSeven(this.ctx)],
            ['l3c1', () => new index_3.LessonThreeCpOne(this.ctx)],
            ['l3c2', () => new index_3.LessonThreeCpTwo(this.ctx)],
            ['l3c3', () => new index_3.LessonThreeCpThree(this.ctx)],
            ['l3c4', () => new index_3.LessonThreeCpFour(this.ctx)],
            ['l3c5', () => new index_3.LessonThreeCpFive(this.ctx)],
            ['l3c6', () => new index_3.LessonThreeCpSix(this.ctx)],
            ['l4c1', () => new index_4.LessonFourCpOne(this.ctx)],
            ['l4c2', () => new index_4.LessonFourCpTwo(this.ctx)]
        ]);
        this.nonDmConstructors = new Map([
            ['l1c1', () => new index_1.LessonOneCpOne(this.ctx)],
            ['l1c2', () => new index_1.LessonOneCpThree(this.ctx)],
            ['l1c3', () => new index_1.LessonOneCpFour(this.ctx)],
            ['l2c1', () => new index_2.LessonTwoCpOne(this.ctx)],
            ['l2c2', () => new index_2.LessonTwoCpThree(this.ctx)],
            ['l2c3', () => new index_2.LessonTwoCpFour(this.ctx)],
            ['l2c4', () => new index_2.LessonTwoCpFive(this.ctx)],
            ['l2c5', () => new index_2.LessonTwoCpSeven(this.ctx)],
            ['l3c1', () => new index_3.LessonThreeCpOne(this.ctx)],
            ['l3c2', () => new index_3.LessonThreeCpTwo(this.ctx)],
            ['l3c3', () => new index_3.LessonThreeCpThree(this.ctx)],
            ['l3c4', () => new index_3.LessonThreeCpFour(this.ctx)],
            ['l3c5', () => new index_3.LessonThreeCpFive(this.ctx)],
            ['l3c6', () => new index_3.LessonThreeCpSix(this.ctx)],
            ['l4c1', () => new index_4.LessonFourCpOne(this.ctx)],
            ['l4c2', () => new index_4.LessonFourCpTwo(this.ctx)]
        ]);
        this.checkpoints = new Map([
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
        this.ctx = ctx;
        if (isDM) {
            this.curConstructors = this.dmConstructors;
        }
        else {
            this.curConstructors = this.nonDmConstructors;
        }
    }
    generateCheckpoint(cp) {
        let checkpoint = this.checkpoints.get(cp);
        if (checkpoint != null) {
            return checkpoint;
        }
        checkpoint = this.curConstructors.get(cp)();
        this.checkpoints.set(cp, checkpoint);
        return checkpoint;
    }
}
exports.ModuleGenerator = ModuleGenerator;
//# sourceMappingURL=ModuleGenerator.js.map