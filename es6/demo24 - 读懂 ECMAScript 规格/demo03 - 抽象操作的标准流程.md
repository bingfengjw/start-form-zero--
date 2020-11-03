抽象操作的运行流程，一般是下面这样。

1. Let `resultCompletionRecord` be `AbstractOp()`.
2. If `resultCompletionRecord` is an abrupt completion, return `resultCompletionRecord`.
3. Let `result` be `resultCompletionRecord.[[Value]]`.
4. return `result`.

上面的第一步是调用抽象操作`AbstractOp()`，得到`resultCompletionRecord`，这是一个 Completion Record。第二步，如果这个 Record 属于 abrupt completion，就将`resultCompletionRecord`返回给用户。如果此处没有返回，就表示运行结果正常，所得的值存放在`resultCompletionRecord.[[Value]]`属性。第三步，将这个值记为`result`。第四步，将`result`返回给用户。

ES6 规格将这个标准流程，使用简写的方式表达。

1. Let `result` be `AbstractOp()`.
2. `ReturnIfAbrupt(result)`.
3. return `result`.

这个简写方式里面的`ReturnIfAbrupt(result)`，就代表了上面的第二步和第三步，即如果有报错，就返回错误，否则取出值。

甚至还有进一步的简写格式。

1. Let `result` be `? AbstractOp()`.
2. return `result`.

上面流程的?，就代表`AbstractOp()`可能会报错。一旦报错，就返回错误，否则取出值。

除了`?`，ES 6 规格还使用另一个简写符号!。

1. Let `result` be `! AbstractOp()`.
2. return `result`.

上面流程的!，代表`AbstractOp()`不会报错，返回的一定是 `normal completion`，总是可以取出值。