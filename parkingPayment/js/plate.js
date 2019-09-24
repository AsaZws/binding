var PVS = ['京', '津', '沪', '渝', '蒙', '新', '藏', '宁', '桂', '黑', '吉', '辽', '晋', '冀', '青', '鲁', '豫', '苏', '皖', '浙', '闽', '赣', '湘', '鄂', '琼', '甘', '陕', '粤', '云', '贵', '川', '', '', '', '', '', '', '', '<span>x</span>'];
var NUM = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'P', '港', '澳', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', '学', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '警', '<span>x</span>'];
var plate_umber = ['', '', '', '', '', '', '', ''];
function Plate(id) {
	this._plate = document.getElementById(id);                   								// 获取对象
	var _this = this;                                            								// 保存this
	this.plateNumber = _this._plate.getAttribute("plateNumbers");								// 获取自定义车牌号码
	// 将自定义属性的车牌值赋给车牌数组
	for(var i=0; i<_this.plateNumber.length; i++) {
		plate_umber[i] = _this.plateNumber[i];
	}
	// 车牌键盘框索引
	var plateIndex = _this.plateNumber.length;
	// this._plate.insertAdjacentHTML('beforeend', cyclicLi(NUM));              		// 将循环的键循环进去
	init(plateIndex)
	this.plateFrame = _this._plate.getElementsByClassName("plate-frame")[0];  	// 车牌键盘框
	this.plateFrame.innerHTML = placeStrs(plate_umber);												  // 创建车牌键盘框
	this.plateFrameLi = _this.plateFrame.getElementsByTagName("li");						// 键盘框li
	this.okeyboard = _this._plate.getElementsByClassName('keyboard')[0];        // 渲染完成获取键盘
	this.placeLetter = _this._plate.getElementsByClassName('place-letter')[0];  // 获取地名键盘
	this.placeLetterLi = _this.placeLetter.getElementsByTagName('li');          // 获取所有地名li
	this.shutDown = _this._plate.getElementsByClassName('shut-down')[0];        // 获取关闭
	// 循环数组
	function placeStrs(arr) {
		var placeStr = '';
		for (var i in arr) {
			placeStr += '<li>' + arr[i] + '</li>';
		}
		return placeStr = '<ul>' + placeStr + '</ul>';
	}
	// 返回车牌结构
	function cyclicLi(key) {
		return '<div class="keyboard">\
					  <div class="shut-down"><p>确定</p></div>\
						<div class="place-letter">' + placeStrs(key) + '</div>\
						</div>'
	}
	// 显示键盘
	this.show = function () {
		_this.okeyboard.style.display = 'block';
	}
	// 隐藏键盘
	this.hide = function () {
		_this.okeyboard.style.display = 'none';
	}
	// 点击确定，隐藏键盘
	// this.shutDown.addEventListener("click", function(event) {
	// 	_this.hide();
	// })
	this.shutDown.onclick = function () {
		_this.hide();
	}
	// init(plateIndex);
	// 显示地名键盘
	function showOplaceName() {
		// _this.show();
		// _this._plate.removeChild(_this._plate.lastChild)
		_this._plate.insertAdjacentHTML('beforeend', cyclicLi(PVS));
		// _this._plate.replaceChild(cyclicLi(PVS), _this.okeyboard);
	}
	// 显示数字键盘
	function showPlaceLetter() {
		_this.show();
		// _this._plate.removeChild(_this._plate.lastChild)
		// _this._plate.insertAdjacentHTML('beforeend', cyclicLi(NUM));
		_this._plate.replaceChild(cyclicLi(NUM), _this.okeyboard);
	}
	// 遍历车牌键盘框
	this.inputBox = function () {
		_this.plateNumber = '';
		for(var i=0; i<_this.plateFrameLi.length; i++) {
			_this.plateFrameLi[i].index = i;
			_this.plateFrameLi[plateIndex].className = "active";
			_this.plateFrameLi[_this.plateFrameLi.length-1].className = "new";
			// 点击车牌框
			_this.plateFrameLi[i].onclick = function() {
				_this.show();
				plateIndex = this.index;
				// init(plateIndex);
				// 修改车牌框样式
				for(var j=0; j<_this.plateFrameLi.length-1; j++) {
					_this.plateFrameLi[j].className = "";
				}
				if(_this.plateFrameLi[_this.plateFrameLi.length-1].innerHTML == '') {
					_this.plateFrameLi[_this.plateFrameLi.length-1].className = "new";
				}
				this.className = "active";
			}
			_this.plateNumber += _this.plateFrameLi[i].innerHTML;
		}
	}
	this.inputBox();
	// 循环数字键盘
	function keyboard() {
		for (var i = 0; i < _this.placeLetterLi.length; i++) {
			_this.placeLetterLi[i].index = i;
			var plength = _this.placeLetterLi.length - 1;
			_this.placeLetterLi[plength].classList.add("lastli");
			// init(plateIndex);
			// 点击数字键盘
			_this.placeLetterLi[i].onclick = function () {
				if (this.index < plength) {
					// 把点击键盘上的值给车牌框
					if(this.innerHTML !== "")  {
						_this.plateFrameLi[plateIndex].innerHTML = this.innerHTML;
						_this.plateFrameLi[plateIndex].className = "";
						if(plateIndex == _this.plateFrameLi.length-2) {
							plateIndex = _this.plateFrameLi.length-2;
						}
						else if(plateIndex == _this.plateFrameLi.length-1) {
							plateIndex = _this.plateFrameLi.length-1;
						}
						else {
							plateIndex++;
						}
					}
					_this.plateFrameLi[plateIndex].className = "active";
					// init();
				} else if (this.index == plength) {
					_this.plateFrameLi[plateIndex].innerHTML = "";
					_this.plateFrameLi[plateIndex].className = "";
					if(plateIndex == 1) {
						plateIndex = 0;
					}
					else if(plateIndex == 0){
						plateIndex = 0;
					}
					else {
						plateIndex--;
					}
					// init();
					_this.plateFrameLi[plateIndex].className = "active";
					if(_this.plateFrameLi[_this.plateFrameLi.length-1].innerHTML == '') {
						_this.plateFrameLi[_this.plateFrameLi.length-1].className = "new";
					}
				}
			}
		}
	}
	keyboard();
	// 部分车牌键盘禁止点击
	function bannedClick(id, item) {
		id[item].classList.add("place-color");
	}
	// 清除键盘背景颜色
	function clear(num) {
		_this.placeLetterLi[num].classList.remove("place-color");
	}
	// 初始化键盘颜色
	function init(index) {
		if(index == 0) {
			showOplaceName()
			for (var i = 31; i < 38; i++) {
				bannedClick(_this.placeLetterLi, i);
			}
		}
		else if (index == 1) {
			showPlaceLetter()
			bannedClick(_this.placeLetterLi, 18);
			bannedClick(_this.placeLetterLi, 19);
			bannedClick(_this.placeLetterLi, 29);
			bannedClick(_this.placeLetterLi, 37);
			for (var j = 0; j < 10; j++) {
				bannedClick(_this.placeLetterLi, j);
			}
		}
		else if (index > 1 && index < 6) {
			showPlaceLetter()
			bannedClick(_this.placeLetterLi, 18);
			bannedClick(_this.placeLetterLi, 19);
			bannedClick(_this.placeLetterLi, 29);
			bannedClick(_this.placeLetterLi, 37);
			for (var k = 0; k < 10; k++) {
				clear(k);
			}
		}
		else if (index == 6) {
			showPlaceLetter()
			for (var i = 0; i < _this.placeLetterLi.length; i++) {
				clear(i);
			}
		}
		else if (index == 7) {
			showPlaceLetter()
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