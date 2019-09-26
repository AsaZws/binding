最新最完美车牌框输入键盘：https://asazws.github.io/binding/parkingPayment/plate.html  
车牌最新输入框版：https://asazws.github.io/binding/plate-object/plate.html  
车牌键盘框：https://asazws.github.io/binding/binding.html

## 车牌键盘
我们做智慧停车的，在H5开发一个车牌输入的键盘，下面是效果图，    
有两种展示方式，当然两种的代码结构不一样，需要哪种就用哪种，代码有累赘的地方希望指出来。    
如果想用Vue版本的，请点击这里 => [Vue版](https://github.com/AsaZws/Keyboard)

### 这种使用起来非常简单，原生js写的，是列表框的形式，css用flex布局，适应各种屏幕，具体请看下方
![](https://github.com/AsaZws/binding/blob/master/images/keyboard.gif)
- https://github.com/AsaZws/binding/tree/master/parkingPayment

```html
<!-- base清除默认样式，也可以加你自己的 -->
<link rel="stylesheet" href="css/base.css">
<!-- 里面上半部分是键盘的css，下半部分是车牌框的css -->
<link rel="stylesheet" href="css/index.css">
<!-- 头部背景 -->
<div class="header"></div> 
  <!-- 车牌内容 -->
  <div class="keyboard-padding" id="plate" plateNumbers="粤B">
    <p>请输入车牌</p>
    <div class="plate">
      <!-- 车牌框 -->
      <div class="plate-frame"></div>
      <!-- 查询按钮 -->
      <div class="plate-button">
        <a href="javascript:queryDetail();" class="queryDetail noquery">查询</a>
      </div>
    </div>
    <!-- 车牌键盘 -->
    <div class="keyboard">
      <div class="shut-down"><p>确定</p></div>
      <div class="place-letter"></div>
    </div>
  </div>
```
```js
var plate1 = new Plate("plate");
// 查询车牌的方法
function queryDetail() {
    if(plate1.plateNumber.length < 7) {
        console.log("请输入正确车牌");
    } else {
        // 获取车牌
        console.log(plate1.plateNumber);
        // 隐藏键盘
        plate1.hide();
    }
}
```

### 这种使用起来比较简单，是js原生的，个人感觉使用起来比较快，具体请看下方。
![](https://github.com/AsaZws/binding/blob/master/images/car.gif)
- https://github.com/AsaZws/binding/tree/master/plate-object

```html
<link rel="stylesheet" href="css/plate.css">
<div class="weui-cell__bd" id="plate">
    <input class="weui-input plate" readonly type="text" placeholder="请输入车牌" maxlength="8" value="粤B">
</div>
```
```js
var plate1 = new Plate("plate");
```

### 这种需要把html结构写出来，没有在js中进行循环出来,这个有引入jquery,具体请看下方js代码链接。
![](https://github.com/AsaZws/binding/blob/master/images/binding.gif)
- https://github.com/AsaZws/binding/blob/master/js/binding.js

```html
<link rel="stylesheet" href="css/binding.css"/>
<!-- 车牌 -->
<div class="plate">
    <ul id="plate">
    <li>粤</li>
    <li>B</li>
    <li class="active"></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li>
        <div class="new"><span>+</span> <i>新能源</i></div>
    </li>
    </ul>
</div>
<!-- 虚拟键盘 -->
<div class="keyboard-footer">
    <!-- 键盘 -->
    <div class="keyboard" id="shutkey">
        <div class="shut" id="shut">关闭</div>
        <ul id="keyboard">
            <div class="area-one">
            <li>1</li>
            <li>2</li>
            <li>3</li>
            <li>4</li>
            <li>5</li>
            <li>6</li>
            <li>7</li>
            <li>8</li>
            <li>9</li>
            <li>0</li>
            </div>
            <div class="area-one">
            <li>Q</li>
            <li>W</li>
            <li>E</li>
            <li>R</li>
            <li>T</li>
            <li>Y</li>
            <li>U</li>
            <li>P</li>
            <li>港</li>
            <li>澳</li>
            </div>
            <div class="area-one">
            <li>A</li>
            <li>S</li>
            <li>D</li>
            <li>F</li>
            <li>G</li>
            <li>H</li>
            <li>J</li>
            <li>K</li>
            <li>L</li>
            <li>学</li>
            </div>
            <div class="area-one">
            <li>Z</li>
            <li>X</li>
            <li>C</li>
            <li>V</li>
            <li>B</li>
            <li>N</li>
            <li>M</li>
            <li>警</li>
            <li class="delet">删除</li>
            </div>
        </ul>
    </div>
    <!-- 地区车牌简称 -->
    <div class="area" id="area">
        <div class="shut" id="shuta">关闭</div>
        <ul id="keyboarda">
        <div class="area-one">
            <li>京</li>
            <li>津</li>
            <li>沪</li>
            <li>渝</li>
            <li>蒙</li>
            <li>新</li>
            <li>藏</li>
            <li>宁</li>
            <li>桂</li>
            <li>黑</li>
        </div>
        <div class="area-one">
            <li>吉</li>
            <li>辽</li>
            <li>晋</li>
            <li>冀</li>
            <li>青</li>
            <li>鲁</li>
            <li>豫</li>
            <li>苏</li>
            <li>皖</li>
        </div>
        <div class="area-one">
            <li>浙</li>
            <li>闽</li>
            <li>赣</li>
            <li>湘</li>
            <li>鄂</li>
            <li>粤</li>
            <li>琼</li>
            <li>甘</li>
        </div>
        <div class="area-one">
            <li>陕</li>
            <li>贵</li>
            <li>云</li>
            <li>川</li>
            <!-- <li>删除</li> -->
        </div>
        </ul>
    </div>
</div>
<script src="js/jquery.min.js"></script>
<script src="js/binding.js"></script>
```
