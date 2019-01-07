"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../../index");
const index_2 = require("../../index");
const index_3 = require("../../index");
const index_4 = require("../../index");
class ModuleGenerator {
    constructor() {
        this.curConstructors = new Map([
            ['l1c1', (ctx, editor) => new index_1.LessonOneCpOne(ctx, editor)],
            ['l1c2', (ctx, editor) => new index_1.LessonOneCpTwo(ctx, editor)],
            ['l1c3', (ctx, editor) => new index_1.LessonOneCpThree(ctx, editor)],
            ['l1c4', (ctx, editor) => new index_1.LessonOneCpFour(ctx, editor)],
            ['l2c1', (ctx, editor) => new index_2.LessonTwoCpOne(ctx, editor)],
            ['l2c2', (ctx, editor) => new index_2.LessonTwoCpTwo(ctx, editor)],
            ['l2c3', (ctx, editor) => new index_2.LessonTwoCpThree(ctx, editor)],
            ['l2c4', (ctx, editor) => new index_2.LessonTwoCpFour(ctx, editor)],
            ['l2c5', (ctx, editor) => new index_2.LessonTwoCpFive(ctx, editor)],
            ['l2c6', (ctx, editor) => new index_2.LessonTwoCpSix(ctx, editor)],
            ['l2c7', (ctx, editor) => new index_2.LessonTwoCpSeven(ctx, editor)],
            ['l3c1', (ctx, editor) => new index_3.LessonThreeCpOne(ctx, editor)],
            ['l3c2', (ctx, editor) => new index_3.LessonThreeCpTwo(ctx, editor)],
            ['l3c3', (ctx, editor) => new index_3.LessonThreeCpThree(ctx, editor)],
            ['l3c4', (ctx, editor) => new index_3.LessonThreeCpFour(ctx, editor)],
            ['l3c5', (ctx, editor) => new index_3.LessonThreeCpFive(ctx, editor)],
            ['l3c6', (ctx, editor) => new index_3.LessonThreeCpSix(ctx, editor)],
            ['l4c1', (ctx, editor) => new index_4.LessonFourCpOne(ctx, editor)],
            ['l4c2', (ctx, editor) => new index_4.LessonFourCpTwo(ctx, editor)]
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
    }
    createModule(cp, ctx, editor) {
        let checkpoint = this.checkpoints.get(cp);
        if (checkpoint != null) {
            return checkpoint;
        }
        checkpoint = this.curConstructors.get(cp)(ctx, editor);
        this.checkpoints.set(cp, checkpoint);
        return checkpoint;
    }
}
exports.ModuleGenerator = ModuleGenerator;
//# sourceMappingURL=ModuleGenerator.js.map