车牌最新输入框版：https://asazws.github.io/plate-object/plate.html
车牌键盘框：https://asazws.github.io/binding/binding.html

## 车牌键盘
```markdown
我们做智慧停车的，在微信端开发一个车牌输入的键盘，下面是效果图，有两种展示方式，当然两种的代码结构不一样，需要哪种就用哪种，代码有累赘的地方希望指出来。
```

![](https://github.com/AsaZws/binding/blob/master/images/binding.gif)
- 这种使用起来比较简单，是js原生的，个人感觉使用起来比较快。
```html
    <link rel="stylesheet" href="css/plate.css">
    <div class="weui-cell__bd" id="plate">
        <input class="weui-input plate" readonly type="text" placeholder="请输入车牌" maxlength="8" value="粤B">
    </div>
```
```js
    var plate1 = new Plate("plate");
```
    https://github.com/AsaZws/binding/tree/master/plate-object


![](https://github.com/AsaZws/binding/blob/master/images/car.gif)
- 这种需要把html结构写出来，没有在js中进行循环出来,具体使用请看代码里面，这个有引入jquery。
    https://github.com/AsaZws/binding/blob/master/js/binding.js
