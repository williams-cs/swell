 ***Whitespace Updates***

A document to track necessary implementations to tack whitespace that need to be done and have already been done.

**Preseving WS**
Whitespace is primarily preserved in each expression node, which tracks the ws that comes before the expression, although there are some exceptions.

**Body and Parens Nodes**
In order to track the ws that comes after keywords and arguments, if parens or brackets are used in an expression, the contents of those parens/brackets are wrapped in a parens or body node, respectively. Neither of these currently works. 

**Arguments**
Arguments in function definition and function application need to be wrapped in "argument" nodes. The argument itself stores an expression (which has the preceding ws) and the ws that comes before the comma or closing parens.

**Example**


**Main Todos**
-rewrite fun app parser so it stores ws
	--in order to parse args, must be stored in abstract function node AND fun app differently
	--parse as string(?), val, and ws, then pair them all in the AFN constructor
	--for user defined functions, ,..
	--labeled arguments: pre-string ws stored in tuple with the string, post-string/pre-= ws stored in the 
		string, pre expr ws stored in the expr val
-fun app/fun def with NO arguments should parse ws between parens
-NAMED argument space/use declareop ?? to store both name and value
-implement repeat (node class) with parens and body
-rewrite repeat node parser
-make sure that no tostring is hardcoded with ws
-ALL WS PARSED IS STORED EXACTLY ONCE
-clean up ParensNode<Argument<any>> bc ALL ParensNode are ParensNode<Argument> so doesn't need to be generic
-fix that spot where the } bracket jumps (aka ws2 in bodyparse)

**Done List**
-write parensnode class
-implement cond, fun with parens and body
-implement fun with arguments
-write parents parser
-rewrite fundec parser to implement argument node
-rewrite conditional parser with parens and ws stored correctly
-take out rws from funapp (but it should be in fun dec)
-funapp args parse ws

