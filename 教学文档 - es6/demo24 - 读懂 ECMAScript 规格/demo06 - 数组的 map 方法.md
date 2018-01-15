规格的[22.1.3.15](http://www.ecma-international.org/ecma-262/6.0/#sec-22.1.3.15) 小节定义了数组的`map`方法。该小节先是总体描述`map`方法的行为，里面没有提到数组空位。

后面的算法描述是这样的。

1. Let `O` be `ToObject(this value)`.
1. `ReturnIfAbrupt(O)`.
1. Let `len` be `ToLength(Get(O, "length"))`.
1. `ReturnIfAbrupt(len)`.
1. If `IsCallable(callbackfn)` is `false`, throw a TypeError exception.
1. If `thisArg` was supplied, let `T` be `thisArg`; else let `T` be `undefined`.
1. Let `A` be `ArraySpeciesCreate(O, len)`.
1. `ReturnIfAbrupt(A)`.
1. Let `k` be `0`.
1. Repeat, while `k` < `len`\ a. Let `Pk` be `ToString(k)`.\ b. Let `kPresent` be `HasProperty(O, Pk)`.\ c. `ReturnIfAbrupt(kPresent)`.\ d. If `kPresent` is `true`, then\ d-1. Let `kValue` be `Get(O, Pk)`.\ d-2. `ReturnIfAbrupt(kValue)`.\ d-3. Let `mappedValue` be `Call(callbackfn, T, «kValue, k, O»)`.\ d-4. `ReturnIfAbrupt(mappedValue)`.\ d-5. Let `status` be `CreateDataPropertyOrThrow (A, Pk, mappedValue)`.\ d-6. `ReturnIfAbrupt(status)`.\ e. Increase `k` by `1`.
1. Return `A`.

翻译如下。

1. 得到当前数组的this对象
1. 如果报错就返回
1. 求出当前数组的length属性
1. 如果报错就返回
1. 如果 map 方法的参数callbackfn不可执行，就报错
1. 如果 map 方法的参数之中，指定了this，就让T等于该参数，否则T为undefined
1. 生成一个新的数组A，跟当前数组的length属性保持一致
1. 如果报错就返回
1. 设定k等于 0
1. 只要k小于当前数组的length属性，就重复下面步骤\ a. 设定Pk等于ToString(k)，即将K转为字符串\ b. 设定kPresent等于HasProperty(O, Pk)，即求当前数组有没有指定属性\ c. 如果报错就返回\ d. 如果kPresent等于true，则进行下面步骤\ d-1. 设定kValue等于Get(O, Pk)，取出当前数组的指定属性\ d-2. 如果报错就返回\ d-3. 设定mappedValue等于Call(callbackfn, T, «kValue, k, O»)，即执行回调函数\ d-4. 如果报错就返回\ d-5. 设定status等于CreateDataPropertyOrThrow (A, Pk, mappedValue)，即将回调函数的值放入A数组的指定位置\ d-6. 如果报错就返回\ e. k增加 1
1. 返回A

仔细查看上面的算法，可以发现，当处理一个全是空位的数组时，前面步骤都没有问题。进入第 10 步的 b 时，kpresent会报错，因为空位对应的属性名，对于数组来说是不存在的，因此就会返回，不会进行后面的步骤。

```javascript
const arr = [, , ,];
arr.map(n => {
  console.log(n);
  return 1;
}) // [, , ,]
```

上面代码中，`arr`是一个全是空位的数组，`map`方法遍历成员时，发现是空位，就直接跳过，不会进入回调函数。因此，回调函数里面的`console.log`语句根本不会执行，整个`map`方法返回一个全是空位的新数组。

V8 引擎对`map`方法的实现如下，可以看到跟规格的算法描述完全一致。

```javascript
function ArrayMap(f, receiver) {
  CHECK_OBJECT_COERCIBLE(this, "Array.prototype.map");

  // Pull out the length so that modifications to the length in the
  // loop will not affect the looping and side effects are visible.
  var array = TO_OBJECT(this);
  var length = TO_LENGTH_OR_UINT32(array.length);
  return InnerArrayMap(f, receiver, array, length);
}

function InnerArrayMap(f, receiver, array, length) {
  if (!IS_CALLABLE(f)) throw MakeTypeError(kCalledNonCallable, f);

  var accumulator = new InternalArray(length);
  var is_array = IS_ARRAY(array);
  var stepping = DEBUG_IS_STEPPING(f);
  for (var i = 0; i < length; i++) {
    if (HAS_INDEX(array, i, is_array)) {
      var element = array[i];
      // Prepare break slots for debugger step in.
      if (stepping) %DebugPrepareStepInIfStepping(f);
      accumulator[i] = %_Call(f, receiver, element, i, array);
    }
  }
  var result = new GlobalArray();
  %MoveArrayContents(accumulator, result);
  return result;
}
```