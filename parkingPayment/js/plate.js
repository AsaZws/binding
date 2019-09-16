var place_name = ['京', '津', '沪', '渝', '蒙', '新', '藏', '宁', '桂', '黑', '吉', '辽', '晋', '冀', '青', '鲁', '豫', '苏', '皖', '浙', '闽', '赣', '湘', '鄂', '琼', '甘', '陕', '粤', '云', '贵', '川', '', '', '', '', '', '', '', '<span>x</span>'];
var letter = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'P', '港', '澳', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', '学', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '警', '<span>x</span>'];
var plate_umber = ['', '', '', '', '', '', '', ''];
function Plate(id) {
	this._plate = document.getElementById(id);                   								// 获取对象
	var _this = this;                                            								// 保存this
	this.plateNumber = _this._plate.getAttribute("plateNumbers");								// 获取自定义车牌号码
	// 将自定义属性的车牌值赋给车牌数组
	for(var i=0; i<_this.plateNumber.length; i++) {
		plate_umber[i] = _this.plateNumber[i];
	}
	this.plateFrame = _this._plate.getElementsByClassName("plate-frame")[0];  	// 车牌键盘框
	this.plateFrame.innerHTML =  placeStrs(plate_umber);												// 创建车牌键盘框
	this.plateFrameLi = _this.plateFrame.getElementsByTagName("li");						// 键盘框li
	_this._plate.insertAdjacentHTML('beforeend', cyclicLi());              			// 将循环的键循环进去
	this.okeyboard = _this._plate.getElementsByClassName('keyboard')[0];        // 渲染完成获取键盘
	this.placeLetter = _this._plate.getElementsByClassName('place-letter')[0];  // 获取地名键盘
	this.oplaceName = _this._plate.getElementsByClassName('place-name')[0];     // 获取数字键盘
	this.placeLetterLi = _this.placeLetter.getElementsByTagName('li');          // 获取所有地名li
	this.placeNameLi = _this.oplaceName.getElementsByTagName('li');             // 获取所有数字li
	this.shutDown = _this._plate.getElementsByClassName('shut-down')[0];        // 获取关闭
	// 循环数组遍历到dom中
	function placeStrs(arr) {
		var placeStr = '';
		for (var i in arr) {
			placeStr += '<li>' + arr[i] + '</li>';
		}
		return placeStr = '<ul>' + placeStr + '</ul>';
	}
	// 车牌键盘 
	function cyclicLi() {
		var okeyboards = '';
		var placeStr = placeStrs(place_name);  // 地名简称
		var letterStr = placeStrs(letter);     // 数字拼音
		placeStr = '<div class="place-name">' + placeStr + '</div>';
		letterStr = '<div class="place-letter">' + letterStr + '</div>';
		okeyboards += '<div class="keyboard">';
		okeyboards += '<div class="shut-down"><p>确定</p></div>';
		okeyboards += placeStr + letterStr;
		okeyboards += '</div>';
		return okeyboards;
	}
	// 显示地名键盘
	function showOplaceName() {
		show();
		_this.placeLetter.style.display = 'none';
		_this.oplaceName.style.display = 'block';
	}
	// 显示数字键盘
	function showPlaceLetter() {
		show();
		_this.oplaceName.style.display = 'none';
		_this.placeLetter.style.display = 'block';
	}
	// 显示键盘的方法
	function show() {
		_this.okeyboard.style.display = 'block';
	}
	// 隐藏键盘的方法
	this.hide = function () {
		_this.okeyboard.style.display = 'none';
	}
	// 给关闭按钮添加点击事件
	_this.shutDown.onclick = function () {
		_this.hide();
	}
	// 车牌键盘框索引
	var plateIndex = _this.plateNumber.length;
	// 判断车牌长度该显示哪个键盘
	function judgingLength() {
		if (plateIndex == 0) {
			showOplaceName()
		} else {
			showPlaceLetter()
		}
	}
	judgingLength();
	// 遍历车牌键盘框
	for(var i=0; i<_this.plateFrameLi.length; i++) {
		_this.plateFrameLi[i].index = i;
		_this.plateFrameLi[plateIndex].className = "active";
		_this.plateFrameLi[_this.plateFrameLi.length-1].className = "new";
		// 点击车牌框
		_this.plateFrameLi[i].onclick = function() {
			var index = this.index;
			plateIndex = index;
			init();
			if( index == 0 ) {
				showOplaceName();
			} else {
				showPlaceLetter();
			}
			// 修改车牌框样式
			for(var j=0; j<_this.plateFrameLi.length-1; j++) {
				_this.plateFrameLi[j].className = "";
			}
			_this.plateFrameLi[7].className = "new";
			this.className = "active";
		}
	}
	// 循环地名键盘
	for (var i = 0; i < _this.placeNameLi.length; i++) {
		_this.placeNameLi[i].index = i;
		var plength = _this.placeNameLi.length - 1;
		_this.placeNameLi[plength].classList.add("lastli");
		// 地名键盘点击
		_this.placeNameLi[i].onclick = function () {
			// 点击删除
			if (this.index == plength) {
				_this.plateFrameLi[plateIndex].innerHTML = "";
				_this.plateFrameLi[plateIndex].className = "";
				if(plateIndex == 0){
					showOplaceName();
					plateIndex = 0;
				}
				else {
					plateIndex--;
				}
				_this.plateFrameLi[plateIndex].className = "active";
			} else { // 点击给车牌框加值
				if(this.innerHTML !== "") {
					_this.plateFrameLi[plateIndex].innerHTML = this.innerHTML;
					_this.plateFrameLi[plateIndex].className = "";
					plateIndex++;
				}
				if(plateIndex > 0){
					showPlaceLetter();
				}
				_this.plateFrameLi[plateIndex].className = "active";
				init();
			}
		}
	}
	// 循环数字键盘
	for (var i = 0; i < _this.placeLetterLi.length; i++) {
		_this.placeLetterLi[i].index = i;
		var plength = _this.placeLetterLi.length - 1;
		_this.placeLetterLi[plength].classList.add("lastli");
		init();
		// 点击数字键盘
		_this.placeLetterLi[i].onclick = function () {
			if (this.index < plength) {
				// 把点击键盘上的值给车牌框
				if(this.innerHTML !== "")  {
					_this.plateFrameLi[plateIndex].innerHTML = this.innerHTML;
					_this.plateFrameLi[plateIndex].className = "";
					if(plateIndex == 6) {
						plateIndex = 6;
					}
					else if(plateIndex == 7) {
						plateIndex = 7;
					}
					else {
						plateIndex++;
					}
				}
				_this.plateFrameLi[plateIndex].className = "active";
				init();
			} else if (this.index == plength) {
				// _this.plateNumber = _this.plateNumber.substring(0, _this.plateNumber.length - 1)
				_this.plateFrameLi[plateIndex].innerHTML = "";
				_this.plateFrameLi[plateIndex].className = "";
				if(plateIndex == 1) {
					showOplaceName();
					plateIndex = 0;
				}
				else if(plateIndex == 0){
					plateIndex = 0;
				}
				else {
					plateIndex--;
				}
				init();
				_this.plateFrameLi[plateIndex].className = "active";
			}
		}
	}
	// 部分车牌键盘禁止点击
	function bannedClick(id, item) {
		id[item].classList.add("place-color");
	}
	// 清除键盘背景颜色
	function clear(num) {
		_this.placeLetterLi[num].classList.remove("place-color");
	}
	// 初始化键盘颜色
	function init() {
		if(plateIndex == 0) {
			for (var i = 31; i < 38; i++) {
				bannedClick(_this.placeNameLi, i);
			}
		}
		else if (plateIndex == 1) {
			bannedClick(_this.placeLetterLi, 18);
			bannedClick(_this.placeLetterLi, 19);
			bannedClick(_this.placeLetterLi, 29);
			bannedClick(_this.placeLetterLi, 37);
			for (var j = 0; j < 10; j++) {
				bannedClick(_this.placeLetterLi, j);
			}
		}
		else if (plateIndex > 1 && plateIndex < 6) {
			bannedClick(_this.placeLetterLi, 18);
			bannedClick(_this.placeLetterLi, 19);
			bannedClick(_this.placeLetterLi, 29);
			bannedClick(_this.placeLetterLi, 37);
			for (var k = 0; k < 10; k++) {
				clear(k);
			}
		}
		else if (plateIndex == 6) {
			for (var i = 0; i < _this.placeLetterLi.length; i++) {
				clear(i);
			}
		}
		else if (plateIndex == 7) {
			for (var i = 0; i < _this.placeLetterLi.length; i++) {
				clear(i);
			}
			bannedClick(_this.placeLetterLi, 18);
			bannedClick(_this.placeLetterLi, 19);
			bannedClick(_this.placeLetterLi, 29);
			bannedClick(_this.placeLetterLi, 37);
		}
	}
}