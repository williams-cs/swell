 ***Deleting Objects***

A document to sketch out how "delete" will be implemented, both as a button on the UI as well as on button press

**Clickable Button**
- Insert a palette button that deletes the selected object when pressed
- under palette buttons, insertNode() function should be modified to respond to a delete button
- instead of adding a new node, call removeNode() method (to be written)
- removeNode() sets the justDeleted boolean corresponding to the currently selected node to true

**Button Press**
- make each effect be listening for onkeyup 
- change effect instance boolean justDeleted to true
- OR look at editor.on("keyup") and change boolean of the currently selected effects

**Result**
- Make a DeleteEvent that extends Effect (is this necessary?)
- each effect has a boolean that tracks whether or not it has been deleted, then animate() checks that boolean 
- animate() deletes the selected object from the ast, effects, from the new program, scope
- If nothing is selected then do nothing

**Other Thoughts**
- boolean in Effect.ts that checks whether or not the object has been justDeleted, then in ui.ts evaluated



