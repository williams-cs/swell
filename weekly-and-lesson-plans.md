# Weekly Plan

## Week 1: September 10
1. ~~Document how to use SWELL.~~
2. ~~Sketch road map for learning modules.~~

## Week 2: September 17
1. ~~Understand how swell, swell-ui and swell-parser fit.~~
2. ~~Find papers on (i) good intro programming syllabus, (ii) learning analytics. (Tip: Use `Google Scholar: source:` to locate papers from same conference).~~

## Week 3: September 24
1. ~~Fix at least 1 bug.~~
3. ~~Continue literature review.~~

## Week 4: October 1
1. ~~Lay out lesson plan~~ - ~~40 minutes.~~
2. ~~Make interface + UI frame for a module.~~
4. ~~Continue compiling literature review regarding DPM in learning.~~
5. ~~Implement NumberEffect.~~

To read this week:
- [~~Hundhausen et al (2009)~~](http://citeseerx.ist.psu.edu/viewdoc/download?doi=10.1.1.128.4081&rep=rep1&type=pdf)

## Week 5: October 8
1. ~~Code up UI.~~
- ~~Have a common vocab for the UI pieces: text box, canvas, palette, etc.~~

## Week 6: October 15
2. ~~Create classes/functions for a single sub-module.~~
- ~~Navigating through a sub-module.~~
3. ~~Design abstract classes for predicate/completion checker.~~
4. ~~For the UI, should we gamify/abstract away the coding aspect?~~ NO.
- ~~eg. CodeMonkey.~~
5. ~~Continue lit review.~~
- ~~Sources: CHI, UIST, PLDI.~~

To read this week:
- [Dan Ingalls](https://www.youtube.com/watch?v=QTJRwKOFddc&feature=youtu.be)

## Week 7: October 22
1. ~~Continue working on modules.~~
2. ~~Lay out lesson plans.~~
- ~~Retake Khan's HOC to get an idea of good checkpoints.~~

## Week 8: October 29
1. ~~Work on predicates for lessons 1 & 2.~~
2. ~~Allow freezing screen.~~

## Week 9: Nov 5
1. ~~Create lesson 3 and Final Challenge - Working full lessons by next week.~~
2. ~~Implement Curves.~~
3. ~~Put in CODE, CANVAS, INSTRUCTION labels.~~
4. ~~Fix Conditional.~~

## Week 10: Nov 12
1. Create lesson 4.
- Have an on-boarding mini-module!
- When the window starts, click NEXT to begin.
- CODE should only be checked after hitting RUN.
- Make the next cp only clickable if the previous was completed.
2. ~~Fix conditional nodes.~~
- Document how Node and Effect are connected.
3. Put in Palette items.
4. Persistence for all modules: Download CouchDB.
- Unique identifier for each session - use uuid.
5. Fix Firefox compatibility.

To read this week:
- Hutton and Meijer.
- [Chugh et al (2018)](http://lara.epfl.ch/~kuncak/papers/MayerETAL18BidirectionalEvaluation.pdf)
- [Scott et al (2014)](https://groups.csail.mit.edu/mug/pubs/Scott2014DirectManipulation.pdf)

## Week 11: Nov 19
Thanksgiving week.
1. Work on interface. Create instructional materials.
- Sidebar indicating how to use library (`print(), rect(), etc`).
2. Find ways to implement analytics.

## Week 12: Nov 26
1. Work on interface. Create instructional materials.
2. Find ways to implement analytics.

## End of Semester
1. Implement modules to teach programming through SWELL = interface + predicate checker + instructions + analytics.
2. Implement error messages that specify which parts of the environment causes the problem.

## Winter Study
1. Write pre-tests and post-tests.

## UI Fixes
- Gives font hierarchy to instruction text - also make code text look different.
- Make 1/30 star tracker work.
- Indicate on sidebar where you are.

## Auxiliary Ideas
- Creating games by placing constraint (can only make one method, can only have a certain number of lines, only use `rect()` once).
- Add rotation function.
- Named arguments.

# Lesson/Module Plan
**NOTE:** Still unsure what the mode of instruction should be. Textual for now, but should consider videos.

## Lesson 1

**Goal:** `print()` method and String.

**Checkpoints:**
1. Pass a String as an argument to a `print()` statement.
2. PDM. Explain parameters of `print()`.
3. Non-PDM changing parameters of `print()`.
4. Print a word at the center of CANVAS.

## Lesson 2

**Goal:** Variables and Sequence.

**Checkpoints:**
1. Print a circle.
2. PDM the circle.
3. Multiple print statements.
4. Use variables.
5. More variables.
6. PDM with variables.
7. Create caterpillar/circle with dimensions.

## Lesson 3

**Goal:** Sequence and Function.

**Checkpoints:**
2. PDM effect on declaration.
3. Binary operations. String concatenation. string + num.
4. Re-assignment, and some interesting syntax (eg. `a = a + 1`).
4. PDM effect on binary operation with variables.

## Sub-Module 4

**Goal:** Learn about boolean, conditional, loop.

## Sub-Module 5

**Goal:** Final project.
