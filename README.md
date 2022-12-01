# Liszt Programming Language

Programming language that seeks to incorporate the best aspects of both functional and object oriented programming

This repo may end up being a prototype as I'm experimenting with bidirectional type checking.

Written with TypeScript v4.8.4.

## Basic Concepts

Liszt is a statically typed language with bidirectional type checking, which means most type annotations can be omitted. The only required type annotations are for function definition parameters.

Liszt is object-oriented with prototypes, but also has first-class functions and other functional programming features.

The syntax is inspired by Ruby and Python. The type system is inspired by TypeScript.

Liszt compiles to JavaScript, so it can be used both for browser-based applications and on the server via Node.js.

## Credits

The type checker implementation owes a great deal to Jake Donham's [Reconstructing TypeScript](https://jaked.org/blog/2021-09-07-Reconstructing-TypeScript-part-0) series.

## Syntax

There are literals for Integer, Float, String, Boolean, Symbol, Object, Tuple, and Nil types.

```ruby
17
3.14
"hello, world"
:thisIsASymbol
{ type: "Person", name: "Jason", age: 42 }
(1, false, "hello", { value: 42 })
nil
```

Note that both Integer and Float are subtypes of Number, so they can be mixed together in most operations (need to fix this).

Declare variables with `var` and constants with `const`. Note that if you reassign a variable the new value must be of the same type as the one it was declared with.

```ruby
var changeMe = "I can be changed!"
const cantChangeMe = "Try to change me and it will throw an error"

changeMe = 42 ;=> Type error!
```

Define functions with the `def` keyword and end the body with `end`. Note that we strongly recommend using type annotations with the function parameters, though a return type annotation is not necessary. If you don't annotate the function parameters, they will be typed as Any which basically turns off the type checker.

```ruby
def inc(x: integer)
    x + 1
end
```

If you want to annotate the return type you can do that too; sometimes it's a big help to the type checker (especially with recursive functions).

```ruby
def fib(n: integer): integer
    if n == 0
        1
    else
        n * fib(n - 1)
```

You can also just assign a lambda to a variable (though a lambda must use an explicit block if you want its body to include more than a single expression). Note the function type annotation - it's not necessary, but it does help the type checker out! When there's no function type annotation, function parameters that are not individually annotated get typed as Any.

```ruby
const inc: (x: integer) => integer = (x) => x + 1
```

You can use type variables in your function definitions for parametric polymorphism. Type variables start with a single quote character.

```ruby
def id(x: 'a)
    x
end
```

You can also create your own types as aliases for built-in types, tuple types, and object types.

```ruby
; Object type
type alias Point { x: number, y: number }

; Intersection type
type alias Point3D Point & { z: number }

; Union type
type alias Coordinate
    { type: "Cartesian", x: number, y: number }
  | { type: "Polar", angle: number, magnitude: number }

; Function type
type alias Adder (x: number) => number

; Curried function type
type alias AdderMaker (x: number) => (y: number) => number
```
