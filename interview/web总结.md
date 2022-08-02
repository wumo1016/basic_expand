
# 数组扁平化

```
1. reduce

遍历数组每一项，若值为数组则递归遍历，否则concat。

function flatten(arr) {  
    return arr.reduce((result, item)=> {
        return result.concat(Array.isArray(item) ? flatten(item) : item);
    }, []);
}

reduce是数组的一种方法，它接收一个函数作为累加器，数组中的每个值（从左到右）开始缩减，最终计算为一个值。
reduce包含两个参数：回调函数，传给total的初始值

// 求数组的各项值相加的和： 
arr.reduce((total, item)=> {  // total为之前的计算结果，item为数组的各项值
    return total + item;
}, 0);


2. toString & split
调用数组的toString方法，将数组变为字符串然后再用split分割还原为数组

function flatten(arr) {
    return arr.toString().split(',').map(function(item) {
        return Number(item);
    })
} 

因为split分割后形成的数组的每一项值为字符串，所以需要用一个map方法遍历数组将其每一项转换为数值型

3. join & split
和上面的toString一样，join也可以将数组转换为字符串

function flatten(arr) {
    return arr.join(',').split(',').map(function(item) {
        return parseInt(item);
    })
}

4. 递归

递归的遍历每一项，若为数组则继续遍历，否则concat

function flatten(arr) {
    var res = [];
    arr.map(item => {
        if(Array.isArray(item)) {
            res = res.concat(flatten(item));
        } else {
            res.push(item);
        }
    });
    return res;
}


5. 扩展运算符
es6的扩展运算符能将二维数组变为一维

[].concat(...[1, 2, 3, [4, 5]]);  // [1, 2, 3, 4, 5]

根据这个结果我们可以做一个遍历，若arr中含有数组则使用一次扩展运算符，直至没有为止。

function flatten(arr) {
    while(arr.some(item=>Array.isArray(item))) {
        arr = [].concat(...arr);
    }
    return arr;
}
```

# 如何扩展数组,让他拥有新的方法

```
Array.prototype.push.apply(a,b)
```

# class中super作用是什么

```
es5 的继承是先创建子类的this，然后将父类的方法添加到子类的this上去； 
es6 的继承是创建父类的this对象，然后再对this对象添加方法/属性。 
而super方法就是用来创建父类this对象的。

实际上执行的是 super.sport.call(this); 
```

# xss攻击和csrf攻击是什么

```
1、CSRF（Cross-site request forgery）：跨站请求伪造。
（1）登录受信任网站A，并在本地生成Cookie。
	（如果用户没有登录网站A，那么网站B在诱导的时候，请求网站A的api	接口时，会提示你登录）
（2）在不登出A的情况下，访问危险网站B（其实是利用了网站A的漏洞）

CSRF如何防御
方法一: Token 验证：（用的最多）
	（1）服务器发送给客户端一个token；
	（2）客户端提交的表单中带着这个token。
	（3）如果这个 token 不合法，那么服务器拒绝这个请求。
方法二: 隐藏令牌：
	把 token 隐藏在 http 的 head头中。
	方法二和方法一有点像，本质上没有太大区别，只是使用方式上有区别。
方法三: Referer(锐服尔) 验证：
	Referer 指的是页面请求来源。意思是，只接受本站的请求，服务器才做响应；如果不是，就拦截。
	
2、XSS（Cross Site Scripting）：跨域脚本攻击。
XSS攻击的核心原理是：
	不需要你做任何的登录认证，它会通过合法的操作（比如在url中输入、在评论框中输入），
	向你的页面注入脚本（可能是js、hmtl代码块等）。
最后导致的结果可能是：
	盗用Cookie破坏页面的正常结构，插入广告等恶意内容D-doss攻击
XSS的攻击方式
1、反射型
	发出请求时，XSS代码出现在url中，作为输入提交到服务器端，服务器端解析后响应，
	XSS代码随响应内容一起传回给浏览器，最后浏览器解析执行XSS代码。这个过程像一次反射，所以叫反射型XSS。
2、存储型存
	储型XSS和反射型XSS的差别在于，提交的代码会存储在服务器端（数据库、内存、文件系统等），
	下次请求时目标页面时不用再提交XSS代码。

XSS的防范措施（encode + 过滤）主要有三个：
1、编码：
	对用户输入的数据进行HTML Entity(安特踢) 编码。
2、过滤：
	移除用户输入的和事件相关的属性。如onerror可以自动触发攻击，还有onclick等。
	（总而言是，过滤掉一些不安全的内容）移除用户输入的Style节点、Script节点、Iframe节点。
	（尤其是Script节点，它可是支持跨域的呀，一定要移除）。
3、校正
	避免直接对HTML Entity进行解码。
	使用DOM Parse转换，校正不配对的DOM标签。
		这个概念，它的作用是把文本解析成DOM结构。
		比较常用的做法是，通过第一步的编码转成文本，然后第三步转成DOM对象，然后经过第二步的过滤。
	还有一种简洁的答案：
	首先是encode，如果是富文本，就白名单。

3、CSRF 和 XSS 的区别:
区别一：
	CSRF：需要用户先登录网站A，获取 cookie。
	XSS：不需要登录。
区别二：（原理的区别）
	CSRF：是利用网站A本身的漏洞，去请求网站A的api。
	XSS：是向网站 A 注入 JS代码，然后执行 JS 里的代码，篡改网站A的内容。
```

# webapp和小程序有什么区别

```
首先，微信小程序已经提供了一套 view, data, model, router 层的开发工具，
对于开发简单应用，小程序是可以比 webapp 更加快速的。

但是实际上微信小程序提供的这一套开发框架，要开发一些复杂应用，是很困难的，
因为：小程序不支持 npm 等 package manager(麦呢橘)无法复用社区中已经很成熟的 web 框架和工具组件只能封装 view 和 style，无法封装行为（handler），行为只能定义在 page 上小程序有 1mb 的限制，所以我们只能将图片之类的静态资源事先放在服务器上

其次，微信小程序是由微信自己来 host，开发者只需要上传就好，
而微信 webapp 需要开发者自己 host，还需要注册域名甚至备案才可以调用微信接口以及跟公众号集成。
所以微信小程序降低了开发者的门槛。

综上，对于简单的工具型应用，微信小程序可以让开发者加快开发速度，降低发布门槛，
这种类型的应用比较适合微信小程序。对于复杂的应用，webapp 是更适合的形式。
```

# 服务器渲染和浏览器渲染的区别

```
浏览器端渲染路线：**
	请求一个 html。
	服务端返回一个 html。
	浏览器下载 html 里面的 js/css 文件。
	等待 js 文件下载完成。
	等待 js 加载并初始化完成。
	由 js 代码向后端请求数据（ajax/fetch）。
	等待后端数据返回。
	客户端从无到完整地，把数据渲染为响应页面。

**服务端渲染路线：**
	请求一个 html。
	服务端请求数据
	服务器初始渲染。

​	服务端返回已经有正确内容的页面。

​	客户端请求 js/css 文件。

​	等待 js 文件下载完成。

​	等待 js 加载并初始化完成。

​	客户端把剩下一部分渲染完成。
```



#  对MVC，MVP，MVVM的理解

```JS
mvc 和 mvvm 其实区别并不大。都是一种设计思想。主要就是 mvc 中 Controller 演变成 mvvm 中的 viewModel。mvvm 主要解决了 mvc 中大量的 DOM 操作使页面渲染性能降低，加载速度变慢，影响用户体验。和当 Model 频繁发生变化，开发者需要主动更新到 View 。

MVVM 是 Model-View-ViewModel 的缩写。mvvm 是一种设计思想。
1：Model 层代表数据模型，也可以在 Model 中定义数据修改和操作的业务逻辑；View 代表 UI 组件，它负责将数据模型转化成 UI 展现出来，ViewModel 是一个同步 View 和 Model 的对象。
2：在 MVVM 架构下，View 和 Model 之间并没有直接的联系，而是通过 ViewModel 进行交互，Model 和 ViewModel 之间的交互是双向的， 因此 View 数据的变化会同步到 Model 中，而 Model 数据的变化也会立即反应到 View 上。
3：ViewModel 通过双向数据绑定把 View 层和 Model 层连接了起来，而 View 和 Model 之间的同步工作完全是自动的，无需人为干涉，因此开发者只需关注业务逻辑，不需要手动操作 DOM, 不需要关注数据状态的同步问题，复杂的数据状态维护完全由 MVVM 来统一管理。
```



# ★ react优缺点

```
优点： 
1、采用虚拟 DOM，它并不直接对DOM进行操作，安插在javascript逻辑和实际的DOM之间，性能好               
2、跨浏览器兼容：虚拟DOM帮助我们解决了跨浏览器问题，它为我们提供了标准化的API，甚至在IE8中都是没问题的。 
3、一切都是组件：代码更加 模块化 ，重用代码更容易，可维护性高。                           
4、单向数据流：redux 实现是一个用于在JavaScript应用中创建单向数据层的架构，它随着React视图库的开发而被Facebook概念化。                                           
5、同构、纯粹的javascript：因为搜索引擎的爬虫程序依赖的是服务端响应而不是JavaScript的执行，预渲染你的应用有助于搜索引擎优化。                                    
6、兼容性好：比如使用RequireJS来加载和打包，而Browserify(不弱瑟)和Webpack适用于构建大型应用。它们使得那些艰难的任务不再让人望而生畏。                              
7、JSX语法：为了更加便利的模拟DOM结构，我们使用了JSX语法，可以让我们在JS中编译DOM结构                 8、函数式编程：JS的最大特点就是函数式编程，在React中，函数式编程可谓式无处不见

缺点：
不适合单独做一个完整的框架：react是视图层框架，大型项目想要一套完整的框架的话，也许还需要引入Flux和route相关的东西。
```

# 前端实现路由的两种方式（hash和history）

```
第一种：通过location.hash实现前端路由
hash是指url中#后面的部门，这部分在服务器会被自动忽略，但是在浏览器中可以通过location.hash来获取。此方式主要是用到了onhashchange事件，这个事件可以监听url中的hash值变化，以此来进行一些DOM的切换操作。
    onhashchange事件的触发条件有:
    a、改变url地址，在最后面增加或改变其hash值
    b、改变location.href或location.hash
    c、点击带有锚点的链接
	d、浏览器前进后退可能导致hash的变化，就是两个网页地址中的hash值不同
实现思路：
当浏览器地址栏url的hash值发生变化时，就会触发onhashchange事件，这时需要通过window.location.hash可以拿到当前浏览器的url的hash值，此时的hash值是带有#的。可以根据不同的hash值执行不同的回调函数，即加载相应的组件。
实现方式：
当hash值发生变化会触发此事件

第二种：利用window.history实现前端路由**
window对象都有一个history属性，用来保存用户访问过的页面列表，我们在浏览网页时的前进和后退都是由这个对象来实现的。
在用history实现前端路由的过程中，主要使用到了history.pushState()和history.replaceState()这两个接口。二者均接收三个参数，分别是state，title，url，state用来存放将要插入history实体的相关信息，是一个json格式的参数；title是传入history实体的标题，firefox现在会自动忽略掉这个属性；url用来传递新的history实体的相对路径，如果其值为null则表示当前要插入的history实体与前一个实体一致，没有改变。
两者唯一的区别在于replaceState()方法会将最新一条的history实体覆盖掉，而不是直接添加。
这两个方法都不会主动触发浏览器页面的刷新，只是history对象包括地址栏的内容会发生改变，当触发前进后退等history事件时才会进行相应的响应。
浏览器的前进后退会触发window.onpopstate事件，通过绑定 popstate事件，就可以根据当前url地址中的查询内容让对应的菜单执行ajax载入，实现ajax的前进和后退效果。



两种方式的区别

Hash模式只可以更改 # 后面的内容，History 模式可以通过 API 设置任意的同源 URL
History 模式可以通过 API 添加任意类型的数据到历史记录中，Hash 模式只能更改哈希值，也就是字符串
Hash 模式无需后端配置，并且兼容性好。History 模式在用户手动输入地址或者刷新页面的时候会发起 URL 请求，后端需要配置 index.html 页面用于匹配不到静态资源的时候

```

# 路由组件和一般组件的区别

```
1、写法不同，一般组件无routr标签，路由有router标签

2、存放的位置不同，一般组件存放在component文件夹，路由组件存放在page标签内

3、接受到的props不同，一般组件在组件里传什么值，就接受到什么值。路由组件一般会接收到路由信息，history，location和match（模糊匹配、精准匹配）
```



# ★ react生命周期

```
概念：生命周期描述的是组件从创建到卸载的一个完整过程。React提供了一系列生命周期函数，如：初次渲染到DOM中，组件更新完成，组件卸载之前等。

16版本：
初始阶段:
    constructor：定义state在constructor中，会初始化该组件，继承自Component类，不能忘了加super
	
挂载阶段：这个阶段会从组件的初始化开始，一直到组件创建完成并渲染到真实的DOM中
    componentWillMount：将要挂载，(这个钩子函数在将来会被弃用)
    render：将jsx型的虚拟dom渲染为对象类型的虚拟dom
	解析 this.state 和 this.props 
	render 中不允许使用 this.setState() 如何你使用了，就会栈溢出
    componentDidMount：表示组件挂载结束
	虚拟dom -> Real dom
	可以获取真实dom
	数据请求 -> 赋值给state
	第三方库实例化/DOM操作
	
更新阶段:，这个阶段从组件开始更新，一直监测到组件更新完成并重新渲染完DOM
componentWillReceiveProps(在17版本中被弃用)
	这个钩子实际作用是判断组件身上的props是否发生改变
shouldComponentUpdate
	可以决组件是否要更新渲染 return true/false
	接收新旧状态，用于作对比（浅对比）
	一般需要我们手动作深对比
	这个钩子函数是React组件性能优化的一种方式
componentWillUpdate
	表示组件更新前的准备
	这个钩子函数在未来版本被弃用
render
	和初始化阶段的作用一致
componentDidUpdate
	对Real dom 作操作
	注意：父组件数据更新，子组件会重新运行render，反之不行
	每次都要运行子组件render，会造成react性能浪费  
	粗略解决方案：
		在shouldComponentUpdate中，可判断哪些数据改变从而来控制return true/false 
		继而决定是否需要更新render渲染
	更好的解决方案：
    1.引用PureComponent，让类组件继承（extends）PureComponent 
      如：class App extends  PureComponent{}
    2.引用memo，让函数组件写在memo（）里 如：const memoApp =memo（function App() {}）
    3.除了memo之外，更细致的是函数组件中还可以用useCallback（方法）和useMemo（对象和数组）两个钩子阻止组件render

销毁阶段:这个阶段监听组件从DOM中卸载
componentWillUnmount
	销毁组件
	清除无用实例和事件：比如清除定时器，事件监听，和webspcket等
错误捕获:
	componentDidCatch
	用户捕获子组件throw的错误，然后显示回退UI

15版本：
相对于16版本，初始化阶段（constructor钩子变成下列两个）：

定义于初始化props的 getDefalutProps 钩子函数

定义于初始化state的 getInitialState 钩子函数
没有错误捕获阶段

17版本：
相对于16版本 少3多2

少了componentWillMount，componentWillReceiveProps，componentWillUpdate 3个钩子函数
   (斯塔得可)  (迪外的)
多了static getDerivedStateFromProps钩子函数                           (破外服)
	一个静态方法，所以不能在这个函数里面使用this，这个函数有两个参数nextProps和prevState，这个函数会返回一个对象用来更新当前的state对象，如果不需要更新可以返回null。
	简单说就是，可以增加一次state状态
	  (斯那坡秀的)
多了getSnapshotBeforeUpdate钩子函数
	快照
	这个函数有一个返回值，会作为第三个参数传递给componentDidUpdate钩子

```

![react生命周期](D:\Program Files\feiq\Recv Files\图片\react生命周期.png)

# ★ redux流程  redux的原理

```
  是一种管理状态
  1. 打造store -- 存储定义 state、管理state
  2. 打造reducers，reducer拷贝state,并返回一个新的state给store -- 定义修改后的数据
  3. 通过connect高阶组件将store的数据取出来给了组件
  4. 组件中触发动作激活 action 
  5. actionCreators 创建action，action激活reducer
  6. reducers中修改数据

redux组成
	store :用来存储数据和数据管理的、更新视图
	reducer:是一个纯函数，接收旧 state 和 action，根据不同的 Action 做出不同的操作并返回新的 state
	actions:发送动作给reducer,reducer接收动作，判断动作类型修改数据，修改事件后，组件重新做redux事件的订阅
	View：界面，在React中，其实就是组件
 
Redux三大原则
单一数据源:
	整个应用的 state 被存储在一个 Object tree 中，且只存在于唯一的Store中
	
state 是只读的:
	唯一改变 state 的方法就是触发 action，action 是一个用于描述发生事件的普通对象，视图部分只需要表达想要修改的意图，所有修改都会被集中化处理。
	
状态的改变通过纯函数来完成:
	Redux使用纯函数方式来执行状态的修改，Action表明了修改状态值的意图，而真正执行状态修改的则是Reducer。且Reducer必须是一个纯函数，当Reducer接收到Action时，Action并不能直接修改State的值，而是通过创建一个新的状态对象来返回修改的状态。


```

# ★ redux 中间件

```
在action 和 store 之间执行中间件

Redux中间件机制
	Redux本身就提供了非常强大的数据流管理功能，但这并不是它唯一的强大之处，它还提供了利用中间件来扩展自身功能，以满足用户的开发需求

     (米的为尔)	
applyMiddlewares():它是 Redux 的原生方法，作用是将所有中间件组成一个数组，依次执行。
applyMiddleware顾名思义，用于调用各种中间件；
applyMiddleware执行后，将所有入参中间件存入一个数组，并且返回一个闭包（闭包的概念不做累述）
闭包接受一个createStore作为入参并且执行后返回下一个闭包。
```

# redux-thunk|异步action

```
首先检查参数 action 的类型，如果是函数的话，就执行这个 action 函数，
并把 dispatch, getState, extraArgument(哎克斯拽埃歌门特) 作为参数传递进去，
否则就调用 next 让下一个中间件继续处理 action 

好处
	可以进行前后端数据交互
缺点
    将带有数据请求的action和没有带有数据请求的action混在一起了
    缺点解决： 弃用redux-thunk,使用redux-saga
    redux-saga可以将异步action和普通action区别开来
```

# redux-saga|集中处理异步action

```
redux-saga可以将异步action和普通action区别开来，控制器与更优雅的异步处理
redux-saga就是用Generator(杰呢瑞特)来处理异步。

redux-saga文档并没有说自己是处理异步的工具，而是说用来处理边际效应（side effects），这里的边际效应你可以理解为程序对外部的操作，比如请求后端，比如操作文件。

redux-saga相当于在Redux原有数据流中多了一层，通过对Action进行监听，从而捕获到监听的Action，然后可以派生一个新的任务对state进行维护（这个看项目本身的需求），通过更改的state驱动View的变更。

redux-saga同样是一个redux中间件，它的定位就是通过集中控制action，起到一个类似于MVC中控制器的效果。
同时它的语法使得复杂异步操作不会像promise那样出现很多then的情况，更容易进行各类测试。
```

# redux与react-redux的关系

```
redux是独立的应用状态管理工具。它是可以独立于react之外的。如果我们需要在react当中运用它，那么我们需要手动订阅store的状态变化，来对我们的react组件进行更新。react-reudx这个工具，就帮我们实现了这个功能，我们只需对store进行处理，react组件就会有相应的变化。

Redux的核心由三部分组成：Store, Action, Reducer。
Store: 是个对象，贯穿你整个应用的数据都应该存储在这里。
Action: 是个对象，必须包含type这个属性，reducer将根据这个属性值来对store进行相应的处理。除此之外的属性，就是进行这个操作需要的数据。
Reducer: 是个函数。接受两个参数：要修改的数据(state) 和 action对象。根据action.type来决定采用的操作，对state进行修改，最后返回新的state。

总结
Redux: store, action, reducer
store: getState, dispatch, subscribe
combineReducers (克木拜恩)
createStore
store ️ dispatch ️ action ️ reducer

react-redux:
connect : 将store作为props注入
provider(破外的): 使store在子孙组件的connect中能够获取到
```

#  react-reudx

```
1. UI组件|显示页面??		 				 (破森特逊弄)
   React-Redux 将所有组件分成两大类：UI 组件（presentational component）和容器组件
2. 容器组件|负责管理数据/复杂逻辑?
   UI 组件负责 UI 的呈现，容器组件负责管理数据和逻辑。
3. Provider组件|容器组件获取state??
   所有的 UI 组件都由用户提供，容器组件则是由 React-Redux 自动生成。也就是说，用户负责视觉层，状态管理则是全部交给它。
4. connect()|UI组件+容器组件
   React-Redux 提供connect方法，用于从 UI 组件生成容器组件。connect的意思，就是将这两种组件连起来。
```

# DVA与CRA相比的优点

```
dva:
	dva 首先是一个基于 redux 和 redux-saga 的数据流方案，然后为了简化开发体验，dva 还额外内置了 react-router 和 fetch，所以也可以理解为一个轻量级的应用框架。--- 来自官方。
	相比于cra只是多了内置的redux和redux-saga，帮我们处理了数据流这方面的需求而已。如果只是想要达到这个效果的话，直接在cra中增加dva-core的依赖也是可以做到的。

umi:
	是一个可插拔的企业级 react 应用框架。umi和cra都是应用框架，可能相比cra来说umi的功能点更多一些，只能说是功能性的话umi要相对来说更胜一筹
```

# flux

```
flux 是 react 中的类似于 vuex 的公共状态管理方案，它是 Facebook 官方给出的应用架构，利用数据的单向流动的形式对公共状态进行管理。现已不推荐使用。

flux的组成
	View：视图层
	Action：视图发出的消息
	Dispatcher：派发者，用来接收Action，执行回调函数
	Store：数据层，存放状态，一旦发生改动
	
flux 在进行数据更新时，会经历以下几步：
	用户与 View 层交互，触发 Action
	Action 使用 dispatcher.dispatch 将Action自己的状态发送给dispatcher
	dispatcher 通过register注册事件，再通过Action传入的类型来触发对应的 Store 回调进行更新
	Store 里进行相应的数据更新，并触发 View 层事件使试图也同步更新
	View层 收到信号进行更新

redux和flux的区别
　　1）redux是flux中的一个实现
　　2）在redux中我们只能定义一个store，在flux中我们可以定义多个
　　3）在redux中，store和dispatch都放到了store，结构更加清晰
　　4）在redux中本身就内置State对象，对仓库的管理更加明确
```

# React 中 key 的作用

```
key是react用于追踪哪些列表被修改、被添加或者被移出的辅助标识。

在开发过程中，我们需要保证某些元素在同级的元素中key是唯一的，在react Diff算法中，React会借助元素的key值来判断该元素是新创建的还是移动而来的，从而减少元素的不必要的重复渲染。此外，我们还需要借助key值来判断元素与本地状态的关联关系，因此我们绝不可忽视转换函数中 Key 的重要性。

react根据key来决定是销毁重新创建组件还是更新组件的原则是：

key相同，比较type，type不同销毁之前的组件，将整个组件重新渲染，type相同，比较props，react会只更新组件对应变化的props属性。 （type可以是标签 也可以是组件名）
key不同，react会销毁之前的组件，将整个组件重新渲染。

react可以使用index，但不建议，因为index会动态变化
```

# ★ react新特性和diff算法

```
render
支持返回这五类:
React elements, 数组, Fragments, Portal, String/numbers, boolean/null, 基础数据类型

Fiber
React Fiber的方法其实很简单——分片。把一个耗时长的任务分成很多小片，每一个小片的运行时间很短，虽然总时间依然很长，但是在每个小片执行完之后，都给其他任务一个执行的机会，这样唯一的线程就不会被独占，其他任务依然有运行的机会。

新的生命周期函数
由于异步渲染的改动，componentWillMount, componentWillReceiveProps,componentWillUpdate 三个函数将被废弃。
由于这是一个很大的改变会影响很多现有的组件，所以需要慢慢的去改。
目前react 16 只是会报warning，在react 17就只能在前面加UNSAFE_的前缀来使用

diff算法
作用: 计算出Virtual DOM中真正变化的部分，并只针对该部分进行原生DOM操作，而非重新渲染整个页面

getDerivedStateFromProps
static getDerivedStateFromProps(props, state)在调用render方法之前调用，
无论是在初始安装还是后续更新。它应返回一个对象来更新状态，或者返回null以不更新任何内容。

根据props更新state
这个生命周期可用于替代componentWillReceiveProps

getSnapshotBeforeUpdate()
getSnapshotBeforeUpdate(prevProps, prevState)在最近呈现的输出被提交到例如DOM之前调用。它使组件可以在可能更改之前从DOM捕获一些信息（例如滚动位置）。此生命周期返回的任何值都将作为参数传递给componentDidUpdate()。

hooks

lazy、suspense
lazy需要跟Suspence配合使用。
lazy实际上是帮助我们实现代码分割的功能。

由于有些内容，并不一定要在首屏展示，所以这些资源没有必要一开始就要去获取，那么这些资源就可以动态获取。
这样的话，相当于把不需要首屏展示的代码分割出来，减少首屏代码的体积，提升性能。

Suspence 很像Error Boundary，不同的是Error Boundary是用来捕获错误，显示相应的callback组件。而Suspence是用来捕获还没有加载好的组件，并暂停渲染，显示相应的callback。
```

# ★ setState概述,同步异步

```
1. 两个参数及用法
	第一个参数可以是对象或者函数（要用到前一次的state值得时候使用），是更新state  
    第二个参数是回调函数，用来解决异步的

2. 同步还是异步原理：
	setState在合成事件和钩子函数中是异步的 
	在原生事件和setTimeout中是同步的
3、原理：对象的合并
setState的“异步”并不是说内部由异步代码实现，其实本身执行的过程和代码都是同步的，只是合成事件和钩子函数的调用顺序在更新之前，导致在合成事件和钩子函数中没法立马拿到更新后的值，形式了所谓的“异步”，当然可以通过第二个参数 setState(partialState, callback) 中的callback拿到更新后的结果。

setState 的批量更新优化也是建立在“异步”（合成事件、钩子函数）之上的，在原生事件和setTimeout 中不会批量更新，在“异步”中如果对同一个值进行多次 setState ， setState 的批量更新策略会对其进行覆盖，取最后一次的执行，如果是同时 setState 多个不同的值，在更新时会对其进行合并批量更新。
```

# react合成事件

```
1. 合成事件原理
   如果DOM上绑定了过多的事件处理函数，整个页面响应以及内存占用可能都会受到影响。React为了避免这类DOM事件滥用，同时屏蔽底层不同浏览器之间的事件系统差异，实现了一个中间层——SyntheticEvent。

当用户在为onClick添加函数时，React并没有将Click时间绑定在DOM上面。
而是在document处监听所有支持的事件，当事件发生并冒泡至document处时，React将事件内容封装交给中间层SyntheticEvent（负责所有事件合成）
所以当事件触发的时候，对使用统一的分发函数dispatchEvent将指定函数执行。

2. 与原生事件的区别
   React合成事件一套机制：React并不是将click事件直接绑定在dom上面，而是采用事件冒泡的形式冒泡到document上面，然后React将事件封装给正式的函数处理运行和处理。
```

# react路由传参和读参

```
1.params
<Route path='/path/:name' component={Path}/>
<link to="/path/2">xxx</Link>
this.props.history.push({pathname:"/path/" + name});
读取参数用:this.props.match.params.name
优势:刷新地址栏，参数依然存在
缺点:只能传字符串，并且，如果传的值太多的话，url会变得长而丑陋。

2.query
<Route path='/query' component={Query}/>
<Link to={{ path : ' /query' , query : { name : 'sunny' }}}>
this.props.history.push({pathname:"/query",query: { name : 'sunny' }});
读取参数用: this.props.location.query.name
优势: 传参优雅，传递参数可传对象；
缺点: 刷新地址栏，参数丢失

3.state
<Route path='/sort ' component={Sort}/>
<Link to={{ path : ' /sort ' , state : { name : 'sunny' }}}> 
this.props.history.push({pathname:"/sort ",state : { name : 'sunny' }});
读取参数用: this.props.location.query.state 
优缺点同query

4.search
<Route path='/web/departManange ' component={DepartManange}/>
<link to="web/departManange?tenantId=12121212">xxx</Link>
this.props.history.push({pathname:"/web/departManange?tenantId" + row.tenantId});
读取参数用: this.props.location.search
优缺点同params
```

# redux和mobx(类似双向数据绑定)区别

```
1. 组成部分
   actions->state->computed values->Reactions
2. 工作流
   在mobx中， 数据是通过加 @observable 作为可监测的被观察者， 在view层中， 你可以通过添加@observer 将view作为观察者，对数据进行监测， 如果要触发改变数据，则使用@action, 事实上，你可以直接在view层改变数据， 但这种方式不便监控数据，因此不推荐直接改变数据。 而@computed可以用来计算数据， 也可以是计算多个数据之后返回新的数据， 如果其中数据改变， @computed也会触发改变
3. 优点
   不同于redux的单一数据流， mobx中，你可以同时在各个地方使用同一份state, 也可以在一个页面中使用多个store文件
```

# ★ react组件通信5种

```
1.父组件向子组件通信
React数据流动是单向的，父组件通过props向子组件传递参数

2.子组件向父组件通信
父组件将一个函数作为 props 传递给子组件，子组件调用该回调函数并传参。

3.非嵌套组件间通信（兄弟）
ref；状态提升

4.跨组件通信
context；redux；事件发布订阅模式；第三方媒介-URL、本地缓存
    
使用 context 对象:
	context 相当于一个全局变量，是一个大容器，我们可以把要通信的内容放在这个容器中，这样一来，不管嵌套有多深，都可以随意取用。
使用 context 也很简单，需要满足两个条件：
	上级组件要声明自己支持 context，并提供一个函数来返回相应的 context 对象
	子组件要声明自己需要使用 context

5.redux（状态提升）
首先由view dispatch拦截action，然后执行对应reducer并更新到store中，最终views会根据store数据的改变执行界面的刷新渲染操作。
	1)首先先把redux相关工具安装好 
	2)通过创建一个store实例createStore,接收一个rootReducer和中间件执行函数
	3)创建分块的数据rootReducer,通过combineReducers打造rootReducer,里面放分块的数据
	4)在组件中通过高阶组件connect函数,接收store里的数据,把ActionCreators里的方法绑定到组件身上,
	  并且可以发送动作action给reducer
	5)在reductor中根据action中的type动作类型,判断动作修改数据
```

# 组件按需加载

```
（实现方式，需要的依赖）懒加载

1、vue异步组件技术
	vue-router配置路由，使用vue的异步组件技术，可以实现按需加载。
	但是，这种情况下一个组件生成一个js文件。

2.import()

3.webpack提供的require.ensure()

4.第三方库比如react-loadable   

5.lazyload-loader
```

# 组件销毁

```
componentWillUnmount

定义state  flag:false   作为开关   定义方法if判断是否为1,改变state    flag:true

将方法绑定组件上  可以用三目或者短路原则&&控制组件的显示隐藏
```

# Antd中input输入框 + form表单  

```
onChange输入框内容改变时候回调    value输入的内容   defaultValue输入框默认值

input默认值在input中绑定value    定义一个state   和input双向数据绑定    做成受控组件    定义一个事件   改变的时候获取e.target.value

获取input框的值 通过form标签的 onFieldsChange事件

比较两个密码框 密码是否相等 通过form标签的 rules 校验 
```

# react useState() Hook 

```
1.使用 useState() 进行状态管理
	调用useState() Hook 来启用函数组件中的状态。
	useState(initialValue)的第一个参数initialValue是状态的初始值。
	[state, setState] = useState(initialValue)返回一个包含2个元素的数组:状态值和状态更新函数。
	使用新值调用状态更新器函数setState(newState)更新状态。或者，可以使用一个回调setState(prev => next)来调用状态更新器，该回调将返回基于先前状态的新状态。
	调用状态更新器后，React 确保重新渲染组件，以使新状态变为当前状态。
2.多种状态
	通过多次调用useState()，一个函数组件可以拥有多个状态。
	需要注意的，要确保对useState()的多次调用在渲染之间始终保持相同的顺序。
3.状态的延迟初始化
	每当 React 重新渲染组件时，都会执行useState(initialState)。如果初始状态是原始值（数字，布尔值等），则不会有性能问题。
	当初始状态需要昂贵的性能方面的操作时，可以通过为useState(computeInitialState)提供一个函数来使用状态的延迟初始化，该函数仅在初始渲染时执行一次，以获得初始状态。在以后的组件渲染中，不会再调用该函数，从而跳过昂贵的操作。
4.调用 useState()
在使用useState() Hook 时，必须遵循 Hook 的规则：
1.仅顶层调用Hook:不能在循环，条件，嵌套函数等中调用useState()。在多个useState()调用中，渲染之间的调用顺序必须相同。
2.仅从React 函数调用 Hook:必须仅在函数组件或自定义钩子内部调用useState()。
```

# 高阶组件HOC

```
高阶组件是一个函数，高阶组件接收一个组件作为参数进行使用，且需要在render函数中return返回这个组件
 1.名词解释/作用
    使函数复用，可以通过给组件传递方法来复用高阶组件中的函数方法。
特点
    高阶组件是一个函数
    高阶组件的目的是为了：复用组件,将多个组件都要使用的类似逻辑放在同一个地方进行处理
2.常用高阶组件4个
	1，React.memo() 搭配useCallback使用
    2，connect() 绑定redux和组件，绑定后组件就可以使用redux里的state状态，参1：函数：state数据映射到props（也可以设置成null），参数2：函数：将dishpatch映射到props
	3，provider()  设置共享数据，用于组件通信 <moneyContext.Provider* value={money}>   </moneyContext.Provider*>
	使用场景给整个app传递仓库store，在最外层容器组件中初始化 store，然后将 state 上的属性作为 props 层层传递下去。<Provider store={store}><App /></Provider>//react-redux
  4，withRouter()  // 可以使用
	把不是通过路由切换过来的组件中，将react-router 的 history、location、match 三个对象传入props对象上
默认情况下必须是经过路由匹配渲染的组件才存在this.props，才拥有路由参数，才能使用编程式导航的写法，执行this.props.history.push('/detail')跳转到对应路由的页面
然而不是所有组件都直接与路由相连（通过路由跳转到此组件）的，当这些组件需要路由参数时，使用withRouter就可以给此组件传入路由参数，此时就可以使用this.props

一：如何使用withRouter：
比如app.js这个组件，一般是首页，不是通过路由跳转过来的，而是直接从浏览器中输入地址打开的，如果不使用withRouter此组件的this.props为空，没法执行props中的history、location、match等方法。
3.有自己封装过吗  
    拖拽封装，给组件里面的标签添加方法就可以实现拖拽，并返回标签的x与y坐标。
	深对比，深复制封装、正则封装、页面路由跳转、路由数据接收解析。
```

# 拖拽封装思路

```
重点：
1、一定要绝对定位，脱离文档流才可以移动。
2、绑定拖拽的元素，移动和鼠标松开后是对document的绑定，因为移动的是整个div。
3、点击：a= 获取当前鼠标坐标、b =div距浏览器距离、c = 鼠标在div内部距离=a-b。
   移动：通过  a - c 建立鼠标与div的关系，防止鼠标超出div。

拖拽状态 = 0鼠标在元素上按下的时候{ 
	拖拽状态 = 1 
	记录下鼠标的x和y坐标 
	记录下元素的x和y坐标 
} 

鼠标在元素上移动的时候{ 
	如果拖拽状态是0就什么也不做。 
	如果拖拽状态是1，那么 
	元素y = 现在鼠标y - 原来鼠标y + 原来元素y 
	元素x = 现在鼠标x - 原来鼠标x + 原来元素x 
}  

鼠标在任何时候放开的时候{ 
	拖拽状态 = 0 
}
```

# 数据请求封装思路

```

```

# 自定义hook封装过组件吗

```
1.将Hello组件和App组件中共用的逻辑放在统一的自定义hook中写
2.自定义hook,hook名以use开头
3.其他组件通过import引入自定义hook,就可以使用了、

```

# react组件封装

```
ui组件二次封装
创建一个react文件 , 搭建模板
把组件内的内容写清楚
使用export 把组件曝光
使用import把组件导入
```



# ★ react和vue的区别

```
相同点:
1.都使用了虚拟dom,如果需要改变任何元素的状态,先改虚拟dom,当有变化产生时,会创建新的虚拟dom,通过diff算法对比新旧虚拟dom的差异,只需要渲染差异部分就行
2.都使用组件化

不同点:
1.react中有新语法jsx,vue用普通的html   
2.vue中父组件和子组件有通信的时候,父组件数据改变引起子组件改变,子组件会重新渲染，如果父子组件没有通信,父组件改变子组件不会渲染，react中不管是否有数据通信,父组件改变子组件都会渲染
3.react:create-react-app
  vue  :vue-cli
4.react中用redux管理状态,state通过setState更新
  vue中数据由vuex管理
```

#   Vue和React中diff算法区别

  vue和react的diff算法，都是忽略跨级比较，只做同级比较。vue diff时调动patch函数，参数是vnode和oldVnode，分别代表新旧节点。

1.vue对比节点。当节点元素相同，但是classname不同，认为是不同类型的元素，删除重建，而react认为是同类型节点，只是修改节点属性。

2.vue的列表对比，采用的是两端到中间比对的方式，而react采用的是从左到右依次对比的方式。当一个集合只是把最后一个节点移到了第一个，react会把前面的节点依次移动，而vue只会把最后一个节点移到第一个。总体上，vue的方式比较高效。

# react的class组件,没有class的时候怎么写

```
React.createClass    
我们最早使用这个方法来构建一个组件“类”，它接受一个对象为参数，
对象中必须声明一个render方法，render返回一个组件实例
```

# 生命周期  钩子函数用es5怎么定义

```
protoType.componentDidMount
```

# 虚拟dom和diff算法

```
为什么使用虚拟DOM
虚拟DOM是以js的形式在内存中描述真实的DOM结构，这样当页面内容需要发生变动时，React可以通过对前后虚拟DOM的比对，计算出如何以最小的代价操作真实DOM

虚拟 dom 相当于在 js 和真实 dom 中间加了一个缓存，利用 dom diff 算法 避免了没有必要的 dom 操作，从而提高性能
具体实现步骤如下 用 JavaScript 对象结构表示 DOM 树的结构；然后用这个树构建一个真正的 DOM 树， 插到文档当中 当状态变更的时候，重新构造一棵新的对象树。然后用新的树和旧的树进行比较，记录两 棵树差异把2所记录的差异应用到步骤1所构建的真正的 DOM 树上，视图就更新

1.虚拟dom是什么
	所谓的虚拟 dom，也就是虚拟节点。它通过JS的Object对象模拟DOM中的节点，然后再通过特定的render方法将其渲染成真实的DOM节点
	用js模拟一颗dom树,放在浏览器内存中。当你要变更时,虚拟dom使用diff算法进行新旧虚拟dom的比较,将变更放到变更队列中,反应到实际的dom树,减少了dom操作。

2.虚拟dom的使用基本流程（前四步骤）
	1.获取数据
	2.创建虚拟dom
	3.通过render函数解析jsx，将其转换成虚拟dom结构
	4.将虚拟dom渲染成真实dom
	5.数据更改了
	6.使用diff算法比对两次虚拟dom,生成patch对象
	7.根据key将patch对象渲染到页面中改变的结构上，而其他没有改变的地方是不做任何修改的(虚拟dom的惰性原则)

优点：
保证性能下限： 
	框架的虚拟 DOM 需要适配任何上层 API 可能产生的操作，它的一些 DOM 操作的实现必须是普适的，所以它的性能并不是最优的；但是比起粗暴的 DOM 操作性能要好很多，因此框架的虚拟 DOM 至少可以保证在你不需要手动优化的情况下，依然可以提供还不错的性能，即保证性能的下限；
无需手动操作 DOM： 
	我们不再需要手动去操作 DOM，只需要写好 View-Model 的代码逻辑，框架会根据虚拟 DOM 和 数据双向绑定，帮我们以可预期的方式更新视图，极大提高我们的开发效率；
跨平台： 
	虚拟 DOM 本质上是 JavaScript 对象,而 DOM 与平台强相关，相比之下虚拟 DOM 可以进行更方便地跨平台操作，例如服务器渲染、weex 开发等等。

缺点:
无法进行极致优化： 
虽然虚拟 DOM + 合理的优化，足以应对绝大部分应用的性能需求，但在一些性能要求极高的应用中虚拟 DOM 无法进行针对性的极致优化。首次渲染大量DOM时，由于多了一层虚拟DOM的计算，会比innerHTML插入慢。

1.diff算法是什么
	Diff算法是用于比较两个新旧虚拟dom树的差异的，比较完之后会得到一个差异对象，我们称之为patch补丁对象
	比较后会出现四种情况：
		1、此节点是否被移除 -> 添加新的节点
		2、属性是否被改变 -> 旧属性改为新属性
		3、文本内容被改变 -> 旧内容改为新内容
		4、节点要被整个替换 -> 结构完全不相同 移除整个替换

2.diff算法运行结束后，返回是什么
 返回一个key
```

# react Native

```
React Native(内特服)能在手机上创建原生应用，React在这方面处于领先位置。使用JavaScript, CSS和HTML创建原生移动应用，这是一个重要的革新。Vue社区与阿里合作开发Vue版的React Native——Weex也很不错，但仍处于开发状态且并没经过实际项目的验证。

既拥有Native的用户体验、又保留React的开发效率

React Native与React.js的主要区别还是JSX,它使用XML标记的方式去直接声明界面，将HTML直接嵌入到JavaScript代码中
```

# react-router(路由)原理

```
基本原理:实现URL与UI可视化界面的同步。其中在react-router中，URL对应Location对象，而UI是由react components来决定的，这样就转变成location与components之间的同步问题。
在react-router中最主要的component是Router、RouterContext、Link，history库起到了中间桥梁的作用

react-router依赖基础 - history 
history是一个独立的第三方js库，可以用来兼容在不同浏览器、不同环境下对历史记录的管理

老浏览器的history: 
	主要通过hash来实现，对应createHashHistory
高版本浏览器: 
	通过html5里面的history，对应createBrowserHistory 
node环境下:                         (不弱惹)
	主要存储在历史记录memeory里面，对应createMemoryHistory
抽象了一个公共的文件createHistory:
	此时的location跟浏览器原生的location是不相同的，最大的区别就在于里面多了key字段，
	history内部通过key来进行location的操作

原理:
1.执行URL前进
	createBrowserHistory: pushState、replaceState
	createHashHistory: location.hash=*** location.replace()
	createMemoryHistory: 在内存中进行历史记录的存储
1.检测URL回退
	createBrowserHistory: popstate
	createHashHistory: hashchange
	createMemoryHistory: 因为是在内存中操作，跟浏览器没有关系，不涉及UI层面的事情，所以可以直接进行历史信息的回退
1.state的存储
	为了维护state的状态，将其存储在sessionStorage里面:
	
安装react-router-dom     
	Link组件用于点击链接跳转其他页面，没有路由激活
	NavLink 用于有路由激活效果的
```

# react-router-dom和react-router的区别

```
写法上的区别：
import {Swtich, Route, Router, HashHistory, Link} from 'react-router-dom';

import {Switch, Route, Router} from 'react-router';
import {HashHistory, Link} from 'react-router-dom';

react-router-dom: 
加入了在浏览器运行环境下的一些功能:
	BrowserRouter和HashRouter组件，
	前者使用pushState和popState事件构建路由，
	后者使用window.location.hash和hashchange事件构建路由。

react-router-dom是依赖于react-router的，其中Switch、Route、Router、Redirect等组件是直接引入react-router中的

react-router-dom还另外新增了Link、BrowserRouter、HashRouter组件。

在引入react-router-dom后不需要显性引入react-router，
react-router-dom依赖react-router，npm都会将他们安装。

react-router3.x与react-router-dom区别
	react-router3.x版本下路由采用集中式配置，UI组件和路由是分开的。
	react-router4.x版本下路由路由采用分散式配置，路由嵌套在UI组件当中，
	更加契合组件化思想（组件中的路由也应该包含在组件之中）。
```

# react路由模式

```
我们一直在使用的路由方式是BrowserRouter，也就是浏览器的路由方式，其实React还有几种路由方式：
					 (不弱惹)
1、BrowserRouter：浏览器的路由方式，也就是在开发中最常使用的路由方式
2、HashRouter：在路径前加入#号成为一个哈希值，Hash模式的好处是，再也不会因为我们刷新而找不到我们的对应路径
3、MemoryRouter：不存储history，所有路由过程保存在内存里，不能进行前进后退，因为地址栏没有发生任何变化
4、NativeRouter：经常配合ReactNative使用，多用于移动端
5、StaticRouter：设置静态路由，需要和后台服务器配合设置，比如设置服务端渲染时使用
  (斯大推克)
```

# react路由配置

```
1、引入路由包
	npm install --save react-router
	npm install --save react-router-dom
	react-router：是基本的router包，里边函的内容较多，
				  但是在网页开发中有很多用不到，现在的市面上的课程讲的基本都是这个包的教程。
	react-router-dom：随着react生态环境的壮大，后出现的包，
					  这个包比react-router包轻巧了很多。
2、设置路由配置文件
	在src目录下新建一个Router/index.js文件用于管理路由，这里需要引入一些对应的组件和路由包文件。
		Router的history是必需的props
		Switch表示只渲染第一个与当前地址匹配的<Route>
		Route的props path为路径，component为路径对应的页面
		exact属性表示精确匹配,比如我们有多层路由进行嵌套时，exact可以帮助我们精确匹配到你想跳转的路由。		 exact的值为bool型，为true是表示严格匹配，为false时为正常匹配

3、在入口文件引入路由配置文件
	import RouterConfig from './router/index.js';
	ReactDOM.render(<RouterConfig/>, document.getElementById('root'));
	
4、在各组件中使用路由
	<ul className="menu">
    	<li><NavLink to='/Page1'>第一个页面</NavLink></li>
    	<li><NavLink to='/Page2'>第二个页面</NavLink></li>
	</ul>
	
1.Switch:表示一次只渲染一个组件
2.Route:路由组件,用于展示一个组件  同router-view
3.Redirect:重定向(锐得埃克特)
4.lazy + Suspense(色斯盘丝):实现路由懒加载
5.exact:路径完全匹配
6.fallback:组件切换时候的转场组件
```

# react路由(router)实现异步加载

```
router原理 基于URL进行渲染
react-router，官网文档给出的是用webpack的bundle-loader

require.ensure。这是webpack的旧式写法，现在已不推荐

import()
	符合ECMAScript提议的import()语法，该提案与普通 import 语句或 require 函数的类似，
	但返回一个 Promise 对象。这意味着模块时异步加载的
```

# react原理

```
1. setState  
	setState在合成事件和钩子函数中是异步的 
	在原生事件和setTimeout中是同步的

	setState的“异步”并不是说内部由异步代码实现，其实本身执行的过程和代码都是同步的，
	只是合成事件和钩子函数的调用顺序在更新之前，导致在合成事件和钩子函数中没法立马拿到更新后的值，
	形式了所谓的“异步”，

	第一个参数可以是对象或者函数  是更新state   
	第二个参数获取最新的state,副作用操作    dom操作事件触发声明  数据获取

2. JSX语法的转化
	JSX 仅仅是 createElement() 方法的语法糖（简化语法）
	JSX 语法被 @babel/preset-react 插件编译为 createElement() 方法
	react.createElement()
	React 元素：是一个对象，用来描述你希望在屏幕上看到的内容

3. 组件更新机制
	setState() 的两个作用： 1. 修改 state 2. 更新组件（UI）
	过程：父组件重新渲染时，也会重新渲染子组件。但只会渲染当前组件子树（当前组件及其所有子组件）   

4. 组件性能优化
	减轻 state：只存储跟组件渲染相关的数据
	避免不必要的重新渲染 : shouldComponentUpdate(nextProps, nextState)    
	通过返回值决定该组件是否重新渲染，返回 true 表示重新渲染，false 表示不重新渲染   起到优化作用

5. 纯组件 PureComponent
	PureComponent 内部自动实现了 shouldComponentUpdate 钩子，不需要手动比较    
	纯组件内部通过分别 对比 前后两次 props 和 state 的值，来决定是否重新渲染组件 
	纯组件内部的对比是 shallow compare（浅层对比）

6. 虚拟 DOM 和 Diff 算法
	数据改变视图更新
	初次渲染时，React 会根据初始state（Model），创建一个虚拟 DOM 对象（树）。
	根据虚拟 DOM 生成真正的 DOM，渲染到页面中。
	当数据变化后（setState()，重新根据新的数据，创建新的虚拟DOM对象（树）。
	与上一次得到的虚拟 DOM 对象，使用 Diff 算法 对比（找不同），生成patch补丁对象,得到需要更新的内容。
	最终，React 只将变化的内容更新（patch）到 DOM 中，重新渲染到页面。
	
	
	
	
总：	在Web开发中，我们总需要将变化的数据实时反应到UI上，这时就需要对DOM进行操作。而复杂或频繁的DOM操作消耗性能（如何进行高性能的复杂DOM操作通常是衡量一个前端开发人员技能的重要指标）。React为此引入了虚拟DOM（Virtual DOM）的机制：在浏览器端用Javascript实现了一套DOM API。基于React进行开发时所有的DOM构造都是通过虚拟DOM进行，每当数据变化时，React都会重新构建整个DOM树，然后React将当前整个DOM树和上一次的DOM树进行对比，得到DOM结构的区别，然后仅仅将需要变化的部分进行实际的浏览器DOM更新。而且React能够批处理虚拟DOM的刷新，在一个事件循环（Event Loop）内的两次数据变化会被合并，例如你连续的先将节点内容从A变成B，然后又从B变成A，React会认为UI不发生任何变化，而如果通过手动控制，这种逻辑通常是极其复杂的。尽管每一次都需要构造完整的虚拟DOM树，但是因为虚拟DOM是内存数据，性能是极高的，而对实际DOM进行操作的仅仅是Diff部分，因而能达到提高性能的目的。这样，在保证性能的同时，开发者将不再需要关注某个数据的变化如何更新到一个或多个具体的DOM元素，而只需要关心在任意一个数据状态下，整个界面是如何Render的。
```

# ★ react的connect高阶组件实现, 如何在全局中取得store

```
连接React组件与 Redux store。
connect:connect函数的返回值是一个高阶组件,通过高阶组件来获取store中的数据     
connect底层原理:是闭包

mapStateFromProps:从countReducer中解构出num数据,用来获取数据
mapDispatchFromProps:将ActionCreators中的方法绑定到组件上,并且发送action

connect调用的结果是返回一个高阶组件
connect方法利用了合并分发的原理来帮助我们完成store内容的获取

合并： 将store中的所有数据拿到手
分发： 将我们UI需要的数据派发出去

原理 
合并分发 ：合并的意思是：(我们项目中)redux的数据是集中在一处的
分发的意思是：给的是所有数据中的分块的数据

```

##  react事件机制

```
事件注册
事件存储
事件触发/执行
合成事件
```

## react state和props区别

```
props是传递给组件的，而state是在组件内部被组件自己管理的（类似于在一个函数内声明的变量）
props是不可以被修改的，所有的react组件都必须像纯函数一样保护他们的props不被修改
state是在组件中创建，一般是在constructor中初始化state
state是多变的，可被修改的。每次setState都是异步更新的
```

# react的connect实现原理

```
首先connect之所以会成功，是因为Provider组件：
在原应用组件上包裹一层，使原来整个应用成为Provider的子组件
接收Redux的store作为props，通过context对象传递给子孙组件上的connect

那connect做了些什么呢？
它真正连接 Redux 和 React，它包在我们的容器组件的外一层，
它接收上面 Provider 提供的 store 里面的 state 和 dispatch，
传给一个构造函数，返回一个对象，以属性形式传给我们的容器组件。

关于它的源码
connect是一个高阶函数，首先传入mapStateFromProps、mapDispatchFromProps，
然后返回一个生产Component的函数(wrapWithConnect)，
然后再将真正的Component作为参数传入wrapWithConnect，
这样就生产出一个经过包裹的Connect组件，该组件具有如下特点:

通过props.store获取祖先Component的store
props包括stateProps、dispatchProps、parentProps,合并在一起得到nextState，作为props传给真正的Component
componentDidMount时，添加事件this.store.subscribe(this.handleChange)，实现页面交互
shouldComponentUpdate时判断是否有避免进行渲染，提升页面性能，并得到nextState
componentWillUnmount时移除注册的事件this.handleChange
```

# react-router3和react-router4 的区别

```
一、V3或者说V早期版本是把router 和 layout components 分开
　	在V4中是：
		集中式 router
		通过 <Route> 嵌套，实现 Layout 和 page 嵌套
		Layout 和 page 组件 是作为 router 的一部分
二、在V3中，我们是将整个庞大的router直接丢给Dom
　　在V4中，除了BrowserRouter，我们丢给DOM的我们的程序本身

　　另外，V4 中，我们不再使用 {props.children} 来嵌套组件了，
　　替代的 <Route>，当 route 匹配时，子组件会被渲染到 <Route> 书写的地方

三、在V3 中的 routing 规则是 exclusive，意思就是最终只获取一个 route
　　而 V4 中的 routes 默认是 inclusive 的，这就意味着多个 <Route>可以同时匹配和呈现

　　如果只想匹配一个路由，可以使用Switch，在 <Switch> 中只有一个 <Route> 会被渲染，
　　同时可以再在每个路由添加exact，做到精准匹配

　　Redirect，浏览器重定向，当多有都不匹配的时候，进行匹配
```

# react中获取真实的dom节点

```
使用ref属性获取Dom元素后，再使用原生javascript获取内容
```

# react是什么层面上的框架

```
React框架本身和我们常用的JavaScript MVC框架，如：AngularJS，Backbone，Ember等，没有直接的可比性。
React的官方博客中明确阐述了React不是一个MVC框架，
而是一个用于构建组件化UI的库，是一个前端界面开发工具。所以顶多算是MVC中的V（view）。
```

# react单向数据流

```
React遵循从上到下的数据流向，即单向数据流。

单向数据流并非‘单向绑定’，甚至单向数据流与绑定没有‘任何关系’。
对于React来说，单向数据流（从上到下）与单一数据源这两个原则，

限定了React中要想在一个组件中更新另一个组件的状态（类似于Vue的平行组件传参，或者是子组件向父组件传递参数），需要进行状态提升。即将状态提升到他们最近的祖先组件中。多个组件中需要共享的 state 向上移动到它们的最近共同父组件中，便可实现共享 state

子组件中Change了状态，触发父组件状态的变更，父组件状态的变更，
影响到了另一个组件的显示（因为传递给另一个组件的状态变化了，这一点与Vue子组件的$emit()方法很相似）。
```

# react数据一定要在DidMount里获取更新的原因

```
componentDidMount方法中的代码，是在组件已经完全挂载到网页上才会调用被执行，所以可以保证数据的加载。
在这方法中调用setState方法，会触发重渲染。这个方法就是用来加载外部数据用的，或处理其他的副作用代码。

constructor()
	constructor()中获取数据的话，如果时间太长，或者出错，组件就渲染不出来，整个页面都没法渲染了。
	constructor是作组件state初绐化工作，并不是设计来作加载数据的。

componentWillMount()
	如果使用SSR（服务端渲染）,componentWillMount会执行2次，一次在服务端，一次在客户端。
	而componentDidMount不会。
	
	constructor可以完成state初始化，componentWillMount使用的很少，目前16版本加入了UNSAFE来标识		componentWillMount，新的生命周期static getDerivedStateFromProps() 也会替代这个。

	React16之后采用了Fiber架构，只有componentDidMount声明周期函数是确定被执行一次的，
	类似ComponentWillMount的生命周期钩子都有可能执行多次，
	所以不加以在这些生命周期中做有副作用的操作，比如请求数据之类。

render()
	无限render

componentDidMount()
	确保已经render过一次。提醒我们正确地设置初始状态，这样就不会得到导致错误的"undefined"状态。
```

# ★ react中的受控组件和非受控组件

```
受控组件
	React将state与表单元素值value绑定在一起，有state的值来控制表单元素的值
	简单来说，值受到react控制的表单元素
	
非受控组件
	表单元素自己管理自己的数据[state]
	调用 React.createRef() 方法创建ref对象，将ref 对象添加到表单元素中，通过ref对象获取到表单元素的值
```

# react中的ref的3种方式

```
方式1: string类型绑定
类似于vue中的ref绑定方式，可以通过this.refs.绑定的ref的名字获取到节点dom
注意的是 这种方式已经不被最新版的react推荐使用，有可能会在未来版本中遗弃
 
方式2: react.CreateRef()
通过在class中使用React.createRef()方法创建一些变量，可以将这些变量绑定到标签的ref中
那么该变量的current则指向绑定的标签dom
 
方式3: 函数形式
在class中声明函数，在函数中绑定ref
使用这种方法可以将子组件暴露给父组件以使得父组件能够调用子组件的方法
通过函数的方法绑定ref可以将整个子组件暴露给父组件

当在子组件中调用onRef函数时，正在调用从父组件传递的函数。this.props.onRef（this）这里的参数指向子组件本身，父组件接收该引用作为第一个参数：onRef = {ref =>（this.child = ref）}然后它使用this.child保存引用。之后，可以在父组件内访问整个子组件实例，并且可以调用子组件函数。
```

# react中的static(静态方法)

```
静态方法和 React 没有直接关系，React 的组件都是继承自 React.Component 这个类，静态方法属于类本身。

static并不是react定义的，而加上static关键字，就表示该方法不会被实例继承，而是直接通过类来调用。

这里涉及到了ES6的class，我们定义一个组件的时候通常是定义了一个类，
而static则是创建了一个属于这个类的属性或者方法。
组件则是这个类的一个实例，component的props和state是属于这个实例的，
```

# react的props与state的区别

```
props:
一般用于父组件向子组件通信，在组件之间通信使用。
state: 
一般用于组件内部的状态维护，更新组建内部的数据，状态，更新子组件的props等。
```

# 混合开发

```
1. 混合开发是介于webapp和原生app之间的一种应用，它同时具有webapp可以跨平台的特性，也具备原生app可以进行安装使用的特性
2. webApp  
   1. 优点： 跨平台 、 维护更新、项目迭代快
   2. 缺点： 交互体验不好 、进入应用的方式麻烦
3. 原生app
   1.案例： 美团、饿了吗、微信、QQ 
   2.安装在手机中使用的 
   3.优点： 手机安装、交互体验好 
   4.缺点： 维护更新、项目迭代很慢、成本太高了
4. 混合开发： 择中方案
   跨平台
   维护更新快   成本低
   手机安装，交互体验好

为什么混合开发会兴起呢？
1. 混合开发的兴起是偶然的

混合开发方式
1. h5 主导
   - 开发思维： H5【 vue/ react/ angular 】 + 第三方可以访问原生设备的库
     - 微信公众号： h5网页 + 微信JSSDK 
   - 历史
      1. PhoneGap + cordva.js 淘汰
      2. vue/react/angular + ioinc.js 
      3. vue - uni-app 
      4. h5 + h5plus.js   h5 + h5+
      5. 微信公众号： webapp + js-jdk 
      6. vue/react + weex.js[ 阿里内部 ]
2. React Native
   1. facebook 团队项目  16 - 18年很热火，18年后半年开始热度下降，
   	  facebook觉得这个框架对于开发者而言开发难度太大，维护成本也高，Facebook决定不再更新它了、
   2. 典型应用： 饿了吗
   3. React Native开发出来项目 - 原生app 
   4. React Native  = React + 原生js
   5. 构建React Native项目 - 脚手架   
      1. 构建项目环境: create-react-native-app  
      2. 手机调试：expo  expo-cli
      3. 目录解释
         1. __test__   expo手机调试的测试文件夹，不用管
         2. .expo  临时文件，运行项目
         3. .expo-shared 分享
         4. assets 静态资源
         5. components  公共组件
         6. constants  项目公用的常量
         7. navigation  底部tabbar栏组件
         8. node_modules  依赖包
         9. screens   页面
```

# 小程序

对于路由的触发方式以及页面生命周期函数如下:

| 路由方式   | 触发时机                                     | 路由前页面    | 路由后页面          |
| ------ | ---------------------------------------- | -------- | -------------- |
| 初始化    | 小程序打开的第一个页面                              |          | onLoad, onSHow |
| 打开新页面  | 调用 API wx.navigateTo 或使用组件 <navigator open-type="navigateTo"/> | onHide   | onLoad, onShow |
| 页面重定向  | 调用 API wx.redirectTo 或使用组件 <navigator open-type="redirectTo"/> | onUnload | onLoad, onShow |
| 页面返回   | 调用 API wx.navigateBack 或使用组件<navigator open-type="navigateBack">或用户按左上角返回按钮 | onUnload | onShow         |
| Tab 切换 | 调用 API wx.navigateBack 或使用组件<navigator open-type="navigateBack">或用户按调用 API wx.switchTab 或使用组件 <navigator open-type="switchTab"/> 或用户切换 Tab |          | 各种情况请参考下表      |
| 重启动    | 调用 API wx.reLaunch 或使用组件 <navigator open-type="reLaunch"/> | onUnload | onLoad, onShow |

页面跳转触发的生命周期，其实还是存在问题的，并非官方所说的那样。

```jsx
SwitchTab的跳转BUG
首页跳转到子页面后，在子页面上使用：
<navigator type='switchTab' url="/pages/index/index" >
    <view>跳转首页</button>
</navigator>
这种方式有问题，解决的办法是通过JS来实现跳转，代码如下：
<view class="weui-btn-area">
             <button class="weui-btn" bindtap="backIndex" type="default">返回主页</button> 
            </view>
跳转成功后，重新调用onload方法，JS代码如下：
backIndex:function(){
    wx.switchTab({
      url: '/pages/index/index',
      success: function (e) {
        var page = getCurrentPages().pop();
        if (page == undefined || page == null) return;
        page.onLoad();
      }
    })
  }
```

# get与post的区别

```
1.提交方式
get: get会将接收到的数据拼接到url地址中,以"?"问号划分,问号后面是接收到的数据,多个数据之间用&连接。用户可以很直观的看见。
post: post会将接收到的数据放置在html header中一起发送到指定的url地址内。用户看不到这个过程。

2.传递数据大小
get: get传递数据的大小因为受到浏览器地址栏的限制,所以一般在2k-8k,这要据浏览器而定,比如谷歌浏览器就是8k。
post: post传递数据的大小最小是2M,但理论上是无上限的。

3.应用范围
get: get一般用于获取/查询资源信息.多用于a标签的href属性中,也常用于location.href属性中。
post: post一般是用于更新数据信息.多用于表单提交。

4.安全性
get的安全性比post较差。

5.缓存
get有缓存，post无缓存


```

# react父组件通过ref获取不到子组件的解决方案

```
在子组件中
this.customfunction = this.customfunction.bind(this);
即可
```

# React PureComponent 和 Component 区别

```
	React.PureComponent 与 React.Component 几乎完全相同，但 React.PureComponent 通过prop和state的浅对比来实现 shouldComponentUpate()。
　　如果React组件的 render() 函数在给定相同的props和state下渲染为相同的结果，在某些场景下你可以使用 React.PureComponent 来提升性能。
　　React.PureComponent 的 shouldComponentUpdate() 只会对对象进行浅对比。如果对象包含复杂的数据结构，它可能会因深层的数据不一致而产生错误的否定判断(表现为对象深层的数据已改变视图却没有更新, 原文：false-negatives)。当你期望只拥有简单的props和state时，才去继承 PureComponent ，或者在你知道深层的数据结构已经发生改变时使用 forceUpate() 。或者，考虑使用 不可变对象 来促进嵌套数据的快速比较。
　　此外,React.PureComponent 的 shouldComponentUpate() 会忽略整个组件的子级。请确保所有的子级组件也是”Pure”的。
　　
PureComponent的作用：
	PureComponent 其实是在内部帮我们简单实现了一下shouldComponentUpdate的功能，以便提供组件的性能；这里的简单指是：对prop和state做浅比较，若浅比较结果相同，则该组件以及其子组件不做render；否则，render。

使用PureComponent注意事项：
	PureComponent主要针对prop和state为基本数据类型，如bool、string、number；
	对于数组和对象等引用类型，则要引用不同，才会渲染；如果引用相同，则PureComponent浅比较返回结果相同，不做render；
	PureComponent 中不建议再另外重写shouldComponentUpdate方法，否则会报warning信息：
	PureComponent的最好作为展示组件，如果prop和state每次都会变，PureComponent做浅比较也会影响性能，可以考虑直接用Component；
	对于prop和state数据结构比较复杂的情况，可以考虑自己重写shouldComponentUpdate方法来做优化；
```

# react中调用setState之后发生

```
-----第一个解释-----
React会将当前传入的参数对象与组件当前的状态合并,然后触发调和过程,在调和的过程中,React会以相对高效的方式根据新的状态构建React元素树并且重新渲染整个UI界面

React得到的元素树之后,React会自动计算出新的树与老的树的节点的差异,然后根据差异对界面进行最小化的渲染,在React的差异算法中,React能够精确的知道在哪些位置发生看改变以及应该如何去改变,这样就保证了UI是按需更新的而不是重新渲染整个界面

-----另一个文档中,调用后发生解释----

如果是在隶属于原生js执行的空间，比如说setTimeout里面，setState是同步的，那么每次执行setState将立即更新this.state，然后触发render方法；因为是同步执行，可以直接获取改变后的值；
 如果是在被react处理过的空间执行，比如说合成事件里，此时setState是异步执行的，并不会立即更新this.state的值，当执行setState的时候，会将需要更新的state放入状态队列，在这个空间最后再合并修改this.state，触发render；setState接受第二个参数，是一个回调函数，可以在这里获取改变后的state值；
触发render执行后，会生成一个新的虚拟dom结构，然后触发diff运算，找到变化的地方，重新渲染；
```

# SPA和MPA的异同

```
单页应用（SinglePage Application，SPA）
	指只有一个主页面的应用，一开始只需加载一次 js,css 等相关资源。所有的内容都包含在主页面，对每一个功能模块组件化。单页应用跳转，就是切换相关组件，仅刷新局部资源。

多页应用（MultiPage Application，MPA）
	指有多个独立的页面的应用，每个页面必须重复加载 js,css 等相关资源。多页应用跳转，需要整页资源刷新。
	
两者对比表格：
 	                    SPA	   |||     MPA
结构:一个主页面 + 许多模块的组件	  |||   许多完整的页面
体验:页面切换快，体验佳；当初次加载文件过多时，需要做相关的调优。 |||	页面切换慢，网速慢的时候，体验尤其不好
资源文件:组件公用的资源只需要加载一次 |||	每个页面都要自己加载公用的资源
适用场景:对体验度和流畅度有较高要求的应用，不利于 SEO（可借助 SSR 优化 SEO）  |||	适用于对 SEO 要求较高的应用
过渡动画:Vue 提供了 transition 的封装组件，容易实现	|||	很难实现
内容更新:相关组件的切换，即局部更新	|||	整体 HTML 的切换，费钱（重复 HTTP 请求）
路由模式:可以使用 hash ，也可以使用 history  |||	普通链接跳转
数据传递:因为单页面，使用全局变量就好（Vuex）  |||	cookie 、localStorage 等缓存方案，URL 参数，调用接口保存等
相关成本:前期开发成本较高，后期维护较为容易	|||	前期开发成本低，后期维护就比较麻烦，因为可能一个功能需要改很多地方

单页应用实现核心：前端路由
前端路由的核心：改变视图的同时不会向后端发出请求。
```

# TS

```
TS好处：
1、强类型 
2、不需要去浏览器中浏览效果，就能知道编译错误
   静态类型检查可以做到early fail，即你编写的代码即使没有被执行到，一旦你编写代码时发生类型不匹配，
   语言在编译阶段（解释执行也一样，可以在运行前）即可发现
4、类型就是最好的注释，看类型我们就知道这个是什么
3、即使ts中有编译报错，tsc依旧可以将其编译成js

1、基础数据类型 ：number\string\boolean\null\undefined
	any 表示任意类型 void 表示空类型，空类型是针对函数的，表示函数没有返回值。返回空
2、内置对象类型 ： Array \  Boolean \  HTMLElement
3、自定义类型 : 接口  类  泛型  枚举类型
	泛型  未来的类型定义的时候不知道是什么类型，调用的时候才知道

元组  
1、数组中的数据类型必须和规定的类型顺序对应起来
2、当使用越界索引给数组赋值的时候，会使用联合类型（只要值是规定类型的某一种即可）。

枚举  enum类型是对JavaScript标准数据类型的一个补充

never类型表示的是那些永不存在的值的类型。

readonly:只读属性,不可修改

sex? :表示sex是一个可传属性,可以有也可以没有

[key: string]: any;表示新增的属性可以是任意类型

arr3: Array<number>  数组类型定义

arr2: (number | string)[]

fn (a: number, b: number) : number  函数类型定义
```

# TS 中 interface 和 type 的区别

```
在ts中，定义类型由两种方式：接口（interface）和类型别名（type alias）
interface只能定义对象类型，
type声明的方式可以定义组合类型，交叉类型和原始类型
 
如果用type alias 声明的方式，会导致一些功能的缺失
 	1.interface方式可以实现接口的extends/implements(实现)，而type 不行
	2.interface可以实现接口的merge(联合)，但是type不行
```

# 如何判断一个变量的类型，以及typeof和instanceof的区别

```

不同点:
typeof:
1.返回值是一个字符串， 用来说明变量的数据类型。
2.typeof 一般只能返回如下几个结果： number, boolean, string, function, object, undefined。
1.返回值为布尔值;

相同点：
JavaScript 中 typeof 和 instanceof 常用来判断一个变量是否为空， 或者是什么类型的。

不同点:
typeof:
1.返回值是一个字符串， 用来说明变量的数据类型。
2.typeof 一般只能返回如下几个结果： number, boolean, string, function, object, undefined。
1.返回值为布尔值;
\2. instanceof 用于判断一个变量是否属于某个对象的实例。
```



# flex弹性布局

```
flex是由 flex-grow:1父容器在主轴上还有多少剩余空间，

flex-shrink当父元素的宽度大于所有子元素的宽度的和时（即父元素会有剩余空间），
子元素如何分配父元素的剩余空间

flex-basis基准值组成

flex 怎么实现1个盒子垂直居中	如何实现四个盒子水平均匀分布

父容器 display:flex; justify-content: center; align-items: center;

display: flex; justify-content:space-evenly; align-items: center;

flex-grow：定义项目的放大比例，默认为0，即如果存在剩余空间，也不放大。
           为0，有剩余的空间也不放大
           为其他数值，根据数值比例来分空间
           
flex-shrink: 定义了项目的缩小比例，默认为1，即如果空间不足，该项目将缩小 
            空间不足的时候，flex-shrink为0的元素空间不变，flex-shrink为1的元素根据剩余空间等比分配
            
            
 flex和grid布局的差别：
flex是一维布局 ，grid是二维布局也就是说grid布局可以更好的操作行和列。flex布局和grid布局是现在的主流的两种布局方式。
用grid布局可以做一个简单的九宫格


            
```

# 实现导航的吸顶效果

```
设置css:sticky固定定位    

判断滚动条滚动的距离大于导航条距顶部的距离,来判断是否实现吸顶,然后addClass添加样式
```

# less的hover简写

```
a{
	&:hover {} //这里&代表它的上一级就是a
}
```

###  stylus/sass/less区别

  - ```
      - 均具有“变量”、“混合”、“嵌套”、“继承”、“颜色混合”五大基本特性
      - Scss和LESS语法较为严谨，LESS要求一定要使用大括号“{}”，Scss和Stylus可以通过缩进表示层次与嵌套关系
      - Scss无全局变量的概念，LESS和Stylus有类似于其它语言的作用域概念
      - Sass是基于Ruby语言的，而LESS和Stylus可以基于NodeJS NPM下载相应库后进行编译；
      ```


    混合：我理解为函数,可以封装CSS代码,在别的选择器中调用,提高代码的重用性和可维护性.
    
    Mixins 有点像函数,在定义后,可以通过名称调用.(也支持动态传参)
    混合可以将一个定义好的class A 轻松 的引入到另一个class B 中,从而简单实现class B继承class A 中的所有属性,我们还可以带参数地调用,就像使用函数一样
    
    混合有两种定义方式,一种是无参数的定义,另一种是有参数的定义.
    无参数的定义
    
        .混合名() {
        封装的css代码
        }
    
    有参数的定义
    
        .混合名(@参数1:参数的默认值,@参数2:参数的默认值......) {
        封装的css代码
        }
    调用混合
        语法
    
        选择器{
        混合名(@参数)
        }
     值得注意的是在没有参数的情况下,不加括号也可以调用.
     如果Mixin需要动态参数,则必须加括号传参:   
     
     使用：
     方法1:
    1、到less官网，下载less文件
    2、在编译器中新建一个less文件，引入到我们的html页面中（注意下面的和css的引入方式稍微有些不同哦，看rel）
    3、引入我们下载的less文件然后就可以使用了
    好处：能获取到客户端的数据，从而进一步计算
    坏处：在客户端解析less，造成性能浪费，不利于维护（不推荐）
    
    方法2：
    在服务器环境编译  利用node中的包管理器
    使用步骤：
    1、需要下载安装node环境，检测安装成功的方法在命令行输入npm，如果安装成功就会有一些信息，错了，就会报错
    简单说一下打开命令行的方法（windows系统）win+R——输入cmd——enter——进入命令行——输入npm——按enter键
    安装less:在命令行输入命令：npm i  -g less@lateast之后按回车即可（检验是否安装成功，在命令行输入lessc，然后回车，安装成功会有一些信息，失败也会报错）
    然后在命令行中进入我们存放less文件所在的文件夹，进入之后输入（如果我们的less文件名为style.less）lessc  style.less > index.css（大于号后面是我们想要style.less编译为的css的文件名，我们这里把它命名为index.css）之后点击回车，我们的文件夹就会多一个index.css文件，之后也是引入css文件即可
    
    方法3：（推荐）
    在编译器中实时编译
    这种方法也需要安装node，之后用npm安装less，和上面的安装方法一样
    win+R——输入cmd——enter——进入命令行——输入npm——按enter键——npm i  -g less@lateast之后按回车即可
    然后打开我们的编译器（以webstorm为例，其他的也都大同小异）
    点击文件（File）——找到Tools——File Watchers——找到右侧有个加号（+）——单击加号找到less选择less——弹出一个菜单，找到Program:后面让选择程序，找到我们安装的less程序
    注：找到程序的方法：先找到C盘——users——用户（也可能是你的名字,自己起的）——AppData（如果这里找不到的话，可以找到这个菜单上面几个图标中的最后一个（Show Hidden Files and Directiories）即可找到）——Roaming——npm——lessc.cmd，选中之后，其它的不用管直接点击ok，然后再点ok即可
    之后我们再去建一个less文件，它就会自动生成一个同名的css文件，把这个css文件引入我们的HTML文件中即可
    
    ```


​    



# CSS伪类 ::after,before的应用场景

```
::before和::after必须配合content属性来使用，
content用来定义插入的内容，content必须有值，至少是空。
默认情况下，伪类元素的display是默认值inline，可以通过设置display:block来改变其显示。

1.清除浮动:
在浮动元素后面添加一个空的Div标签，然后在设置它的清除浮动要是，使用after伪元素

2.常见消息框 : 
伪类content:' '  伪类4条边必须宽度相同，而且其他三条边为transparent     
可以通过设置定位元素left,top值为50%,translate(-50%,-50%) 来使任意宽高的元素居中。

div::before{
          content:' ';

3.阴影 : 通过设置before，after不同位置，不同旋转角度,要保证伪类的颜色及z-index

div.outer::before,div.outer::after{content:'';
            z-index:1;
            width:50%;
            height:3px;
            position:absolute;
            left:10px;
            bottom:7px;
            background-color:transparent;
            box-shadow:5px 5px 10px rgba(0,0,0,0.5);
            -webkit-transform:rotate(-3deg);

4.做出各种图形效果

#star-five:before {
            border-bottom: 80px solid red;
            border-left: 30px solid transparent;
            border-right: 30px solid transparent;
            position: absolute;
            height: 0;
            width: 0;
            top: -45px;
            left: -65px;
            content: '';
            transform: rotate(-35deg);
        }
        #star-five:after {
            width: 0;
            height: 0;
            border-left: 100px solid transparent;
            border-right: 100px solid transparent;
            border-bottom: 70px solid yellow;
            top: 7px;
            left: -110px;
            position: absolute;
            display: block;
            content: '';
            transform: rotate(-70deg);
        }
```

# CSS权重的计算

```
权重叠加 0,0,0,5 + 0,0,0,5 =0,0,0,10 而不是 0,0,1,0，所以不会存在10个div能赶上一个类选择器的情况

继承的权重是0   
1)如果选中了，那么以上面的公式来计权重。谁大听谁的。
2)如果没有选中，那么权重是0，因为继承的权重为0

当选择器冲突时，权重高的生效；当权重相同时，写在后头的会把前面的覆盖。
```

# http

```
http2.0，https连接，

http概述:超文本传输协议,是互联网上应用最为广泛的一种网络协议

http的缺点
1.通信使用明文可能会被窃听。
2.不验证通信方的身份可能遭遇伪装。
3.无法证明报文的完整性，可能已遭篡改。

https就是在安全的传输层上发送的http。它在将http报文发送给TCP之前，先将其发送给了一个安全层 ，对其进行加密。http安全层是通过ssl及其现代替代协议TSL来实现的。

https的优点
（1）使用HTTPS协议可认证用户和服务器，确保数据发送到正确的客户机和服务器；
（2）HTTPS协议是由SSL+HTTP协议构建的可进行加密传输、身份认证的网络协议，要比http协议安全，可防止数据在传输过程中不被窃取、改变，确保数据的完整性。

https的缺点
但是https因为加了层ssl，所以在效率方面比较低，会使页面加载的时长延长近50%,也会增加10-20%的耗电。
需要安装证书，在一定基础上增加部署费用，并且报文加密解密对数据传递有一点的效率影响。

http/2.0的目标是改善用户加载页面的时候更快
HTTP/2采用二进制格式而非文本格式
HTTP/2是完全多路复用的，而非有序并阻塞的——只需一个连接即可实现并行
```

# http对称加密非对称加密

```
对称密钥加密是指加密和解密使用同一个密钥的方式,一方通过密钥将信息加密后，把密文传给另一方，另一方通过这个相同的密钥将密文解密，转换成可以理解的明文

非对称加密是加密和解密使用的是两个不同的密钥，所以这种算法叫作非对称加密算法。指使用一对非对称密钥，即公钥和私钥，公钥可以随意发布，但私钥只有自己知道。发送密文的一方使用对方的公钥进行加密处理，对方接收到加密信息后，使用自己的私钥进行解密。
```

# WebSocket和http的区别

```
- http协议：每次http请求都需要创建一次tcp连接，通信只能由客户端发起，做不到服务器主动向客户端推送信息。
- websocket协议： websocket是保持长连接，服务器可以主动向客户端推送信息，客户端也可以主动向服务器发送信息，是真正的双向平等对话，属于服务器推送技术的一种
```

# 错误调试工具

```
F12    断点   错误附近输出打印    火狐中的firebug    IE开发者工具   Emmet
```

# http状态码

```
100 继续

200	OK	请求成功。一般用于GET与POST请求

3开头 重定向
300	多种选择。请求的资源可包括多个位置，相应可返回一个资源特征与地址的列表用于用户终端（例如：浏览器）选择
301	永久移动。请求的资源已被永久的移动到新URI，返回信息会包括新的URI，浏览器会自动定向到新URI。今后任何新的请求都应使用新的URI代替
302	临时移动。与301类似。但资源只是临时被移动。客户端应继续使用原有URI
303	查看其它地址。与301类似。使用GET和POST请求查看
304	未修改。所请求的资源未修改，服务器返回此状态码时，不会返回任何资源。客户端通常会缓存访问过的资源，通过提供一个头信息指出客户端希望只返回在指定日期之后修改的资源
305	使用代理。所请求的资源必须通过代理访问
306	已经被废弃的HTTP状态码
307	临时重定向。与302类似。使用GET请求重定向

4开头 请求错误
400	客户端请求的语法错误，服务器无法理解
401	请求要求用户的身份认证
402	保留，将来使用
403	服务器理解请求客户端的请求，但是拒绝执行此请求
*404	无法找到资源
405	客户端请求中的方法被禁止
406	N服务器无法根据客户端请求的内容特性完成请求
407	请求要求代理的身份认证，与401类似，但请求者应当使用代理进行授权
*408	服务器等待客户端发送的请求时间过长，超时
409	服务器完成客户端的 PUT 请求时可能返回此代码，服务器处理请求时发生了冲突
410	客户端请求的资源已经不存在。410不同于404，如果资源以前有现在被永久删除了可使用410代码，网站设计人员可通过301代码指定资源的新位置
411	服务器无法处理客户端发送的不带Content-Length的请求信息
412	客户端请求信息的先决条件错误
413	由于请求的实体过大，服务器无法处理，因此拒绝请求。为防止客户端的连续请求，服务器可能会关闭连接。如果只是服务器暂时无法处理，则会包含一个Retry-After的响应信息
414	请求的URI过长（URI通常为网址），服务器无法处理
415	服务器无法处理请求附带的媒体格式
416	客户端请求的范围无效
417	服务器无法满足Expect的请求头信息

5开头 服务器错误
*500	服务器内部错误，无法完成请求
501	服务器不支持请求的功能，无法完成请求
502 作为网关或者代理工作的服务器尝试执行请求时，从远程服务器接收到了一个无效的响应
503	由于超载或系统维护，服务器暂时的无法处理客户端的请求。延时的长度可包含在服务器的Retry-After头信息中
504	充当网关或代理的服务器，未及时从远端服务器获取请求
505	服务器不支持请求的HTTP协议的版本，无法完成处理
```

# HTTP和HTTPS的区别

```
HTTP是超文本传输协议，信息是明文传输的，HTTPS是具有ssl/tls加密传输协议。

默认端口不同，前者是80，后者是443。

HTTPS比HTTP安全

HTTPS协议需要到CA申请证书，需要一定费用
```

# 浏览器的缓存机制

```
什么是浏览器缓存 
	Web缓存是指一个Web资源（如html页面，图片，js，数据等）存在于Web服务器和客户端（浏览器）之间的副本。缓存会根据进来的请求保存输出内容的副本；当下一个请求来到的时候，如果是相同的URL，缓存会根据缓存机制决定是直接使用副本响应访问请求，还是向源服务器再次发送请求。比较常见的就是浏览器会缓存访问过网站的网页，当再次访问这个URL地址的时候，如果网页没有更新，就不会再次下载网页，而是直接使用本地缓存的网页。只有当网站明确标识资源已经更新，浏览器才会再次下载网页。浏览器和网站服务器是根据缓存机制进行缓存的

非HTTP协议定义的缓存机制
	浏览器缓存机制，其实主要就是HTTP协议定义的缓存机制（如： Expires； Cache-control等）。但是也有非HTTP协议定义的缓存机制，如使用HTML Meta 标签，Web开发者可以在HTML页面的<head>节点中加入<meta>标签
	
	<meta http-equiv="Pragma" content="no-cache">
	上述代码的作用是告诉浏览器当前页面不被缓存，每次访问都需要去服务器拉取。使用上很简单，但只有部分浏览器可以支持，而且所有缓存代理服务器都不支持，因为代理不解析HTML内容本身。
	
浏览器在第一次请求发生后，再次请求时：
	浏览器会先获取该资源缓存的header信息，根据其中的expires和cache-control判断是否命中强缓存），若命中则直接从缓存中获取资源，包括缓存的header信息，本次请求不会与服务器进行通信；  
	如果没有命中强缓存，浏览器会发送请求到服务器，该请求会携带第一次请求返回的有关缓存的header字段信息（Last-Modified/IF-Modified-Since、Etag/IF-None-Match）,由服务器根据请求中的相关header信息来对比结果是否命中协商缓存，若命中，则服务器返回新的响应header信息更新缓存中的对应header信息，但是并不返回资源内容，它会告知浏览器可以直接从缓存获取；否则返回最新的资源内容
```

# 浏览器的强缓存和协商缓存

```
这里说的缓存是指浏览器（客户端）在本地磁盘中对访问过的资源保存的副本文件。

浏览器缓存主要有以下几个优点：
1. 减少重复数据请求，避免通过网络再次加载资源，节省流量。
2. 降低服务器的压力，提升网站性能。
3. 加快客户端加载网页的速度，提升用户体验。

浏览器缓存分为强缓存和协商缓存，两者有两个比较明显的区别：
1. 如果浏览器命中强缓存，则不需要给服务器发请求；而协商缓存最终由服务器来决定是否使用缓存，即客户端与服务器之间存在一次通信。
2. 在chrome中强缓存（虽然没有发出真实的http请求）的请求状态码返回是200(from cache)；而协商缓存如果命中走缓存的话，请求的状态码是304(not modified)。不同浏览器的策略不同，在Fire Fox中，from cache状态码是304.

强缓存
强缓存是利用http的返回头中的Expires或者Cache-Control两个字段来控制的，用来表示资源的缓存时间。
Expires:
	该字段是http1.0时的规范，它的值为一个绝对时间的GMT格式的时间字符串，比如Expires:Mon,18 Oct 2066 23:59:59 GMT。这个时间代表着这个资源的失效时间，在此时间之前，即命中缓存。这种方式有一个明显的缺点，由于失效时间是一个绝对时间，所以当服务器与客户端时间偏差较大时，就会导致缓存混乱。
Cache-Control:
	Cache-Control是http1.1时出现的header信息，主要是利用该字段的max-age值来进行判断，它是一个相对时间，例如Cache-Control:max-age=3600，代表着资源的有效期是3600秒。cache-control除了该字段外，还有下面几个比较常用的设置值：
	
no-cache：不使用本地缓存。需要使用缓存协商，先与服务器确认返回的响应是否被更改，
		如果之前的响应中存ETag，那么请求的时候会与服务端验证，如果资源未被更改，则可以避免重新下载。
no-store：直接禁止游览器缓存数据，每次用户请求该资源，都会向服务器发送一个请求，每次都会下载完整的资源。
public：可以被所有的用户缓存，包括终端用户和CDN等中间代理服务器。
private：只能被终端用户的浏览器缓存，不允许CDN等中继缓存服务器对其缓存。

Cache-Control与Expires可以在服务端配置同时启用，同时启用的时候Cache-Control优先级高。

为什么要有Etag
HTTP1.1中Etag的出现主要是为了解决几个Last-Modified比较难解决的问题：
	
1.一些文件也许会周期性的更改，但是他的内容并不改变(仅仅改变的修改时间)
	这个时候我们并不希望客户端认为这个文件被修改了，而重新GET
2.某些文件修改非常频繁，
	比如在秒以下的时间内进行修改，(比方说1s内修改了N次)，If-Modified-Since能检查到的粒度是s级的，这种修改无法判断(或者说UNIX记录MTIME只能精确到秒)；
3.某些服务器不能精确的得到文件的最后修改时间。
	
Last-Modified与ETag是可以一起使用的，服务器会优先验证ETag，一致的情况下，才会继续比对Last-Modified，最后才决定是否返回304。

200 OK（from cache）与304 Not Modified的区别
	200 OK( from cache )不向服务器发送请求，直接使用本地缓存文件。
	304 Not Modified则向服务器询问，若服务器认为浏览器的缓存版本还可用，那么便会返回304。

缓存类型	获取资源形式	  状态码	               发送请求到服务器
强缓存	     从缓存取	    200（from cache）	       否，直接从缓存取
协商缓存	从缓存取	   304（Not Modified）	  否，通过服务器来告知缓存是否可用

用户行为对缓存的影响
用户操作		  Expires/Cache-Control		    Last-Modied/Etag
地址栏回车		    有效							有效
页面链接跳转	       有效						    有效
新开窗口		     有效						     有效
前进回退	         有效	                         有效
F5刷新	          无效	                       有效
Ctrl+F5强制刷新	     无效	                          无效
```

# 不能被缓存的请求

```
1. HTTP信息头中包含Cache-Control:no-cache，pragma:no-cache（HTTP1.0），
   或Cache-Control:max-age=0等告诉浏览器不用缓存的请求
2. 需要根据Cookie，认证信息等决定输入内容的动态请求是不能被缓存的
3. 经过HTTPS安全加密的请求
4. POST请求无法被缓存
5. HTTP响应头中不包含Last-Modified/Etag，也不包含Cache-Control/Expires的请求无法被缓存
```

# 用户行为对缓存的影响

```
qq、fire fox 、safari 、chrome 这几个浏览器的访问同一个页面，不同的浏览器在 F5 刷新的时候 ，同一个文件 qq 、fire fox 浏览器会返回 `304 Not Nodified`，在请求头中不携带 `Expires/Cache-Control`； 而 chrome 和 safari 刷新的时候，会返回 `200 from cache`， 没有真正发起请求，走强缓存。可见不同的浏览器反馈是不一致的，所以下面表格中"F5刷新"时 `Expires/Cache-Control` 会无效我认为是存在一定争议的。而 Ctrl + F5 强制刷新的时候，会暂时禁用强缓存和协商缓存。
```

# eslint规则

```
Eslint 是一个JavaScript验证工具,有了它可以让你的编辑器像ide一样进行一些静态的错误提示功能.

npm install eslint -g

某些文件关闭eslint检测  
	在文件的最顶端加上注释 /*eslint-disable*/

关闭某一行代码的eslint检查   
	// eslint-disable-next-line

.eslintrc.json配置rules选项
```

# ★ git命令

```
（版本回退是什么命令，哪个命令查看已删除的提交commitId）

git-reset 版本回退

git reset --hard xxx	回到上一个版本

git reset --soft xxx 该命令将最近一次提交节点的提交记录回退到暂存区

git reset --mixed xxx	是将最近一次提交节点记录回退到工作区

git log 与 git reflog 查看历史记录（被删除的历史commit ID）

git场景问题
提交暂存区git  add 出错    git reset HEAD <文件名> 回退

提交本地仓库  
git  commit出错: 
1.更改 commit 信息:git commit --amend -m“新提交消息”   
2.漏提交:git add missed-file              // missed-file 为遗漏提交文件
		git commit --amend --no-edit     //--no-edit提交消息不会更改
3.git reset --hard commit_id      git  log查看提交的版本

git revert 是提交一个新的版本
git fetch  将远程主机的更新全部放到本地中

git revert 和 git reset 的区别:

(1)git revert是用一次新的commit来回滚之前的commit，git reset是直接删除指定的commit。
(2)git revert是用一次逆向的commit“中和”之前的提交   ,合并的时候回滚的变化不会出现

git reset是之间把某些commit在某个branch上删除,合并时候回滚的commit会被引入

--------------------------------------------------------------------------
# 全局用户设置 每台新的电脑仅需一次设置
$ git config --global user.name 'Wang yilian'
$ git config --global user.email '457367@qq.com'

# 在项目根目录下初始化本地仓库 
`$ git init`

# 查看状态
$ git status

# 添加管理(将文件添加到本地仓库的暂存区)
$ git add fileName      # 将指定文件添加到git仓库的暂存区
$ git add .             # 将当前目录下所有文件和目录都添加到git仓库的暂存区
$ git add --all         # 将当前目录下所有文件和目录都添加到git仓库的暂存区
$ git add path/         # 将指定目录添加到暂存区

# 将文件移出暂存区
$ git rm --cached fileName

# 将暂存区的文件提交到本地仓库
$ git commit -m 'msg'

# 查看提交日志
$ git log

# 恢复历史版本
$ git reset --hard hash(前6位)

# 查看帮助
$ git --help

# 恢复文件
$ git checkout filename

# 创建并切换分支
$ git branch -M main

# 添加远程仓库地址
# gitHub 新建仓库
`$ git remote add origin https://github.com/jxsrzj0325/huawei.com.git`
# gitee 新建仓库
`$ git remote add origin https://gitee.com/wang-yilian/mi.com.git`

# 将本地仓库中的main分支推送到远程仓库
$ git push -u origin main

# 克隆远程仓库(从无到有)
# gitHub
$ git clone `https://github.com/jxsrzj0325/huawei.com.git`
# gitee
$ git clone `https://gitee.com/wang-yilian/mi.com.git`

# 从远程仓库拉取分支(更新)
$ git pull origin main

# 创建分支
$ git branch 分支名

# 查看分支
$ git branch

# 切换分支
$ git checkout 分支名

# 合并分支
$ git merge 分支名

-----------------------------------------------------------------------------------------
自己做项目
2. 初始化本地仓库 `$ git init`
3. 初始化项目 `$ npm init -y`
4. 添加到 git 仓库的暂存区 `$ git add . `
5. 将暂存区的文件提交到本地仓库 `$ git commit -m 'msg'`
6. 新建仓库 `$ git remote add origin https://gitee.com/wang-yilian/mi.com.git`
7. 创建并切换分支 `$ git branch -M lit`
8. 将本地仓库中的文件推送到远程仓库 `$ git push -u origin lit`

克隆远程仓库 `$ git clone https://github.com/jxsrzj0325/huawei.com.git`
添加到 git 仓库的暂存区 `$ git add . `
将暂存区的文件提交到本地仓库 `$ git commit -m 'msg'`
创建并切换分支 `$ git branch -M lit`
将本地仓库中的文件推送到远程仓库 `$ git push -u origin lit`
-----------------------------------------------------------------------------------------
git不同分支上传远程 冲突解决
	1.上传分支，合并请求，出现冲突
	2.切换到主分支 git checkout diedai 
	3.git pull origin diedai --rebase
	4.git merge 自己的分支名
	5.解决冲突
	6.修改完成 git add .  git commit -m '名称'
	7.git push --set upstream origin diedai
	8.远程 刷新项目
```

# node.js

```
1.Node不是一个后端语言，但是它可以做类似后端语言的功能
2.Node是使用谷歌V8引擎
3.Node是js的一个运行环境
4.Node具有非阻塞I/O 特点
5.Node采用了Common.js规范  

node+koa2   node+express

用于快速构建Node.js项目

node.js 是一个基于 Chrome V8 引擎的 JavaScirpt 运行环境。

Node.js使用了一个事件驱动、非阻塞式I/O的模型,使其轻量又高效**

Node.js基于commonjs规范

事件驱动： 任务执行，发布者，订阅者，事件驱动 .
异步（非阻塞）： 执行某一个任务的同时也可以执行其他任务
同步（阻塞）： 执行某一个任务，这个任务如果没有执行完成，其他任务必须等待
I/O: 输入/输出（ 数据库操作，文件系统操作等  ） - 服务器的环境
非阻塞I/O模型： 当使用Node.js来实现数据库操作、文件系统等操作时，要进行的异步操作，异步操作的核心传统实现方式就是回调函数和事件。

Node.js的包管理工具npm

优点：Node.js 使用了一个事件驱动、非阻塞式 I/O 的模型，异步编程，使其轻量又高效。
缺点：单进程，单线程，只支持单核cpu，不能充分的利用多核cpu服务器。一旦这个进程崩掉，那么整个web服务就崩掉了。

内置模块 http 是用于创建一个能够处理和响应 http 响应的服务

fs 用于对系统文件及目录进行读写操作。
path 提供了一些用于处理文件路径的小工具
Url：帮助我们对提交上来的url进行解析处理
querystring  提供用于解析和格式化 URL 查询字符串的工具。qs.parse()   qs.stringify()
```

# linux命令

```
pwd:输入pwd命令，Linux会输出当前目录。

ls命令用来查看目录的内容。

cd命令用来改变所在目录。

cat命令可以用来合并文件，也可以用来在屏幕上显示整个文件的内容。

grep命令的最大功能是在一堆文件中查找一个特定的字符串。

touch命令用来创建新文件

cp命令用来拷贝文件

mv命令用来移动文件

rm命令用来删除文件。 

mkdir   创建文件夹创建目录
```

# ★ CSS3新特性

```
1 圆角边框：border-radius 
2 多背景图：background 
3 颜色和透明度：background: rgba(0,0,0,.5) 
4 多列布局和弹性盒：display: flex
5 盒子的变幻（2D、3D）
	transform: translate(50px,100px);//移动 
	transform: rotate();             //旋转 
	transform: scale();  			 //缩放
	transform: skew();  			 //倾斜 
6 过渡 transition: width 1s linear 2s; 
动画：animation: myfirst 5s;
@keyframes myfirst { 0% {background: block;} 25% {background: red;} 50% {background: yellow;} 100% {background: green;} } 
7 引入web字体（在服务器端存储） 
8 媒体查询 
9 阴影 h
10 文字阴影 text-shadow div 
11 盒子阴影 box-shadow
```

# css实现动画：

```
 animation动画：@keyframes
 过渡属性transition
 css变形属性transform
```



```

```



# HTML5  h5新特性

```
1 语义化标签 section aside header nav
2 表单新特性：autofocus 自动获取焦点
	placeholder 占位
	multiple
	autocomplete  自动补全，是否自动记录之前提交的数据，以用于下一次输入建议
	required 在表单提交时会验证是否有输入，没有则弹出提示消息。
	min：限定输入数字的最小值。
	max：限定输入数字的最大值
3 video（视频）和audio（音频） 
4 canvas画布 
5 webworker  就是为 JavaScript 创造多线程环境，允许主线程创建 Worker 线程，将一些任务分配给后者运行。
6 webscoket  服务器可以主动向客户端推送信息，客户端也可以主动向服务器发送信息，是真正的双向平等对话，属于服务器推送技术的一种。
7 拖拽api
	dragstart：源对象开始拖放。 
	drag：源对象拖放过程中。 
	dragend：源对象拖放结束。 
	过程对象： 
	dragenter：源对象开始进入过程对象范围内。 
	dragover：源对象在过程对象范围内移动。 
	dragleave：源对象离开过程对象
```

# 标准盒模型与怪异盒模型区别

```
标准盒模型一个块的总宽度= width + margin(左右) + padding(左右) + border(左右) 
怪异盒模型一个块的总宽度= width + margin(左右)（即width已经包含了padding和 border值）
```

# CSS3弹性盒

```
弹性盒 display:flex（父元素添加） 
弹性盒：控制子元素按主轴方向排列 
弹性盒可以设置单独内容水平垂直居中
父元素：display:flex 子元素：margin:auto 
灵活元素：灵活元素即使是内联元素也能设置宽高

加父元素身上
1.flex-direction 属性指定了弹性子元素在父容器中的位置。 
	row：横向从左到右排列（左对齐），默认的排列方式。
	row-reverse：反转横向排列（右对齐，从后往前排，最后一项排在最前面。
	column：纵向排列。
	olumn-reverse：反转纵向排列，从后往前排，最后一项排在最上面。
2.justify-content:flex-start/flex-end/space-between/space-around
3.align-items: 设置或检索弹性盒子元素在侧轴（纵轴）方向上的对齐方式。  
		center/flex-start/flex-end/baseline/stretch
4.flex-wrap:属性用于指定弹性盒子的子元素换行方式。nowrap/wrap/wrap-reverse
5.align-content:设置各个行的对齐:  
	stretch - 默认。各行将会伸展以占用剩余的空间。
	flex-start - 各行向弹性盒容器的起始位置堆叠。
	flex-end - 各行向弹性盒容器的结束位置堆叠。
	center -各行向弹性盒容器的中间位置堆叠。
	space-between -各行在弹性盒容器中平均分布。
	space-around 
	
加子元素身
1、align-self：属性用于设置弹性元素自身在侧轴（纵轴）方向上的对齐方式。
	align-self: auto | flex-start | flex-end | center | baseline | stretch
	flex 属性用于指定弹性子元素如何分配空间。
     	1: 计算值为 1 1 auto
    	initial: 计算值为 0 1 auto
     	none：计算值为 0 0 auto
inherit：从父元素继承
2、第一个参数表示: flex-grow 定义项目的放大比例，默认为0，即如果存在剩余空间，也不放大
3、第二个参数表示: flex-shrink 定义了项目的缩小比例，默认为1，即如果空间不足，该项目将缩小
4、第三个参数表示: flex-basis给上面两个属性分配多余空间之前, 计算项目是否有多余空间, 默认值为 auto, 即项目本身的大小
```

# CSS元素居中

```
1.使用margin进行固定长度的偏移	

2.使用绝对定位并进行偏移(已知宽高)
#father{ position:relative; } 
#son{ position: absolute; left:50%; top:50%; 
	  margin-left: -子元素的宽/2; margin-top: -子元素的高/2; } 

3.使用绝对定位并margin自适应进行居中 
#father{ position:relative;} 
#son{position: absolute; left: 0; top: 0; right: 0; bottom: 0; margin:auto; }
			  (啊不斯陆特)
4.使用弹性盒子来实现居中 
#father{ display: flex; justify-content: center; align-items: center; }
						(加斯特佛)				  (额来) (哎特木)
5.使用定位 + transform
#father{ position:relative;} 
#son{ position: absolute; left: 50%; top: 50%; transform:translate(-50% -50%) }

6.table-cell布局
因为table-cell相当与表格的td，td为行内元素，无法设置宽和高，所以嵌套一层，嵌套一层必须设置display: inline-block;
```

# CSS几种定位的区别 relative, absolute, fixed

```
1、相对定位position:relative;参考物是自己,不脱离文档流(初始位置仍然占据空 间),top:100px; 给正值是向该容器的中心点移动;

2、绝对定位position:absolute; 参考物是外层具有position属性的元素, 如果向外 都么有找到最后会参考body/html做定位

3、固定定位position:fixed; 参考物是可视窗口 

4、粘性定位(了解)position:sticky; 是绝对定位+固定定位
```

# div外边距重叠的原因及解决办法

```
情况一:
	两个div垂直边界相邻，margin会等于二者中margin较大的值 
解决方案:
1.position：absolute 
2.float:left 

情况二:
	子元素在父元素内，子元素的margin-top会与父元素的margin-top重叠，值等于二者中较大的，如果只有子元素设置了margin-top，则显示为父元素的margin-top 
解决方案:
1.给父元素设置border（给子元素设置边框没有用） 
2.给父元素设置padding值 
3.给父元素或子元素添加float：left 
4.给父元素或子元素添加position：absolute 
5.给父元素添加overflow：hidden 
6.给子元素添加display：inline-block 

情况三:
	一个空白元素自身的margin-top和margin-bottom会重叠，值为二者中较大的 
解决方案:
1.设置透明border 
```

# px，em，rem，pt的区别 

```
1、px实际上就是像素，用px设置字体大小时，比较稳定和精确 
2、em就是根据基准来缩放字体的大小 
3、rem是相对于根元素字体大小来显示的 
4、pt的大小等于1英寸的1/72 浏览器的兼容性除了IE6-IE8，其他的浏览器都支持em和rem，px所有浏览器都支持
```

# ★ CSS的BFC

```
1、什么是BFC  BFC: block formatting context(块状格式化上下文)
    bfc是一个独立的空间，只有块状元素参与，
    它规定了里面的块状元素如何布局，它和外部的坏境毫不相干

  触发条件
1. 根元素（html）本身就是一个BFC
        2. float不能none的时候
        3. position为absolute或者fixed的时候
        4. display为inline-block, table-cell, flex, inline-flex等
        5. overflow不为visible的时候
2、BFC渲染规则
    a.内部的box会在垂直方向，一个接一个的放置 
    b.box垂直方向的距离由margin决定。属于同一个BFC的两个相邻box的margin会发生重 叠
    c.每个元素的margin box的左边，与包含块border box的左边相接触（对于从左往右的格 式化，否则相反）。
    即使存在浮动也是如此 
    d.BFC的区域不会与float box重叠 
    e.BFC就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素。反之 也如此 
    f.计算BFC的高度时，浮动元素也参与计算 	

3、如何产生BFC 
	一个块级元素就是一个BFC

a.根元素
    b.float属性不为none 
    c.position为absolute或fixed 
    d.display为inline-block， table-cell，table-caption，flex，inline-flex 
    e.overflow不为visible 

4、BFC的作用 
    a.自适应两栏布局
    b.清除内部浮动 
    c.防止垂直margin重叠（放在两个BFC里） 		
```

# 兼容问题

```
1）css浏览器兼容问题（比如设置元素透明度，ie浏览器使用滤镜实现，filter 
：progid：DXlmage Transform.Microsoft.Alpha(style=0,opacity=50);非IE浏览器 
opacity：0.5） 
解决方法：现在前端开发已经出现了非常多的框架和类库用于浏览器的兼容问题，比如jq类 库，解决获取元素中包含的所有文本内容兼容性问题，$(“element”).text(“element text”) 

2）css3浏览器前缀问题 
	-ms-：ie浏览器 
	-o-：opera欧朋浏览器 
	-webkit-：谷歌浏览器 
	-moz-：火狐浏览器

工作中遇到的困难 
	1）IE6中高度不对问题 
		在div中给定了高度为1px,其它浏览器显示正常，可是ie6中显示的高度就不对了，这时我 
		给样式表中加 了个font-size:0px;line-height:0px;就好了 
	2)把border设为“0”像素虽然在页面上看不见，但按border默认值理解，
		浏览器依然对 border- width/border-color进行了渲染，
		即已经占用了内存值把border设为“none”即没有，浏览器解析“none”时将不作出渲染动作，即不会消耗内存
```

# 移动端适配 

```
1.Media Queries 通过查询设备的宽度来执行不同的 css 代码，最终达到界面 的配置 
2.Flex弹性布局 
3.rem + viewport 缩放 实现原理 根据rem将页面放大dpr倍, 然后viewport设置为1/dpr. 
4、rem实现 移动端适配方案： 
	1）viewport（scale=1/dpr）    dpr:备像素比   
	2）rem 3）flex 4）vm/vh
	以iphone8为例，iphone8的CSS像素为375px*677px，DPR是2，
	所以其设备像素为750px*1354px
	750(px) / 375(px)  = 2
```

# 什么是CSS预处理器？优点是什么

```
css预处理器用一种专门的编程语言，进行web页面样式设计，然后在编译成正常的css文件，
以供项目使用 在css中使用变量、简单的逻辑程序、函数。可以让你的css更加简洁、适应性更强、可读性更佳、更易于代码的维护
```

# 0.5px线怎么实现（单边框0.5px）

```
方式一：border + border - img + 线性渐变linear-gradient
方式二：定位 + 伪元素 + background + 线性渐变linear-gradient
方式三：定位 + 伪元素 + transform缩放（scale）
```

# CSS布局 - 左侧宽度固定，右侧自适应

```
方法一: 
	设置绝对定位
	宽度固定区域设置 position：absolute+ left/right+ top + width
	自适应区域设置 margin-left/margin-right: 固定宽度区域的宽度。

注意:
	（1）若左侧固定的高度大于右侧自适应区域高度
		页面布局就变成这样了：（测试布局区域紧挨着自适应区域的下方，盖住了部分固定区域）
		简单粗暴的就是测试布局区域定位的top值直接设置为两个区域最高的高度值
	（2）若左侧固定的高度大于右侧自适应区域高度，且测试区域不进行定位
方法二:
	浮动布局
	左侧固定区域浮动+宽度，右侧自适应区域 设置margin-left :左侧宽度值。
方法三:
	BFC规则
	左侧固定区域浮动+宽度，右侧自适应区域（非浮动元素）设置overflow：hidden。
```

# CSS布局 - 左右侧宽度固定，中间自适应

```
1、绝对定位布局：position + margin
缺点: 如果中间栏含有最小宽度限制，或是含有宽度的内部元素，当浏览器宽度小到一定程度，会发生层重叠的情况。
2、浮动布局： float + margin
3、flex布局
	高度由内容决定。
4、table布局
	高度由内容决定。
5、Grid网格布局
6、圣杯布局
7、双飞翼布局
8、对比圣杯布局和双飞翼布局
（1）都是左右栏定宽，中间栏自适应的三栏布局，中间栏都放到文档流前面，保证先行渲染。
（2）解决方案基本相似：都是三栏全部设置左浮动float：left,然后分别结局中间栏内容被覆盖的问题。
（3）解决中间栏内容被覆盖问题时，圣杯布局设置父元素的padding,双飞翼布局在中间栏嵌套一个div,
	内容放到新的	div中，并设置margin，实际上，双飞翼布局就是圣杯布局的改进方案。
```

# webpack 打包优化  怎么减少打包时间

```
多进程打包 - 速度分析
多进程压缩 - 体积分析
资源CDN
动态polyfill - 根据不同浏览器，动态载入需要的polyfill,大幅度减少构建体积

split-thunk
前端构建项目中，为了提高打包效率，往往将第三库与业务逻辑代码分开打包，因为第三方库往往不需要经常打包更新。webpack建议使用CommonsChunk 来单独打包第三方库

webpack loader(转换器)和plugin(插件)有什么区别:
	loader它是一个转换器，将A文件进行编译形成B文件，这里操作的是文件，比如将A.scss转换为A.css，单纯的文件转换过程
	plugin是一个扩展器，它丰富了webpack本身，针对是loader结束后，webpack打包的整个过程，它并不直接操作文件，而是基于事件机制工作，会监听webpack打包过程中的某些节点，执行广泛的任务

loader:
	优雅降级，
	图片打包
plugin:
	html产出：把public下面的html文件打包到build里面的index.html并自动引入app.js
	css抽离
	静态资源拷贝
```

# 继承的6种方式 ☆

```
1.原型链继承
	重点：让新实例的原型等于父类的实例。
	特点：1、实例可继承的属性有：实例的构造函数的属性，父类构造函数属性，父类原型的属性。
　　　		（新实例不会继承父类实例的属性！）
	缺点：1、新实例无法向父类构造函数传参。
		 2、继承单一。
		 3、所有新实例都会共享父类实例的属性。
　　　　　　（原型上的属性是共享的，一个实例修改了原型属性，另一个实例的原型属性也会被修改！）

    Person.prototype是一个对象，
    Student.prototype = new Person();
    Student.prototype.constructor = Student;
　　　　
  function Animal(name,age){
        this.name=name;
        thia.age=age;
     }
     //在原型中添加方法
     Animal.prototype.eat=function(){
        console.log("动物吃草")
        this.play()
     }
     Animal.prototype.play=function(){
        console.log("玩啥呢")

2.借用构造函数继承
	重点：用.call()和.apply()将父类构造函数引入子类函数（在子类函数中做了父类函数的自执行（复制））
	特点：1、只继承了父类构造函数的属性，没有继承父类原型的属性。
		 2、解决了原型链继承缺点1、2、3。
		 3、可以继承多个构造函数属性（call多个）。
		 4、在子实例中可向父实例传参。
	缺点：1、只能继承父类构造函数的属性。
		 2、无法实现构造函数的复用。（每次用每次都要重新调用）
		 3、每个新实例都有父类构造函数的副本，臃肿。
代码	========================================================= 
        /定义一个超类/父类： 人
function Person (name, age) {
    //人都有姓名，年龄，会吃饭，会睡觉
    //传入出生年份 year，自动计算年龄
    this.name = name;
    this.age = age;
    this.eat = function () {
        alert('吃饭');
    }
    this.sleep = function () {
        alert('睡觉');
    }
}
//定义一个子类： 学生
//学生Student也是人，自然要继承超类 Person 的所有属性和方法
//学生都应当有姓名、年龄、会吃饭、会睡觉
//当然学生也有自己的一些属性：学号，学校名称等，和方法，比如都要去做一件事：写作业
function Student (stuID, schoolName, name, age) {
    this.stuID = stuID;
    this.schoolName = schoolName;
    //用call调用 Person,以实现继承
    Person.call(this, name, age);
}

Student.prototype.doHomework = function () {
    alert('做作业');
}

//实例化一个学生
var stu1 = new Student(1001, '第一小学', '王宝宝',20);
console.log(stu1.stuID);       //1001
console.log(stu1.schoolName);  //'第一小学'
console.log(stu1.name);        //'王宝宝'
console.log(stu1.age);         //20
stu1.eat();                    //'吃饭'
stu1.sleep();                  //'睡觉'
stu1.doHomework();             //'做作业'
解释：上面代码定义了一个父类函数 Person 和一个子类函数 Student, 在子类构造函数中，我们通过 call 的方式调用了父类构造函数 Person实现了继承。别忘了，函数只不过是一段可以在特定作用域执行代码的特殊对象，我们可以通过 call 方法指定我函数的作用域。
　　在 stu1 = new Student() 构造函数时，Student 内部 this 的值指向的是 stu1, 所以 this.stuID =stu1.stuID, 所以 Person.call(this, name, age) 就相当于Person.call(stu1, '王宝宝', 20)，就相当于 stu1.Person('王宝宝',20)。最后，stu1 去调用 Person 方法时，Person 内部的 this 指向就指向了 stu1。那么Person 内部this 上的所有属性和方法，都被拷贝到了stu1上。
　　总之，在子类函数中，通过call() 方法调用父类函数后，子类实例 stu1, 可以访问到 Student 构造函数和 Person 构造函数里的所有属性和方法。这样就实现了子类向父类的继承。
========================================================================
3.组合继承（组合原型链继承和借用构造函数继承）		 
	重点：结合了两种模式的优点，传参和复用
	特点：1、可以继承父类原型上的属性，可以传参，可复用。
		 2、每个新实例引入的构造函数属性是私有的。
	缺点：调用了两次父类构造函数（耗内存），子类的构造函数会代替原型上的那个父类构造函数。
4.原型式继承
	重点：用一个函数包装一个对象，然后返回这个函数的调用，这个函数就变成了个可以随意增添属性的实例或对象。			 object.create()就是这个原理。
	特点：类似于复制一个对象，用函数来包装。
	缺点：1、所有实例都会继承原型上的属性。
		 2、无法实现复用。（新实例属性都是后面添加的）
5.寄生式继承
	重点：就是给原型式继承外面套了个壳子。
	优点：没有创建自定义类型，因为只是套了个壳子返回对象（这个），这个函数顺理成章就成了创建的新对象。
	缺点：没用到原型，无法复用。
6.寄生组合式继承（常用）
	重点：修复了组合继承的问题
	寄生：在函数内返回对象然后调用
	组合：1、函数的原型等于另一个实例。
		 2、在函数中用apply或者call引入另一个构造函数，可传参　
```

# 阻止冒泡和取消默认事件(默认行为)

```
防止事件捕获和冒泡:
w3c的方法是e.stopPropagation()
IE则是使用e.cancelBubble = true

取消默认事件
w3c的方法是e.preventDefault()
IE则是使用e.returnValue = false

jQuery用法
阻止默认事件 return false (不停止冒泡)
```

# 



# 遍历数组的方式

```
1.for循环
使用临时变量，将长度缓存起来，避免重复获取数组长度，当数组较大时优化效果才会比较明显。

2.foreach循环
遍历数组中的每一项，没有返回值，对原数组没有影响，不支持IE。
有一些局限，不能continue跳过或者break终止循环

3.map循环
有返回值，可以return出来
map的回调函数中支持return返回值
并不影响原来的数组，return的是新数组

4.for of遍历
可以正确响应break、continue和return语句

5.filter遍历
不会改变原始数组,返回新数组

6.every遍历
every()是对数组中的每一项运行给定函数，如果该函数对每一项返回true,则返回true。

7.some遍历
some()是对数组中每一项运行指定函数，如果该函数对任一项返回true，则返回true。

8.reduce
reduce()方法接收一个函数作为累加器（accumulator），数组中的每个值（从左到右）开始缩减，最终为一个值。

9.reduceRight
reduceRight()方法的功能和reduce()功能是一样的，
不同的是reduceRight()从数组的末尾向前将数组中的数组项做累加。

10.find
find()方法返回数组中符合测试函数条件的第一个元素。否则返回undefined 

11.findIndex
对于数组中的每个元素，findIndex方法都会调用一次回调函数（采用升序索引顺序），直到有元素返回 true。
只要有一个元素返回 true，findIndex立即返回该返回 true 的元素的索引值。
如果数组中没有任何元素返回 true，则 findIndex 返回 -1。
findIndex 不会改变数组对象。

12.keys，values，entries
ES6 提供三个新的方法 —— entries()，keys()和values() —— 用于遍历数组。
它们都返回一个遍历器对象，可以用for...of循环进行遍历，
唯一的区别是keys()是对键名的遍历、values()是对键值的遍历，entries()是对键值对的遍历
```

# 数据分页

```
前端的话，定义一个新的数组for循环判断，有个公式，计算起始页和终止页的。
符合条件push仅数组中，后端就是用limt判断
```

# 数组排序

```
1. 普通数组排序　　
　　js中用方法sort()为数组排序。sort()方法有一个可选参数，是用来确定元素顺序的函数。如果这个参数被省略，那么数组中的元素将按照ASCII字符顺序进行排序。
2. 冒泡排序
（1）比较相邻的元素。如果第一个比第二个大，就交换他们两个位置。
（2）对每一对相邻元素作同样的工作，从开始第一对到结尾的最后一对。在这一点，最后的元素应该会是最大的数。
（3）针对所有的元素重复以上的步骤，除了最后一个。
（4）持续每次对越来越少的元素重复上面的步骤，直到没有任何一对数字需要比较。
3. 快速排序：递归思想，两边快速的排序，冒泡排序的改进
（1）选择数组中间数作为基数，并从数组中取出此基数；
（2）准备两个数组容器，遍历数组，逐个与基数比对，较小的放左边容器，较大的放右边容器；
（3）进行相同的操作，直到数组中只有一个元素时，返回该数组。
4. 插入排序
（1）从第一个元素开始，该元素可以认为已经被排序
（2）取出下一个元素，在已经排序的元素序列中扫描
（3）如果该元素（已排序）大于新元素，将该元素移到下一位置
（4）重复步骤3，直到找到已排序的元素小于或者等于新元素的位置
（5）将新元素插入到下一位置中
（6）重复步骤2
5. 选择排序
（1）在未排序序列中找到最小（大）元素
（2）并存放到排序序列的起始位置
（3）然后，再从剩余未排序元素中继续寻找最小（大）元素
（4）然后放到已排序序列的末尾。
（5）以此类推
```

# 数组合并

```
1、concat
	js的Array对象提供了一个叫concat()方法，连接两个或更多的数组，并返回结果。
		var c = a.concat(b); //c=[1,2,3,4,5,6];

	这里有一个问题，concat方法连接a、b两个数组后，a、b两个数组的数据不变，同时会返回一个新的数组。这样当我们需要进行多次的数组合并时，会造成很大的内存浪费，如果是数据量比较小的时候，还可以勉强用，如果数据量大的时候，这个就不妥了，所以这个方法肯定不是最好的。

2、for循环
大概的思路是：遍历其中一个数组，把该数组中的所有元素依次添加到另外一个数组中。直接上代码：
	for(var i in b) { a.push ( b[i] );}
	
3、apply
	函数的apply方法有一个特性，那就是func.apply(obj,argv)，argv是一个数组。
		a.push.apply(a,b);
	调用a.push这个函数实例的apply方法，同时把，b当作参数传入，
	这样a.push这个方法就会遍历b数组的所有元素，达到合并的效果。
	这里可能有点绕，我们可以把b看成[4,5,6]，变成这样：
		a.push.apply(a,[4,5,6]);
	然后上面的操作就等同于：
		a.push(4,5,6);
	这样就很清楚了！
```

# 数组方法

```
push，在数组末尾添加一位或多位元素
pop，删除数组最后一位元素
unshift，在数组的开头添加一位或多位元素
shift，删除数组的第一位元素
join，将数组转换为字符串
reserve，反转数组元素的顺序
sort，对数组进行排序
concat，连接两个或多个数组
splice，添加或删除数组中的元素
slice，从已有的数组中返回选定的元素
indexOf、lastIndexOf，查找数组中的元素
forEach，对数组进行遍历循环，对数组中每一项运行指定的函数
map，迭代数组
filter，对数组中的元素进行指定的检查返回符合条件的元素放入一个新数组中
every，测试所有元素是否都符合指定条件
some，测试某些元素是否符合指定条件
reduce，接收一个函数作为累加器，数组中的每个值开始缩减，最终计算为一个值
toString，将数组转换为字符串
```

# ★ 数组去重

```
使用ES6 Set
	var arr = [1, 1, 4, 2, 2, 3, 3, 3, 6, 6, 6];
	arr = Array.from(new Set(arr));  [...new Set(arr)]
	console.log(arr);//[1, 4, 2, 3, 6]

使用indexOf
	var arr = [1, 1, 4, 2, 2, 3, 3, 3, 6, 6, 6];
	var newArr = [];
	arr.forEach((item) => {
  		newArr.indexOf(item) === -1 ? newArr.push(item) : "";
	});
	console.log(newArr);//[1, 4, 2, 3, 6]

使用lastIndexOf
	var arr = [1, 1, 4, 2, 2, 3, 3, 3, 6, 6, 6];
	var newArr = [];
	arr.forEach((item) => {
  		newArr.lastIndexOf(item) === -1 ? newArr.push(item) : "";
	});
    console.log(newArr);//[1, 4, 2, 3, 6]

使用双重for循环加splice方法
	var arr = [1, 1, 4, 2, 2, 3, 3, 3, 6, 6, 6];
	for (var i = 0; i < arr.length; i++) {
 		for (var j = i + 1; j < arr.length; j++) {
    		if (arr[i] == arr[j]) {
      			arr.splice(j,1);
      			j--;
    		}
 		}
	}
	console.log(arr);//[1, 4, 2, 3, 6]

使用forEach和includes方法
	var arr = [1, 1, 4, 2, 2, 3, 3, 3, 6, 6, 6];
	var newArr = [];
	arr.forEach((item) => {
  		newArr.includes(item) ? "" : newArr.push(item);
	});
	console.log(newArr);//[1, 4, 2, 3, 6]

使用fliter和includes方法
	var arr = [1, 1, 4, 2, 2, 3, 3, 3, 6, 6, 6];
	var newArr = [];
	arr.filter((item) => {
  		newArr.includes(item) ? "" : newArr.push(item);
	});
	console.log(newArr);//[1, 4, 2, 3, 6]
```

# for...of 原理

```
for...of 是ES6引入用来遍历所有数据结构的统一方法。

这里的所有数据结构只指具有iterator接口的数据。
一个数据只要部署了 Symbol.iterator，就具有了 iterator接口，就可以使用 for...of 循环遍历它的成员。
也就是说，for...of循环内部调用的数据结构为Symbol.iterator方法。
部署在 Symbol.iterator 属性，或者说，一个数据结构只要具有 Symbol.iterator 属性，就认为是"可遍历的"。

Iterator(伊特瑞特):
	遍历器（Iterator）就是这样一种机制。它是一种接口，为各种不同的数据结构提供统一的访问机制。
	任何数据结构只要部署 Iterator 接口，就可以完成遍历操作（即依次处理该数据结构的所有成员）。
	通俗点理解就是为了解决不同数据结构遍历的问题，引入了Iterator.

Iterator的特点:
	各种数据结构，提供一个统一的、简便的访问接口
	使得数据结构的成员能够按某种次序排列
	ES6 创造了一种新的遍历命令for...of循环，Iterator 接口主要供for...of消费
	
原生具备 Iterator 接口的数据结构如下。
	Array
	Map
	Set
	String：字符串是一个类似数组的对象，也原生具有 Iterator 接口。
	TypedArray：
		通俗理解：ArrayBuffer是一片内存空间，不能直接引用里面的数据，可以通过TypedArray类型引用，
				用户只能通过TypedArray使用这片内存，不能直接通过ArrayBuffer使用这片内存
	函数的 arguments 对象
	NodeList 对象
	
除了原生具备Iterator 接口的数据之外，其他数据结构（主要是对象）的 Iterator 接口，
都需要自己在Symbol.iterator属性上面部署，这样才会被for...of循环遍历。

对象（Object）之所以没有默认部署 Iterator 接口，是因为对象的哪个属性先遍历，哪个属性后遍历是不确定的，需要开发者手动指定。本质上，遍历器是一种线性处理，对于任何非线性的数据结构，部署遍历器接口，就等于部署一种线性转换。不过，严格地说，对象部署遍历器接口并不是很必要，因为这时对象实际上被当作 Map 结构使用，ES5 没有 Map 结构，而 ES6 原生提供了。

一个对象如果要具备可被for...of循环调用的 Iterator 接口，就必须在Symbol.iterator的属性上部署遍历器生成方法（原型链上的对象具有该方法也可）。
```

# 遍历对象的方式

```
第一种： 
for...in

第二种：
1）Object.keys（obj）
2）Object.values（obj）
参数：
	obj：要返回其枚举自身属性的对象
返回值：
	一个表示给定对象的所有可枚举属性的字符串数组。

第三种：
使用Object.getOwnPropertyNames(obj)
返回一个数组，包含对象自身的所有属性（包含不可枚举属性）
遍历可以获取key和value
```

# map与filter、map和forEach的区别

```
map 与 filter 区别:
	相同点：filter 和 map 都是对数组的操作，均返回一个新的数组
	不同点：filter是满足条件的留下，是对原数组的过滤；map则是对原数组的加工，映射成一对一的新数组

map 与 forEach 区别:
	map()会分配内存空间存储新数组并返回，forEach()不会返回数据(undefined)。
	forEach()允许callback更改原始数组的元素。
```

# 面向对象编程

```
面向对象编程:
将所需要做的功能抽象成一个“对象”，然后一遍遍地调用这个对象来完成想要的功能。

面向对象的三大特征:
1.封装
我们平时所用的方法和类都是一种封装，当我们在项目开发中，遇到一段功能的代码在好多地方重复使用的时候，我们可以把他单独封装成一个功能的方法，这样在我们需要使用的地方直接调用即可。

2.继承
继承在我们的项目开发中主要使用为子类继承父类，继承会继承父类的实例属性和实例方法，并不会继承静态属性和静态方法，并且静态方法只能通过类名去调用。

3.多态
多态的具体表现为方法重载和方法重写：
方法重载：
重载是指不同的函数使用相同的函数名，但是函数的参数个数或类型不同。调用的时候根据函数的参数来区别不同的函数
方法重写：
重写（也叫覆盖）是指在派生类中重新对基类中的虚函数（注意是虚函数）重新实现。即函数名和参数都一样，只是函数的实现体不一样

三大特征的优点：
封装：
封装的优势在于只可以在类内部进行对属性的操作，外部无法对这些属性进行操作，要想修改，也只能通过定义的封装方法；

继承：
继承减少了代码的冗余，省略了很多重复代码，开发者可以从父类底层定义所有子类必须有的属性和方法，以达到耦合的目的；

多态：
多态实现了方法的个性化，不同的子类根据具体状况可以实现不同的方法；
```

# window.onload与document.ready的区别

```
1.执行时间
	window.onload必须等到页面内包括图片的所有元素加载完毕后才能执行。 
	$(document).ready()是DOM结构绘制完毕后就执行，不用等到加载完毕。

2.编写个数不同
	window.onload不能同时编写多个，如果有多个window.onload方法，只会执行一个 
	$(document).ready()可以同时编写多个，并且都可以得到执行

3.简化写法
	window.onload没有简化写法 
	$(document).ready(function(){})可以简写成$(function(){});
```

# this

```
this代表函数运行时，自动生成的一个内部对象，只能在函数内部使用，
随着函数使用场合的不同，this的值会发生变化。

指向:
1.在方法中，this 表示该方法所属的对象。
2.如果单独使用，this 表示全局对象window。
3.函数中，this 表示全局对象window。
4.严格模式下，this 是未定义的(undefined)，不指向window。
5.在事件中，this 表示事件绑定对象。
6.类似 call() 和 apply() 方法可以将 this 引用到任何对象。
7.箭头函数本身是没有this和arguments的，this指向父级环境对象(固定指向 无法改变)
8.自执行函数 this 表示全局对象window
9.计时器函数 this 表示全局对象window
10.构造函数中 this指向新实例对象
```

# <!DOCTYPE>

```
<!DOCTYPE> 声明位于文档中的最前面的位置，处于 <html> 标签之前。

<!DOCTYPE> 声明不是一个 HTML 标签；它是用来告知 Web 浏览器页面使用了哪个版本的HTML，确保浏览器能够预先知道文档类型。

在 HTML 4.01 中，<!DOCTYPE> 声明需引用 DTD （文档类型声明），
因为 HTML 4.01 是基于 SGML （Standard Generalized Markup Language 标准通用标记语言）。
DTD 指定了标记语言的规则，确保了浏览器能够正确的渲染内容。

HTML5 不是基于 SGML，因此不要求引用 DTD。

```

# CSS position属性

```
absolute:生成绝对定位的元素，相对于 static 定位以外的第一个父元素进行定位。
fixed	:生成固定定位的元素，相对于浏览器窗口进行定位。
relative:生成相对定位的元素，相对于其正常位置进行定位。
static	:默认值。没有定位。
sticky	:粘性定位，该定位基于用户滚动的位置。
inherit	:规定应该从父元素继承 position 属性的值。
```

# js的解构

```
解构定义：允许按照一定模式，从数组和对象中提取值，对变量进行赋值。
解构必须满足的条件：（模式匹配），只要等号两边的模式相同，左边的变量就会被赋予对应的值。
主要介绍2种解构常用的类型：数组解构和对象解构。

数组解构：
	1.数组中的变量个数比赋值的数组中个数少的解构：
	2.数组中的变量个数比赋值的数组中个数多的解构：
	3.数组中的变量中有空字符的解构：
	上面的3种数组解构，赋值的数组的数值按位赋值给另外一方数组中的变量
	
	4.数组中的变量中有不定参数(有些时候也叫扩展运算符)的解构：需要注意的是不定参数必须放最后。
	5.数组中的变量中有默认值的解构：如果赋值的数组个数没有另外一方数组变量个数多，并且变量数组有默认，
								没有进行赋值用默认，进行赋值用赋值的

对象的解构：两方也需要相同类型的括号，对象结构使用大括号{}
普通对象解构：
	对象跟数值解构不同的一点，对象解构不是按位去赋值，是根据键名(属性名) 来进行赋值
有默认值的对象解构
	跟数组的默认值差不多，有赋值就用赋值的，没有就用默认值
有不定参数的对象解构
	跟数组的不定参数差不多，不定参数放在最后，不定参数创建一个对象接受的剩下的键名键值(属性名属性值)
有嵌套的对象解构
	主要注意嵌套层次是不是赋值一方对象的嵌套层次相同。
```

# js实现轮播图思路

```
1.图片移动实现原理：
利用浮动将所有所有照片依次排成一行，给这一长串图片添加一个父级的遮罩，每次只显示一张图，其余的都隐藏起来。对图片添加绝对定位，通过控制left属性，实现照片的移动。

2.图片移动动画原理：
从a位置移动到b位置，需要先计算两点之间的差值，通过差值和时间间隔，计算出每次移动的步长，通过添加定时器，每次移动相同的步长，实现动画效果。

3.图片定位停止原理：
每一张照片都有相同的宽度，每张照片都有一个绝对的定位数值，通过检测定每次移动后，照片当前位置和需要到达位置之间的距离是否小于步长，如果小于，说明已经移动到位，可以将定时器清除，来停止动画。

4图片切换原理：
在全局设置一个变量，记录当前图片的位置，每次切换或跳转时，只需要将数值修改，并调用图片页数转像素位置函数，再调用像素运动函数即可。

5.自动轮播原理：
设置定时器，一定时间间隔后，将照片标记加1，然后开始切换。

6.左右点击切换原理：
修改当前位置标记，开始切换。这里需要注意与自动轮播之间的冲突。当点击事件触发之后，停止自动轮播计时器，开始切换。当动画结束后再次添加自动轮播计时器。

7.无缝衔接原理：
需要无缝衔接，难度在于最后一页向后翻到第一页，和第一页向前翻到最后一页。由于图片的基本移动原理。要想实现无缝衔接，两张图片就必须紧贴在一起。所以在第一张的前面需要添加最后一张，最后一张的后面需要添加第一张。

首先判断图片的位置，是否移动到位。当满足当前位置，与预定位置之间的距离小于一步时，认定为移动到位，并把图片直接定位到预定位置。然后判断，图片的位置是否需要跳转。
ps：这里一定要在图片运动函数结束后，在进行跳转。

8.预防鬼畜原理：
始终保证轮播图的运动动画只有一个，从底层杜绝鬼畜。需要在每次动画开始之前，尝试停止动画定时器，然后开始为新的动画添加定时器。

轮播图鬼畜的本质原因就是，同一时间多个定时器添加在图片上，这些定时器直接相互冲突，造成图片的抖动。
解决方法：每次执行运动函数之前，先尝试清除一下，上一个轮播图的定时器。确保同时触发运动函数时，只有一个定时器在工作。

9.预防暴力点击原理：
如果用户快速点击触发事件，会在短时间内多次调用切换函数，虽然动画函数可以保证，不会发生鬼畜，但在照片从最后一张到第一张的切换过程，不会按照正常的轮播，而是实现了跳转。所以需要通过添加口令的方式来，限制用户的点击。当用户点击完成后，口令销毁，动画结束后恢复口令。

10.小圆点的位置显示原理：
每次触发动画时，通过全局变量标记，获取当前页数，操作清除所有小圆点，然后指定一页添加样式。

11.点击触发跳转的原理：
类似于左右点击触发，只是这是将全局页面标记，直接修改，后执行动画。需要避免与自动轮播定时器的冲突。
```

# js数组和对象的扩展

```
1.Array.from()方法用于将对象转为真正的数组(类数组转数组)
2.Array.of()方法用于将一组值，转换为数组。
  console.log(Array.of(1,2,3,4,4,50));//[1, 2, 3, 4, 4, 50]
3.Object.assign(目标对象,对象1,对象2)用于对象的合并,将源对象的所有可枚举属性，复制到目标对象。(浅拷贝)
```

# js提升

```
一、提升（Hosting）
简单说就是在js代码执行前引擎会先进行预编译，预编译期间会将变量声明与函数声明提升至其对应作用域的最顶端。

二、变量提升
在ES6之前，JavaScript没有块级作用域(一对花括号{}即为一个块级作用域)，只有全局作用域和函数作用域。
变量提升即将变量声明提升到它所在作用域的最开始的部分。
变量声明的提升是以变量所处的第一层词法作用域为“单位”的，即全局作用域中声明的变量会提升至全局最顶层，函数内声明的变量会提升至函数最顶层

三、函数提升
即函数提升只会提升函数声明，而不会提升函数表达式。

四、为什么会有提升？
函数提升就是为了解决相互递归的问题，大体上可以解决像ML语言这样自下而上的顺序问题。
大概是说，变量提升是人为实现的问题，而函数提升在当初设计时是有目的的。
```

# 比较redux和vuex、redux和redux和vuex的区别的区别

```
redux和vuex的区别
	1）vuex是redux的基础上进行改变，对仓库的管理更加明确
	2）使用mutation来替换redux中的reducer
	3)vuex有自动渲染的功能，所以不需要更新
	
redux和flux的区别
　　1）redux是flux中的一个实现
　　2））在redux中我们只能定义一个store，在flux中我们可以定义多个
　　3）在redux中，store和dispatch都放到了store，结构更加清晰
　　4）在redux中本身就内置State对象，对仓库的管理更加明确
```
# vuex

```
vuex适用于中大型应用开发； vue应用核心是store(仓库),store是一个容器，它包含着你写的应用中大部分状态(state)。
vue和单纯对象的不同点(-官网-)
	1) vuex的状态储存是响应式的。当Vue组件从store众读取状态的时候，若store中的状态发生变化，那么相应的组件也会相应的得到高效更新。
	2）不能够直接改变store中的状态。改变store中的状态 的唯一途径就是 显示地**提交(commit)**mutation。(改变它的状态需要遵循它的规则，否则不能改变)
	

```
![vuex](C:\Users\29543\Desktop\vuex.png)

## 组件传参

1. 父传子

- 在父组件使用自定义属性传递，在子组件使用 props 接受
- 使用插槽的方式的进行传参
- 在任意组件可以调用 this.$root 获取到根组件的实例
- 在子组件可以调用 this.$parent 获取到父组件的实例
- 依赖注册 provide/inject

2. 子传父

- 通过自定义事件的方式，在子组件调用 this.$emit()
- 通过作用域插槽的方式
- 通过 ref 配合 this.$refs 去获取

3. 非父子

- vuex
- event-bus

## 单向数据流

所有的 prop 都使得其父子 prop 之间形成了一个单向下行绑定：父级 prop 的更新会向下流动到子组件中，但是反过来则不行。这样会防止从子组件意外变更父级组件的状态，从而导致你的应用的数据流向难以理解。

## 插槽

作用： 内容分发
父级模板里的所有内容都是在父级作用域中编译的；子模板里的所有内容都是在子作用域中编译的。
一般默认情况下，插槽的作用域是父组件的作用域
```

```
## v-if 和 v-for 不要一起使用

因为 v-for 的优先级是大于 v-if 的

1. 如果 v-if 的条件和 item 相关，先使用计算属性过滤出需要的数组
2. 如果 v-if 的条件和 item 无关，将 v-if 提到上一级
```

```
## CSS display 属性

| none               | 此元素不会被显示。                                |
| ------------------ | ---------------------------------------- |
| block              | 此元素将显示为块级元素，此元素前后会带有换行符。                 |
| inline             | 默认。此元素会被显示为内联元素，元素前后没有换行符。               |
| inline-block       | 行内块元素。（CSS2.1 新增的值）                      |
| list-item          | 此元素会作为列表显示。                              |
| run-in             | 此元素会根据上下文作为块级元素或内联元素显示。                  |
| compact            | CSS 中有值 compact，不过由于缺乏广泛支持，已经从 CSS2.1 中删除。 |
| marker             | CSS 中有值 marker，不过由于缺乏广泛支持，已经从 CSS2.1 中删除。 |
| table              | 此元素会作为块级表格来显示（类似 <table>），表格前后带有换行符。     |
| inline-table       | 此元素会作为内联表格来显示（类似 <table>），表格前后没有换行符。     |
| table-row-group    | 此元素会作为一个或多个行的分组来显示（类似 <tbody>）。          |
| table-header-group | 此元素会作为一个或多个行的分组来显示（类似 <thead>）。          |
| table-footer-group | 此元素会作为一个或多个行的分组来显示（类似 <tfoot>）。          |
| table-row          | 此元素会作为一个表格行显示（类似 <tr>）。                  |
| table-column-group | 此元素会作为一个或多个列的分组来显示（类似 <colgroup>）。       |
| table-column       | 此元素会作为一个单元格列显示（类似 <col>）                 |
| table-cell         | 此元素会作为一个表格单元格显示（类似 <td> 和 <th>）          |
| table-caption      | 此元素会作为一个表格标题显示（类似 <caption>）             |
| inherit            | 规定应该从父元素继承 display 属性的值。                 |
```
# CSS选择符

CSS选择符
	id选择器（#myid）
	类选择器（.myclassname）
	标签选择器（div）
	相邻选择器（h1+p）
	子选择器（ul>li）
	后代选择器（li a）
	群组选择器（div，p{}）
	通配符选择器（*）
	属性选择器（a[title=""]）
	伪类选择器（a:hover{}或者li:nth-child{}）
```

# CSS中link和@import的区别

```
link属于HTML标签，@import是CSS提供的

页面被加载时，link引用的css文件会同时被加载，而@import引用的css文件要等到页面被加载完毕再加载

import只在IE5以上才能识别，link是HTML标签，无兼容问题

link 引入样式的权重大于@import 的引用
```

# CSS中display:none、visibility:hidden和opacity:0;的区别

```
display:none;隐藏对应的元素，在文档布局中不再给它分配空间，它各边的元素会合拢。

visibility:hidden;隐藏对应的元素，但在文档布局中仍保留原来的空间。

opacity:0;内容不可见，占据空间。
```

# CSS中rgba()和opacity的透明效果区别

```
rgba()和 opacity 都能实现透明效果，但最大的不同是 opacity 作用于元素，以及元素内的所有内容的透明度；

rgba()只作用于元素的颜色或其背景色（设置 rgba 透明的元素的子元素不会继承透明效果）。
```

# CSS的外边距重叠

```
在 CSS 当中，相邻的两个盒子（可能是兄弟关系也可能是祖先关系）的外边距可以结合成一个单独的外边距。这种合并外边距的方式被称为折叠，并且因而所结合成的外边距称为折叠外边距。

折叠结果遵循下列计算规则如下

两个相邻的外边距都是正数时，折叠结果是它们两者之间较大的值。

两个相邻的外边距都是负数时，折叠结果是两者绝对值的较大值。

两个外边距一正一负时，折叠结果是两者之和。
```

# CSS清除浮动

- 给高度塌陷的元素添加overflow: hidden

- 里面的最下面加一个空的div，并添加clear: both

- 万能清除法

  ```
    .clearfix::after {
      content: ' ';
      display: block;
      height: 0;
      overflow: hidden;
      visibility: hidden;
      clear: both;
    }
  ```

- display:flow-root

  - 新出来的，没有副作用，但是还存在兼容性问题

# 过渡和动画的区别

```
animation属性类似于transition，他们都是随着时间改变元素的属性值，
 
其主要区别在于：
- 过渡需要用户触发，动画不需要用户触发
- 过渡不能控制中间过程，动画可以
- 过渡只能一次， 动画可以任意次数
```

# 前后端开发中数据是怎么交互的

```
web后端和前端是怎么连接的？

网站数据处理主要分为三层。
第一层，表示层，这部分可以用HTML代码，CSS/Javascript代码来实现等。
	通过前端代码可以实现网页的布局和设计。这层又可以称为显示层。也就是你用浏览器打开能看到的网页。
第二层，是业务层，这层是负责处理数据的。常用的代码语言有PHP,JSP，Java等。
	通过这些后台处理语言的算法来处理前台传回的数据。必要的时候进行操作数据库，然后把结果返回给前端网页，业务层可以实现对数据库的增删改查操作
第三层，是数据层，这个就是数据库，用来存储数据的。
	
	
在网页上填一个表格然后提交会有以下几种数据传输经过：
①你接触到的是这个网页是属于表示层，这个网页一般由HTML标签结合CSS/JAVASCRIPT来实现的。这时候你要先填入数据。
②然后你按提交触发后台处理机制，这时候数据会传到后台的代码进行处理。这部分代码根据不同网站可以使用PHP,JSP，JAVA等。代码根据程序员预设的算法将收到的数据进行处理之后会相应的对数据库进行操作，存储数据等。
③成功操作完数据库之后，业务层的代码会再向表示层也就是显示器端传回一个指令通知你表格填写成功

从前端向后台传递参数方法

一、通过表单传递参数
1.前端部分，在前端jsp页面设置form表单，确定需要传递的参数name让用户输入，
  通过点击按钮后submit()提交到后台
2.后台对前端请求的反应，接收数据，处理数据以及返回数据。

二．通过ajax传递参数（有post和get写法）
1.ajax是如何将前端数据传到后台的
	$.ajax({
      type: "POST",//type是ajax的方法
      url : "<%=path%>/resource/usermenus",//参数url,要把参数传到什么地方
      data : {parentid:parentid,parentpath:parentpath},//传递什么数据
      success : function(data){//sucess表示，当数据返回成功后要怎么做，返回的数据存储在data
	})
2.后台对前端请求的反应，接收数据,处理数据以及返回数据
3.前端接收到后端返回的数据进行处理
```

# cookie的理解

```
cookie又叫会话跟踪技术，是由web服务器保存在用户浏览器上的小文本文件，它可以记录用户ID、密码、浏览过的网页、停留的时间等信息。当用户再次来到该网站时，网站通过读取cookie，得知用户相关信息，就可以做出相应的动作，如在页面显示欢迎用户标语，或者让用户不用输入ID、密码就直接登录等等。如果用户清理了cookie，那么用户曾登录过的网站信息就没有了。

优点
	极高的扩展性和可用性
	通过良好的编程，可以控制保存在cookie中的session对象的大小
	通过加密技术和安全传输技术，减少cookie被破解的可能
	只在cookie中存放不敏感数据，即使被盗也不会有重大的损失
	控制cookie的生命周期，使之不会永久有效。偷盗者可能拿到一个过期的cookie

缺点
	cookie有数量和长度的限制。每个domain最多有20条cookie，长度不能超过4KB，否则会被裁掉。
	安全性问题。如果cookie被人拦截了，那个人就可以取得所有的session信息。即使加密也于事无补，因为拦截者不需要知道cookie的意义，他只需要原样转发就能达到目的。
	有些状态不可能保存在客户端。
```

# HTTP请求的过程--输入网址到呈现网页发生的过程

```
1. 对www.baidu.com这个网址进行DNS域名解析，得到对应的IP地址
  　　2. 根据这个IP，找到对应的服务器，发起TCP的三次握手
  　　3. 建立TCP连接后发起HTTP请求
  　　4. 服务器响应HTTP请求，浏览器得到html代码
  　　5. 浏览器解析html代码，并请求html代码中的资源（如js、css图片等）（先得到html代码，才能去找这些资源）
  　　6. 浏览器对页面进行渲染呈现给用户
　　	7.断开TCP连接,4次挥手
        第一次挥手：客户端想分手，发送消息（FIN）给服务器
        第二次挥手：服务器通知客户端已经接受的挥手请求，返回确认消息（ACK），但还没做好分手准备
        第三次挥手：服务器已经做好分手准备，通知客户端（FIN）
        第四次挥手：客户端发送消息给服务器（ACK），确认分手，服务器关闭连接。
```

# 浏览器渲染原理及流程

- 浏览器将获取的HTML文档解析成DOM Tree（DOM树）
- 将Css样式表，解析成CSSOM Tree（CSS树）
- 将DOM和CSSOM合并为渲染树（rendering tree），这个过程称之为attachment（附着合成）
- 渲染树的每个元素经过精确的计算后，给出坐标，这个过程称之为layout（布局）
- 将渲染树的各个节点绘制到屏幕上，这个过程称之为painting（绘制）

# 浏览器本地存储cookie，localStorage，sessionStorage

| 特性     | cookie(会话跟踪技术)                    | localStorage                 | sessionStorage          | IndexDB(浏览器提供的本地数据库)   |
| ------ | --------------------------------- | ---------------------------- | ----------------------- | ---------------------- |
| 数据生命周期 | 一般由服务器生成，可以设置过期时间                 | 持久化本地存储，除非被主动删除，否则一直存在       | 页面关闭就清理                 | 持久化本地存储，除非被主动删除，否则一直存在 |
| 数据存储大小 | 4K                                | 5M                           | 5M                      | 无限                     |
| 与服务端通信 | 可与服务端通信，每次都会携带在 header 中，对于请求性能影响 | 不参与                          | 不参与                     | 不参与                    |
| 有效期    | 设置的有效期之前有效，当超过有效期便会失效             | 永久有效，需手动删除                   | 当前会话下有效，关闭页面或者浏览器时会被清空  |                        |
| 应用场景   | 判断用户是否登录                          | 长期登录(判断用户是否已登录),适合长期保存在本地的数据 | 统计当前页面元素的点击次数；敏感账号一次性登录 |                        |

# hash值获取方式

```
可以通过window.location.hash获取hash值
```

# document.write和innerHTML的区别

```
document.write会重绘整个页面

innerHTML重绘页面的一部分
```

# 进程和线程的区别

```
一个程序至少有一个进程，一个进程至少有一个线程

线程的划分尺度小于进程，使得多线程程序的并发性高

进程在执行过程中拥有独立的内存单元，而多个线程共享内存，从而极大提高了程序的运行效率

每个独立的线程有一个程序运行的入口、顺序执行序列和程序的出口。但是线程不能够独立执行，必须依存在应用程序中，由应用程序提供多个线程执行控制 

从逻辑角度来看，多线程的意义在于一个应用程序中，有多个执行部分可以同时执行。但操作系统并没有将多个线程看做多个独立的应用，来实现进程的调度和管理以及资源分配。这就是进程和线程的重要区别
```

# babel原理

```
Babel 是一个通用的多功能 JavaScript 编译器，但与一般编译器不同的是它只是把同种语言的高版本规则转换为低版本规则，而不是输出另一种低级机器可识别的代码，并且在依赖不同的拓展插件下可用于不同形式的静态分析。（静态分析：指在不需要执行代码的前提下对代码进行分析以及相应处理的一个过程，主要应用于语法检查、编译、代码高亮、代码转换、优化、压缩等等）

babel 做了什么
和编译器类似，babel 的转译过程也分为三个阶段，这三步具体是：

1.解析 Parse
将代码解析生成抽象语法树( 即AST )，也就是计算机理解我们代码的方式(扩展：一般来说每个 js 引擎都有自己的 AST，比如熟知的 v8，chrome 浏览器会把 js 源码转换为抽象语法树，再进一步转换为字节码或机器代码)，而 babel 则是通过 babylon 实现的 。简单来说就是一个对于 JS 代码的一个编译过程，进行了词法分析与语法分析的过程。
2.转换 Transform
对于 AST 进行变换一系列的操作，babel 接受得到 AST 并通过 babel-traverse 对其进行遍历，在此过程中进行添加、更新及移除等操作。
3.生成 Generate
将变换后的 AST 再转换为 JS 代码, 使用到的模块是 babel-generator。

而 babel-core 模块则是将三者结合使得对外提供的API做了一个简化。

此外需要注意的是，babel 只是转译新标准引入的语法，比如ES6箭头函数：而新标准引入的新的原生对象，部分原生对象新增的原型方法，新增的 API 等（Proxy、Set 等）, 这些事不会转译的，需要引入对应的 polyfill 来解决。

```

#  dva

```
dva 首先是一个基于 redux 和 redux-saga 的数据流方案，然后为了简化开发体验，dva 还额外内置了 react-router 和 fetch，所以也可以理解为一个轻量级的应用框架。

#特性
易学易用，仅有 6 个 api，对 redux 用户尤其友好，配合 umi 使用后更是降低为 0 API
elm 概念，通过 reducers, effects 和 subscriptions 组织 model
插件机制，比如 dva-loading 可以自动处理 loading 状态，不用一遍遍地写 showLoading 和 hideLoading
支持 HMR，基于 babel-plugin-dva-hmr 实现 components、routes 和 models 的 HMR


代替redux和redux-saga的，里面还内置了react-router和fetch

dva = React-Router + Redux + Redux-saga

缺点：耦合度太高，把路由也耦合了，把路由状态提升到store中去了

react-router 耦合了状态管理
useSelector获取全局的状态



dva使用
1、安装
yarn add dva 或
npm i dva --save
2、model 注册
model 分两类，一是全局 model，二是页面 model。全局 model 存于 /src/models/ 目录，所有页面都可引用；页面 model 不能被其他页面所引用。
src/models//*.js 为 global model
src/pages//models/**/*.js 为 page model
在src下创建models文件夹，为全局的model，
3、创建model数据
4、umi配置dva热更新




dva 首先是一个基于 redux 和 redux-saga 的数据流方案，然后为了简化开发体验，dva 还额外内置了 react-router 和 fetch。

当有行为动作改变数据的时候，可以通过 dispatch 发起一个 action，如果是同步行为会直接通过 Reducers 改变 State ，如果是异步行为（副作用）会先触发 Effects 然后流向 Reducers 最终改变 State，所以在 dva 中，数据流向非常清晰简明
dva主要是以Model的形式来管理数据的状态，每个Model都有自己用的一个命名空间namespace。
其中定义需要维护的数据state, 以及同步处理的reducer，和用于异步处理的effect。
整个应该的state由多个小的 Model 合成，在Model外触发action，可以使用namespace指定使用哪个命名空间中的reducer进行数据处理。
数据和组件的绑定也是通过connect根据命名空间namespace进行的绑定。
（1）Model 对象的属性

namespace: 当前 Model 的名称。整个应用的 State，由多个小的 Model 的 State 以 namespace 为 key 合成
state: 该 Model 当前的状态。数据保存在这里，直接决定了视图层的输出
reducers: Action 处理器，处理同步动作，用来算出最新的 State。可以看做是 state 的计算器。它的作用是根据 Action，从上一个 State 算出当前 State。
effects：Action 处理器，处理异步动作。基于 Redux-saga 实现。Effect 指的是副作用。用于处理异步操作和业务逻辑，不直接修改 state。会先触发 Effects 然后流向 Reducers 最终改变 State。
（2）call 和 put：dva 提供的effect 函数内部的处理函数。

call：执行异步函数
put：发出一个 Action，类似于 dispatch
seclect: 在effects中对于param数据和当前的state数据进行再出处理，用于获取当前state。
```



# flex：1 计算方式

![flex](D:\Program Files\feiq\Recv Files\图片\flex.jpg)

# 补充

```
服务器：具备唯一的公网IP地址
电脑主机：通过局部网连接公网

域名如何解析IP地址
DNS域名解析：浏览器先从本地记录->操作系统本地缓存->局部网的路由器->运营商的服务器找缓存->公网根

css为什么要写在html的head： 避免回流，提高性能

js 弱类型 单线程 脚本语言(特定的运行环境)
面向对象 js核心思想 基于原型链--复用

vue2实现数据双向数据绑定 Object.defineProperty() --非法入侵原型链
vue3实现数据双向数据绑定 proxy代理

闭包是函数的一种特性，函数可以沿作用域链访问外部的变量

Set中数组的索引就是项本身，索引是唯一的，项也是唯一的

ES模块与commonJs的区别 1.打包环境不一样，2.ES模块import是静态导入，代码执行前导入，commonJs是运行时导入

babel如何优雅降级
AST抽象语法树
Babel是一个广泛使用的转码器，可以将ES6/ES7代码转为ES5代码
过程：将ES6、ES7先转成AST抽象语法树，再将AST抽象语法树转成目标语法

filbe把VDOM节点改造成filbe节点，以一个filbe节点为单位，进行diff。diff算法是比对DOM树，当DOM庞大时，比对时间长，会阻塞，容易引起卡顿，16.3之后改成filbe
filbe核心：病发模式以前，以整棵vdom树为节点；病发模式以后，diff可中断，执行其他任务，等空闲时可以再来执行filbe
filbe架构特点：时间分片 任务分段 异步渲染

*diff算法：从上到下，从左到右，按照key值依次遍历，时间复杂程度为n。遇到新增就新增，遇到改变，先删除再生成，props=改变则更新，遇到删除，连同子节点一起删掉

高阶组件，传入一个组件，返回一个组件，组合与继承

v8垃圾回首机制
https://segmentfault.com/a/1190000014383214
这是一面吗，还有2面
JavaScript执行环境/执行上下文
https://blog.csdn.net/weixin_34138056/article/details/91423750

高阶组件
https://www.cnblogs.com/sanchang/p/10614074.html

页面加载缓慢
1.广告  2.按需加载：按业务进行代码分割  react.lazy() + Suspense  3.缓存

项目性能优化
1.资源请求时间 
    CDN 内容分发网络
    缓存：强缓存(所有文件都缓存，以后只要再次访问这个网站，不请求网络，而请求本地缓存，缺点--网站不会更新，解决--html不强缓存)；协商缓存(客户端第一次发起请求，在request上会添加一个时间，当第二次发起请求，服务器会将上次的时间戳与资源在服务器上的最后修改时间判断资源是否有变化，如果有变化，则返回新版本status200，如果没有变化，则会重定向到本地缓存，status304)
    DNS预解析
    预加载 preload prefetch  <link rel="preload" href="/path/to/style.css" as="style">
2.优化资源大小
   代码分割
   分包
   懒加载
   文件压缩（代码压缩--分包，配置多出口，图片压缩-雪碧图、base64、图片设置宽高）
3.优化代码执行
   react减少render
   防抖、节流
   css避免过多嵌套，能加类名就加类名
   js避免业务逻辑之外的回流重绘，卸载不必要的事件监听、事件代理
在react中优化
   react.lazy 
   userMemo userCallback
   shouldComponentUpdata  
   react.pureComponent 在render前先进行一次浅比较（新旧state，新旧props）
   渲染无关的数据，不存入state
   尽量减少表单元素受控
   把大量的计算扔到webworker线程里
   
react数据流
react是单项数据流，子组件通过props获取父组件的状态和方法，数据流是不可逆

for……of 只能遍历有遍历器（Iterator）的，对象不能遍历

组件通信
父传子 props
子传父 父给子一个方法，子调用并传参；
兄弟 子传父 父传子；ref；状态提升
远程 context；redux；事件发布订阅模式；第三方媒介-URL、本地缓存

BFC是W3C规范，一个块元素就是一个独立的BFC

弹性盒和浮动不能同时使用，弹性盒生效，浮动不生效

把组件状态提升到最外层 flux架构  react-redux是flux的具体实现

路由实现原理：1.哈希模式 hashChange 2.history模式 popstate

编辑跳转：编辑路由router跳转时，将id穿到URL

模板字符串、结构赋值，类是构造函数的语法糖，箭头函数、扩展运算符，async/await是promise的语法糖

code-review 
技术层面，代码的规范和兜底
逻辑层面，查看代码是否有业务逻辑错误 
```

# ★react补充

## **1.我看你的简历里主要技术栈是react，你会用hooks吗？**

​	1）为什么用
​      		为了让函数组件拥有类组件的功能和其他的React特性；
​      		自定义hook  实现组件的复用
​      		代码量比类组件更少，更清爽
​	2）原生hooks（都要写在最顶层） 
​      		useState、useReducer  状态定义
​      		useEffect、useLayoutEffect 生命周期功能
​      		useRef useImperativeHandle 替代了类组件的 Ref
​      		useMemo、useCallback  优化函数组件
​      		useDebugValue  为自定义hook添加名称
​      
​     	***useState:***

​           1、概念：在类组件中，我们使用 `this.state` 来保存组件状态，并对其修改触发组件重新渲染，而在函数组件中，由于没有 state等一些自己的状态 ，于是React 通过 useState 来帮我们保存组件的状态。
​		作用：定义状态 修改状态
​		返回一个数组，其中第一项是状态值，第二项是一个更新状态的函数。
​		状态一旦改变，React 就会重新渲染组件，变量获取新的状态值。
​		
​      **useEffect:**( 副作用函数()=>消除副作用,监听数组)   副作用：模拟生命周期钩子

​            1、函数组件能保存状态，但是对于异步请求，副作用的操作还是无能为力，所以 React 提供了 useEffect 来帮助开发者处理函数组件的副作用         	

​             2、他接受两个参数，第一个参数是副作用函数，它可以返回一个消除副作用函数。
​        	 第二个参数是一个数组，副作用函数和消除副作用函数受这个数组的监听内容影响，以此决定是否在当次render前后触发。数组不传的情况下，副作用函数会在每次render后执行一次，消除副作用函数默认会在初始化后每次render前和卸载前执行。
​         	常用useEffect来模拟生命周期钩子(比如 componentdidmount、componentdidupdata、componentwillunmount)，以及做一些render后的事件监听(副作用)，以及卸载监听(消除副作用)；
  // 只有一个参数且是函数的时候, 就是不传递第二个参数，代表不监听任何参数变化。每次渲染DOM之后，都会执行useEffect中的函数相当于componentDidMount和componentDidUpdate

 // 第二个参数是一个数组，数组里面可以添加依赖

 // 若第二个参数是空数组，相当于componentDidMount

 // 第二个参数里面有依赖，相当于shouldComponentUpdate, watch     

 //如果第一个参数（函数）里面返回了一个函数，则就是卸载，此时注意的是依赖是空数组



 **useLayoutEffect和useEffect的区别：**

```
useEffect在render结束后执行，性能更好；

useLayoutEffect会在DOM更新完成后立即执行，会阻塞浏览器的绘制。

多数情况下，使用useEffect，但有些跟视图有关的副作用想要第一时间呈现给用户，那么我们就可以使用useLayoutEffect
```

​	**useReducer** ：useReducer 这个 Hooks 在使用上几乎跟 Redux/React-Redux 一样，唯一缺少的就是无法使用 redux 提供的中间件。有两个参数，参数1：reducer，参数2：默认的state，返回的是一个数组。
​	**useContext:***useContext 是 React 帮你封装好的，用来处理多层级传递数据的方式，在以前组件树中，跨层级祖先组件想要给孙子组件传递数据的时候，除了一层层 props 往下透传之外，我们还可以使用 React Context API 来帮我们做这件事，通过 React createContext 的语法，在 APP 组件中可以跨过 子组件组件给儿子组件 传递数据。而在 React Hooks 中，我们可以使用 useContext 进行改造，传递给 useContext 的是 context 而不是 consumer，返回值即是想要透传的数据了。用法很简单，使用 useContext 可以解决 Consumer 多状态嵌套的问题。而使用 useContext 则变得十分简洁，可读性更强且不会增加组件树深度。
​		（跨组件通信 createContext创建一个组件 <numContext.Provider value={num}>使用 useContext 可以解决 Consumer 多状态嵌套的问题。）
​	**useDebugValue:**
​		自定义 hook 的标签 方便调试台查看
​	**useMemo:**
​		记忆组件 动态缓存 返回一个记忆值，优化作用,类似于shouldComponentUpdate
​        会在组件第一次渲染的时候执行，之后他依赖的变量发生改变时再次执行
​	**useCallBack:**（当自定义事件传递给子组件的时候，子组件会二次渲染，此时就可以用useCallBack来阻止它二次渲染，来达到性能优化的作用）

## 	**useMemo 和useCallBack的区别****

```
	useCallback都会在组件第一次渲染的时候执行，之后会在其依赖的变量发生改变时再次执行
​	并且这两个hooks都返回缓存的值，useMemo返回缓存的变量，useCallback返回缓存的函数。
`useMemo` 和 `useCallback` 接收的参数都是一样,第一个参数为回调 第二个参数为要依赖的数据
共同作用：
1.仅仅 `依赖数据` 发生变化, 才会重新计算结果，也就是起到缓存的作用。
两者区别：
1.`useMemo` 计算结果是 `return` 回来的值, 主要用于缓存计算结果的值 ，应用场景如： 需要计算的状态
2.`useCallback` 计算结果是 `函数`, 主要用于 缓存函数，应用场景如: 需要缓存的函数，因为函数式组件每次任何一个 state 的变化 整个组件 都会被重新刷新，一些函数是没有必要被重新刷新的，此时就应该缓存起来，提高性能，和减少资源浪费。

注意： 不要滥用会造成性能浪费，react中减少render就能提高性能，所以这个仅仅只针对缓存能减少重复渲染时使用和缓存计算结果。		
```

​	**useRef:**
​		创建ref实例， 可以用来存值，也可以用来标记dom和组件获取他们的实例。
​		返回一个可变的ref对象
​	useImperativeHandle:
​		将组件中的方法放到外面使用
​		搭配React.forwardRef

  	3)使用规则
​        	自定义hook名称以 “use” 开头，函数内部可以调⽤其他的 Hook
​        	只能用在函数组件当中使用
​        	只能在函数最外层调用原生Hook。不能在循环、条件判断或者子函数中调用
​	4）自定义hook
   		类似于高阶组件 
   		高阶组件返回的一个类组件，而自定义Hook可以返回任何东西
   		高阶组件必须传递一个组件作为参数，而自定义Hook不需要

```
   function useFriendStatus(friendID) {
     const [isOnline, setIsOnline] = useState(null);
     useDebugValue(isOnline ? 'Online' : 'Offline');
     return isOnline;
   }
```

## **2.你的项目中用到了redux吗？ 讲下redux 数据流？**

redux是一种管理状态

## 	**redux 数据流**

​		是flux架构思想的具体实现：将状态提升到全局store，然后分发给组件，更新store的方式是dispatch一个action触发对应的reducer函数。
​	
​	**redux流程**

- ​	打造store -- 存储定义 state、管理state

- ​	打造reducers，reducer拷贝state,并返回一个新的state给store(扩展元素安抚) -- 定义修改后的数据

- ​	通过connect高阶组件将store的数据取出来给了组件

- ​	组件中触发动作激活 action 

- ​	actionCreators 创建action，action激活reducer

- ​	reducers中修改数据

  **redux组成**
  ​        store :用来存储数据和数据管理的、更新视图
  ​        reducer:是一个纯函数，接收旧 state 和 action，根据不同的 Action 做出不同的操作并返回新的 state
  ​        actions:发送动作给reducer,reducer接收动作，判断动作类型修改数据，修改事件后，组件重新做redux事件的订阅
  ​       		View：界面，在React中，其实就是组件

  **redux三大原则**
  ​        1）**单一数据源**:
    		整个应用的 state 被存储在一个 Object tree 中，且只存在于唯一的Store中
  ​        2）**state 是只读的**:
   		唯一改变 state 的方法就是触发 action，action 是一个用于描述发生事件的普通对象，视图部分只需要表达想要修改的意图，所有修改都会被集中化处理。
  ​        3）**状态的改变通过纯函数reducer来完成**:
    		Redux使用纯函数方式来执行状态的修改，Action表明了修改状态值的意图，而真正执行状态修改的则是Reducer。且Reducer必须是一个纯函数，当Reducer接收到Action时，Action并不能直接修改State的值，而是通过创建一个新的状态对象来返回修改的状态。

## **3.Provider 和 connact分别做了什么事？**

​    	react-redux是给react项目提供的状态提升和分发的简化操作api=>Provider+connect。
   	通过最外层Provider组件开启context，将全局store内容打进去；通过connect高阶组件获取store内容，并将其打入到参数组件的props中； 上述两者完成了状态提升到全局和状态分发。

## **4.redux(或者react-redux)如何更新store里面的数据？**

​	dispatch一个action触发对应的reducer函数。

## **5.reducer是个纯函数，那我想在更新store前执行一些副作用怎么办？**

​	dva中引用了 redux-saga中间件， 它提供了effect函数来处理副作用。完整链路是： dispatch一个action，触发effect函数执行副作用，然后再触发reducer去更新store。

## **6.redux-saga的实现原理？**

```
	基于generator函数实现的。
​	**redux-saga是redux的中间键，提供了effect函数功能。**

​	**为什么要用它？**
​	因为有时候我们期望 dispatch一个action后，先处理一些业务逻辑(也称之为副作用)，比如发送请求获取数据然后将数据更新到store，但reducer是纯函数，无法在reducer内使用副作用代码(比如不能在reducer里面去请求)。
​	那么我们可以用redux-saga中间键去扩展 redux的功能，提供一个effect函数。
​	这样就可以，dispath一个action => 触发effect执行副作用业务逻辑 => 然后触发reducer传入数据 => 更新store


用法：先安装->
```



## **7.Hook的实现原理是？**

​	闭包，然后react底层用一个单链表结构记录它们。

## **8.为什么不能在条件语句中使用hook？**

​	因为单链表中的链表节点缺失，会造成链路中断。所以react不允许在条件语句中使用hook

## **9.setState(callback/object,callback?)**

在react中如果写了很多个this.setState，他就会等待合并，为了性能优化

以前在合成事件中都是异步

第一个参数如果是对象，合成事件都是异步，但在计时器中是同步（这是react的一个bug，但在react 16.8之后，这个bug被修复了，所以16.8之后在计时器中setState也成了异步）

第二个参数为回调函数： 这个callbackstate更新之后的回调，此时state已经完成更新，可以取到更新后的state 

# swiper原理，原生js怎么实现，主要是拉动的弹性效果

```
swiper是一款轻量级的轮播图插件，不仅支持pc端更是为移动端而生，用它可以快速地做出一个轮播图，或者扩展使其做出复杂的轮播效果。

主要使用touchstart,touchmove，touchend事件

touchstart时记录用户触摸点的x,y坐标，存入数组[x,y]，将slide Container的transition设置为0s（默认有transition: all 0s ease 0s）

touchmove事件也会进行触摸位置移动，

触摸的距离len为用触摸点的x坐标e.touches[0].clientX减去touchstart时记录的数组里的x坐标.(得出的len为负值)

移动的位置为：

负的slide container的宽度clientWidth*currentIndex + len

touchend事件

当不是第一或者最后一张的时候，currentIndex加1,设置transition时间，

设置移动距离distance为itemWidth * currentIndex,设置transform的translate为(-distance px,0),其中itemWidth为slidecontainer的宽度

导航小圆点

初始化的时候创建一个数组，数组长度为slider的长度

根据currentIndex进行样式变换，currentIndex跟当前的小圆点index一致的时候，添加特殊的class,比如背景色，更大的width等。
```

# diff算法、diff算法中key的比较是怎样的?

diff算法：从上到下，从左到右，按照key值依次遍历，时间复杂程度为n。遇到新增就新增，遇到改变，先删除再生成，props=改变则更新，遇到删除，连同子节点一起删掉



理解：diff算法用来计算出虚拟Dom中改变的部分，然后针对该部分进行DOM操作，而不用重新渲染整个页面，渲染整个DOM结构的过程中开销是很大的，需要浏览器对DOM结构进行重绘与回流，而diff算法能够使得操作过程中只更新修改的那部分DOM结构而不更新整个DOM，这样能够最小化操作DOM结构，能够最大程度上减少浏览器重绘与回流的规模。

diff算法：即差异查找算法，对于DOM结构即为tree的差异查找算法，只有在React更新阶段才会有Diff算法的运用；react的diff运算为了降低时间复杂度，是按层比较新旧两个虚拟dom树的。diff运算的主要流程见下：

        1、tree diff : 新旧两棵dom树，逐层对比的过程就是 tree diff, 当整棵DOM树逐层对比完毕，则所有需要被按需更新的元素，必然能够被找到。
        2、component diff ： 在进行tree diff的时候，每一层中，都有自己的组件，组件级别的对比，叫做 component diff。如果对比前后，组件的类型相同，则暂时认为此组件不需要更新；如果对比前后，组件的类型不同，则需要移除旧组件，创建新组件，并渲染到页面上。
        React只会匹配类型相同的组件，也就是说如果<A>被<B>替换，那么React将直接删除A组件然后创建一个B组件；如果某组件A转移到同层B组件上，那么这个A组件会先被销毁，然后在B组件下重新生成，以A为根节点的树整个都被重新创建，这会比较耗费性能，但实际上我们很少跨层移动dom节点，一般都是同层横向移动；
        3、element diff ：在进行组件对比的时候，如果两个组件类型相同，则需要进行元素级别的对比，这叫做element diff。
        对于列表渲染，react会在创建时要求为每一项输入一个独一无二的key，这样就能进行高效的diff运算了。比如我们要在b和c节点中间插入一个节点f，jquery会将f这个节点后面的每一个节点都进行更新，比如c更新成f，d更新成c，e更新成d，这样操作的话就会特别多，而加了key的react咋不会频繁操作dom，而是优先采用移动的方式，找到正确的位置去插入新节点；所以我们不能省略key值，因为在对比两个新旧的子元素是，是通过key值来精确地判断两个节点是否为同一个，如果没有key的话则是见到谁就更新谁，非常耗费性能。
            当我们通过this.setState()改变数据的时候，React会将其标记为脏节点，在事件循环的最后才会重新渲染所有的脏节点以及脏节点的子树；另外我们可以使用shouldComponentUpdate这个生命周期来选择性的渲染子树，可以基于组件之前的状态或者下一个状态来决定它是否需要重新渲染，这样的话可以组织重新渲染大的子树。
    只进行统一层级的比较，如果跨层级的移动则视为创建和删除操作。
    如果是不同类型的元素，则认为是创建了新的元素，而不会递归比较他们的孩子。
    如果是列表元素等比较相似的内容，可以通过key来唯一确定是移动还是创建或删除操作。

# diff算法中用key比较和index有什么区别，为什么不用index

```
总结：当以数组的下标index作为key值时，其中一个元素发生了变化 就有可能导致所有元素的key值发生改变 。diff算法是比较同级之间的不同并以key值来进行关联。当对数组进行下标的变换时，比如删除第一条数据，那么以后所有的Index都会发生改变，那么key值自然也跟着全部发生改变，所以，index作为key值和没加index是一样的，并不能提升性能。 

在平时的开发过程中, 因为我们的数据绝大部分都是从后台获取来的. 数据库中每一条数据都会一个 id 作为唯一标识，而这个 id 也是我们最常使用作为 key 值的来源。
```

# 函数组件和类组件的区别

```
函数组件和类组件当然是有区别的，而且函数组件的性能比类组件的性能要高，
   因为类组件使用的时候要实例化，而函数组件直接执行函数取返回结果即可。
　　为了提高性能，尽量使用函数组件。
　　函数组件没有this,没有生命周期，没有状态state只有props,
　　类组件有this,有生命周期，有状态state。

相同之处
props不能改变
父组件props有变化时，子组件随之而改变


```

[
  ](https://lurongtao.gitee.io/felixbooks-interview2/react/)


- [前端面试题及答案汇总](#%E5%89%8D%E7%AB%AF%E9%9D%A2%E8%AF%95%E9%A2%98%E5%8F%8A%E7%AD%94%E6%A1%88%E6%B1%87%E6%80%BB)
  - [第 1 题：写 React / Vue 项目时为什么要在列表组件中写 key，其作用是什么？](#%E7%AC%AC-1-%E9%A2%98%E5%86%99-react--vue-%E9%A1%B9%E7%9B%AE%E6%97%B6%E4%B8%BA%E4%BB%80%E4%B9%88%E8%A6%81%E5%9C%A8%E5%88%97%E8%A1%A8%E7%BB%84%E4%BB%B6%E4%B8%AD%E5%86%99-key%E5%85%B6%E4%BD%9C%E7%94%A8%E6%98%AF%E4%BB%80%E4%B9%88)
  - [第 2 题：`['1', '2', '3'].map(parseInt)` what & why ?](#%E7%AC%AC-2-%E9%A2%981-2-3mapparseint-what--why-)
  - [第 3 题：什么是防抖和节流？有什么区别？如何实现？](#%E7%AC%AC-3-%E9%A2%98%E4%BB%80%E4%B9%88%E6%98%AF%E9%98%B2%E6%8A%96%E5%92%8C%E8%8A%82%E6%B5%81%E6%9C%89%E4%BB%80%E4%B9%88%E5%8C%BA%E5%88%AB%E5%A6%82%E4%BD%95%E5%AE%9E%E7%8E%B0)
  - [第 4 题：介绍下 Set、Map、WeakSet 和 WeakMap 的区别？](#%E7%AC%AC-4-%E9%A2%98%E4%BB%8B%E7%BB%8D%E4%B8%8B-setmapweakset-%E5%92%8C-weakmap-%E7%9A%84%E5%8C%BA%E5%88%AB)
  - [第 5 题：介绍下深度优先遍历和广度优先遍历，如何实现？](#%E7%AC%AC-5-%E9%A2%98%E4%BB%8B%E7%BB%8D%E4%B8%8B%E6%B7%B1%E5%BA%A6%E4%BC%98%E5%85%88%E9%81%8D%E5%8E%86%E5%92%8C%E5%B9%BF%E5%BA%A6%E4%BC%98%E5%85%88%E9%81%8D%E5%8E%86%E5%A6%82%E4%BD%95%E5%AE%9E%E7%8E%B0)
  - [第 6 题：请分别用深度优先思想和广度优先思想实现一个拷贝函数？](#%E7%AC%AC-6-%E9%A2%98%E8%AF%B7%E5%88%86%E5%88%AB%E7%94%A8%E6%B7%B1%E5%BA%A6%E4%BC%98%E5%85%88%E6%80%9D%E6%83%B3%E5%92%8C%E5%B9%BF%E5%BA%A6%E4%BC%98%E5%85%88%E6%80%9D%E6%83%B3%E5%AE%9E%E7%8E%B0%E4%B8%80%E4%B8%AA%E6%8B%B7%E8%B4%9D%E5%87%BD%E6%95%B0)
  - [第 7 题：ES5/ES6 的继承除了写法以外还有什么区别？](#%E7%AC%AC-7-%E9%A2%98es5es6-%E7%9A%84%E7%BB%A7%E6%89%BF%E9%99%A4%E4%BA%86%E5%86%99%E6%B3%95%E4%BB%A5%E5%A4%96%E8%BF%98%E6%9C%89%E4%BB%80%E4%B9%88%E5%8C%BA%E5%88%AB)
  - [第 8 题：setTimeout、Promise、Async/Await 的区别](#%E7%AC%AC-8-%E9%A2%98settimeoutpromiseasyncawait-%E7%9A%84%E5%8C%BA%E5%88%AB)
  - [第 9 题：Async/Await 如何通过同步的方式实现异步](#%E7%AC%AC-9-%E9%A2%98asyncawait-%E5%A6%82%E4%BD%95%E9%80%9A%E8%BF%87%E5%90%8C%E6%AD%A5%E7%9A%84%E6%96%B9%E5%BC%8F%E5%AE%9E%E7%8E%B0%E5%BC%82%E6%AD%A5)
  - [第 10 题：异步笔试题](#%E7%AC%AC-10-%E9%A2%98%E5%BC%82%E6%AD%A5%E7%AC%94%E8%AF%95%E9%A2%98)
  - [第 11 题：算法手写题](#%E7%AC%AC-11-%E9%A2%98%E7%AE%97%E6%B3%95%E6%89%8B%E5%86%99%E9%A2%98)
  - [第 12 题：JS 异步解决方案的发展历程以及优缺点。](#%E7%AC%AC-12-%E9%A2%98js-%E5%BC%82%E6%AD%A5%E8%A7%A3%E5%86%B3%E6%96%B9%E6%A1%88%E7%9A%84%E5%8F%91%E5%B1%95%E5%8E%86%E7%A8%8B%E4%BB%A5%E5%8F%8A%E4%BC%98%E7%BC%BA%E7%82%B9)
  - [第 13 题：Promise 构造函数是同步执行还是异步执行，那么 then 方法呢？](#%E7%AC%AC-13-%E9%A2%98promise-%E6%9E%84%E9%80%A0%E5%87%BD%E6%95%B0%E6%98%AF%E5%90%8C%E6%AD%A5%E6%89%A7%E8%A1%8C%E8%BF%98%E6%98%AF%E5%BC%82%E6%AD%A5%E6%89%A7%E8%A1%8C%E9%82%A3%E4%B9%88-then-%E6%96%B9%E6%B3%95%E5%91%A2)
  - [第 14 题：情人节福利题，如何实现一个 new](#%E7%AC%AC-14-%E9%A2%98%E6%83%85%E4%BA%BA%E8%8A%82%E7%A6%8F%E5%88%A9%E9%A2%98%E5%A6%82%E4%BD%95%E5%AE%9E%E7%8E%B0%E4%B8%80%E4%B8%AA-new)
  - [第 15 题：简单讲解一下http2的多路复用](#%E7%AC%AC-15-%E9%A2%98%E7%AE%80%E5%8D%95%E8%AE%B2%E8%A7%A3%E4%B8%80%E4%B8%8Bhttp2%E7%9A%84%E5%A4%9A%E8%B7%AF%E5%A4%8D%E7%94%A8)
  - [第 16 题：谈谈你对TCP三次握手和四次挥手的理解](#%E7%AC%AC-16-%E9%A2%98%E8%B0%88%E8%B0%88%E4%BD%A0%E5%AF%B9tcp%E4%B8%89%E6%AC%A1%E6%8F%A1%E6%89%8B%E5%92%8C%E5%9B%9B%E6%AC%A1%E6%8C%A5%E6%89%8B%E7%9A%84%E7%90%86%E8%A7%A3)
  - [第 17 题：A、B 机器正常连接后，B 机器突然重启，问 A 此时处于 TCP 什么状态](#%E7%AC%AC-17-%E9%A2%98ab-%E6%9C%BA%E5%99%A8%E6%AD%A3%E5%B8%B8%E8%BF%9E%E6%8E%A5%E5%90%8Eb-%E6%9C%BA%E5%99%A8%E7%AA%81%E7%84%B6%E9%87%8D%E5%90%AF%E9%97%AE-a-%E6%AD%A4%E6%97%B6%E5%A4%84%E4%BA%8E-tcp-%E4%BB%80%E4%B9%88%E7%8A%B6%E6%80%81)
  - [第 18 题：React 中 setState 什么时候是同步的，什么时候是异步的？](#%E7%AC%AC-18-%E9%A2%98react-%E4%B8%AD-setstate-%E4%BB%80%E4%B9%88%E6%97%B6%E5%80%99%E6%98%AF%E5%90%8C%E6%AD%A5%E7%9A%84%E4%BB%80%E4%B9%88%E6%97%B6%E5%80%99%E6%98%AF%E5%BC%82%E6%AD%A5%E7%9A%84)
  - [第 19 题：React setState 笔试题，下面的代码输出什么？](#%E7%AC%AC-19-%E9%A2%98react-setstate-%E7%AC%94%E8%AF%95%E9%A2%98%E4%B8%8B%E9%9D%A2%E7%9A%84%E4%BB%A3%E7%A0%81%E8%BE%93%E5%87%BA%E4%BB%80%E4%B9%88)
  - [第 20 题：介绍下 npm 模块安装机制，为什么输入 npm install 就可以自动安装对应的模块？](#%E7%AC%AC-20-%E9%A2%98%E4%BB%8B%E7%BB%8D%E4%B8%8B-npm-%E6%A8%A1%E5%9D%97%E5%AE%89%E8%A3%85%E6%9C%BA%E5%88%B6%E4%B8%BA%E4%BB%80%E4%B9%88%E8%BE%93%E5%85%A5-npm-install-%E5%B0%B1%E5%8F%AF%E4%BB%A5%E8%87%AA%E5%8A%A8%E5%AE%89%E8%A3%85%E5%AF%B9%E5%BA%94%E7%9A%84%E6%A8%A1%E5%9D%97)
  - [第 21 题：有以下 3 个判断数组的方法，请分别介绍它们之间的区别和优劣](#%E7%AC%AC-21-%E9%A2%98%E6%9C%89%E4%BB%A5%E4%B8%8B-3-%E4%B8%AA%E5%88%A4%E6%96%AD%E6%95%B0%E7%BB%84%E7%9A%84%E6%96%B9%E6%B3%95%E8%AF%B7%E5%88%86%E5%88%AB%E4%BB%8B%E7%BB%8D%E5%AE%83%E4%BB%AC%E4%B9%8B%E9%97%B4%E7%9A%84%E5%8C%BA%E5%88%AB%E5%92%8C%E4%BC%98%E5%8A%A3)
  - [第 22 题：介绍下重绘和回流（Repaint & Reflow），以及如何进行优化](#%E7%AC%AC-22-%E9%A2%98%E4%BB%8B%E7%BB%8D%E4%B8%8B%E9%87%8D%E7%BB%98%E5%92%8C%E5%9B%9E%E6%B5%81repaint--reflow%E4%BB%A5%E5%8F%8A%E5%A6%82%E4%BD%95%E8%BF%9B%E8%A1%8C%E4%BC%98%E5%8C%96)
  - [第 23 题：介绍下观察者模式和订阅-发布模式的区别，各自适用于什么场景](#%E7%AC%AC-23-%E9%A2%98%E4%BB%8B%E7%BB%8D%E4%B8%8B%E8%A7%82%E5%AF%9F%E8%80%85%E6%A8%A1%E5%BC%8F%E5%92%8C%E8%AE%A2%E9%98%85-%E5%8F%91%E5%B8%83%E6%A8%A1%E5%BC%8F%E7%9A%84%E5%8C%BA%E5%88%AB%E5%90%84%E8%87%AA%E9%80%82%E7%94%A8%E4%BA%8E%E4%BB%80%E4%B9%88%E5%9C%BA%E6%99%AF)
  - [第 24 题：聊聊 Redux 和 Vuex 的设计思想](#%E7%AC%AC-24-%E9%A2%98%E8%81%8A%E8%81%8A-redux-%E5%92%8C-vuex-%E7%9A%84%E8%AE%BE%E8%AE%A1%E6%80%9D%E6%83%B3)
  - [第 25 题：说说浏览器和 Node 事件循环的区别](#%E7%AC%AC-25-%E9%A2%98%E8%AF%B4%E8%AF%B4%E6%B5%8F%E8%A7%88%E5%99%A8%E5%92%8C-node-%E4%BA%8B%E4%BB%B6%E5%BE%AA%E7%8E%AF%E7%9A%84%E5%8C%BA%E5%88%AB)
  - [第 26 题：介绍模块化发展历程](#%E7%AC%AC-26-%E9%A2%98%E4%BB%8B%E7%BB%8D%E6%A8%A1%E5%9D%97%E5%8C%96%E5%8F%91%E5%B1%95%E5%8E%86%E7%A8%8B)
  - [第 27 题：全局作用域中，用 const 和 let 声明的变量不在 window 上，那到底在哪里？如何去获取？。](#%E7%AC%AC-27-%E9%A2%98%E5%85%A8%E5%B1%80%E4%BD%9C%E7%94%A8%E5%9F%9F%E4%B8%AD%E7%94%A8-const-%E5%92%8C-let-%E5%A3%B0%E6%98%8E%E7%9A%84%E5%8F%98%E9%87%8F%E4%B8%8D%E5%9C%A8-window-%E4%B8%8A%E9%82%A3%E5%88%B0%E5%BA%95%E5%9C%A8%E5%93%AA%E9%87%8C%E5%A6%82%E4%BD%95%E5%8E%BB%E8%8E%B7%E5%8F%96)
  - [第 28 题：cookie 和 token 都存放在 header 中，为什么不会劫持 token？](#%E7%AC%AC-28-%E9%A2%98cookie-%E5%92%8C-token-%E9%83%BD%E5%AD%98%E6%94%BE%E5%9C%A8-header-%E4%B8%AD%E4%B8%BA%E4%BB%80%E4%B9%88%E4%B8%8D%E4%BC%9A%E5%8A%AB%E6%8C%81-token)
  - [第 29 题：聊聊 Vue 的双向数据绑定，Model 如何改变 View，View 又是如何改变 Model 的](#%E7%AC%AC-29-%E9%A2%98%E8%81%8A%E8%81%8A-vue-%E7%9A%84%E5%8F%8C%E5%90%91%E6%95%B0%E6%8D%AE%E7%BB%91%E5%AE%9Amodel-%E5%A6%82%E4%BD%95%E6%94%B9%E5%8F%98-viewview-%E5%8F%88%E6%98%AF%E5%A6%82%E4%BD%95%E6%94%B9%E5%8F%98-model-%E7%9A%84)
  - [第 30 题：两个数组合并成一个数组](#%E7%AC%AC-30-%E9%A2%98%E4%B8%A4%E4%B8%AA%E6%95%B0%E7%BB%84%E5%90%88%E5%B9%B6%E6%88%90%E4%B8%80%E4%B8%AA%E6%95%B0%E7%BB%84)
  - [第 31 题：改造下面的代码，使之输出0 - 9，写出你能想到的所有解法。](#%E7%AC%AC-31-%E9%A2%98%E6%94%B9%E9%80%A0%E4%B8%8B%E9%9D%A2%E7%9A%84%E4%BB%A3%E7%A0%81%E4%BD%BF%E4%B9%8B%E8%BE%93%E5%87%BA0---9%E5%86%99%E5%87%BA%E4%BD%A0%E8%83%BD%E6%83%B3%E5%88%B0%E7%9A%84%E6%89%80%E6%9C%89%E8%A7%A3%E6%B3%95)
  - [第 32 题：Virtual DOM 真的比操作原生 DOM 快吗？谈谈你的想法。](#%E7%AC%AC-32-%E9%A2%98virtual-dom-%E7%9C%9F%E7%9A%84%E6%AF%94%E6%93%8D%E4%BD%9C%E5%8E%9F%E7%94%9F-dom-%E5%BF%AB%E5%90%97%E8%B0%88%E8%B0%88%E4%BD%A0%E7%9A%84%E6%83%B3%E6%B3%95)
  - [第 33 题：下面的代码打印什么内容，为什么？](#%E7%AC%AC-33-%E9%A2%98%E4%B8%8B%E9%9D%A2%E7%9A%84%E4%BB%A3%E7%A0%81%E6%89%93%E5%8D%B0%E4%BB%80%E4%B9%88%E5%86%85%E5%AE%B9%E4%B8%BA%E4%BB%80%E4%B9%88)
  - [第 34 题：简单改造下面的代码，使之分别打印 10 和 20。](#%E7%AC%AC-34-%E9%A2%98%E7%AE%80%E5%8D%95%E6%94%B9%E9%80%A0%E4%B8%8B%E9%9D%A2%E7%9A%84%E4%BB%A3%E7%A0%81%E4%BD%BF%E4%B9%8B%E5%88%86%E5%88%AB%E6%89%93%E5%8D%B0-10-%E5%92%8C-20)
  - [第 35 题：浏览器缓存读取规则](#%E7%AC%AC-35-%E9%A2%98%E6%B5%8F%E8%A7%88%E5%99%A8%E7%BC%93%E5%AD%98%E8%AF%BB%E5%8F%96%E8%A7%84%E5%88%99)
  - [第 36 题：使用迭代的方式实现 flatten 函数。](#%E7%AC%AC-36-%E9%A2%98%E4%BD%BF%E7%94%A8%E8%BF%AD%E4%BB%A3%E7%9A%84%E6%96%B9%E5%BC%8F%E5%AE%9E%E7%8E%B0-flatten-%E5%87%BD%E6%95%B0)
  - [第 37 题：为什么 Vuex 的 mutation 和 Redux 的 reducer 中不能做异步操作？](#%E7%AC%AC-37-%E9%A2%98%E4%B8%BA%E4%BB%80%E4%B9%88-vuex-%E7%9A%84-mutation-%E5%92%8C-redux-%E7%9A%84-reducer-%E4%B8%AD%E4%B8%8D%E8%83%BD%E5%81%9A%E5%BC%82%E6%AD%A5%E6%93%8D%E4%BD%9C)
  - [第 38 题：下面代码中 a 在什么情况下会打印 1？](#%E7%AC%AC-38-%E9%A2%98%E4%B8%8B%E9%9D%A2%E4%BB%A3%E7%A0%81%E4%B8%AD-a-%E5%9C%A8%E4%BB%80%E4%B9%88%E6%83%85%E5%86%B5%E4%B8%8B%E4%BC%9A%E6%89%93%E5%8D%B0-1)
  - [第 39 题：介绍下 BFC 及其应用。](#%E7%AC%AC-39-%E9%A2%98%E4%BB%8B%E7%BB%8D%E4%B8%8B-bfc-%E5%8F%8A%E5%85%B6%E5%BA%94%E7%94%A8)
  - [第 40 题：在 Vue 中，子组件为何不可以修改父组件传递的 Prop](#%E7%AC%AC-40-%E9%A2%98%E5%9C%A8-vue-%E4%B8%AD%E5%AD%90%E7%BB%84%E4%BB%B6%E4%B8%BA%E4%BD%95%E4%B8%8D%E5%8F%AF%E4%BB%A5%E4%BF%AE%E6%94%B9%E7%88%B6%E7%BB%84%E4%BB%B6%E4%BC%A0%E9%80%92%E7%9A%84-prop)
  - [第 41 题：下面代码输出什么](#%E7%AC%AC-41-%E9%A2%98%E4%B8%8B%E9%9D%A2%E4%BB%A3%E7%A0%81%E8%BE%93%E5%87%BA%E4%BB%80%E4%B9%88)
  - [第 42 题：实现一个 sleep 函数](#%E7%AC%AC-42-%E9%A2%98%E5%AE%9E%E7%8E%B0%E4%B8%80%E4%B8%AA-sleep-%E5%87%BD%E6%95%B0)
  - [第 43 题：使用 sort() 对数组 [3, 15, 8, 29, 102, 22] 进行排序，输出结果](#%E7%AC%AC-43-%E9%A2%98%E4%BD%BF%E7%94%A8-sort-%E5%AF%B9%E6%95%B0%E7%BB%84-3-15-8-29-102-22-%E8%BF%9B%E8%A1%8C%E6%8E%92%E5%BA%8F%E8%BE%93%E5%87%BA%E7%BB%93%E6%9E%9C)
  - [第 44 题：介绍 HTTPS 握手过程](#%E7%AC%AC-44-%E9%A2%98%E4%BB%8B%E7%BB%8D-https-%E6%8F%A1%E6%89%8B%E8%BF%87%E7%A8%8B)
  - [第 45 题：HTTPS 握手过程中，客户端如何验证证书的合法性](#%E7%AC%AC-45-%E9%A2%98https-%E6%8F%A1%E6%89%8B%E8%BF%87%E7%A8%8B%E4%B8%AD%E5%AE%A2%E6%88%B7%E7%AB%AF%E5%A6%82%E4%BD%95%E9%AA%8C%E8%AF%81%E8%AF%81%E4%B9%A6%E7%9A%84%E5%90%88%E6%B3%95%E6%80%A7)
  - [第 46 题：输出以下代码执行的结果并解释为什么](#%E7%AC%AC-46-%E9%A2%98%E8%BE%93%E5%87%BA%E4%BB%A5%E4%B8%8B%E4%BB%A3%E7%A0%81%E6%89%A7%E8%A1%8C%E7%9A%84%E7%BB%93%E6%9E%9C%E5%B9%B6%E8%A7%A3%E9%87%8A%E4%B8%BA%E4%BB%80%E4%B9%88)
  - [第 47 题：双向绑定和 vuex 是否冲突](#%E7%AC%AC-47-%E9%A2%98%E5%8F%8C%E5%90%91%E7%BB%91%E5%AE%9A%E5%92%8C-vuex-%E6%98%AF%E5%90%A6%E5%86%B2%E7%AA%81)
  - [第 48 题：call 和 apply 的区别是什么，哪个性能更好一些](#%E7%AC%AC-48-%E9%A2%98call-%E5%92%8C-apply-%E7%9A%84%E5%8C%BA%E5%88%AB%E6%98%AF%E4%BB%80%E4%B9%88%E5%93%AA%E4%B8%AA%E6%80%A7%E8%83%BD%E6%9B%B4%E5%A5%BD%E4%B8%80%E4%BA%9B)
  - [第 49 题：为什么通常在发送数据埋点请求的时候使用的是 1x1 像素的透明 gif 图片？](#%E7%AC%AC-49-%E9%A2%98%E4%B8%BA%E4%BB%80%E4%B9%88%E9%80%9A%E5%B8%B8%E5%9C%A8%E5%8F%91%E9%80%81%E6%95%B0%E6%8D%AE%E5%9F%8B%E7%82%B9%E8%AF%B7%E6%B1%82%E7%9A%84%E6%97%B6%E5%80%99%E4%BD%BF%E7%94%A8%E7%9A%84%E6%98%AF-1x1-%E5%83%8F%E7%B4%A0%E7%9A%84%E9%80%8F%E6%98%8E-gif-%E5%9B%BE%E7%89%87)
  - [第 50 题：实现 (5).add(3).minus(2) 功能。](#%E7%AC%AC-50-%E9%A2%98%E5%AE%9E%E7%8E%B0-5add3minus2-%E5%8A%9F%E8%83%BD)
  - [第 51 题：Vue 的响应式原理中 Object.defineProperty 有什么缺陷？](#%E7%AC%AC-51-%E9%A2%98vue-%E7%9A%84%E5%93%8D%E5%BA%94%E5%BC%8F%E5%8E%9F%E7%90%86%E4%B8%AD-objectdefineproperty-%E6%9C%89%E4%BB%80%E4%B9%88%E7%BC%BA%E9%99%B7)
  - [第 52 题：怎么让一个 div 水平垂直居中](#%E7%AC%AC-52-%E9%A2%98%E6%80%8E%E4%B9%88%E8%AE%A9%E4%B8%80%E4%B8%AA-div-%E6%B0%B4%E5%B9%B3%E5%9E%82%E7%9B%B4%E5%B1%85%E4%B8%AD)
  - [第 53 题：输出以下代码的执行结果并解释为什么](#%E7%AC%AC-53-%E9%A2%98%E8%BE%93%E5%87%BA%E4%BB%A5%E4%B8%8B%E4%BB%A3%E7%A0%81%E7%9A%84%E6%89%A7%E8%A1%8C%E7%BB%93%E6%9E%9C%E5%B9%B6%E8%A7%A3%E9%87%8A%E4%B8%BA%E4%BB%80%E4%B9%88)
  - [第 54 题：冒泡排序如何实现，时间复杂度是多少， 还可以如何改进？](#%E7%AC%AC-54-%E9%A2%98%E5%86%92%E6%B3%A1%E6%8E%92%E5%BA%8F%E5%A6%82%E4%BD%95%E5%AE%9E%E7%8E%B0%E6%97%B6%E9%97%B4%E5%A4%8D%E6%9D%82%E5%BA%A6%E6%98%AF%E5%A4%9A%E5%B0%91-%E8%BF%98%E5%8F%AF%E4%BB%A5%E5%A6%82%E4%BD%95%E6%94%B9%E8%BF%9B)
  - [第 55 题：某公司 1 到 12 月份的销售额存在一个对象里面](#%E7%AC%AC-55-%E9%A2%98%E6%9F%90%E5%85%AC%E5%8F%B8-1-%E5%88%B0-12-%E6%9C%88%E4%BB%BD%E7%9A%84%E9%94%80%E5%94%AE%E9%A2%9D%E5%AD%98%E5%9C%A8%E4%B8%80%E4%B8%AA%E5%AF%B9%E8%B1%A1%E9%87%8C%E9%9D%A2)
  - [第 56 题：要求设计 LazyMan 类，实现以下功能。](#%E7%AC%AC-56-%E9%A2%98%E8%A6%81%E6%B1%82%E8%AE%BE%E8%AE%A1-lazyman-%E7%B1%BB%E5%AE%9E%E7%8E%B0%E4%BB%A5%E4%B8%8B%E5%8A%9F%E8%83%BD)
  - [第 57 题：分析比较 opacity: 0、visibility: hidden、display: none 优劣和适用场景。](#%E7%AC%AC-57-%E9%A2%98%E5%88%86%E6%9E%90%E6%AF%94%E8%BE%83-opacity-0visibility-hiddendisplay-none-%E4%BC%98%E5%8A%A3%E5%92%8C%E9%80%82%E7%94%A8%E5%9C%BA%E6%99%AF)
  - [第 58 题：箭头函数与普通函数（function）的区别是什么？构造函数（function）可以使用 new 生成实例，那么箭头函数可以吗？为什么？](#%E7%AC%AC-58-%E9%A2%98%E7%AE%AD%E5%A4%B4%E5%87%BD%E6%95%B0%E4%B8%8E%E6%99%AE%E9%80%9A%E5%87%BD%E6%95%B0function%E7%9A%84%E5%8C%BA%E5%88%AB%E6%98%AF%E4%BB%80%E4%B9%88%E6%9E%84%E9%80%A0%E5%87%BD%E6%95%B0function%E5%8F%AF%E4%BB%A5%E4%BD%BF%E7%94%A8-new-%E7%94%9F%E6%88%90%E5%AE%9E%E4%BE%8B%E9%82%A3%E4%B9%88%E7%AE%AD%E5%A4%B4%E5%87%BD%E6%95%B0%E5%8F%AF%E4%BB%A5%E5%90%97%E4%B8%BA%E4%BB%80%E4%B9%88)
  - [第 59 题：给定两个数组，写一个方法来计算它们的交集。](#%E7%AC%AC-59-%E9%A2%98%E7%BB%99%E5%AE%9A%E4%B8%A4%E4%B8%AA%E6%95%B0%E7%BB%84%E5%86%99%E4%B8%80%E4%B8%AA%E6%96%B9%E6%B3%95%E6%9D%A5%E8%AE%A1%E7%AE%97%E5%AE%83%E4%BB%AC%E7%9A%84%E4%BA%A4%E9%9B%86)
  - [第 60 题：已知如下代码，如何修改才能让图片宽度为 300px ？注意下面代码不可修改。](#%E7%AC%AC-60-%E9%A2%98%E5%B7%B2%E7%9F%A5%E5%A6%82%E4%B8%8B%E4%BB%A3%E7%A0%81%E5%A6%82%E4%BD%95%E4%BF%AE%E6%94%B9%E6%89%8D%E8%83%BD%E8%AE%A9%E5%9B%BE%E7%89%87%E5%AE%BD%E5%BA%A6%E4%B8%BA-300px-%E6%B3%A8%E6%84%8F%E4%B8%8B%E9%9D%A2%E4%BB%A3%E7%A0%81%E4%B8%8D%E5%8F%AF%E4%BF%AE%E6%94%B9)
  - [第 61 题：介绍下如何实现 token 加密](#%E7%AC%AC-61-%E9%A2%98%E4%BB%8B%E7%BB%8D%E4%B8%8B%E5%A6%82%E4%BD%95%E5%AE%9E%E7%8E%B0-token-%E5%8A%A0%E5%AF%86)
  - [第 62 题：redux 为什么要把 reducer 设计成纯函数](#%E7%AC%AC-62-%E9%A2%98redux-%E4%B8%BA%E4%BB%80%E4%B9%88%E8%A6%81%E6%8A%8A-reducer-%E8%AE%BE%E8%AE%A1%E6%88%90%E7%BA%AF%E5%87%BD%E6%95%B0)
  - [第 63 题：如何设计实现无缝轮播](#%E7%AC%AC-63-%E9%A2%98%E5%A6%82%E4%BD%95%E8%AE%BE%E8%AE%A1%E5%AE%9E%E7%8E%B0%E6%97%A0%E7%BC%9D%E8%BD%AE%E6%92%AD)
  - [第 64 题：模拟实现一个 Promise.finally](#%E7%AC%AC-64-%E9%A2%98%E6%A8%A1%E6%8B%9F%E5%AE%9E%E7%8E%B0%E4%B8%80%E4%B8%AA-promisefinally)
  - [第 65 题： `a.b.c.d` 和 `a['b']['c']['d']`，哪个性能更高？](#%E7%AC%AC-65-%E9%A2%98-abcd-%E5%92%8C-abcd%E5%93%AA%E4%B8%AA%E6%80%A7%E8%83%BD%E6%9B%B4%E9%AB%98)
  - [第 66 题：ES6 代码转成 ES5 代码的实现思路是什么](#%E7%AC%AC-66-%E9%A2%98es6-%E4%BB%A3%E7%A0%81%E8%BD%AC%E6%88%90-es5-%E4%BB%A3%E7%A0%81%E7%9A%84%E5%AE%9E%E7%8E%B0%E6%80%9D%E8%B7%AF%E6%98%AF%E4%BB%80%E4%B9%88)
  - [第 67 题：数组编程题](#%E7%AC%AC-67-%E9%A2%98%E6%95%B0%E7%BB%84%E7%BC%96%E7%A8%8B%E9%A2%98)
  - [第 68 题： 如何解决移动端 Retina 屏 1px 像素问题](#%E7%AC%AC-68-%E9%A2%98-%E5%A6%82%E4%BD%95%E8%A7%A3%E5%86%B3%E7%A7%BB%E5%8A%A8%E7%AB%AF-retina-%E5%B1%8F-1px-%E5%83%8F%E7%B4%A0%E9%97%AE%E9%A2%98)
  - [第 69 题： 如何把一个字符串的大小写取反（大写变小写小写变大写），例如 ’AbC' 变成 'aBc' 。](#%E7%AC%AC-69-%E9%A2%98-%E5%A6%82%E4%BD%95%E6%8A%8A%E4%B8%80%E4%B8%AA%E5%AD%97%E7%AC%A6%E4%B8%B2%E7%9A%84%E5%A4%A7%E5%B0%8F%E5%86%99%E5%8F%96%E5%8F%8D%E5%A4%A7%E5%86%99%E5%8F%98%E5%B0%8F%E5%86%99%E5%B0%8F%E5%86%99%E5%8F%98%E5%A4%A7%E5%86%99%E4%BE%8B%E5%A6%82-abc-%E5%8F%98%E6%88%90-abc-)
  - [第 70 题： 介绍下 webpack 热更新原理，是如何做到在不刷新浏览器的前提下更新页面的](#%E7%AC%AC-70-%E9%A2%98-%E4%BB%8B%E7%BB%8D%E4%B8%8B-webpack-%E7%83%AD%E6%9B%B4%E6%96%B0%E5%8E%9F%E7%90%86%E6%98%AF%E5%A6%82%E4%BD%95%E5%81%9A%E5%88%B0%E5%9C%A8%E4%B8%8D%E5%88%B7%E6%96%B0%E6%B5%8F%E8%A7%88%E5%99%A8%E7%9A%84%E5%89%8D%E6%8F%90%E4%B8%8B%E6%9B%B4%E6%96%B0%E9%A1%B5%E9%9D%A2%E7%9A%84)
  - [第 71 题： 实现一个字符串匹配算法，从长度为 n 的字符串 S 中，查找是否存在字符串 T，T 的长度是 m，若存在返回所在位置。](#%E7%AC%AC-71-%E9%A2%98-%E5%AE%9E%E7%8E%B0%E4%B8%80%E4%B8%AA%E5%AD%97%E7%AC%A6%E4%B8%B2%E5%8C%B9%E9%85%8D%E7%AE%97%E6%B3%95%E4%BB%8E%E9%95%BF%E5%BA%A6%E4%B8%BA-n-%E7%9A%84%E5%AD%97%E7%AC%A6%E4%B8%B2-s-%E4%B8%AD%E6%9F%A5%E6%89%BE%E6%98%AF%E5%90%A6%E5%AD%98%E5%9C%A8%E5%AD%97%E7%AC%A6%E4%B8%B2-tt-%E7%9A%84%E9%95%BF%E5%BA%A6%E6%98%AF-m%E8%8B%A5%E5%AD%98%E5%9C%A8%E8%BF%94%E5%9B%9E%E6%89%80%E5%9C%A8%E4%BD%8D%E7%BD%AE)
  - [第 72 题： 为什么普通 `for` 循环的性能远远高于 `forEach` 的性能，请解释其中的原因。](#%E7%AC%AC-72-%E9%A2%98-%E4%B8%BA%E4%BB%80%E4%B9%88%E6%99%AE%E9%80%9A-for-%E5%BE%AA%E7%8E%AF%E7%9A%84%E6%80%A7%E8%83%BD%E8%BF%9C%E8%BF%9C%E9%AB%98%E4%BA%8E-foreach-%E7%9A%84%E6%80%A7%E8%83%BD%E8%AF%B7%E8%A7%A3%E9%87%8A%E5%85%B6%E4%B8%AD%E7%9A%84%E5%8E%9F%E5%9B%A0)
  - [第 73 题： 介绍下 BFC、IFC、GFC 和 FFC](#%E7%AC%AC-73-%E9%A2%98-%E4%BB%8B%E7%BB%8D%E4%B8%8B-bfcifcgfc-%E5%92%8C-ffc)
  - [第 74 题： 使用 JavaScript Proxy 实现简单的数据绑定](#%E7%AC%AC-74-%E9%A2%98-%E4%BD%BF%E7%94%A8-javascript-proxy-%E5%AE%9E%E7%8E%B0%E7%AE%80%E5%8D%95%E7%9A%84%E6%95%B0%E6%8D%AE%E7%BB%91%E5%AE%9A)
  - [第 75 题：数组里面有10万个数据，取第一个元素和第10万个元素的时间相差多少](#%E7%AC%AC-75-%E9%A2%98%E6%95%B0%E7%BB%84%E9%87%8C%E9%9D%A2%E6%9C%8910%E4%B8%87%E4%B8%AA%E6%95%B0%E6%8D%AE%E5%8F%96%E7%AC%AC%E4%B8%80%E4%B8%AA%E5%85%83%E7%B4%A0%E5%92%8C%E7%AC%AC10%E4%B8%87%E4%B8%AA%E5%85%83%E7%B4%A0%E7%9A%84%E6%97%B6%E9%97%B4%E7%9B%B8%E5%B7%AE%E5%A4%9A%E5%B0%91)
  - [第 76 题：输出以下代码运行结果](#%E7%AC%AC-76-%E9%A2%98%E8%BE%93%E5%87%BA%E4%BB%A5%E4%B8%8B%E4%BB%A3%E7%A0%81%E8%BF%90%E8%A1%8C%E7%BB%93%E6%9E%9C)
  - [第 77 题：算法题「旋转数组」](#%E7%AC%AC-77-%E9%A2%98%E7%AE%97%E6%B3%95%E9%A2%98%E6%97%8B%E8%BD%AC%E6%95%B0%E7%BB%84)
  - [第 78 题：Vue 的父组件和子组件生命周期钩子执行顺序是什么](#%E7%AC%AC-78-%E9%A2%98vue-%E7%9A%84%E7%88%B6%E7%BB%84%E4%BB%B6%E5%92%8C%E5%AD%90%E7%BB%84%E4%BB%B6%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F%E9%92%A9%E5%AD%90%E6%89%A7%E8%A1%8C%E9%A1%BA%E5%BA%8F%E6%98%AF%E4%BB%80%E4%B9%88)
  - [第 79 题：input 搜索如何防抖，如何处理中文输入](#%E7%AC%AC-79-%E9%A2%98input-%E6%90%9C%E7%B4%A2%E5%A6%82%E4%BD%95%E9%98%B2%E6%8A%96%E5%A6%82%E4%BD%95%E5%A4%84%E7%90%86%E4%B8%AD%E6%96%87%E8%BE%93%E5%85%A5)
  - [第 80 题：介绍下 Promise.all 使用、原理实现及错误处理](#%E7%AC%AC-80-%E9%A2%98%E4%BB%8B%E7%BB%8D%E4%B8%8B-promiseall-%E4%BD%BF%E7%94%A8%E5%8E%9F%E7%90%86%E5%AE%9E%E7%8E%B0%E5%8F%8A%E9%94%99%E8%AF%AF%E5%A4%84%E7%90%86)
  - [第 81 题：打印出 1 - 10000 之间的所有对称数](#%E7%AC%AC-81-%E9%A2%98%E6%89%93%E5%8D%B0%E5%87%BA-1---10000-%E4%B9%8B%E9%97%B4%E7%9A%84%E6%89%80%E6%9C%89%E5%AF%B9%E7%A7%B0%E6%95%B0)
  - [第 82 题：周一算法题之「移动零」](#%E7%AC%AC-82-%E9%A2%98%E5%91%A8%E4%B8%80%E7%AE%97%E6%B3%95%E9%A2%98%E4%B9%8B%E7%A7%BB%E5%8A%A8%E9%9B%B6)
  - [第 83 题：var、let 和 const 区别的实现原理是什么](#%E7%AC%AC-83-%E9%A2%98varlet-%E5%92%8C-const-%E5%8C%BA%E5%88%AB%E7%9A%84%E5%AE%9E%E7%8E%B0%E5%8E%9F%E7%90%86%E6%98%AF%E4%BB%80%E4%B9%88)
  - [第 84 题：请实现一个 add 函数，满足以下功能。](#%E7%AC%AC-84-%E9%A2%98%E8%AF%B7%E5%AE%9E%E7%8E%B0%E4%B8%80%E4%B8%AA-add-%E5%87%BD%E6%95%B0%E6%BB%A1%E8%B6%B3%E4%BB%A5%E4%B8%8B%E5%8A%9F%E8%83%BD)
  - [第 85 题：react-router 里的 `<Link>` 标签和 `<a>` 标签有什么区别](#%E7%AC%AC-85-%E9%A2%98react-router-%E9%87%8C%E7%9A%84-link-%E6%A0%87%E7%AD%BE%E5%92%8C-a-%E6%A0%87%E7%AD%BE%E6%9C%89%E4%BB%80%E4%B9%88%E5%8C%BA%E5%88%AB)
  - [第 86 题：周一算法题之「两数之和」](#%E7%AC%AC-86-%E9%A2%98%E5%91%A8%E4%B8%80%E7%AE%97%E6%B3%95%E9%A2%98%E4%B9%8B%E4%B8%A4%E6%95%B0%E4%B9%8B%E5%92%8C)
  - [第 87 题：在输入框中如何判断输入的是一个正确的网址。](#%E7%AC%AC-87-%E9%A2%98%E5%9C%A8%E8%BE%93%E5%85%A5%E6%A1%86%E4%B8%AD%E5%A6%82%E4%BD%95%E5%88%A4%E6%96%AD%E8%BE%93%E5%85%A5%E7%9A%84%E6%98%AF%E4%B8%80%E4%B8%AA%E6%AD%A3%E7%A1%AE%E7%9A%84%E7%BD%91%E5%9D%80)
  - [第 88 题：实现 convert 方法，把原始 list 转换成树形结构，要求尽可能降低时间复杂度](#%E7%AC%AC-88-%E9%A2%98%E5%AE%9E%E7%8E%B0-convert-%E6%96%B9%E6%B3%95%E6%8A%8A%E5%8E%9F%E5%A7%8B-list-%E8%BD%AC%E6%8D%A2%E6%88%90%E6%A0%91%E5%BD%A2%E7%BB%93%E6%9E%84%E8%A6%81%E6%B1%82%E5%B0%BD%E5%8F%AF%E8%83%BD%E9%99%8D%E4%BD%8E%E6%97%B6%E9%97%B4%E5%A4%8D%E6%9D%82%E5%BA%A6)
  - [第 89 题：设计并实现 Promise.race()](#%E7%AC%AC-89-%E9%A2%98%E8%AE%BE%E8%AE%A1%E5%B9%B6%E5%AE%9E%E7%8E%B0-promiserace)
  - [第 90 题：实现模糊搜索结果的关键词高亮显示](#%E7%AC%AC-90-%E9%A2%98%E5%AE%9E%E7%8E%B0%E6%A8%A1%E7%B3%8A%E6%90%9C%E7%B4%A2%E7%BB%93%E6%9E%9C%E7%9A%84%E5%85%B3%E9%94%AE%E8%AF%8D%E9%AB%98%E4%BA%AE%E6%98%BE%E7%A4%BA)
  - [第 91 题：介绍下 HTTPS 中间人攻击](#%E7%AC%AC-91-%E9%A2%98%E4%BB%8B%E7%BB%8D%E4%B8%8B-https-%E4%B8%AD%E9%97%B4%E4%BA%BA%E6%94%BB%E5%87%BB)
  - [第 92 题：已知数据格式，实现一个函数 fn 找出链条中所有的父级 id](#%E7%AC%AC-92-%E9%A2%98%E5%B7%B2%E7%9F%A5%E6%95%B0%E6%8D%AE%E6%A0%BC%E5%BC%8F%E5%AE%9E%E7%8E%B0%E4%B8%80%E4%B8%AA%E5%87%BD%E6%95%B0-fn-%E6%89%BE%E5%87%BA%E9%93%BE%E6%9D%A1%E4%B8%AD%E6%89%80%E6%9C%89%E7%9A%84%E7%88%B6%E7%BA%A7-id)
  - [第 93 题：给定两个大小为 m 和 n 的有序数组 nums1 和 nums2。请找出这两个有序数组的中位数。要求算法的时间复杂度为 O(log(m+n))。](#%E7%AC%AC-93-%E9%A2%98%E7%BB%99%E5%AE%9A%E4%B8%A4%E4%B8%AA%E5%A4%A7%E5%B0%8F%E4%B8%BA-m-%E5%92%8C-n-%E7%9A%84%E6%9C%89%E5%BA%8F%E6%95%B0%E7%BB%84-nums1-%E5%92%8C-nums2%E8%AF%B7%E6%89%BE%E5%87%BA%E8%BF%99%E4%B8%A4%E4%B8%AA%E6%9C%89%E5%BA%8F%E6%95%B0%E7%BB%84%E7%9A%84%E4%B8%AD%E4%BD%8D%E6%95%B0%E8%A6%81%E6%B1%82%E7%AE%97%E6%B3%95%E7%9A%84%E6%97%B6%E9%97%B4%E5%A4%8D%E6%9D%82%E5%BA%A6%E4%B8%BA-ologmn)
  - [第 94 题：vue 在 v-for 时给每项元素绑定事件需要用事件代理吗？为什么？](#%E7%AC%AC-94-%E9%A2%98vue-%E5%9C%A8-v-for-%E6%97%B6%E7%BB%99%E6%AF%8F%E9%A1%B9%E5%85%83%E7%B4%A0%E7%BB%91%E5%AE%9A%E4%BA%8B%E4%BB%B6%E9%9C%80%E8%A6%81%E7%94%A8%E4%BA%8B%E4%BB%B6%E4%BB%A3%E7%90%86%E5%90%97%E4%B8%BA%E4%BB%80%E4%B9%88)
  - [第 95 题：模拟实现一个深拷贝，并考虑对象相互引用以及 Symbol 拷贝的情况](#%E7%AC%AC-95-%E9%A2%98%E6%A8%A1%E6%8B%9F%E5%AE%9E%E7%8E%B0%E4%B8%80%E4%B8%AA%E6%B7%B1%E6%8B%B7%E8%B4%9D%E5%B9%B6%E8%80%83%E8%99%91%E5%AF%B9%E8%B1%A1%E7%9B%B8%E4%BA%92%E5%BC%95%E7%94%A8%E4%BB%A5%E5%8F%8A-symbol-%E6%8B%B7%E8%B4%9D%E7%9A%84%E6%83%85%E5%86%B5)
  - [第 96 题：介绍下前端加密的常见场景和方法](#%E7%AC%AC-96-%E9%A2%98%E4%BB%8B%E7%BB%8D%E4%B8%8B%E5%89%8D%E7%AB%AF%E5%8A%A0%E5%AF%86%E7%9A%84%E5%B8%B8%E8%A7%81%E5%9C%BA%E6%99%AF%E5%92%8C%E6%96%B9%E6%B3%95)
  - [第 97 题：React 和 Vue 的 diff 时间复杂度从 O(n^3) 优化到 O(n) ，那么 O(n^3) 和 O(n) 是如何计算出来的？](#%E7%AC%AC-97-%E9%A2%98react-%E5%92%8C-vue-%E7%9A%84-diff-%E6%97%B6%E9%97%B4%E5%A4%8D%E6%9D%82%E5%BA%A6%E4%BB%8E-on%5E3-%E4%BC%98%E5%8C%96%E5%88%B0-on-%E9%82%A3%E4%B9%88-on%5E3-%E5%92%8C-on-%E6%98%AF%E5%A6%82%E4%BD%95%E8%AE%A1%E7%AE%97%E5%87%BA%E6%9D%A5%E7%9A%84)
  - [第 98 题：写出如下代码的打印结果](#%E7%AC%AC-98-%E9%A2%98%E5%86%99%E5%87%BA%E5%A6%82%E4%B8%8B%E4%BB%A3%E7%A0%81%E7%9A%84%E6%89%93%E5%8D%B0%E7%BB%93%E6%9E%9C)
  - [第 99 题：编程算法题](#%E7%AC%AC-99-%E9%A2%98%E7%BC%96%E7%A8%8B%E7%AE%97%E6%B3%95%E9%A2%98)
  - [第 100 题：请写出如下代码的打印结果](#%E7%AC%AC-100-%E9%A2%98%E8%AF%B7%E5%86%99%E5%87%BA%E5%A6%82%E4%B8%8B%E4%BB%A3%E7%A0%81%E7%9A%84%E6%89%93%E5%8D%B0%E7%BB%93%E6%9E%9C)
  - [第 101 题：修改以下 print 函数，使之输出 0 到 99，或者 99 到 0](#%E7%AC%AC-101-%E9%A2%98%E4%BF%AE%E6%94%B9%E4%BB%A5%E4%B8%8B-print-%E5%87%BD%E6%95%B0%E4%BD%BF%E4%B9%8B%E8%BE%93%E5%87%BA-0-%E5%88%B0-99%E6%88%96%E8%80%85-99-%E5%88%B0-0)
  - [第 102 题：不用加减乘除运算符，求整数的7倍](#%E7%AC%AC-102-%E9%A2%98%E4%B8%8D%E7%94%A8%E5%8A%A0%E5%87%8F%E4%B9%98%E9%99%A4%E8%BF%90%E7%AE%97%E7%AC%A6%E6%B1%82%E6%95%B4%E6%95%B0%E7%9A%847%E5%80%8D)
  - [第 103 题：模拟实现一个 localStorage](#%E7%AC%AC-103-%E9%A2%98%E6%A8%A1%E6%8B%9F%E5%AE%9E%E7%8E%B0%E4%B8%80%E4%B8%AA-localstorage)
  - [第 104 题：模拟 localStorage 时如何实现过期时间功能](#%E7%AC%AC-104-%E9%A2%98%E6%A8%A1%E6%8B%9F-localstorage-%E6%97%B6%E5%A6%82%E4%BD%95%E5%AE%9E%E7%8E%B0%E8%BF%87%E6%9C%9F%E6%97%B6%E9%97%B4%E5%8A%9F%E8%83%BD)
  - [第 105 题：编程题](#%E7%AC%AC-105-%E9%A2%98%E7%BC%96%E7%A8%8B%E9%A2%98)
  - [第 106 题：分别写出如下代码的返回值](#%E7%AC%AC-106-%E9%A2%98%E5%88%86%E5%88%AB%E5%86%99%E5%87%BA%E5%A6%82%E4%B8%8B%E4%BB%A3%E7%A0%81%E7%9A%84%E8%BF%94%E5%9B%9E%E5%80%BC)
  - [第 107 题：考虑到性能问题，如何快速从一个巨大的数组中随机获取部分元素。](#%E7%AC%AC-107-%E9%A2%98%E8%80%83%E8%99%91%E5%88%B0%E6%80%A7%E8%83%BD%E9%97%AE%E9%A2%98%E5%A6%82%E4%BD%95%E5%BF%AB%E9%80%9F%E4%BB%8E%E4%B8%80%E4%B8%AA%E5%B7%A8%E5%A4%A7%E7%9A%84%E6%95%B0%E7%BB%84%E4%B8%AD%E9%9A%8F%E6%9C%BA%E8%8E%B7%E5%8F%96%E9%83%A8%E5%88%86%E5%85%83%E7%B4%A0)
  - [第 108 题：请写出如下代码的打印结果](#%E7%AC%AC-108-%E9%A2%98%E8%AF%B7%E5%86%99%E5%87%BA%E5%A6%82%E4%B8%8B%E4%BB%A3%E7%A0%81%E7%9A%84%E6%89%93%E5%8D%B0%E7%BB%93%E6%9E%9C)
  - [第 109 题：扩展题，请写出如下代码的打印结果](#%E7%AC%AC-109-%E9%A2%98%E6%89%A9%E5%B1%95%E9%A2%98%E8%AF%B7%E5%86%99%E5%87%BA%E5%A6%82%E4%B8%8B%E4%BB%A3%E7%A0%81%E7%9A%84%E6%89%93%E5%8D%B0%E7%BB%93%E6%9E%9C)
  - [第 110 题：编程题，请写一个函数，完成以下功能](#%E7%AC%AC-110-%E9%A2%98%E7%BC%96%E7%A8%8B%E9%A2%98%E8%AF%B7%E5%86%99%E4%B8%80%E4%B8%AA%E5%87%BD%E6%95%B0%E5%AE%8C%E6%88%90%E4%BB%A5%E4%B8%8B%E5%8A%9F%E8%83%BD)
  - [第 111 题：编程题，写个程序把 entry 转换成如下对象](#%E7%AC%AC-111-%E9%A2%98%E7%BC%96%E7%A8%8B%E9%A2%98%E5%86%99%E4%B8%AA%E7%A8%8B%E5%BA%8F%E6%8A%8A-entry-%E8%BD%AC%E6%8D%A2%E6%88%90%E5%A6%82%E4%B8%8B%E5%AF%B9%E8%B1%A1)
  - [第 112 题：编程题，写个程序把 entry 转换成如下对象（跟昨日题目相反）](#%E7%AC%AC-112-%E9%A2%98%E7%BC%96%E7%A8%8B%E9%A2%98%E5%86%99%E4%B8%AA%E7%A8%8B%E5%BA%8F%E6%8A%8A-entry-%E8%BD%AC%E6%8D%A2%E6%88%90%E5%A6%82%E4%B8%8B%E5%AF%B9%E8%B1%A1%E8%B7%9F%E6%98%A8%E6%97%A5%E9%A2%98%E7%9B%AE%E7%9B%B8%E5%8F%8D)
  - [第 113 题：编程题，根据以下要求，写一个数组去重函数（蘑菇街）](#%E7%AC%AC-113-%E9%A2%98%E7%BC%96%E7%A8%8B%E9%A2%98%E6%A0%B9%E6%8D%AE%E4%BB%A5%E4%B8%8B%E8%A6%81%E6%B1%82%E5%86%99%E4%B8%80%E4%B8%AA%E6%95%B0%E7%BB%84%E5%8E%BB%E9%87%8D%E5%87%BD%E6%95%B0%E8%98%91%E8%8F%87%E8%A1%97)
  - [第 114 题：编程题，找出字符串中连续出现最多的字符和个数（蘑菇街）](#%E7%AC%AC-114-%E9%A2%98%E7%BC%96%E7%A8%8B%E9%A2%98%E6%89%BE%E5%87%BA%E5%AD%97%E7%AC%A6%E4%B8%B2%E4%B8%AD%E8%BF%9E%E7%BB%AD%E5%87%BA%E7%8E%B0%E6%9C%80%E5%A4%9A%E7%9A%84%E5%AD%97%E7%AC%A6%E5%92%8C%E4%B8%AA%E6%95%B0%E8%98%91%E8%8F%87%E8%A1%97)
  - [第 115 题：写一个单向链数据结构的 js 实现并标注复杂度（水滴筹）](#%E7%AC%AC-115-%E9%A2%98%E5%86%99%E4%B8%80%E4%B8%AA%E5%8D%95%E5%90%91%E9%93%BE%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E7%9A%84-js-%E5%AE%9E%E7%8E%B0%E5%B9%B6%E6%A0%87%E6%B3%A8%E5%A4%8D%E6%9D%82%E5%BA%A6%E6%B0%B4%E6%BB%B4%E7%AD%B9)
  - [第 116 题：输出以下代码运行结果](#%E7%AC%AC-116-%E9%A2%98%E8%BE%93%E5%87%BA%E4%BB%A5%E4%B8%8B%E4%BB%A3%E7%A0%81%E8%BF%90%E8%A1%8C%E7%BB%93%E6%9E%9C)
  - [第 117 题：介绍下 http1.0、1.1、2.0 协议的区别？](#%E7%AC%AC-117-%E9%A2%98%E4%BB%8B%E7%BB%8D%E4%B8%8B-http101120-%E5%8D%8F%E8%AE%AE%E7%9A%84%E5%8C%BA%E5%88%AB)
  - [第 118 题：vue 渲染大量数据时应该怎么优化？](#%E7%AC%AC-118-%E9%A2%98vue-%E6%B8%B2%E6%9F%93%E5%A4%A7%E9%87%8F%E6%95%B0%E6%8D%AE%E6%97%B6%E5%BA%94%E8%AF%A5%E6%80%8E%E4%B9%88%E4%BC%98%E5%8C%96)
  - [第 119 题：vue 如何优化首页的加载速度？vue 首页白屏是什么问题引起的？如何解决呢？](#%E7%AC%AC-119-%E9%A2%98vue-%E5%A6%82%E4%BD%95%E4%BC%98%E5%8C%96%E9%A6%96%E9%A1%B5%E7%9A%84%E5%8A%A0%E8%BD%BD%E9%80%9F%E5%BA%A6vue-%E9%A6%96%E9%A1%B5%E7%99%BD%E5%B1%8F%E6%98%AF%E4%BB%80%E4%B9%88%E9%97%AE%E9%A2%98%E5%BC%95%E8%B5%B7%E7%9A%84%E5%A6%82%E4%BD%95%E8%A7%A3%E5%86%B3%E5%91%A2)
  - [第 120 题：为什么 for 循环嵌套顺序会影响性能？](#%E7%AC%AC-120-%E9%A2%98%E4%B8%BA%E4%BB%80%E4%B9%88-for-%E5%BE%AA%E7%8E%AF%E5%B5%8C%E5%A5%97%E9%A1%BA%E5%BA%8F%E4%BC%9A%E5%BD%B1%E5%93%8D%E6%80%A7%E8%83%BD)
  - [第 121 题：统计 1 ~ n 整数中出现 1 的次数。](#%E7%AC%AC-121-%E9%A2%98%E7%BB%9F%E8%AE%A1-1--n-%E6%95%B4%E6%95%B0%E4%B8%AD%E5%87%BA%E7%8E%B0-1-%E7%9A%84%E6%AC%A1%E6%95%B0)
  - [第 122 题：webpack 打包 vue 速度太慢怎么办？](#%E7%AC%AC-122-%E9%A2%98webpack-%E6%89%93%E5%8C%85-vue-%E9%80%9F%E5%BA%A6%E5%A4%AA%E6%85%A2%E6%80%8E%E4%B9%88%E5%8A%9E)
  - [第 123 题：vue 是如何对数组方法进行变异的？例如 push、pop、splice 等方法](#%E7%AC%AC-123-%E9%A2%98vue-%E6%98%AF%E5%A6%82%E4%BD%95%E5%AF%B9%E6%95%B0%E7%BB%84%E6%96%B9%E6%B3%95%E8%BF%9B%E8%A1%8C%E5%8F%98%E5%BC%82%E7%9A%84%E4%BE%8B%E5%A6%82-pushpopsplice-%E7%AD%89%E6%96%B9%E6%B3%95)
  - [第 124 题：永久性重定向（301）和临时性重定向（302）对 SEO 有什么影响](#%E7%AC%AC-124-%E9%A2%98%E6%B0%B8%E4%B9%85%E6%80%A7%E9%87%8D%E5%AE%9A%E5%90%91301%E5%92%8C%E4%B8%B4%E6%97%B6%E6%80%A7%E9%87%8D%E5%AE%9A%E5%90%91302%E5%AF%B9-seo-%E6%9C%89%E4%BB%80%E4%B9%88%E5%BD%B1%E5%93%8D)
  - [第 125 题：算法题](#%E7%AC%AC-125-%E9%A2%98%E7%AE%97%E6%B3%95%E9%A2%98)
  - [第 126 题：扑克牌问题](#%E7%AC%AC-126-%E9%A2%98%E6%89%91%E5%85%8B%E7%89%8C%E9%97%AE%E9%A2%98)
  - [第 127 题：如何用 css 或 js 实现多行文本溢出省略效果，考虑兼容性](#%E7%AC%AC-127-%E9%A2%98%E5%A6%82%E4%BD%95%E7%94%A8-css-%E6%88%96-js-%E5%AE%9E%E7%8E%B0%E5%A4%9A%E8%A1%8C%E6%96%87%E6%9C%AC%E6%BA%A2%E5%87%BA%E7%9C%81%E7%95%A5%E6%95%88%E6%9E%9C%E8%80%83%E8%99%91%E5%85%BC%E5%AE%B9%E6%80%A7)
  - [第 128 题：Http 状态码 301 和 302 的应用场景分别是什么](#%E7%AC%AC-128-%E9%A2%98http-%E7%8A%B6%E6%80%81%E7%A0%81-301-%E5%92%8C-302-%E7%9A%84%E5%BA%94%E7%94%A8%E5%9C%BA%E6%99%AF%E5%88%86%E5%88%AB%E6%98%AF%E4%BB%80%E4%B9%88)
  - [第 129 题：输出以下代码执行结果](#%E7%AC%AC-129-%E9%A2%98%E8%BE%93%E5%87%BA%E4%BB%A5%E4%B8%8B%E4%BB%A3%E7%A0%81%E6%89%A7%E8%A1%8C%E7%BB%93%E6%9E%9C)
  - [第 130 题：输出以下代码执行结果，大致时间就好（不同于上题）](#%E7%AC%AC-130-%E9%A2%98%E8%BE%93%E5%87%BA%E4%BB%A5%E4%B8%8B%E4%BB%A3%E7%A0%81%E6%89%A7%E8%A1%8C%E7%BB%93%E6%9E%9C%E5%A4%A7%E8%87%B4%E6%97%B6%E9%97%B4%E5%B0%B1%E5%A5%BD%E4%B8%8D%E5%90%8C%E4%BA%8E%E4%B8%8A%E9%A2%98)
  - [第 131 题：接口如何防刷](#%E7%AC%AC-131-%E9%A2%98%E6%8E%A5%E5%8F%A3%E5%A6%82%E4%BD%95%E9%98%B2%E5%88%B7)
  - [第 132 题：实现一个 Dialog 类，Dialog可以创建 dialog 对话框，对话框支持可拖拽（腾讯）](#%E7%AC%AC-132-%E9%A2%98%E5%AE%9E%E7%8E%B0%E4%B8%80%E4%B8%AA-dialog-%E7%B1%BBdialog%E5%8F%AF%E4%BB%A5%E5%88%9B%E5%BB%BA-dialog-%E5%AF%B9%E8%AF%9D%E6%A1%86%E5%AF%B9%E8%AF%9D%E6%A1%86%E6%94%AF%E6%8C%81%E5%8F%AF%E6%8B%96%E6%8B%BD%E8%85%BE%E8%AE%AF)
  - [第 133 题：用 setTimeout 实现 setInterval，阐述实现的效果与 setInterval 的差异](#%E7%AC%AC-133-%E9%A2%98%E7%94%A8-settimeout-%E5%AE%9E%E7%8E%B0-setinterval%E9%98%90%E8%BF%B0%E5%AE%9E%E7%8E%B0%E7%9A%84%E6%95%88%E6%9E%9C%E4%B8%8E-setinterval-%E7%9A%84%E5%B7%AE%E5%BC%82)
  - [第 134 题：求两个日期中间的有效日期](#%E7%AC%AC-134-%E9%A2%98%E6%B1%82%E4%B8%A4%E4%B8%AA%E6%97%A5%E6%9C%9F%E4%B8%AD%E9%97%B4%E7%9A%84%E6%9C%89%E6%95%88%E6%97%A5%E6%9C%9F)
  - [第 135 题：算法题（盛大）](#%E7%AC%AC-135-%E9%A2%98%E7%AE%97%E6%B3%95%E9%A2%98%E7%9B%9B%E5%A4%A7)
  - [第 136 题：如何实现骨架屏，说说你的思路](#%E7%AC%AC-136-%E9%A2%98%E5%A6%82%E4%BD%95%E5%AE%9E%E7%8E%B0%E9%AA%A8%E6%9E%B6%E5%B1%8F%E8%AF%B4%E8%AF%B4%E4%BD%A0%E7%9A%84%E6%80%9D%E8%B7%AF)
<!-- END doctoc generated TOC please keep comment here to allow auto update -->
## 前端面试题及答案汇总
### 第 1 题：写 React / Vue 项目时为什么要在列表组件中写 key，其作用是什么？
公司：滴滴、饿了么
解析：[第 1 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/1)
<br/>
### 第 2 题：`['1', '2', '3'].map(parseInt)` what & why ?
解析：[第 2 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/4)
<br/>
### 第 3 题：什么是防抖和节流？有什么区别？如何实现？
公司：挖财
解析：[第 3 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/5)
<br/>
### 第 4 题：介绍下 Set、Map、WeakSet 和 WeakMap 的区别？
解析：[第 4 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/6)
<br/>
### 第 5 题：介绍下深度优先遍历和广度优先遍历，如何实现？
解析：[第 5 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/9)
<br/>
### 第 6 题：请分别用深度优先思想和广度优先思想实现一个拷贝函数？
解析：[第 6 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/10)
<br/>
### 第 7 题：ES5/ES6 的继承除了写法以外还有什么区别？
解析：[第 7 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/20)
<br/>
### 第 8 题：setTimeout、Promise、Async/Await 的区别
解析：[第 8 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/33)
<br/>
### 第 9 题：Async/Await 如何通过同步的方式实现异步
公司：头条、微医
解析：[第 9 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/156)
<br/>
### 第 10 题：异步笔试题
> 请写出下面代码的运行结果
```js
async function async1() {
    console.log('async1 start');
    await async2();
    console.log('async1 end');
}
async function async2() {
    console.log('async2');
}
console.log('script start');
setTimeout(function() {
    console.log('setTimeout');
}, 0)
async1();
new Promise(function(resolve) {
    console.log('promise1');
    resolve();
}).then(function() {
    console.log('promise2');
});
console.log('script end');
```
解析：[第 10 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/7)
公司：头条
<br/>
### 第 11 题：算法手写题
> 已知如下数组：
>
> var arr = [ [1, 2, 2], [3, 4, 5, 5], [6, 7, 8, 9, [11, 12, [12, 13, [14] ] ] ], 10];
>
> 编写一个程序将数组扁平化去并除其中重复部分数据，最终得到一个升序且不重复的数组
公司：携程
解析：[第 11 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/8)
<br/>
### 第 12 题：JS 异步解决方案的发展历程以及优缺点。
公司：滴滴、挖财、微医、海康
解析：[第 12 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/11)
<br/>
### 第 13 题：Promise 构造函数是同步执行还是异步执行，那么 then 方法呢？
公司：微医
解析：[第 13 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/19)
<br/>
### 第 14 题：情人节福利题，如何实现一个 new
公司：兑吧
解析：[第 14 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/12)
<br/>
### 第 15 题：简单讲解一下http2的多路复用
公司：网易
解析：[第 15 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/14)
<br/>
### 第 16 题：谈谈你对TCP三次握手和四次挥手的理解
解析：[第 16 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/15)
<br/>
### 第 17 题：A、B 机器正常连接后，B 机器突然重启，问 A 此时处于 TCP 什么状态
> 如果A 与 B 建立了正常连接后，从未相互发过数据，这个时候 B 突然机器重启，问 A 此时处于 TCP 什么状态？如何消除服务器程序中的这个状态？（超纲题，了解即可）
解析：[第 17 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/21)
<br/>
### 第 18 题：React 中 setState 什么时候是同步的，什么时候是异步的？
公司：微医
解析：[第 18 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/17)
<br/>
### 第 19 题：React setState 笔试题，下面的代码输出什么？
```js
class Example extends React.Component {
  constructor() {
    super();
    this.state = {
      val: 0
    };
  }
  
  componentDidMount() {
    this.setState({val: this.state.val + 1});
    console.log(this.state.val);    // 第 1 次 log

    this.setState({val: this.state.val + 1});
    console.log(this.state.val);    // 第 2 次 log

    setTimeout(() => {
      this.setState({val: this.state.val + 1});
      console.log(this.state.val);  // 第 3 次 log

      this.setState({val: this.state.val + 1});
      console.log(this.state.val);  // 第 4 次 log
    }, 0);
  }

  render() {
    return null;
  }
};
```
解析：[第 19 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/18)
<br/>
### 第 20 题：介绍下 npm 模块安装机制，为什么输入 npm install 就可以自动安装对应的模块？
解析：[第 20 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/22)
<br/>
### 第 21 题：有以下 3 个判断数组的方法，请分别介绍它们之间的区别和优劣
> Object.prototype.toString.call() 、 instanceof 以及 Array.isArray() 
解析：[第 21 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/23)
<br/>
### 第 22 题：介绍下重绘和回流（Repaint & Reflow），以及如何进行优化
解析：[第 22 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/24)
<br/>
### 第 23 题：介绍下观察者模式和订阅-发布模式的区别，各自适用于什么场景
解析：[第 23 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/25)
<br/>
### 第 24 题：聊聊 Redux 和 Vuex 的设计思想
解析：[第 24 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/45)
<br/>
### 第 25 题：说说浏览器和 Node 事件循环的区别
解析：[第 25 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/26)
<br/> 
### 第 26 题：介绍模块化发展历程
可从IIFE、AMD、CMD、CommonJS、UMD、webpack(require.ensure)、ES Module、`<script type="module">` 这几个角度考虑。
解析：[第 26 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/28)
<br/>
### 第 27 题：全局作用域中，用 const 和 let 声明的变量不在 window 上，那到底在哪里？如何去获取？。
解析：[第 27 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/30)
<br/>
### 第 28 题：cookie 和 token 都存放在 header 中，为什么不会劫持 token？
解析：[第 28 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/31)
<br/>
### 第 29 题：聊聊 Vue 的双向数据绑定，Model 如何改变 View，View 又是如何改变 Model 的
解析：[第 29 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/34)
<br/>
### 第 30 题：两个数组合并成一个数组
请把两个数组 ['A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'D1', 'D2'] 和 ['A', 'B', 'C', 'D']，合并为 ['A1', 'A2', 'A', 'B1', 'B2', 'B', 'C1', 'C2', 'C', 'D1', 'D2', 'D']。
解析： [第 30 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/39)
<br/>
### 第 31 题：改造下面的代码，使之输出0 - 9，写出你能想到的所有解法。
```js
for (var i = 0; i< 10; i++){
	setTimeout(() => {
		console.log(i);
    }, 1000)
}
```
解析：[第 31 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/43)
<br/>
### 第 32 题：Virtual DOM 真的比操作原生 DOM 快吗？谈谈你的想法。
解析：[第 32 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/47)
<br/>
### 第 33 题：下面的代码打印什么内容，为什么？
```js
var b = 10;
(function b(){
    b = 20;
    console.log(b); 
})();
```
解析：[第 33 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/48)
<br/>
### 第 34 题：简单改造下面的代码，使之分别打印 10 和 20。
```js
var b = 10;
(function b(){
    b = 20;
    console.log(b); 
})();
```
解析：[第 34 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/51)
<br/>
### 第 35 题：浏览器缓存读取规则
可以分成 Service Worker、Memory Cache、Disk Cache 和 Push Cache，那请求的时候 from memory cache 和 from disk cache 的依据是什么，哪些数据什么时候存放在 Memory Cache 和 Disk Cache中？
解析：[第 35 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/53)
<br/>
### 第 36 题：使用迭代的方式实现 flatten 函数。
解析：[第 36 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/54)
<br/>
### 第 37 题：为什么 Vuex 的 mutation 和 Redux 的 reducer 中不能做异步操作？
解析：[第 37 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/65)
<br/>
### 第 38 题：下面代码中 a 在什么情况下会打印 1？
```js
var a = ?;
if(a == 1 && a == 2 && a == 3){
 	console.log(1);
}
```
解析：[第 38 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/57)
公司：京东
<br/>
### 第 39 题：介绍下 BFC 及其应用。
解析：[第 39 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/59)
<br/>
### 第 40 题：在 Vue 中，子组件为何不可以修改父组件传递的 Prop
如果修改了，Vue 是如何监控到属性的修改并给出警告的。
解析：[第 40 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/60)
<br/>
### 第 41 题：下面代码输出什么
```js
var a = 10;
(function () {
    console.log(a)
    a = 5
    console.log(window.a)
    var a = 20;
    console.log(a)
})()
```
解析：[第 41题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/61)
<br/>
### 第 42 题：实现一个 sleep 函数
比如 sleep(1000) 意味着等待1000毫秒，可从 Promise、Generator、Async/Await 等角度实现
解析：[第 42 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/63)
<br/>
### 第 43 题：使用 sort() 对数组 [3, 15, 8, 29, 102, 22] 进行排序，输出结果
解析：[第 43 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/66)
<br/>
### 第 44 题：介绍 HTTPS 握手过程
解析：[第 44 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/70)
<br/>
### 第 45 题：HTTPS 握手过程中，客户端如何验证证书的合法性
解析：[第 45 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/74)
<br/>
### 第 46 题：输出以下代码执行的结果并解释为什么
```js
var obj = {
    '2': 3,
    '3': 4,
    'length': 2,
    'splice': Array.prototype.splice,
    'push': Array.prototype.push
}
obj.push(1)
obj.push(2)
console.log(obj)
```
解析：[第 46 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/76)
<br/>
### 第 47 题：双向绑定和 vuex 是否冲突
解析：[第 47 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/81)
<br/>
### 第 48 题：call 和 apply 的区别是什么，哪个性能更好一些
解析：[第 48 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/84)
<br/>
### 第 49 题：为什么通常在发送数据埋点请求的时候使用的是 1x1 像素的透明 gif 图片？
解析：[第 49 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/87)
<br/>
### 第 50 题：实现 (5).add(3).minus(2) 功能。
> 例： 5 + 3 - 2，结果为 6
解析：[第 50 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/88)
公司：百度
<br/>
### 第 51 题：Vue 的响应式原理中 Object.defineProperty 有什么缺陷？
为什么在 Vue3.0 采用了 Proxy，抛弃了 Object.defineProperty？
解析：[第 51 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/90)
<br/>
### 第 52 题：怎么让一个 div 水平垂直居中
解析：[第 52 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/92)
<br/>
### 第 53 题：输出以下代码的执行结果并解释为什么
```js
var a = {n: 1};
var b = a;
a.x = a = {n: 2};

console.log(a.x) 	
console.log(b.x)
```
解析：[第 53 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/93)
<br/>
### 第 54 题：冒泡排序如何实现，时间复杂度是多少， 还可以如何改进？
解析：[第 54 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/94)
<br/>
### 第 55 题：某公司 1 到 12 月份的销售额存在一个对象里面
如下：{1:222, 2:123, 5:888}，请把数据处理为如下结构：[222, 123, null, null, 888, null, null, null, null, null, null, null]。
解析：[第 55 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/96)
<br/>
### 第 56 题：要求设计 LazyMan 类，实现以下功能。 
```js
LazyMan('Tony');
// Hi I am Tony

LazyMan('Tony').sleep(10).eat('lunch');
// Hi I am Tony
// 等待了10秒...
// I am eating lunch

LazyMan('Tony').eat('lunch').sleep(10).eat('dinner');
// Hi I am Tony
// I am eating lunch
// 等待了10秒...
// I am eating diner

LazyMan('Tony').eat('lunch').eat('dinner').sleepFirst(5).sleep(10).eat('junk food');
// Hi I am Tony
// 等待了5秒...
// I am eating lunch
// I am eating dinner
// 等待了10秒...
// I am eating junk food
```
解析：[第 56 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/98)
<br/>
### 第 57 题：分析比较 opacity: 0、visibility: hidden、display: none 优劣和适用场景。 
解析：[第 57 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/100)
<br/>
### 第 58 题：箭头函数与普通函数（function）的区别是什么？构造函数（function）可以使用 new 生成实例，那么箭头函数可以吗？为什么？
解析：[第 58 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/101)
<br/>
### 第 59 题：给定两个数组，写一个方法来计算它们的交集。
> 例如：给定 nums1 = [1, 2, 2, 1]，nums2 = [2, 2]，返回 [2, 2]。
解析：[第 59 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/102)
<br/>
### 第 60 题：已知如下代码，如何修改才能让图片宽度为 300px ？注意下面代码不可修改。
> `<img src="1.jpg" style="width:480px!important;”>`
解析：[第 60 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/105)
<br/>
### 第 61 题：介绍下如何实现 token 加密
解析：[第 61 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/106)
<br/>
### 第 62 题：redux 为什么要把 reducer 设计成纯函数
解析：[第 62 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/107)
<br/>
### 第 63 题：如何设计实现无缝轮播
解析：[第 63 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/108)
<br/>
### 第 64 题：模拟实现一个 Promise.finally
解析：[第 64 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/109)
<br/>
### 第 65 题： `a.b.c.d` 和 `a['b']['c']['d']`，哪个性能更高？
解析：[第 65 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/111)
<br/>
### 第 66 题：ES6 代码转成 ES5 代码的实现思路是什么
解析：[第 66 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/112)
<br/>
### 第 67 题：数组编程题
随机生成一个长度为 10 的整数类型的数组，例如 `[2, 10, 3, 4, 5, 11, 10, 11, 20]`，将其排列成一个新数组，要求新数组形式如下，例如 `[[2, 3, 4, 5], [10, 11], [20]]`。
解析：[第 67 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/113)
<br/>
### 第 68 题： 如何解决移动端 Retina 屏 1px 像素问题
解析：[第 68 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/115)
<br/>
### 第 69 题： 如何把一个字符串的大小写取反（大写变小写小写变大写），例如 ’AbC' 变成 'aBc' 。
解析：[第 69 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/116)
<br/>
### 第 70 题： 介绍下 webpack 热更新原理，是如何做到在不刷新浏览器的前提下更新页面的
解析：[第 70 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/118)
<br/>
### 第 71 题： 实现一个字符串匹配算法，从长度为 n 的字符串 S 中，查找是否存在字符串 T，T 的长度是 m，若存在返回所在位置。
解析：[第 71 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/119)
<br/>
### 第 72 题： 为什么普通 `for` 循环的性能远远高于 `forEach` 的性能，请解释其中的原因。
![image-20190512225510941](https://ws2.sinaimg.cn/large/006tNc79gy1g2yxbg4ta8j31gh0u048h.jpg)
解析：[第 72 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/121)
<br/>
### 第 73 题： 介绍下 BFC、IFC、GFC 和 FFC
解析：[第 73 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/122)
<br/>
### 第 74 题： 使用 JavaScript Proxy 实现简单的数据绑定
解析：[第 74 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/123)
<br/>
### 第 75 题：数组里面有10万个数据，取第一个元素和第10万个元素的时间相差多少
解析：[第 75 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/124)
<br/>
### 第 76 题：输出以下代码运行结果
```js
// example 1
var a={}, b='123', c=123;  
a[b]='b';
a[c]='c';  
console.log(a[b]);
---------------------
// example 2
var a={}, b=Symbol('123'), c=Symbol('123');  
a[b]='b';
a[c]='c';  
console.log(a[b]);
---------------------
// example 3
var a={}, b={key:'123'}, c={key:'456'};  
a[b]='b';
a[c]='c';  
console.log(a[b]);
```
解析：[第 76 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/125)
<br/>
### 第 77 题：算法题「旋转数组」
> 给定一个数组，将数组中的元素向右移动 k 个位置，其中 k 是非负数。
示例 1：
```js
输入: [1, 2, 3, 4, 5, 6, 7] 和 k = 3
输出: [5, 6, 7, 1, 2, 3, 4]
解释:
向右旋转 1 步: [7, 1, 2, 3, 4, 5, 6]
向右旋转 2 步: [6, 7, 1, 2, 3, 4, 5]
向右旋转 3 步: [5, 6, 7, 1, 2, 3, 4]
```
示例 2：
```js
输入: [-1, -100, 3, 99] 和 k = 2
输出: [3, 99, -1, -100]
解释: 
向右旋转 1 步: [99, -1, -100, 3]
向右旋转 2 步: [3, 99, -1, -100]
```
解析：[第 77 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/126)
<br/>
### 第 78 题：Vue 的父组件和子组件生命周期钩子执行顺序是什么
解析：[第 78 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/128)
<br/>
### 第 79 题：input 搜索如何防抖，如何处理中文输入
解析：[第 79 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/129)
<br/>
### 第 80 题：介绍下 Promise.all 使用、原理实现及错误处理
解析：[第 80 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/130)
<br/>
### 第 81 题：打印出 1 - 10000 之间的所有对称数
> 例如：121、1331 等
解析：[第 81 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/131)
<br/>
### 第 82 题：周一算法题之「移动零」
> 给定一个数组 nums，编写一个函数将所有 0 移动到数组的末尾，同时保持非零元素的相对顺序。
>
> 示例:
>
> ```
> 输入: [0,1,0,3,12]
> 输出: [1,3,12,0,0]
> ```
>
> 说明:
>
> 1. 必须在原数组上操作，不能拷贝额外的数组。
>
> 1. 尽量减少操作次数。
解析：[第 82 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/132)
<br/>
### 第 83 题：var、let 和 const 区别的实现原理是什么
解析：[第 83 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/133)
<br/>
### 第 84 题：请实现一个 add 函数，满足以下功能。
> ```js
> add(1); 			// 1
> add(1)(2);  	// 3
> add(1)(2)(3)；// 6
> add(1)(2, 3); // 6
> add(1, 2)(3); // 6
> add(1, 2, 3); // 6
> ```
解析：[第 84 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/134)
<br/>
### 第 85 题：react-router 里的 `<Link>` 标签和 `<a>` 标签有什么区别
> 如何禁掉 `<a>` 标签默认事件，禁掉之后如何实现跳转。
解析：[第 85 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/135)
<br/>
### 第 86 题：周一算法题之「两数之和」
给定一个整数数组和一个目标值，找出数组中和为目标值的两个数。
你可以假设每个输入只对应一种答案，且同样的元素不能被重复利用。
示例：
```js
给定 nums = [2, 7, 11, 15], target = 9
因为 nums[0] + nums[1] = 2 + 7 = 9
所以返回 [0, 1]
```
解析：[第 86 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/136)
公司：京东、快手
<br/>
### 第 87 题：在输入框中如何判断输入的是一个正确的网址。
解析：[第 87 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/138)
<br/>
### 第 88 题：实现 convert 方法，把原始 list 转换成树形结构，要求尽可能降低时间复杂度
以下数据结构中，id 代表部门编号，name 是部门名称，parentId 是父部门编号，为 0 代表一级部门，现在要求实现一个 convert 方法，把原始 list 转换成树形结构，parentId 为多少就挂载在该 id 的属性 children 数组下，结构如下：
```js
// 原始 list 如下
let list =[
    {id:1,name:'部门A',parentId:0},
    {id:2,name:'部门B',parentId:0},
    {id:3,name:'部门C',parentId:1},
    {id:4,name:'部门D',parentId:1},
    {id:5,name:'部门E',parentId:2},
    {id:6,name:'部门F',parentId:3},
    {id:7,name:'部门G',parentId:2},
    {id:8,name:'部门H',parentId:4}
];
const result = convert(list, ...);
// 转换后的结果如下
let result = [
    {
      id: 1,
      name: '部门A',
      parentId: 0,
      children: [
        {
          id: 3,
          name: '部门C',
          parentId: 1,
          children: [
            {
              id: 6,
              name: '部门F',
              parentId: 3
            }, {
              id: 16,
              name: '部门L',
              parentId: 3
            }
          ]
        },
        {
          id: 4,
          name: '部门D',
          parentId: 1,
          children: [
            {
              id: 8,
              name: '部门H',
              parentId: 4
            }
          ]
        }
      ]
    },
  ···
];
```
解析：[第 88 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/139)
<br/>
### 第 89 题：设计并实现 Promise.race()
解析：[第 89 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/140)
<br/>
### 第 90 题：实现模糊搜索结果的关键词高亮显示
<img src="https://ws3.sinaimg.cn/large/006tNc79ly1g43dykaccuj30u01hc49s.jpg" height="800"/>

解析：[第 90 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/141)

<br/>



### 第 91 题：介绍下 HTTPS 中间人攻击

解析：[第 91 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/142)

<br/>



### 第 92 题：已知数据格式，实现一个函数 fn 找出链条中所有的父级 id

> ```js
> const value = '112'
> const fn = (value) => {
> ...
> }
> fn(value) // 输出 [1， 11， 112]
> ```



<img src="https://ws1.sinaimg.cn/large/006tNc79gy1g45a04ntttj30k20wen01.jpg" height="800"/>



解析：[第 92 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/143)

<br/>



### 第 93 题：给定两个大小为 m 和 n 的有序数组 nums1 和 nums2。请找出这两个有序数组的中位数。要求算法的时间复杂度为 O(log(m+n))。

示例 1：

```js
nums1 = [1, 3]
nums2 = [2]
```

中位数是 2.0

示例 2：

```js
nums1 = [1, 2]
nums2 = [3, 4]
```

中位数是(2 + 3) / 2 = 2.5

解析：[第 93 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/144)

<br/>



### 第 94 题：vue 在 v-for 时给每项元素绑定事件需要用事件代理吗？为什么？

解析：[第 94 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/145)

<br/>



### 第 95 题：模拟实现一个深拷贝，并考虑对象相互引用以及 Symbol 拷贝的情况

解析：[第 95 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/148)

<br/>



### 第 96 题：介绍下前端加密的常见场景和方法

解析：[第 96 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/150)

<br/>



### 第 97 题：React 和 Vue 的 diff 时间复杂度从 O(n^3) 优化到 O(n) ，那么 O(n^3) 和 O(n) 是如何计算出来的？

解析：[第 97 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/151)

<br/>



### 第 98 题：写出如下代码的打印结果

```js
function changeObjProperty(o) {
  o.siteUrl = "http://www.baidu.com"
  o = new Object()
  o.siteUrl = "http://www.google.com"
} 
let webSite = new Object();
changeObjProperty(webSite);
console.log(webSite.siteUrl);
```

公司：京东

解析：[第 98 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/152)

<br/>



### 第 99 题：编程算法题

> 用 JavaScript 写一个函数，输入 int 型，返回整数逆序后的字符串。如：输入整型 1234，返回字符串“4321”。要求必须使用递归函数调用，不能用全局变量，输入函数必须只有一个参数传入，必须返回字符串。

公司：bilibili

解析：[第 99 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/153)

<br/>



### 第 100 题：请写出如下代码的打印结果

> ```js
> function Foo() {
> Foo.a = function() {
>   console.log(1)
> }
> this.a = function() {
>   console.log(2)
> }
> }
> Foo.prototype.a = function() {
> console.log(3)
> }
> Foo.a = function() {
> console.log(4)
> }
> Foo.a();
> let obj = new Foo();
> obj.a();
> Foo.a();
> ```



公司：京东

解析：[第 100 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/155)

<br/>



### 第 101 题：修改以下 print 函数，使之输出 0 到 99，或者 99 到 0

> 要求：
>
> 1、只能修改 `setTimeout` 到 `Math.floor(Math.random() * 1000` 的代码
>
> 2、不能修改 `Math.floor(Math.random() * 1000`
>
> 3、不能使用全局变量
>
> ```js
> function print(n){
> setTimeout(() => {
>  console.log(n);
> }, Math.floor(Math.random() * 1000));
> }
> for(var i = 0; i < 100; i++){
> print(i);
> }
> ```



公司：头条

解析：[第 101 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/158)

<br/>



### 第 102 题：不用加减乘除运算符，求整数的7倍

解析：[第 102 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/161)

<br/>



### 第 103 题：模拟实现一个 localStorage

公司：阿里

解析：[第 103 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/166)

<br/>



### 第 104 题：模拟 localStorage 时如何实现过期时间功能

公司：阿里

解析：[第 104 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/171)

<br/>



### 第 105 题：编程题

> url有三种情况
>
> ```js
> https://www.xx.cn/api?keyword=&level1=&local_batch_id=&elective=&local_province_id=33
> https://www.xx.cn/api?keyword=&level1=&local_batch_id=&elective=800&local_province_id=33
> https://www.xx.cn/api?keyword=&level1=&local_batch_id=&elective=800,700&local_province_id=33
> ```
>
> 匹配elective后的数字输出（写出你认为的最优解法）:
>
> ```js
> [] || ['800'] || ['800','700']
> ```



解析：[第 105 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/177)

<br/>



### 第 106 题：分别写出如下代码的返回值

> ```js
> String('11') == new String('11');
> String('11') === new String('11');
> ```



公司：京东

解析：[第 106 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/180)

<br/>



### 第 107 题：考虑到性能问题，如何快速从一个巨大的数组中随机获取部分元素。

> 比如有个数组有100K个元素，从中不重复随机选取10K个元素。



解析：[第 107 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/187)

<br/>



### 第 108 题：请写出如下代码的打印结果

> ```js
> var name = 'Tom';
> (function() {
>  if (typeof name == 'undefined') {
>      var name = 'Jack';
>      console.log('Goodbye ' + name);
>  } else {
>      console.log('Hello ' + name);
>  }
> })();
> ```



公司：京东

解析：[第 108 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/190)

<br/>



### 第 109 题：扩展题，请写出如下代码的打印结果

> ```js
> var name = 'Tom';
> (function() {
>  if (typeof name == 'undefined') {
>      name = 'Jack';
>      console.log('Goodbye ' + name);
>  } else {
>      console.log('Hello ' + name);
>  }
> })();
> ```



公司：京东

解析：[第 109 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/198)

<br/>



### 第 110 题：编程题，请写一个函数，完成以下功能

> 输入
> ``'1, 2, 3, 5, 7, 8, 10'``
> 输出
> ``'1~3, 5, 7~8, 10'``



解析：[第 110 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/201)

<br/>



### 第 111 题：编程题，写个程序把 entry 转换成如下对象

> ```js
> var entry = {
> a: {
> b: {
>   c: {
>     dd: 'abcdd'
>   }
> },
> d: {
>   xx: 'adxx'
> },
> e: 'ae'
> }
> }
> 
> // 要求转换成如下对象
> var output = {
> 'a.b.c.dd': 'abcdd',
> 'a.d.xx': 'adxx',
> 'a.e': 'ae'
> }
> ```



解析：[第 111 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/206)

<br/>



### 第 112 题：编程题，写个程序把 entry 转换成如下对象（跟昨日题目相反）

> ```js
> var entry = {
> 'a.b.c.dd': 'abcdd',
> 'a.d.xx': 'adxx',
> 'a.e': 'ae'
> }
> 
> // 要求转换成如下对象
> var output = {
> a: {
> b: {
>   c: {
>     dd: 'abcdd'
>   }
> },
> d: {
>   xx: 'adxx'
> },
> e: 'ae'
> }
> }
> ```



解析：[第 112 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/212)

<br/>



### 第 113 题：编程题，根据以下要求，写一个数组去重函数（蘑菇街）

> 1. 如传入的数组元素为`[123, "meili", "123", "mogu", 123]`，则输出：`[123, "meili", "123", "mogu"]`
> 2. 如传入的数组元素为`[123, [1, 2, 3], [1, "2", 3], [1, 2, 3], "meili"]`，则输出：`[123, [1, 2, 3], [1, "2", 3], "meili"]`
> 3. 如传入的数组元素为`[123, {a: 1}, {a: {b: 1}}, {a: "1"}, {a: {b: 1}}, "meili"]`，则输出：`[123, {a: 1}, {a: {b: 1}}, {a: "1"}, "meili"]`



解析：[第 113 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/215)

<br/>



### 第 114 题：编程题，找出字符串中连续出现最多的字符和个数（蘑菇街）

> ```js
> 'abcaakjbb' => {'a':2,'b':2}
> 'abbkejsbcccwqaa' => {'c':3}
> ```



解析：[第 114 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/220)

<br/>



### 第 115 题：写一个单向链数据结构的 js 实现并标注复杂度（水滴筹）



解析：[第 115 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/226)

<br/>



### 第 116 题：输出以下代码运行结果

> ```js
> 1 + "1"
> 
> 2 * "2"
> 
> [1, 2] + [2, 1]
> 
> "a" + + "b"
> ```



解析：[第 116 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/229)

<br/>



### 第 117 题：介绍下 http1.0、1.1、2.0 协议的区别？



解析：[第 117 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/232)

<br/>



### 第 118 题：vue 渲染大量数据时应该怎么优化？



解析：[第 118 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/233)

<br/>



### 第 119 题：vue 如何优化首页的加载速度？vue 首页白屏是什么问题引起的？如何解决呢？



解析：[第 119 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/234)

<br/>



### 第 120 题：为什么 for 循环嵌套顺序会影响性能？

```js
var t1 = new Date().getTime()
for (let i = 0; i < 100; i++) {
  for (let j = 0; j < 1000; j++) {
    for (let k = 0; k < 10000; k++) {
    }
  }
}
var t2 = new Date().getTime()
console.log('first time', t2 - t1)
for (let i = 0; i < 10000; i++) {
  for (let j = 0; j < 1000; j++) {
    for (let k = 0; k < 100; k++) {
    }
  }
}
var t3 = new Date().getTime()
console.log('two time', t3 - t2)
```



解析：[第 120 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/235)

<br/>



### 第 121 题：统计 1 ~ n 整数中出现 1 的次数。

例如统计 1 ~ 400W 出现 1 的次数。



解析：[第 121 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/237)

<br/>



### 第 122 题：webpack 打包 vue 速度太慢怎么办？

解析：[第 122 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/238)

<br/>



### 第 123 题：vue 是如何对数组方法进行变异的？例如 push、pop、splice 等方法



解析：[第 123 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/239)

<br/>



### 第 124 题：永久性重定向（301）和临时性重定向（302）对 SEO 有什么影响



解析：[第 124 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/241)

<br/>



### 第 125 题：算法题

如何将`[{id: 1}, {id: 2, pId: 1}, ...]` 的重复数组（有重复数据）转成树形结构的数组 `[{id: 1, child: [{id: 2, pId: 1}]}, ...]` （需要去重）



解析：[第 125 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/243)

<br/>



### 第 126 题：扑克牌问题

> 有一堆扑克牌，将牌堆第一张放到桌子上，再将接下来的牌堆的第一张放到牌底，如此往复；
>
> 最后桌子上的牌顺序为： (牌底) 1,2,3,4,5,6,7,8,9,10,11,12,13 (牌顶)；
>
> 问：原来那堆牌的顺序，用函数实现。



解析：[第 126 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/245)

<br/>



### 第 127 题：如何用 css 或 js 实现多行文本溢出省略效果，考虑兼容性



解析：[第 127 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/246)

<br/>



### 第 128 题：Http 状态码 301 和 302 的应用场景分别是什么



解析：[第 128 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/249)

<br/>



### 第 129 题：输出以下代码执行结果

> ```js
> function wait() {
> return new Promise(resolve =>
>  setTimeout(resolve, 10 * 1000)
> )
> }
> 
> async function main() {
> console.time();
> const x = wait();
> const y = wait();
> const z = wait();
> await x;
> await y;
> await z;
> console.timeEnd();
> }
> main();
> ```



解析：[第 129 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/251)

<br/>



### 第 130 题：输出以下代码执行结果，大致时间就好（不同于上题）

> ```js
> function wait() {
> return new Promise(resolve =>
>  setTimeout(resolve, 10 * 1000)
> )
> }
> 
> async function main() {
> console.time();
> await wait();
> await wait();
> await wait();
> console.timeEnd();
> }
> main();
> ```



解析：[第 130 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/253)

<br/>



### 第 131 题：接口如何防刷



解析：[第 131 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/254)

<br/>



### 第 132 题：实现一个 Dialog 类，Dialog可以创建 dialog 对话框，对话框支持可拖拽（腾讯）



解析：[第 132 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/257)

<br/>



### 第 133 题：用 setTimeout 实现 setInterval，阐述实现的效果与 setInterval 的差异



解析：[第 133 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/259)

<br/>



### 第 134 题：求两个日期中间的有效日期

> 如 2015-2-8 到 2015-3-3，返回【2015-2-8 2015-2-9...】



解析：[第 134 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/264)

<br/>



### 第 135 题：算法题（盛大）

> 在一个字符串数组中有红、黄、蓝三种颜色的球，且个数不相等、顺序不一致，请为该数组排序。使得排序后数组中球的顺序为:黄、红、蓝。
>
> 例如：红蓝蓝黄红黄蓝红红黄红，排序后为：黄黄黄红红红红红蓝蓝蓝。



解析：[第 135 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/266)

<br/>



### 第 136 题：如何实现骨架屏，说说你的思路



解析：[第 136 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/270)

<br/>
© 2022 GitHub, Inc.
Terms
Privacy
Security
Status
Docs
Contact GitHub
Pricing
API
Training
Blog
About
