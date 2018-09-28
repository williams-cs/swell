***Papers***

Slowly gathering papers for literature review.

**ProDirect Manipulation**
- Chugh - Sketch-n-Sketch, [here](https://arxiv.org/pdf/1507.02988.pdf) and [here](https://arxiv.org/pdf/1809.04209.pdf). This pair of papers propose that prodirect manipulation consists of 3 goals:
  - "Modify the output of a program and infer updates in real-time".
  - "Synthesize program expressions from output created directly via the user interface".
  - "Temporarily break the relationship between program and output so that 'larger' changes can be made, and then reconcile these changes with the original program".
- [Schneiderman - Direct Manipulation](https://www.cs.umd.edu/~ben/papers/Shneiderman1997Direct.pdf). Original idea coined in the 80s.
- [Schachman - Apparatus](https://www.youtube.com/watch?v=i3Xack9ufYk). Very interesting and well-thought out combination of graphic editor + programming environment. However, programmatic manipulation is limited, most likely to target a more design-minded group of users.
- [Victor - Dynamic Visualizations](https://www.youtube.com/watch?v=ef2jpjTEB5U). Cool implementation of direct manipulation interface from an ex Apple researcher, more geared towards data visualization. *Might be helpful to read up on why these ideas did not take off.*
- [Wang et al - Collaborative Hybrid Analysis](http://www.cs.utsa.edu/~xwang/papers/fse12.pdf). This one is rather complicated, but the gist of their collaborative hybrid analysis is a “parser” that maps from a targeted newly generated HTML text back to the code that’s supposed to generate those HTML elements, so that the code would self-update once they they can modify the HTML text.

**Learning Modules**
*Note:* Go back and re-read these to get some more info on how they measure/quantify the effectiveness of their implementation.
- [Andersen et al - Trace-based Framework for Educational Progression](https://www.microsoft.com/en-us/research/wp-content/uploads/2016/12/chi13.pdf). An attempt to algorithmically determine and order the difficulties of practice problems for procedural tasks, such as algebra homework. This may or may not be useful, depending on whether we can classify our programming modules as procedural tasks.
- [Dong et al - Discovery-based Games for Learning Softwares](http://delivery.acm.org/10.1145/2210000/2208358/p2083-dong.pdf?ip=137.165.175.14&id=2208358&acc=ACTIVE%20SERVICE&key=73B3886B1AEFC4BB%2E2C072D704A936475%2E4D4702B0C3E38B35%2E4D4702B0C3E38B35&__acm__=1537805553_8045085e408caa23d661b11bd0396fd1). A very cool study from Adobe where researchers used a series of puzzles to work new users through the tools of Adobe Photoshop. We could possibly consider gamifying our modules.
-[Melcer - Physical Embodiment in Educational Game](http://delivery.acm.org/10.1145/3080000/3078704/p532-melcer.pdf?ip=137.165.175.14&id=3078704&acc=ACTIVE%20SERVICE&key=73B3886B1AEFC4BB%2E2C072D704A936475%2E4D4702B0C3E38B35%2E4D4702B0C3E38B35&__acm__=1537805845_67c5f2632ad200d72afb77264b337e35). This is an ongoing graduate student project, so not sure how useful it is. Still, worth checking back when he's done.
- [Alzahrani et al - Python vs C++](http://delivery.acm.org/10.1145/3170000/3160586/p86-alzahrani.pdf?ip=137.165.175.14&id=3160586&acc=ACTIVE%20SERVICE&key=73B3886B1AEFC4BB%2E2C072D704A936475%2E4D4702B0C3E38B35%2E4D4702B0C3E38B35&__acm__=1537807015_db6b77f1c2b7ab543a1b96bc6cf129bc). A study that found that students in intro CS courses struggle less if they have to learn C++ as their first language as compared to Python. An interesting area that we could delve in more to guide the syntax of Swell.
