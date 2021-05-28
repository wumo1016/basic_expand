## 类型(基其联字交三类数元枚)
  - 基础类型(number string boolean)
  - 其他类型(object undefined null void unkonw any never symbol bigint)
  - 联合类型
  - 字面量类型
  - 交叉类型
  - 类型别名
  - 类型推论
  - 类型守卫
  - 数组
  - 元组(类型与元素一一对应 可以添加元素 但是无法通过索引获取 也无法通过索引添加)
  - 枚举(普通 常量 异构)

  - unkonw与any的区别?
    - unkonw不能分配给其他类型

## 断言
  - 非空断言(!.)
  - 类型断言(as)

## 函数
  - function声明 表达式声明
  - 可选参数
  - 函数重载

## 接口
  - readonly(只读属性) ?:(可选属性)
  - 接口合并(同名的接口会进行合并 属性的相同的不会被覆盖 没有的会添加)
  - 接口继承(extends)
  - [key:string]:any 添加任意多个属性

## 类
  - public private protected readonly static
  - 类装饰器函数
  - 类实现接口 implement 多个接口使用逗号拼接
  - 抽象类 抽象方法可以由子类实现

## 泛型
  - 约束泛型

## 内置类型
  - Partical 将所有属性变成可选
  - Required 将所有属性变成必选
  - Readonly 将所有属性变成只读
  - Omit 排除指定的属性
  - Parameters 获取所有参数类型
  - ReturnType 获取函数返回值类型
  - Pick 从目标类型中获取指定的类型
  - Exclude 排除后面的属性

## 其他
  - ? ??(只有前面是null或undefined时才返回)
  - keyof