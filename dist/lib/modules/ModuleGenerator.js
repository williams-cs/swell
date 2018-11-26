"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../../index");
const index_2 = require("../../index");
const index_3 = require("../../index");
const index_4 = require("../../index");
class ModuleGenerator {
    constructor() {
        this.checkpointConstructors = new Map([
            ['l1c1', () => new index_1.LessonOneCpOne()],
            ['l1c2', () => new index_1.LessonOneCpTwo()],
            ['l1c3', () => new index_1.LessonOneCpThree()],
            ['l1c4', () => new index_1.LessonOneCpFour()],
            ['l2c1', () => new index_2.LessonTwoCpOne()],
            ['l2c2', () => new index_2.LessonTwoCpTwo()],
            ['l2c3', () => new index_2.LessonTwoCpThree()],
            ['l2c4', () => new index_2.LessonTwoCpFour()],
            ['l2c5', () => new index_2.LessonTwoCpFive()],
            ['l2c6', () => new index_2.LessonTwoCpSix()],
            ['l2c7', () => new index_2.LessonTwoCpSeven()],
            ['l3c1', () => new index_3.LessonThreeCpOne()],
            ['l3c2', () => new index_3.LessonThreeCpTwo()],
            ['l3c3', () => new index_3.LessonThreeCpThree()],
            ['l3c4', () => new index_3.LessonThreeCpFour()],
            ['l3c5', () => new index_3.LessonThreeCpFive()],
            ['l3c6', () => new index_3.LessonThreeCpSix()],
            ['l4c1', () => new index_4.LessonFourCpOne()],
            ['l4c2', () => new index_4.LessonFourCpTwo()]
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
    generateCheckpoint(cp) {
        let checkpoint = this.checkpoints.get(cp);
        if (checkpoint != null) {
            return checkpoint;
        }
        checkpoint = this.checkpointConstructors.get(cp)();
        this.checkpoints.set(cp, checkpoint);
        return checkpoint;
    }
}
exports.ModuleGenerator = ModuleGenerator;
//# sourceMappingURL=ModuleGenerator.js.map