`ESLint` 是一个语法规则和代码风格的检查工具，可以用来保证写出语法正确、风格统一的代码。

首先，安装 `ESLint`。

```JavaScript
$ npm i -g eslint
```
然后，安装 `Airbnb` 语法规则，以及 `import`、`a11y`、`react` 插件。
```JavaScript
$ npm i -g eslint-config-airbnb
$ npm i -g eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-react
```
最后，在项目的根目录下新建一个`.eslintrc`文件，配置 `ESLint`。
```JavaScript
{
  "extends": "eslint-config-airbnb"
}
```
现在就可以检查，当前项目的代码是否符合预设的规则。

`index.js`文件的代码如下。

```JavaScript
var unusued = 'I have no purpose!';

function greet() {
    var message = 'Hello, World!';
    alert(message);
}

greet();
```

使用 ESLint 检查这个文件，就会报出错误。

```javascript
$ eslint index.js
index.js
  1:1  error  Unexpected var, use let or const instead          no-var
  1:5  error  unusued is defined but never used                 no-unused-vars
  4:5  error  Expected indentation of 2 characters but found 4  indent
  4:5  error  Unexpected var, use let or const instead          no-var
  5:5  error  Expected indentation of 2 characters but found 4  indent

✖ 5 problems (5 errors, 0 warnings)
```

上面代码说明，原文件有五个错误，其中两个是不应该使用`var`命令，而要使用`let`或`const`；一个是定义了变量，却没有使用；另外两个是行首缩进为 4 个空格，而不是规定的 2 个空格。