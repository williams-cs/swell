 ***Whitespace Updates***

A document to track necessary implementations to tack whitespace that need to be done and have already been done.

**Preseving WS**
Whitespace is primarily preserved in each expression node, which tracks the ws that comes before the expression, although there are some exceptions.

**Body and Parens Nodes**
In order to track the ws that comes after keywords and arguments, if parens or brackets are used in an expression, the contents of those parens/brackets are wrapped in a parens or body node, respectively. Neither of these currently works. 

**Arguments**
Arguments in function definition and function application need to be wrapped in "argument" nodes. The argument itself stores an expression (which has the preceding ws) and the ws that comes before the comma or closing parens.

**Main Todos**
-rewrite fun app parser so it stores ws -- can we parse arguments early? instead of waiting til abstract function node
	--also figure out which is being used -- abstract function node or funapp? 
	--right now funapp does not have body or parens
-implement repeat (node class) with parens and body
-if no args, parse the empty space between parens
-rewrite repeat node parser
-make sure that no tostring is hardcoded with ws
-make sure all ws is parsed once and only once
-fix that spot where the } bracket jumps (aka ws2 in bodyparse)

**Done List**
-write parensnode class
-implement conditional and fundef with parens and body
-implement fun def with arguments
-write parens parser
-rewrite fundec parser to implement argument node
-rewrite conditional parser with parens and ws stored correctly
-take out rws from funapp (but it should be in fun dec)