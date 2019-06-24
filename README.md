[Link to documentation](https://williams-cs.github.io/swell/)
## About

This repository hosts both the language components for the SWELL language as well as the SWELL integrated development environment with prodirect manipulation features.

## Building
Type `make` in the terminal and hit enter. `make` will, if necessary, install the npm modules, remove the compiled files, recompile, and generate documentation.

`make clean` will remove all the compiled files, documentation, and npm modules. If you're having any sort of issues, run this and then `make`. 

After building, you can open `index.html` in your web browser.

If you're still having issues and you're using VSC, close VSC, `make clean`, then `make`. 
If you're still having issues, Google.

## Testing
`make test` will compile and run all tests. Currently, two tests (both called *A draw test should evaluate to an error*) should evaluate to errors. All others should pass.

Note that module and UI tests must be written in the UI test folder. The UI can be tested manually or with Selenium Webdriver. To use the debugger, Webdriver is best... if you can get it to work.

## Modules
**How to Build a Module**
1. Come up with a goal: draw a circle, write text, make a scene, etc, and a clever name for the module.
2. Figure out how to check if these goals are complete. This will be the `checkGoal()` method in the module. 
  * Since there's no way to check what is on the canvas, this will mainly involve regex parsing of the input text, which you can read from the 'input' element of the document.
  * You will likely have multiple components to check; each of these will be their own goal boolean
  * `checkGoal()` should be run when the Run button is pressed, but you may need to incorporate a delay, since for the Circle module it verifies it when the button is hit but before it actually paints anything.
3. Develop instructions and/or starter code.
  * Currently this shows up in a prompt at the beginning of the module, but if you decide to include starter code you may want to work out how to put it somewhere in the UI so the students can reference it... or print it directly in the input space!
4. `checkGoal()` is the bulk of the module, but you may want additional helper methods based on how complicated the goal is to check. [CircleMod](./lib/modules/CircleMod.ts) can provide a good reference for a basic goal check. 
