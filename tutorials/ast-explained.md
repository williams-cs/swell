***AST Explained***

This document is for the benefit of Quan as he tries to understand where each piece in `/lib` fits in the AST (Abstract Syntax Tree).

**Note:** AST is evaluated in a depth-first, post-order traversal.

*/lib/Expression.ts*
`Expression` provides the _interface_ for each AST node. The important methods are:
- `eval(Scope)`: called when we touch the node during the evaluation of the entire AST.
- `draw()`: called specifically when `print()` statements are evaluated, causing the node to *draw* itself on the canvas.

*/lib/structural/Scope.ts*
All `eval()` methods in other nodes take a `Scope` parameter. `Scope` maintains a map of variables - `varBindings` - used within the current scope.

*/lib/effects/*

*/lib/logging/*
