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
1. Lay out lesson plans.
- Retake Khan's HOC to get an idea of good checkpoints.
2. Create classes/functions for a single sub-module.
- Navigating through a sub-module.
3. Design abstract classes for predicate/completion checker.
4. For the UI, should we gamify/abstract away the coding aspect?
- eg. CodeMonkey.
- Creating games by placing constraint (can only make one method, can only have a certain number of lines, only use `rect()` once).
5. Continue lit review.
- Sources: CHI, UIST, PLDI.

To read this week:
- [Dan Ingalls](https://www.youtube.com/watch?v=QTJRwKOFddc&feature=youtu.be)
- [Chugh et al (2018)](http://lara.epfl.ch/~kuncak/papers/MayerETAL18BidirectionalEvaluation.pdf)
- [Scott et al (2014)](https://groups.csail.mit.edu/mug/pubs/Scott2014DirectManipulation.pdf)

## Week 7: October 22
1. Create module 3.
2. Clean up `swell-ui` and document it.
- Refactor `drawGuides()`.
- Write tests for `NumberEffect`.
3. Fix loop nodes.
- Document how Node and Effect are connected.

To read this week:
- Hutton and Meijer.

## Week 8: October 29
1. Create module 4.

## Week 9: Nov 5
1. Create module 5.

## Week 10: Nov 12
1. Create module 6.

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

## Auxiliary Ideas
1. ~~Are `shapes` full-on classes?~~ `shapes` are functions.
21. COLOR-CODE TEXT!
14. Add rotation function.
16. Named arguments!
17. Khan Academy's 'talk-through' is cool - video on top of interactive coding env.
18. Colors?
19. StringEffect and NumberEffect share many methods. Maybe superclass them?
20. Highlight connected code and canvas components.

# Lesson/Module Plan
**NOTE:** Still unsure what the mode of instruction should be. Textual for now, but should consider videos.

## Sub-Module 1

**Goal:** Learn about `print()` method, shapes and String.

**Checkpoints:**
1. Use `print()` statement and pass a String as an argument.
2. PDM. Explain parameters of `print()`.
3. Pass shapes to `print()`.
4. PDM. Parameters of shapes.
5. Game Challenge.

## Sub-Module 2

**Goal:** Learn about numbers, variables and binary operations.

**Checkpoints:**
1. Declare number and string variables, and print them.
2. PDM effect on declaration.
3. Binary operations. String concatenation. string + num.
4. Re-assignment, and some interesting syntax (eg. `a = a + 1`).
4. PDM effect on binary operation with variables.

## Sub-Module 3

**Goal:** Learn about shapes and sequence.

## Sub-Module 4

**Goal:** Learn about function. Maybe list also.

## Sub-Module 5

**Goal:** Learn about boolean, conditional, loop.

## Sub-Module 6

**Goal:** Final project.