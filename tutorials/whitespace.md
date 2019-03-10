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
	--looks like maybe user-created functions can be parsed differently from given functions
	--right now funapp does not have body or parens
-rewrite conditional parser with parens and ws stored correctly
-implement repeat (node class) with parens and body
-rewrite repeat node parser
-take out rws from funapp (but it should be in fun dec)
-make sure that no tostring is hardcoded with ws
-ALL WS PARSED IS STORED EXACTLY ONCE
-clean up ParensNode<Argument<any>> bc ALL ParensNode are ParensNode<Argument> so doesn't need to be generic

**Done List**
-write parensnode class
-implement cond, fun with parens and body
-implement fun with arguments
-write parents parser
-rewrite fundec parser to implement argument node