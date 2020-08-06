;(function(win, doc){

	var PVS = ['京', '津', '沪', '渝', '蒙', '新', '藏', '宁', '桂', '黑', '吉', '辽', '晋', '冀', '青', '鲁', '豫', '苏', '皖', '浙', '闽', '赣', '湘', '鄂', '琼', '甘', '陕', '粤', '云', '贵', '川', '', '', '', '', '', '', '', '<span>x</span>'];
	var NUM = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'P', '港', '澳', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', '学', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '警', '<span>x</span>'];
	var PNUM = ['', '', '', '', '', '', '', ''];

	function Plate(p) {
		this._plate = doc.querySelector(p.id);
		// 获取自定义初始车牌数组
		this.plateNumber = p.initPlateNumber.split('');
		// 获取车牌框初始索引
		this.plateIndex = this.plateNumber.length;
		this.isShow = p.isShow;
		// console.log(this.__proto__.init);
		// this.__proto__.init();
	}

	Plate.prototype = {
		init: function () {
			this.initHtml();
			this.bindEvent();
			this.keyboardEvent();
			this.isShow ? this.show() : this.hide();
		},
		initHtml: function () {
			var _self = this;
			// 将初始车牌数组赋值给车牌数组
			for(var i=0; i<_self.plateIndex; i++) {
				PNUM[i] = _self.plateNumber[i]; 
			}
			var html = '<p>请输入车牌</p><div class="plate">';
				html += '<div class="plate-frame"></div>';
				html += '<div class="plate-button">'
				html += '<a href="javascript:;" class="queryDetail noquery">查询</a>';
				html += '</div></div>';
				html += '<div class="keyboard"><div class="shut-down"><p>确定</p></div>';
				html += '<div class="place-letter"></div>';
				html += '</div>'
			_self._plate.innerHTML = html;
			// 获取车牌框
			this.plateFrame = this._plate.querySelector(".plate-frame");
			// 将初始车牌的值渲染到车牌框
			this.plateFrame.innerHTML = placeStrs(PNUM);
			// 获取车牌框li
			this.plateFrameLi = this.plateFrame.getElementsByTagName("li");
			 // 获取键盘
			this.placeLetter = this._plate.querySelector('.place-letter');
			// 渲染完成获取键盘
			this.okeyboard = this._plate.querySelector('.keyboard');
			// 获取键盘li
			this.placeLetterLi = this.placeLetter.getElementsByTagName('li');
			// 根据初始车牌的长度为0渲染地名键盘，否则渲染数字字母键盘
			this.plateIndex == 0 ? this.placeLetter.innerHTML = placeStrs(PVS) : this.placeLetter.innerHTML = placeStrs(NUM);
			// 获取关闭
			this.shutDown = this._plate.querySelector('.shut-down');
			// 查询按钮
			this.queryDetail = this._plate.querySelector('.queryDetail');
			// 点击关闭隐藏键盘、车牌框显示按钮，将点击将this改变为Plate对象
			this.shutDown.addEventListener("click", function() {
				this.hide();
			}.bind(this))
			this.plateFrame.addEventListener("click", function() {
				this.show();
			}.bind(this))
		},
		hide: function () {
			// 隐藏键盘
			this.okeyboard.style.display = 'none';
		},
		show: function () {
			// 显示键盘
			this.okeyboard.style.display = 'block';
		},
		bindEvent: function () {
			var _self = this;
			var len = this.plateFrameLi.length;
			// 初始化车牌框样式
			_self.plateFrameLi[len-1].className = "new";
			_self.plateFrameLi[this.plateIndex].className = "active";
			for(var i=0; i<len; i++) {
				_self.plateFrameLi[i].index = i;
				_self.plateFrameLi[i].onclick = function() {
					_self.plateIndex = this.index;
					for(var j=0; j<len-1; j++) {
						// 先清除所有车牌框的class
						_self.plateFrameLi[j].className = "";
						if(_self.plateFrameLi[len-1].innerHTML == '') {
							// 如果新能源车牌框为空，则不去掉class，反之去掉
							_self.plateFrameLi[len-1].className = "new";
						}
						// 给点击当前车牌框加class
						this.className = "active";
						_self.showOplaceName();
						// 根据车牌框索引，改变键盘颜色
						_self.initColor(_self.plateIndex);
					}
				}
			}

		},
		keyboardEvent: function () {
			var _self = this;
			var len = this.placeLetterLi.length;
			// 最后一个添加class
			_self.placeLetterLi[len-1].classList.add("lastli");
			_self.initColor(_self.plateIndex);
			for (var i = 0; i < len; i++) {
				_self.placeLetterLi[i].index = i;
				_self.showPlaceLetter();
				_self.placeLetterLi[i].onclick = function () {
					// 判断非空非删除键
					if (this.index < len-1 && this.innerText !== "") {
						// 取值赋值
						_self.plateFrameLi[_self.plateIndex].innerHTML = this.innerHTML;
						_self.plateFrameLi[_self.plateIndex].className = "";
						// 点击到新能源前一位，索引不变
						if(_self.plateIndex == _self.plateFrameLi.length-2) {
							_self.plateIndex = _self.plateFrameLi.length-2;
							_self.hide();
						}
						// 点击到新能源，索引不变
						else if(_self.plateIndex == _self.plateFrameLi.length-1) {
							_self.plateIndex = _self.plateFrameLi.length-1;
							_self.hide();
						}
						// 其他情况索引累加
						else {
							_self.plateIndex++;
						}
						// 当前添加class
						_self.plateFrameLi[_self.plateIndex].className = "active";
					}
					// 点击删除
					else if (this.index == len-1) {
						_self.plateFrameLi[_self.plateIndex].innerHTML = "";
						_self.plateFrameLi[_self.plateIndex].className = "";
						// 删除到最后一个的时候，索引不变
						if(_self.plateIndex == 1 || _self.plateIndex == 0) {
							_self.plateIndex = 0;
						}
						else {
							_self.plateIndex--;  // 索引累减
						}
						// 当前添加class
						_self.plateFrameLi[_self.plateIndex].className = "active";
						if(_self.plateFrameLi[_self.plateFrameLi.length-1].innerHTML == '') {
							// 车牌框最后一个为空的时候，添加新能源class
							_self.plateFrameLi[_self.plateFrameLi.length-1].className = "new";
						}
					}
					// 根据索引初始化键盘颜色
					_self.initColor(_self.plateIndex);
					// 去除禁止点击按钮
					_self.forbidClick();
				}
			}
		},
		initColor: function (index) {
			var len = this.placeLetterLi.length;
			if(index == 0) {
				this.showOplaceName()
				for (var i = 0; i < len; i++) {
					clear(this.placeLetterLi, i);
				}
				for (var i = 31; i < 38; i++) {
					bannedClick(this.placeLetterLi, i);
				}
			}
			else if (index == 1) {
				this.showPlaceLetter();
				for (var i = 0; i < len; i++) {
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
				for (var i = 0; i < len; i++) {
					clear(this.placeLetterLi, i);
				}
			}
			else if (index == 7) {
				this.showPlaceLetter();
				for (var i = 0; i < len; i++) {
					clear(this.placeLetterLi, i);
				}
				bannedClick(this.placeLetterLi, 18);
				bannedClick(this.placeLetterLi, 19);
				bannedClick(this.placeLetterLi, 29);
				bannedClick(this.placeLetterLi, 37);
			}
		},
		forbidClick: function () {
			// 获取前先清空
			var len = this.plateNumber.length = 0;
			console.log(len);
			// 存车牌
			for (var i = 0; i < this.plateFrameLi.length; i++) {
				if(len <= 8 && this.plateFrameLi[i].innerHTML !== '') {
					this.plateNumber.push(this.plateFrameLi[i].innerHTML)
				}
			}
			// 如果前7位车牌有空，则清空车牌
			for (var j = 0; j < this.plateFrameLi.length-1; j++) {
				if (this.plateFrameLi[j].innerHTML == '') {
					len = 0;
				}
			}
			// 车牌长度大于6位，可以点击
			if(len > 6 && this.queryDetail.className.indexOf("noquery") > -1) {
				this.queryDetail.classList.remove("noquery");
			}
			// 车牌长度小于7位，并且没有noquery则添加noquery
			else if(len < 7 && this.queryDetail.className.indexOf("noquery") <= -1) {
				this.queryDetail.classList.add("noquery");
			}
		},
		// 循环车牌简称
		showOplaceName: function () {
			for (var i = 0; i < this.placeLetterLi.length; i++) {
				this.placeLetterLi[i].innerHTML = PVS[i];
			}
		},
		// 循环车牌字母数字
		showPlaceLetter: function () {
			for (var i = 0; i < this.placeLetterLi.length; i++) {
				this.placeLetterLi[i].innerHTML = NUM[i];
			}
		}
	}

	// 返回一个ul包含li的结构
	function placeStrs(arr) {
		var placeStr = '';
		for (var i in arr) {
			placeStr += '<li>' + arr[i] + '</li>';
		}
		return placeStr = '<ul>' + placeStr + '</ul>';
	}
	// 清除背景颜色，可以点击
	function clear(id, num) {
		id[num].classList.remove("place-color");
	}
	// 添加背景颜色,禁止点击
	function bannedClick(id, item) {
		id[item].classList.add("place-color");
	}

	win.Plate = Plate;

 })(window, document);