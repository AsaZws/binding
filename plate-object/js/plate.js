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
// 获取元素
function Plate(id) {
    this.Oplate = document.getElementById(id);                              // 获取对象
    this.Ovalue = this.Oplate.getElementsByTagName("input")[0];             // 获取输入框
    // 获取输入框的内容来决定渲染哪个键盘
    if(this.Ovalue.value.length < 1) {
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
    // this.Oplace_name = Okeyboard.getElementsByClassName("place-name");  // 获取地名键盘
    // this.Oletter = Okeyboard.getElementsByClassName("letter");          // 获取数字字母键盘

    this.Oplate.insertAdjacentHTML("afterBegin", _Okeyboard);
    this.Okeyboard = this.Oplate.getElementsByClassName("keyboard")[0];      // 渲染完成获取键盘
    this.PlaceNameLastLi = this.Oplate.getElementsByClassName("place-name")[0].lastChild.lastChild;
    this.PlaceNameLastLi.className = "lastli";
    this.Oshut_down = this.Oplate.getElementsByClassName("shut-down")[0];    // 获取关闭
    // 保存this
    var _this = this;
    this.Oshut_down.onclick = function () {
        _this.OkeyboardClick();
    }
    this.Ovalue.onclick = function(){
        _this.OvalueClick();
    }
}
// 点击
Plate.prototype.OkeyboardClick = function() {
    this.Okeyboard.style.display = 'none';
}
Plate.prototype.OvalueClick = function() {
    this.Okeyboard.style.display = 'block';
}
