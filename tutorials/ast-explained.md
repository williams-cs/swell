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

***Other Notes***

*Option*
Option is abstract type that provides Some<T> and None. The parser returns an Option type; if the returned value is parseable, a Some<T> is returned where we need to unpack the result using .get() after checking for null value using .isDefined(). If this check returns True, we can unpack the result; if it is false, the result is None.

*Dependencies*
swell-parser is a parser combinator. Read Hutton & Meijer until page 13.
space-lift <- swell
swell <- swell-parser
pants <- swell-parser
swell <- swell-ui
swell-parser <- swell-ui
