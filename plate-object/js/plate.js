/* 车牌数字键盘 name：Asa_Zhou data：2019/7/03修改完成 */
var place_name = [['京','津','沪','渝','蒙','新','藏','宁','桂','黑'],['吉','辽','晋','冀','青','鲁','豫','苏','皖','浙'],['闽','赣','湘','鄂','粤','琼','甘','陕','贵','云'],['川']];
var letter = [['1','2','3','4','5','6','7','8','9','0'],['Q','W','E','R','T','Y','U','P','港','澳'],['A','S','D','F','G','H','J','K','L','学'],['Z','X','C','V','B','N','M','警','回删']];
function Plate(id) {
    this._plate = document.getElementById(id);                   // 获取对象
    this._value = this._plate.getElementsByTagName('input')[0];  // 获取输入框
    var _this = this;                                            // 保存this
    var ostr = this._value.value;                                // 输入框的车牌
    this._okeyboard = '';                                        // 循环的键值
    this.placeStr = function (arr) {                             // 循环数组遍历到dom中
        var placeStr = '';
        for (var i in arr) {
            for (var j in arr[i]) {
                placeStr += '<li>' + arr[i][j] + '</li>';
                if (j % 10 == 9) {
                    placeStr += '</ul><ul>';
                }
            }
        }
        return placeStr;
    }
    this.cyclicLi = function () {                   // 存循环键盘数组的值
        var placeStr = _this.placeStr(place_name);  // 地名简称
        var letterStr = _this.placeStr(letter);     // 数字拼音
        placeStr = '<div class="place-name"><ul>' + placeStr + '</ul></div>';
        letterStr = '<div class="place-letter"><ul>' + letterStr + '</ul></div>';
        this._okeyboard += '<div class="keyboard">';
        this._okeyboard += '<div class="shut-down">关闭</div>';
        this._okeyboard += placeStr + letterStr;
        this._okeyboard += '</div>';
    }
    this.cyclicLi();
    _this._plate.insertAdjacentHTML('beforeend', this._okeyboard);              // 将循环的键循环进去
    this.okeyboard = this._plate.getElementsByClassName('keyboard')[0];         // 渲染完成获取键盘
    this.placeLetter = this._plate.getElementsByClassName('place-letter')[0];   // 获取地名键盘
    this.oplaceName = this._plate.getElementsByClassName('place-name')[0];      // 获取数字键盘
    this.placeLetterLi = this.placeLetter.getElementsByTagName('li');           // 获取所有地名li
    this.placeNameLi = this.oplaceName.getElementsByTagName('li');              // 获取所有地名li
    this.shutDown = this._plate.getElementsByClassName('shut-down')[0];         // 获取关闭
    this.judgingLength = function () {                                          // 判断车牌长度该显示哪个键盘
        if ( ostr.length < 1 ) {
            _this.placeLetter.style.display = 'none';
            _this.oplaceName.style.display = 'block';
        } else {
            _this.oplaceName.style.display = 'none';
            _this.placeLetter.style.display = 'block';
        }
    }
    this.judgingLength();
    this.shutDown.onclick = function () {            // 给关闭按钮添加点击事件
        _this.okeyboard.style.display = 'none';
    }
    this._value.onclick = function(){                // 给输入框添加点击事件 
        _this.okeyboard.style.display = 'block';
    }
    for(var i=0; i<this.placeNameLi.length; i++) {
        this.placeNameLi[i].onclick = function () {  // 给循环的每个li添加点击事件，并将值添加到输入框中
            ostr += this.innerHTML;
            _this.init();
            _this._value.value = ostr;
            if(ostr.length > 0) { _this.judgingLength(); }
        }
    }
    this.tab = function (item) {                     // 键盘的背景颜色改变
        this.placeLetterLi[item].classList.add("place-color");
    }
    this.clear = function (num) {                    // 清除键盘背景颜色
        this.placeLetterLi[num].classList.remove("place-color");
    }
    this.init = function () {
        if ( ostr.length == 1 ) {                    // 当车牌输入框长度为1的时候以下索引的键盘会改变颜色
            this.tab(18);
            this.tab(19);
            this.tab(29);
            this.tab(37);
            for ( var j=0; j<10; j++ ) {
                this.tab(j);
            }
        } else if ( ostr.length == 2 ) {
            for ( var k=0; k<10; k++ ) {
                this.clear(k);
            }
        } else if ( ostr.length == 6 ) {
            this.clear(18);
            this.clear(19);
            this.clear(29);
            this.clear(37);
        } else if ( ostr.length == 7 ) {
            this.tab(18);
            this.tab(19);
            this.tab(29);
            this.tab(37);
        }
    }
    for(var i=0; i<this.placeLetterLi.length; i++) {        // 循环数字键盘
        this.placeLetterLi[i].index = i;
        var plength = this.placeLetterLi.length-1;          // 获取循环中最后的一个索引
        this.placeLetterLi[plength].classList.add("lastli");
        this.init();                                        // 当车牌初次循环出来的时候，初始化这个函数
        this.placeLetterLi[i].onclick = function () {       // 给循环的每个li添加点击事件，并将值添加到输入框中 
            if(this.index < plength) {                      // 点击车牌键盘就把键盘值添加到车牌输入框里面
                ostr += this.innerHTML;
                _this.init();
                _this._value.value = ostr;
            } else if (this.index == plength) {             // 当键盘最后一位为删除的时候就自动删除车牌键盘的最后一位
                ostr = _this._value.value;
                ostr = ostr.substring(0, ostr.length-1)
                _this.init();
                _this._value.value = ostr;
                if(ostr.length<1){ _this.judgingLength(); } // 当删除到最后一位的时候，就隐藏数字键盘，弹起地名键盘
            };
            if(ostr.length > 7) {                           // 当车牌长度大于7位的时候就自动删除最后一位和隐藏键盘
                ostr = ostr.substring(0,ostr.length-1);
                _this.init();
                _this.okeyboard.style.display = 'none';
            };
        }
    }
}