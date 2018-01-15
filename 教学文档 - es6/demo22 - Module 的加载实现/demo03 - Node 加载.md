## 概述

Node 对 ES6 模块的处理比较麻烦，因为它有自己的 CommonJS 模块格式，与 ES6 模块格式是不兼容的。目前的解决方案是，将两者分开，ES6 模块和 CommonJS 采用各自的加载方案。

Node 要求 ES6 模块采用`.mjs`后缀文件名。也就是说，只要脚本文件里面使用`import`或者`export`命令，那么就必须采用`.mjs`后缀名。`require`命令不能加载`.mjs`文件，会报错，只有`import`命令才可以加载`.mjs`文件。反过来，`.mjs`文件里面也不能使用`require`命令，必须使用`import`。

目前，这项功能还在试验阶段。安装 Node v8.5.0 或以上版本，要用--experimental-modules参数才能打开该功能。

```javascript
$ node --experimental-modules my-app.mjs
```

为了与浏览器的import加载规则相同，Node 的.mjs文件支持 URL 路径。

```javascript
import './foo?query=1'; // 加载 ./foo 传入参数 ?query=1
```

上面代码中，脚本路径带有参数`?query=1`，Node 会按 URL 规则解读。同一个脚本只要参数不同，就会被加载多次，并且保存成不同的缓存。由于这个原因，只要文件名中含有`:`、`%`、`#`、`?`等特殊字符，最好对这些字符进行转义。

目前，Node 的`import`命令只支持加载本地模块（`file`:协议），不支持加载远程模块。

如果模块名不含路径，那么`import`命令会去`node_modules`目录寻找这个模块。

```javascript
import 'baz';
import 'abc/123';
```

如果模块名包含路径，那么`import`命令会按照路径去寻找这个名字的脚本文件。

```javascript
import 'file:///etc/config/app.json';
import './foo';
import './foo?search';
import '../bar';
import '/baz';
```

如果脚本文件省略了后缀名，比如`import` `'./foo'`，Node 会依次尝试四个后缀名：`./foo.mjs`、`./foo.js`、`./foo.json`、`./foo.node`。如果这些脚本文件都不存在，Node 就会去加载`./foo/package`.json的`main`字段指定的脚本。如果`./foo/package.json`不存在或者没有`main`字段，那么就会依次加载`./foo/index.mjs`、`./foo/index.js`、`./foo/index.json`、`./foo/index.node`。如果以上四个文件还是都不存在，就会抛出错误。

最后，Node 的`import`命令是异步加载，这一点与浏览器的处理方法相同。

## 内部变量 

ES6 模块应该是通用的，同一个模块不用修改，就可以用在浏览器环境和服务器环境。为了达到这个目标，Node 规定 ES6 模块之中不能使用 CommonJS 模块的特有的一些内部变量。

首先，就是`this`关键字。ES6 模块之中，顶层的`this`指向`undefined`；CommonJS 模块的顶层`this`指向当前模块，这是两者的一个重大差异。

其次，以下这些顶层变量在 ES6 模块之中都是不存在的。

- arguments
- require
- module
- exports
- __filename
- __dirname

如果你一定要使用这些变量，有一个变通方法，就是写一个 CommonJS 模块输出这些变量，然后再用 ES6 模块加载这个 CommonJS 模块。但是这样一来，该 ES6 模块就不能直接用于浏览器环境了，所以不推荐这样做。

上面代码中，`expose.js`是一个 CommonJS 模块，输出变量`__dirname`，该变量在 ES6 模块之中不存在。ES6 模块加载`expose.js`，就可以得到`__dirname`。

## ES6 模块加载 CommonJS 模块

CommonJS 模块的输出都定义在`module.export`s这个属性上面。Node 的`import`命令加载 CommonJS 模块，Node 会自动将`module.export`s属性，当作模块的默认输出，即等同于`export default xxx`。

下面是一个 CommonJS 模块。
```javascript
// a.js
module.exports = {
  foo: 'hello',
  bar: 'world'
};

// 等同于
export default {
  foo: 'hello',
  bar: 'world'
};
```
`import`命令加载上面的模块，`module.exports`会被视为默认输出，即`import`命令实际上输入的是这样一个对象`{ default: module.exports }`。

所以，一共有三种写法，可以拿到 CommonJS 模块的`module.exports`。

```javascript
// 写法一
import baz from './a';
// baz = {foo: 'hello', bar: 'world'};

// 写法二
import {default as baz} from './a';
// baz = {foo: 'hello', bar: 'world'};

// 写法三
import * as baz from './a';
// baz = {
//   get default() {return module.exports;},
//   get foo() {return this.default.foo}.bind(baz),
//   get bar() {return this.default.bar}.bind(baz)
// }
```

上面代码的第三种写法，可以通过`baz.default`拿到`module.exports`。`foo`属性和`bar`属性就是可以通过这种方法拿到了`module.exports`。

下面是一些例子。

```javascript
// b.js
module.exports = null;

// es.js
import foo from './b';
// foo = null;

import * as bar from './b';
// bar = { default:null };
```

上面代码中，es.js采用第二种写法时，要通过`bar.default`这样的写法，才能拿到`module.exports`。

```javascript
// c.js
module.exports = function two() {
  return 2;
};

// es.js
import foo from './c';
foo(); // 2

import * as bar from './c';
bar.default(); // 2
bar(); // throws, bar is not a function
```
上面代码中，`bar`本身是一个对象，不能当作函数调用，只能通过`bar.default`调用。

CommonJS 模块的输出缓存机制，在 ES6 加载方式下依然有效。

```javascript
// foo.js
module.exports = 123;
setTimeout(_ => module.exports = null);
```

上面代码中，对于加载`foo.js`的脚本，`module.exports`将一直是`123`，而不会变成`null`。

由于 ES6 模块是编译时确定输出接口，CommonJS 模块是运行时确定输出接口，所以采用`import`命令加载 CommonJS 模块时，不允许采用下面的写法。

```javascript
// 不正确
import { readfile } from 'fs';
```

上面的写法不正确，因为`fs`是 CommonJS 格式，只有在运行时才能确定`readfile`接口，而`import`命令要求编译时就确定这个接口。解决方法就是改为整体输入。

```javascript
// 正确的写法一
import * as express from 'express';
const app = express.default();

// 正确的写法二
import express from 'express';
const app = express();
```

## CommonJS 模块加载 ES6 模块

CommonJS 模块加载 ES6 模块，不能使用`require`命令，而要使用`import()`函数。ES6 模块的所有输出接口，会成为输入对象的属性。

```javascript
// es.mjs
let foo = { bar: 'my-default' };
export default foo;
foo = null;

// cjs.js
const es_namespace = await import('./es');
// es_namespace = {
//   get default() {
//     ...
//   }
// }
console.log(es_namespace.default);
// { bar:'my-default' }
```
上面代码中，`default`接口变成了`es_namespace.default`属性。另外，由于存在缓存机制，`es.mjs`对`foo`的重新赋值没有在模块外部反映出来。

下面是另一个例子。
```javascript
// es.js
export let foo = { bar:'my-default' };
export { foo as bar };
export function f() {};
export class c {};

// cjs.js
const es_namespace = await import('./es');
// es_namespace = {
//   get foo() {return foo;}
//   get bar() {return foo;}
//   get f() {return f;}
//   get c() {return c;}
// }
```