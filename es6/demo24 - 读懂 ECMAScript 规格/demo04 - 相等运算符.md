下面通过一些例子，介绍如何使用这份规格。

相等运算符（`==`）是一个很让人头痛的运算符，它的语法行为多变，不符合直觉。这个小节就看看规格怎么规定它的行为。

请看下面这个表达式，请问它的值是多少。
```javascript
0 == null
```
如果你不确定答案，或者想知道语言内部怎么处理，就可以去查看规格，7.2.12 小节是对相等运算符（`==`）的描述。

规格对每一种语法行为的描述，都分成两部分：先是总体的行为描述，然后是实现的算法细节。相等运算符的总体描述，只有一句话。

“The comparison x == y, where x and y are values, produces true or false.”

上面这句话的意思是，相等运算符用于比较两个值，返回`true`或`false`。

下面是算法细节。

1. ReturnIfAbrupt(x).
2. ReturnIfAbrupt(y).
3. If `Type(x)` is the same as `Type(y)`, then\ Return the result of performing Strict Equality Comparison `x === y`.
4. If x is null and y is undefined, return true.
5. If x is undefined and y is null, return true.
6. If `Type(x)` is Number and `Type(y)` is String,\ return the result of the comparison `x == ToNumber(y)`.
7. If `Type(x)` is String and `Type(y)` is Number,\ return the result of the comparison `ToNumber(x) == y`.
8. If `Type(x)` is Boolean, return the result of the comparison `ToNumber(x) == y`.
9. If `Type(y)` is Boolean, return the result of the comparison `x == ToNumber(y)`.
10. If `Type(x)` is either String, Number, or Symbol and `Type(y)` is Object, then\ return the result of the comparison `x == ToPrimitive(y)`.
11. If `Type(x)` is Object and `Type(y)` is either String, Number, or Symbol, then\ return the result of the comparison `ToPrimitive(x) == y`.
12. Return `false`.

上面这段算法，一共有 `12` 步，翻译如下。

1. 如果x不是正常值（比如抛出一个错误），中断执行。
1. 如果y不是正常值，中断执行。
1. 如果Type(x)与Type(y)相同，执行严格相等运算x === y。
1. 如果x是null，y是undefined，返回true。
1. 如果x是undefined，y是null，返回true。
1. 如果Type(x)是数值，Type(y)是字符串，返回x == ToNumber(y)的结果。
1. 如果Type(x)是字符串，Type(y)是数值，返回ToNumber(x) == y的结果。
1. 如果Type(x)是布尔值，返回ToNumber(x) == y的结果。
1. 如果Type(y)是布尔值，返回x == ToNumber(y)的结果。
1. 如果Type(x)是字符串或数值或Symbol值，Type(y)是对象，返回x == ToPrimitive(y)的结果。
1. 如果Type(x)是对象，Type(y)是字符串或数值或Symbol值，返回ToPrimitive(x) == y的结果。
1. 返回false。

由于0的类型是数值，`null`的类型是 `Null`（这是规格4.3.13 小节的规定，是内部 Type 运算的结果，跟typeof运算符无关）。因此上面的前 11 步都得不到结果，要到第 12 步才能得到false。

```javascript
0 == null // false
```