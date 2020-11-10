// TypeScript里的每个函数参数都是必须的。 这不是指不能传递 null或undefined作为参数，而是说编译器检查用户是否为每个参数都传入了值。 编译器还会假设只有这些参数会被传递进函数。 简短地说，传递给一个函数的参数个数必须与函数期望的参数个数一致。

function buildName1(firstName: string, lastName: string) {
    return firstName + " " + lastName;
}

let result11 = buildName1("Bob");                  // error, too few parameters
let result21 = buildName1("Bob", "Adams", "Sr.");  // error, too many parameters
let result31 = buildName1("Bob", "Adams");         // ah, just right






// JavaScript里，每个参数都是可选的，可传可不传。 没传参的时候，它的值就是undefined。 在TypeScript里我们可以在参数名旁使用 ?实现可选参数的功能。 比如，我们想让last name是可选的：

function buildName2(firstName: string, lastName?: string) {
    if (lastName)
        return firstName + " " + lastName;
    else
        return firstName;
}

let result12 = buildName2("Bob");  // works correctly now
let result22 = buildName2("Bob", "Adams", "Sr.");  // error, too many parameters
let result32 = buildName2("Bob", "Adams");  // ah, just right
// 可选参数必须跟在必须参数后面。 如果上例我们想让first name是可选的，那么就必须调整它们的位置，把first name放在后面。






// 在TypeScript里，我们也可以为参数提供一个默认值当用户没有传递这个参数或传递的值是undefined时。 它们叫做有默认初始化值的参数。 让我们修改上例，把last name的默认值设置为"Smith"。

function buildName3(firstName: string, lastName = "Smith") {
    return firstName + " " + lastName;
}

let result13 = buildName3("Bob");                  // works correctly now, returns "Bob Smith"
let result23 = buildName3("Bob", undefined);       // still works, also returns "Bob Smith"
let result33 = buildName3("Bob", "Adams", "Sr.");  // error, too many parameters
let result43 = buildName3("Bob", "Adams");         // ah, just right
// 在所有必须参数后面的带默认初始化的参数都是可选的，与可选参数一样，在调用函数的时候可以省略。 也就是说可选参数与末尾的默认参数共享参数类型。

function buildName4(firstName: string, lastName?: string) {
    // ...
}
// 和

function buildName5(firstName: string, lastName = "Smith") {
    // ...
}
// 共享同样的类型(firstName: string, lastName?: string) => string。 默认参数的默认值消失了，只保留了它是一个可选参数的信息。

// 与普通可选参数不同的是，带默认值的参数不需要放在必须参数的后面。 如果带默认值的参数出现在必须参数前面，用户必须明确的传入 undefined值来获得默认值。 例如，我们重写最后一个例子，让 firstName是带默认值的参数：

function buildName6(firstName = "Will", lastName: string) {
    return firstName + " " + lastName;
}

let result16 = buildName6("Bob");                  // error, too few parameters
let result26 = buildName6("Bob", "Adams", "Sr.");  // error, too many parameters
let result36 = buildName6("Bob", "Adams");         // okay and returns "Bob Adams"
let result46 = buildName6(undefined, "Adams");     // okay and returns "Will Adams"