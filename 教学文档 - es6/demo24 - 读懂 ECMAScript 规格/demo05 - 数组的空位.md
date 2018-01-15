下面再看另一个例子。

```javascript
const a1 = [undefined, undefined, undefined];
const a2 = [, , ,];

a1.length // 3
a2.length // 3

a1[0] // undefined
a2[0] // undefined

a1[0] === a2[0] // true
```

上面代码中，数组`a1`的成员是三个`undefined`，数组`a2`的成员是三个空位。这两个数组很相似，长度都是 3，每个位置的成员读取出来都是`undefined`。

但是，它们实际上存在重大差异。

```javascript
0 in a1 // true
0 in a2 // false

a1.hasOwnProperty(0) // true
a2.hasOwnProperty(0) // false

Object.keys(a1) // ["0", "1", "2"]
Object.keys(a2) // []

a1.map(n => 1) // [1, 1, 1]
a2.map(n => 1) // [, , ,]
```

上面代码一共列出了四种运算，数组`a1`和`a2`的结果都不一样。前三种运算（`in`运算符、数组的`hasOwnProperty`方法、`Object.keys`方法）都说明，数组`a2`取不到属性名。最后一种运算（数组的`map`方法）说明，数组a2没有发生遍历。

为什么`a1`与`a2`成员的行为不一致？数组的成员是`undefined`或空位，到底有什么不同？

规格的12.2.5 小节[《数组的初始化》](http://www.ecma-international.org/ecma-262/6.0/#sec-12.2.5)给出了答案。

> “Array elements may be elided at the beginning, middle or end of the element list. Whenever a comma in the element list is not preceded by an AssignmentExpression (i.e., a comma at the beginning or after another comma), the missing array element contributes to the length of the Array and increases the index of subsequent elements. Elided array elements are not defined. If an element is elided at the end of an array, that element does not contribute to the length of the Array.”

翻译如下。

> "数组成员可以省略。只要逗号前面没有任何表达式，数组的length属性就会加 1，并且相应增加其后成员的位置索引。被省略的成员不会被定义。如果被省略的成员是数组最后一个成员，则不会导致数组length属性增加。”

上面的规格说得很清楚，数组的空位会反映在length属性，也就是说空位有自己的位置，但是这个位置的值是未定义，即这个值是不存在的。如果一定要读取，结果就是undefined（因为undefined在 JavaScript 语言中表示不存在）。

这就解释了为什么`in`运算符、数组的`hasOwnProperty`方法、`Object.keys`方法，都取不到空位的属性名。因为这个属性名根本就不存在，规格里面没说要为空位分配属性名(位置索引），只说要为下一个元素的位置索引加 1。

至于为什么数组的`map`方法会跳过空位，请看下一节。