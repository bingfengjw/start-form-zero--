静态字符串一律使用单引号或反引号，不使用双引号。动态字符串使用反引号。

```JavaScript
// bad
const a = "foobar";
const b = 'foo' + a + 'bar';

// acceptable
const c = `foobar`;

// good
const a = 'foobar';
const b = `foo${a}bar`;
const c = 'foobar';
```

---

- es6之前的字符串拼接很容易拼乱,尤其是在字符串和标签混用的时候,所以尽量使用反引号``
- 文章里面说最好常量使用单引号变量使用反引号,个人认为无论是变量还是常量都最好使用反引号,因为反引号``和单引号''看起来比较类似,所以尽量统一使用,避免以后修改的时候麻烦