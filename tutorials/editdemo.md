## Editing the Codebase

_A document describing how to make changes to the swell codebase._

1. Pull changes
    
    Using `git pull`, pull any changes stored on GitHub from the master branch.
2. Fork
    
    Type `git checkout -b [name branch]` to create a new branch to implement new changes.
3. Make changes

    Within this new branch, make whatever change or update. Ex: add a parser to `Parser.ts`
4. Compile

    Make sure TypeScript is installed, then run `make` to run the `Makefile`. Fix any compile time errors.
5. Run tests

    To run the test file and make sure no tests are broken, run `make test`. If any tests are broken, either fix the underlying cause or update the test in the corresponding `.spec.ts` file in the `/test` folder. Be sure to add additional tests if you added new functionality. 
6. Commit and push branch

    `git commit -m [your comment]` and `git push origin [branch name]` to push the branch to GitHub for the first time. Merging is much easier when the difference between your branch and `master` are small, so commit and merge often!
7. Merge with master

    `git checkout master` to switch back to the master branch, and then `git merge [branch name]`. Resolve any merge conflicts. Then finish with `git commit -m [your comment]` and `git push`
