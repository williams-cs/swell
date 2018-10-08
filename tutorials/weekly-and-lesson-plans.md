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
1. ~~Lay out lesson plan - ~40 minutes.~~
2. ~~Make interface + UI frame for a module.~~
4. ~~Continue compiling literature review regarding DPM in learning.~~
5. ~~Implement NumberEffect.~~

To read this week:
- [~~Hundhausen et al (2009)~~](http://citeseerx.ist.psu.edu/viewdoc/download?doi=10.1.1.128.4081&rep=rep1&type=pdf)

## Week 5: October 8
1. Code up UI.
- Have a common vocab for the UI pieces: text box, canvas, palette, etc.
- For the UI, should we gamify/abstract away the coding aspect?
- eg. CodeMonkey.
2. Design abstract classes for predicate checker.
3. Clean up `swell-ui` and document it.
- Refactor `drawGuides()`.
4. Fix loop nodes.
- Document how Node and Effect are connected.
5. Continue lit review.
- Find an up-to-date overview of existing envi. for novice programmers. Something like [this](http://delivery.acm.org/10.1145/1090000/1089734/p83-kelleher.pdf?ip=137.165.175.14&id=1089734&acc=ACTIVE%20SERVICE&key=73B3886B1AEFC4BB%2E2C072D704A936475%2E4D4702B0C3E38B35%2E4D4702B0C3E38B35&__acm__=1539013178_cbeccd13d1bb1204dcc0d387fff1b47e), but more recent and not quite as large-scaled.
- Sources: CHI, UIST, PLDI.
6. Find a way to do make clean/make for all 3 pieces in 1 go.

To read this week:
- [Chugh et al (2018)](http://lara.epfl.ch/~kuncak/papers/MayerETAL18BidirectionalEvaluation.pdf)
- [Scott et al (2014)](https://groups.csail.mit.edu/mug/pubs/Scott2014DirectManipulation.pdf)
- Hutton and Meijer.

## Week 6: October 15
1. Lay out lesson plans.

## Week 7: October 22
1. Create module 3.

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
