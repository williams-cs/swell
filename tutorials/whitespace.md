 ***Whitespace Updates***

A document to track necessary implementations to tack whitespace that need to be done and have already been done.

**Preseving WS**
Whitespace is primarily preserved in each expression node, which tracks the ws that comes before the expression, although there are some exceptions.

**Body and Parens Nodes**
In order to track the ws that comes after keywords and arguments, if parens or brackets are used in an expression, the contents of those parens/brackets are wrapped in a parens or body node, respectively. Neither of these currently works. 

**Arguments**
Arguments in function definition and function application need to be wrapped in "argument" nodes. The argument itself stores an expression (which has the preceding ws) and the ws that comes before the comma or closing parens.
