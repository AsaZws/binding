/* 
车牌数字键盘
name：Asa_Zhou
data：2019/3/25修改
*/
'use strict';
// 车牌键盘数组
var place_name = [['京','津','沪','渝','蒙','新','藏','宁','桂','黑'],['吉','辽','晋','冀','青','鲁','豫','苏','皖','浙'],['闽','赣','湘','鄂','粤','琼','甘','陕','贵','云'],['川']];
var letter = [['1','2','3','4','5','6','7','8','9','0'],['Q','W','E','R','T','Y','U','P','港','澳'],['A','S','D','F','G','H','J','K','L','学'],['Z','X','C','V','B','N','M','警','回删']];

// 获取元素dom
function Plate(id) {
    var _this = this;                                                // 保存this
    this._plate = document.getElementById(id);                       // 获取对象
    this._value = this._plate.getElementsByTagName('input')[0];      // 获取输入框
    var ostr = this._value.value;   // 输入框的车牌
    var str = '';
    function cyclicLi(oLi, arr) {   // 存循环键盘数组的值
        for (var i in arr) {
            for (var j in arr[i]) {
                oLi += '<li>' + arr[i][j] + '</li>';
                if(j % 10 == 9) {
                    oLi += '</ul><ul>';
                }
            }
        }
        str = '<ul>' + oLi + '</ul>';
    }
    function show(){
        ostr.length < 1 ? cyclicLi(str, place_name) : cyclicLi(str, letter);
        console.log(1);
    }
    show();

    var _okeyboard ='<div class="keyboard"> \
                        <div class="shut-down">关闭</div> \
                        <div class="place-name">'+ str +'</div> \
                    </div>';
    _this._plate.insertAdjacentHTML('afterBegin', _okeyboard);                                          // 渲染完整的dom
    this.okeyboard = this._plate.getElementsByClassName('keyboard')[0];                                 // 渲染完成获取键盘
    this.placeNameLi = this._plate.getElementsByClassName('place-name')[0].getElementsByTagName('li');  // 获取所有li
    this.shutDown = this._plate.getElementsByClassName('shut-down')[0];                                 // 获取关闭
    this.oplace_name = this._plate.getElementsByClassName('place-name')[0];                             // 获取键盘

    this.shutDown.onclick = function () {       // 给关闭按钮添加点击事件
        _this.hiddenKeyboard();
    }
    this._value.onclick = function(){           // 给输入框添加点击事件
        _this.blockKeyboard();
    }
    var oarr = ostr.split('');
    // 循环数字键盘
    for(var i=0; i<this.placeNameLi.length; i++) {
        this.placeNameLi[i].index = i;
        // 获取循环中最后的一个索引
        var plength = this.placeNameLi.length-1;
        this.placeNameLi[plength].className = 'lastli';
        // 给循环的每个li添加点击事件，并将值push到输入框中
        this.placeNameLi[i].onclick = function (e) {
            if(oarr.length > 7) {oarr.length = 7};
            console.log(e);
            oarr.push(this.innerHTML)
            ostr = oarr.join('')
            _this._value.value = ostr;
            // console.log(_this.placeNameLi[plength])
        }
        // 给最后一个删除按钮添加点击事件，并将push的值从输入框中删除
        // this.placeNameLi[plength].onclick = function(){
        //     oarr.splice(-1,1);
        //     ostr = oarr.join('');
        //     _this._value.value = ostr;
        //     if(ostr.length<1){
        //         console.log("该弹车牌键盘啦！")
        //         str = '';
        //         show()
        //         _this.oplace_name.innerHTML = str;
        //     }
        // }
    }
}

Plate.prototype.keyboardInput = function() {      // 点击键盘输入值
    console.log(this)
}

Plate.prototype.hiddenKeyboard = function() {     // 点击隐藏键盘
    this.okeyboard.style.display = 'none';
}

Plate.prototype.blockKeyboard = function() {      // 点击打开键盘
    this.okeyboard.style.display = 'block';
}