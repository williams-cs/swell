 ***SWELL CHEATSHEET***

An overview on the syntax of the SWELL language. Layout is borrowed from [Dan's Intro to C and makefiles](https://dbarowy.github.io/cs334f18/assets/readings/intro_to_c.html) as well as [dungpa's F# Cheatsheet](https://dungpa.github.io/fsharp-cheatsheet/).

**Comments**
There is no facility for commenting yet.

**Strings**
Strings are strictly enclosed in double quotes `""`.
There is no string escaping mechanism at this point.

```
s = "Hello World"
```

**Numbers & Operations**
Numbers are implemented with typescript's `number` type, which represents floating point values.
Numbers can now be drawn, i.e. passed as an argument to `print()`.

```
n = 413
x = n + 15
y = (n + x) * 2 //This doesn't seem to work

z = -10
print(z)

x++ //Increment/decrement doesn't work either
```

**Variables & Declaration**
Valid variable names start with a lowercase char and are followed by alphanumeric values.
Use the `var` keyword to declare a variable.

```
var value = 5
var Val = 10 //invalid
var 10val = 10 //invalid
```

**Functions**
Define functions using keyword `fun`.
Calling a function is pretty straighforward: `functionName(arg)`.

```
fun printStr(s){
	print(s);
}

printStr("Hello World")
```

**Lists**
List doesn't seem to work?

**Boolean Values**


**Conditional**
`if/else` statements don't seem to work.

**Loops**
`for` and `while` statements don't seem to work.

**Shapes**
Calling `print()` on any of the functions `rect(x,y)`, `ellipse(x,y)` and `eph(x,y)` draw the shape.
Clicking on a drawn shape on canvas allows us to resize it using anchors.
There is no color facility yet.

```
print(ellipse(112, 123), 157, 162);
var x = 100; y = 200;
print(rect(x,y))
```
