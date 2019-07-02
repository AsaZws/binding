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
    this._plate = document.getElementById(id);                       // 获取对象
    this._value = this._plate.getElementsByTagName('input')[0];      // 获取输入框
    var _this = this;                                                // 保存this
    var ostr = this._value.value;       // 输入框的车牌
    var _okeyboard = '';                // 循环的键值
    function cyclicLi(arr1, arr2) {     // 存循环键盘数组的值
        var placeStr = '';              // 车牌简称
        var letterStr = '';             // 数字拼音
        for (var i in arr1) {
            for (var j in arr1[i]) {
                placeStr += '<li>' + arr1[i][j] + '</li>';
                if(j % 10 == 9) {
                    placeStr += '</ul><ul>';
                }
            }
        }
        for (var i in arr2) {
            for (var j in arr2[i]) {
                letterStr += '<li>' + arr2[i][j] + '</li>';
                if(j % 10 == 9) {
                    letterStr += '</ul><ul>';
                }
            }
        }
        placeStr = '<div class="place-name"><ul>' + placeStr + '</ul></div>';
        letterStr = '<div class="place-letter"><ul>' + letterStr + '</ul></div>';
        _okeyboard += '<div class="keyboard">';
        _okeyboard += '<div class="shut-down">关闭</div>';
        _okeyboard += placeStr + letterStr;
        _okeyboard += '</div>';
    }
    cyclicLi(place_name,letter);
    _this._plate.insertAdjacentHTML('beforeend', _okeyboard);                   // 将循环的键循环进去
    this.okeyboard = this._plate.getElementsByClassName('keyboard')[0];         // 渲染完成获取键盘
    this.placeLetter = this._plate.getElementsByClassName('place-letter')[0];  // 获取地名键盘
    this.oplaceName = this._plate.getElementsByClassName('place-name')[0];     // 获取数字键盘
    this.placeLetterLi = this.placeLetter.getElementsByTagName('li');          // 获取所有地名li
    this.placeNameLi = this.oplaceName.getElementsByTagName('li');             // 获取所有地名li
    this.shutDown = this._plate.getElementsByClassName('shut-down')[0];         // 获取关闭
    function judgingLength() {
        if ( ostr.length < 1 )
        {
            _this.placeLetter.style.display = 'none';
            _this.oplaceName.style.display = 'block';
        }
        else 
        {
            _this.oplaceName.style.display = 'none';
            _this.placeLetter.style.display = 'block';
        }
    }
    judgingLength();
    this.shutDown.onclick = function () {       // 给关闭按钮添加点击事件
        _this.hiddenKeyboard();
    }
    this._value.onclick = function(){           // 给输入框添加点击事件
        _this.blockKeyboard();
    }
    for(var i=0; i<this.placeNameLi.length; i++) {
        // 给循环的每个li添加点击事件，并将值添加到输入框中
        this.placeNameLi[i].onclick = function () {
            ostr += this.innerHTML;
            _this._value.value = ostr;
            if(ostr.length > 0) {
                judgingLength();
            }
        }
    }
    // 循环数字键盘
    for(var i=0; i<this.placeLetterLi.length; i++) {
        this.placeLetterLi[i].index = i;
        // 获取循环中最后的一个索引
        var plength = this.placeLetterLi.length-1;
        this.placeLetterLi[plength].className = 'lastli';
        // 给循环的每个li添加点击事件，并将值添加到输入框中
        this.placeLetterLi[i].onclick = function () {
            if(ostr.length > 7) {
                ostr = ostr.substring(0,ostr.length-1)
            };
            if(this.index < plength) {
                ostr += this.innerHTML;
                _this._value.value = ostr;
            } else if (this.index == plength) {
                ostr = _this._value.value;
                ostr = ostr.substring(0,ostr.length-1)
                _this._value.value = ostr;
                if(ostr.length<1){
                    judgingLength();
                    console.log("该弹车牌键盘啦！")
                }
            }
        }
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