 ***Editing the Codebase**

A document demonstrating how to make changes to the swell codebase.

1. Pull changes
    Using 'git pull', pull any changes stored on GitHub from the master branch.

2. Fork 
    Using 'git checkout -b [name branch]', create a new branch to implement new changes.

3. Make changes
    Within this new branch, make whatever change or update. Ex: add a parser to Parser.ts

4. Compile
    Make sure TypeScript is installed, then run 'make' to run the Makefile. Fix any compile time errors.

5. Run tests
    To run the test file and make sure no tests are broken, 'make test'. If any tests are broken, fix them in the corresponding .spec.ts file in the /test folder. Add any additional tests as necessary. 

6. Commit and push branch
    'git commit -m []' and 'git push origin [branch name]' to push the branch for the first time. Frequent commits before merging is helpful. 

7. Merge with master
    'git checkout master' to switch back to the master branch, and then 'git merge [branch name]'. Resolve any merge conflicts. Then finish with 'git commit -m' and 'git push'
