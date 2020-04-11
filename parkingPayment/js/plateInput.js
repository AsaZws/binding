/**
 * 1.保存this
 * 2.获取对象
 * 3.获取自定义的车牌
 * 4.获取输入框的id
 * 5.获取键盘的id
 * 6.获取关闭的id
 * 7.初始化键盘
 * 8.关闭键盘事件
 * 9.打开键盘事件
 * 车牌数字键盘 name：Asa_Zhou data：2020/04/11修改完成
 */
function PlateInput(id) {
    var _this = this;
    this.PVS = ['京', '津', '沪', '渝', '蒙', '新', '藏', '宁', '桂', '黑', '吉', '辽', '晋', '冀', '青', '鲁', '豫', '苏', '皖', '浙', '闽', '赣', '湘', '鄂', '琼', '甘', '陕', '粤', '云', '贵', '川', '', '', '', '', '', '', '', '<span>x</span>'];
    this.NUM = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'P', '港', '澳', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', '学', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '警', '<span>x</span>'];
    this._plate = document.getElementById(id);
    this.plateValue = this._plate.getElementsByTagName("input")[0];
    this.plateNumber = this.plateValue.value; // 初始化车牌号码
	this.okeyboard = this._plate.getElementsByClassName('keyboard')[0];       // 渲染完成获取键盘
	this.placeLetter = this._plate.getElementsByClassName('place-letter')[0]; // 获取键盘
    this.placeLetterLi = this.placeLetter.getElementsByTagName('li');         // 获取键盘li
    this.shutDown = this._plate.getElementsByClassName('shut-down')[0];       // 获取关闭
    this.initShow(this.plateNumber.length); // 初始化键盘
    this.keyboard();  // 键盘事件
    this.shutDown.addEventListener("click", function() {											// 点击确定，隐藏键盘
		_this.hide();
	})
	this.plateValue.addEventListener("click", function() {										// 点击车牌框，显示键盘
		_this.show();
	})
}
// 初始化键盘
PlateInput.prototype.initShow = function (index) {
	if(index == 0) {
		this.placeLetter.innerHTML = placeStrs(this.PVS);
	} else {
		this.placeLetter.innerHTML = placeStrs(this.NUM);
	}
}
// 隐藏键盘
PlateInput.prototype.hide = function() {
	this.okeyboard.style.display = 'none';
}
// 显示键盘
PlateInput.prototype.show = function() {
	this.okeyboard.style.display = 'block';
}
// 循环键盘，添加事件
PlateInput.prototype.keyboard = function () {
    var _this = this;
    for (var i = 0; i < this.placeLetterLi.length; i++) {
        this.placeLetterLi[i].index = i;
        var plength = this.placeLetterLi.length - 1;
        this.placeLetterLi[plength].classList.add("lastli");  // 给最后一个删除加class
        this.initColor(this.plateNumber.length);
        // 键点击事件
        this.placeLetterLi[i].onclick = function () {
            // 如果点击非删除键和非空键
            if (this.index < plength && this.innerHTML !== "") {
                // 如果车牌号码大于8位数，点击哪个键，就将哪个键的值替换最后一位
                if (_this.plateNumber.length > 7) {
                    _this.plateNumber = _this.plateNumber.substring(0,_this.plateNumber.length-1);
                    _this.hide();
                }
                // 点击哪个键就把哪个键的值添加在车牌号码后面
                _this.plateNumber += this.innerHTML;
                // 将获取到的车牌号码回写给input的value
            }
            else if(this.index == plength) {
                _this.plateNumber = _this.plateNumber.substring(0,_this.plateNumber.length-1);
            }
            // 每点击一次就要根据车牌长度判断键盘颜色
            _this.initColor(_this.plateNumber.length);
            // 车牌键盘赋值
            _this.plateValue.value = _this.plateNumber;
        }
    }
}
// 隐藏键盘
PlateInput.prototype.hide = function() {
	this.okeyboard.style.display = 'none';
}
// 显示键盘
PlateInput.prototype.show = function() {
	this.okeyboard.style.display = 'block';
}
// 循环显示地名键盘
PlateInput.prototype.showOplaceName = function() {
	for (var i = 0; i < this.placeLetterLi.length; i++) {
		this.placeLetterLi[i].innerHTML = this.PVS[i];
	}
}
// 循环显示数字键盘
PlateInput.prototype.showPlaceLetter = function() {
	for (var i = 0; i < this.placeLetterLi.length; i++) {
		this.placeLetterLi[i].innerHTML = this.NUM[i];
	}
}
// 初始化背景颜色
PlateInput.prototype.initColor = function(index) {
	if(index == 0) {
		this.showOplaceName()
		for (var i = 0; i < this.placeLetterLi.length; i++) {
			clear(this.placeLetterLi, i);
		}
		for (var i = 31; i < 38; i++) {
			bannedClick(this.placeLetterLi, i);
		}
	}
	else if (index == 1) {
		this.showPlaceLetter();
		for (var i = 0; i < this.placeLetterLi.length; i++) {
			clear(this.placeLetterLi, i);
		}
		bannedClick(this.placeLetterLi, 18);
		bannedClick(this.placeLetterLi, 19);
		bannedClick(this.placeLetterLi, 29);
		bannedClick(this.placeLetterLi, 37);
		for (var j = 0; j < 10; j++) {
			bannedClick(this.placeLetterLi, j);
		}
	}
	else if (index > 1 && index < 6) {
		this.showPlaceLetter();
		bannedClick(this.placeLetterLi, 18);
		bannedClick(this.placeLetterLi, 19);
		bannedClick(this.placeLetterLi, 29);
		bannedClick(this.placeLetterLi, 37);
		for (var k = 0; k < 10; k++) {
			clear(this.placeLetterLi, k);
		}
	}
	else if (index == 6) {
		this.showPlaceLetter();
		for (var i = 0; i < this.placeLetterLi.length; i++) {
			clear(this.placeLetterLi, i);
		}
	}
	else if (index == 7) {
		this.showPlaceLetter();
		for (var i = 0; i < this.placeLetterLi.length; i++) {
			clear(this.placeLetterLi, i);
		}
		bannedClick(this.placeLetterLi, 18);
		bannedClick(this.placeLetterLi, 19);
		bannedClick(this.placeLetterLi, 29);
		bannedClick(this.placeLetterLi, 37);
	}
}
function placeStrs(arr) {  // 返回ul结构
	var placeStr = '';
	for (var i in arr) {
		placeStr += '<li>' + arr[i] + '</li>';
	}
	return placeStr = '<ul>' + placeStr + '</ul>';
}
function bannedClick(id, item) {  // 添加背景颜色,禁止点击
	id[item].classList.add("place-color");
}
function clear(id, num) {  // 清除背景颜色，可以点击
	id[num].classList.remove("place-color");
}