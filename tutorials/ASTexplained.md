***AST Explained***

This document is for the benefit of Quan as he tries to understand where each piece in `/lib` fits in the AST (Abstract Syntax Tree).

**Note:** AST is evaluated through a depth-first, post-order traversal.

*/lib/Expression.ts*
`Expression` provides the interface for each AST node. The interface includes the following methods:
- `eval(c)`: called when we touch the node during the evaluation of the entire AST.
- `draw()`: called specifically when `print()` statements are evaluated, causing the node to *draw* itself on the canvas.
-`toString()`
- `newLine()`
- `equalsVal(right)`: returns true if the Expression equals the arg Expression (this seems like it could be handled by an 'equal' node?)
