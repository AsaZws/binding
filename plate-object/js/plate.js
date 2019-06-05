/* 
车牌数字键盘
name：Asa_Zhou
data：2019/3/25修改
*/
'use strict';
// 车牌键盘数组
var Place_name = [["京","津","沪","渝","蒙","新","藏","宁","桂","黑"],["吉","辽","晋","冀","青","鲁","豫","苏","皖","浙"],["闽","赣","湘","鄂","粤","琼","甘","陕","贵","云"],["川","回删"]];
var Letter = [["1","2","3","4","5","6","7","8","9","0"],["Q","W","E","R","T","Y","U","P","港","澳"],["A","S","D","F","G","H","J","K","L","学"],["Z","X","C","V","B","N","M","警","回删"]];

// 存循环键盘数组的值
var str = '';
function Cyclic_Li(oLi, arr) {
    for (var i in arr) {
        for (var j in arr[i]) {
            oLi += "<li>" + arr[i][j] + "</li>";
            if(j % 10 == 9) {
                oLi += "</ul><ul>";
            }
        }
    }
    str = "<ul>" + oLi + "</ul>";
}
// 获取元素dom
function Plate(id) {
    this.Oplate = document.getElementById(id);                              // 获取对象
    this.Ovalue = this.Oplate.getElementsByTagName("input")[0];             // 获取输入框
    var ostr = this.Ovalue.value;  // 输入框的车牌
    // 获取输入框的内容来决定渲染哪个键盘
    if(ostr.length < 1) {
        Cyclic_Li(str, Place_name);
    } else {
        Cyclic_Li(str, Letter);
    }
    var _Okeyboard = '<div class="keyboard"> \
                    <div class="shut-down">关闭</div> \
                    <div class="place-name">'
                    + str +
                    '</div> \
                    </div>';

    this.Oplate.insertAdjacentHTML("afterBegin", _Okeyboard);                                           // 渲染完整的dom
    this.Okeyboard = this.Oplate.getElementsByClassName("keyboard")[0];                                 // 渲染完成获取键盘
    this.PlaceNameLastLi = this.Oplate.getElementsByClassName("place-name")[0].lastChild.lastChild;     // 获取回删
    this.PlaceNameLastLi.className = "lastli";                                                          // 给回删添加class
    this.PlaceNameLi = this.Oplate.getElementsByClassName("place-name")[0].getElementsByTagName('li');  // 获取所有li

    this.Oshut_down = this.Oplate.getElementsByClassName("shut-down")[0];                               // 获取关闭
    this.Oplace_name = this.Oplate.getElementsByClassName("place-name")[0];                             // 获取键盘

    var _this = this;                             // 保存this
    this.Oshut_down.onclick = function () {       // 给关闭按钮添加点击事件
        _this.hiddenKeyboard();
    }
    this.Ovalue.onclick = function(){             // 给输入框添加点击事件
        _this.blockKeyboard();
    }
    var oarr = ostr.split('');
    for(var i=0; i<this.PlaceNameLi.length; i++) {
        this.PlaceNameLi[i].index = i;
        this.PlaceNameLi[i].onclick = function () {
            if(oarr.length > 7) {
                oarr.length = 7
            }
            oarr.push(this.innerHTML);
            ostr = oarr.join('');
            _this.Ovalue.value = ostr;
            console.log(_this.Ovalue.value);
        }
    }
}

Plate.prototype.keyboardInput = function() {      // 点击键盘输入值
    console.log(this)
}

Plate.prototype.hiddenKeyboard = function() {     // 点击隐藏键盘
    this.Okeyboard.style.display = 'none';
}

Plate.prototype.blockKeyboard = function() {      // 点击打开键盘
    this.Okeyboard.style.display = 'block';
}