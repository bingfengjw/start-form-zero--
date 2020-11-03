ES6 规格使用了一些专门的术语，了解这些术语，可以帮助你读懂规格。本节介绍其中的几个。

## 抽象操作

所谓”抽象操作“（abstract operations）就是引擎的一些内部方法，外部不能调用。规格定义了一系列的抽象操作，规定了它们的行为，留给各种引擎自己去实现。

举例来说，Boolean(value)的算法，第一步是这样的。

- Let b be ToBoolean(value).

这里的`ToBoolean`就是一个抽象操作，是引擎内部求出布尔值的算法。

许多函数的算法都会多次用到同样的步骤，所以 ES6 规格将它们抽出来，定义成”抽象操作“，方便描述。


## Record 和 field

ES6 规格将键值对（key-value map）的数据结构称为 `Record`，其中的每一组键值对称为 `field`。这就是说，一个 Record 由多个 `field` 组成，而每个 `field` 都包含一个键名（key）和一个键值（value）。


## [[Notation]]

ES6 规格大量使用`[[Notation]]`这种书写法，比如`[[Value]]`、`[[Writable]]`、`[[Get]]`、`[[Set]]`等等。它用来指代 `field` 的键名。

举例来说，`obj`是一个 `Record`，它有一个`Prototype`属性。ES6 规格不会写`obj.Prototype`，而是写`obj.[[Prototype]]`。一般来说，使用`[[Notation]]`这种书写法的属性，都是对象的内部属性。

所有的 JavaScript 函数都有一个内部属性`[[Call]]`，用来运行该函数。

```javascript
F.[[Call]](V, argumentsList)
```

上面代码中，`F`是一个函数对象，`[[Call]]`是它的内部方法，`F.[[call]]()`表示运行该函数，`V`表示`[[Call]]`运行时`this`的值，`argumentsList`则是调用时传入函数的参数。


## Completion Record

每一个语句都会返回一个 `Completion Record`，表示运行结果。每个 `Completion Record` 有一个`[[Type]]`属性，表示运行结果的类型。

`[[Type]]`属性有五种可能的值。

- `normal`
- `return`
- `throw`
- `break`
- `continue`

如果`[[Type]]`的值是`normal`，就称为 `normal completion`，表示运行正常。其他的值，都称为 `abrupt completion`。其中，开发者只需要关注`[[Type]]`为`throw`的情况，即运行出错；`break`、`continue`、`return`这三个值都只出现在特定场景，可以不用考虑。