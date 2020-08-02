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
 * 车牌数字键盘 name：Asa_Zhou data：2020/04/13修改完成
 */
function Plate(id) {
	var _this = this;                                            						  // 保存this
	this.PVS = ['京', '津', '沪', '渝', '蒙', '新', '藏', '宁', '桂', '黑', '吉', '辽', '晋', '冀', '青', '鲁', '豫', '苏', '皖', '浙', '闽', '赣', '湘', '鄂', '琼', '甘', '陕', '粤', '云', '贵', '川', '', '', '', '', '', '', '', '<span>x</span>'];
	this.NUM = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'P', '港', '澳', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', '学', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '警', '<span>x</span>'];
	this.PNUM = ['', '', '', '', '', '', '', ''];
	this._plate = document.getElementById(id);                   						  // 获取对象
	this.plateNumber = this._plate.getAttribute("plateNumbers").split('');		// 获取自定义属性车牌号码数组
	this.plateIndex = this.plateNumber.length;															  // 车牌键盘框索引
	this.plateFrame = this._plate.getElementsByClassName("plate-frame")[0];  	// 车牌键盘框
	this.plateFrameLi = this.plateFrame.getElementsByTagName("li");						// 键盘框li
	this.okeyboard = this._plate.getElementsByClassName('keyboard')[0];       // 渲染完成获取键盘
	this.placeLetter = this._plate.getElementsByClassName('place-letter')[0]; // 获取键盘
	this.placeLetterLi = this.placeLetter.getElementsByTagName('li');         // 获取键盘li
	this.shutDown = this._plate.getElementsByClassName('shut-down')[0];       // 获取关闭
	this.queryDetail = this._plate.getElementsByClassName('queryDetail')[0]   // 查询按钮
	this.initInput();																												  // 初始化车牌输入框
	this.initShow(this.plateIndex);																					  // 键盘初始化
	this.inputBox();																													// 初始化车牌框
	this.keyboard();																													// 循环数字键盘
	this.shutDown.addEventListener("click", function() {											// 点击确定，隐藏键盘
		_this.hide();
	})
	this.plateFrame.addEventListener("click", function() {										// 点击车牌框，显示键盘
		_this.show();
	})
}
Plate.prototype.initInput = function() {  // 初始化车牌框
	for(var i=0; i<this.plateNumber.length; i++) {
		this.PNUM[i] = this.plateNumber[i];
	}
	this.plateFrame.innerHTML = placeStrs(this.PNUM);  // 将html自定义的车牌初始值赋给车牌框
}
Plate.prototype.initShow = function(index) {    // 初始化显示键盘
	if(index == 0) {
		this.placeLetter.innerHTML = placeStrs(this.PVS);
	} else {
		this.placeLetter.innerHTML = placeStrs(this.NUM);
	}
}
Plate.prototype.hide = function() {  // 隐藏键盘
	this.okeyboard.style.display = 'none';
}
Plate.prototype.show = function() {  // 显示键盘
	this.okeyboard.style.display = 'block';
}
Plate.prototype.inputBox = function() {  // 遍历车牌键盘，获取车牌
	var _this = this;
	for(var i=0; i<this.plateFrameLi.length; i++) {
		this.plateFrameLi[i].index = i;
		this.plateFrameLi[this.plateIndex].className = "active";
		this.plateFrameLi[this.plateFrameLi.length-1].className = "new";
		this.plateFrameLi[i].onclick = function() {  // 点击车牌框
			_this.plateIndex = this.index;  // 获取车牌框的索引
			for(var j=0; j<_this.plateFrameLi.length-1; j++) {
				_this.plateFrameLi[j].className = "";  // 先清除所有车牌框的class
			}
			if(_this.plateFrameLi[_this.plateFrameLi.length-1].innerHTML == '') {
				_this.plateFrameLi[_this.plateFrameLi.length-1].className = "new";  // 如果新能源车牌框为空，则不去掉class，反之去掉
			}
			this.className = "active";  // 给点击当前车牌框加class
			_this.initColor(_this.plateIndex);  // 根据车牌框索引，改变键盘颜色
		}
	}
	if(_this.plateFrameLi[_this.plateFrameLi.length-1].innerHTML !== '') {
		_this.plateFrameLi[_this.plateFrameLi.length-1].className = "";
	}
}
Plate.prototype.keyboard = function() {  // 循环键盘，添加事件
	var _this = this;
	for (var i = 0; i < this.placeLetterLi.length; i++) {
		this.placeLetterLi[i].index = i;
		var plength = this.placeLetterLi.length - 1;
		this.placeLetterLi[plength].classList.add("lastli");  // 给最后一个删除加class
		this.initColor(this.plateIndex);
		this.placeLetterLi[i].onclick = function () {  // 键点击事件
			if (this.index < plength && this.innerHTML !== "") {  // 非空非删除键
				_this.plateFrameLi[_this.plateIndex].innerHTML = this.innerHTML;  // 取值赋值
				_this.plateFrameLi[_this.plateIndex].className = "";
				if(_this.plateIndex == _this.plateFrameLi.length-2) {  // 点击到新能源前一位，索引不变
					_this.plateIndex = _this.plateFrameLi.length-2;
					_this.hide();
				}
				else if(_this.plateIndex == _this.plateFrameLi.length-1) {  // 点击到新能源，索引不变
					_this.plateIndex = _this.plateFrameLi.length-1;
					_this.hide();
				}
				else {
					_this.plateIndex++;  // 其他情况索引累加
				}
				_this.plateFrameLi[_this.plateIndex].className = "active";  // 当前添加class
			} else if (this.index == plength) {  // 当点击删除
				_this.plateFrameLi[_this.plateIndex].innerHTML = "";
				_this.plateFrameLi[_this.plateIndex].className = "";
				if(_this.plateIndex == 1 || _this.plateIndex == 0) {  // 删除到最后一个的时候，索引不变
					_this.plateIndex = 0;
				}
				else {
					_this.plateIndex--;  // 索引累减
				}
				_this.plateFrameLi[_this.plateIndex].className = "active";  // 当前添加class
				if(_this.plateFrameLi[_this.plateFrameLi.length-1].innerHTML == '') {  // 车牌框最后一个为空的时候，添加新能源class
					_this.plateFrameLi[_this.plateFrameLi.length-1].className = "new";
				}
			}
			_this.initColor(_this.plateIndex);  // 根据索引初始化键盘颜色
			_this.forbidClick();  // 去除禁止点击按钮
		}
	}
}
Plate.prototype.forbidClick = function() {  //去除禁止点击按钮并获取车牌,
	this.plateNumber.length = 0;  // 获取前先清空
	for (var i = 0; i < this.plateFrameLi.length; i++) {  // 存车牌
		if(this.plateNumber.length <= 8 && this.plateFrameLi[i].innerHTML !== '') {
			this.plateNumber.push(this.plateFrameLi[i].innerHTML)
		}
	}
	for (var j = 0; j < this.plateFrameLi.length-1; j++) {  // 如果前7位车牌有空，则清空车牌
		if (this.plateFrameLi[j].innerHTML == '') {
			this.plateNumber.length = 0;
		}
	}
	if(this.plateNumber.length > 6 && this.queryDetail.className.indexOf("noquery") > -1) {
		this.queryDetail.classList.remove("noquery"); // 车牌长度大于6位，可以点击
	} else if(this.plateNumber.length < 7 && this.queryDetail.className.indexOf("noquery") <= -1) {
		this.queryDetail.classList.add("noquery"); // 车牌长度小于7位，并且没有noquery则添加noquery
	}
}
Plate.prototype.showOplaceName = function() {  // 循环显示地名键盘
	for (var i = 0; i < this.placeLetterLi.length; i++) {
		this.placeLetterLi[i].innerHTML = this.PVS[i];
	}
}
Plate.prototype.showPlaceLetter = function() {  // 循环显示数字键盘
	for (var i = 0; i < this.placeLetterLi.length; i++) {
		this.placeLetterLi[i].innerHTML = this.NUM[i];
	}
}
Plate.prototype.initColor = function(index) {  // 初始化背景颜色
	var pLength = this.placeLetterLi.length;
	if(index == 0) {
		this.showOplaceName()
		for (var i = 0; i < pLength; i++) {
			clear(this.placeLetterLi, i);
		}
		for (var i = 31; i < 38; i++) {
			bannedClick(this.placeLetterLi, i);
		}
	}
	else if (index == 1) {
		this.showPlaceLetter();
		for (var i = 0; i < pLength; i++) {
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
		for (var i = 0; i < pLength; i++) {
			clear(this.placeLetterLi, i);
		}
	}
	else if (index == 7) {
		this.showPlaceLetter();
		for (var i = 0; i < pLength; i++) {
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