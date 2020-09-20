;(function(win, doc){

	var PVS = ['京', '津', '沪', '渝', '蒙', '新', '藏', '宁', '桂', '黑', '吉', '辽', '晋', '冀', '青', '鲁', '豫', '苏', '皖', '浙', '闽', '赣', '湘', '鄂', '琼', '甘', '陕', '粤', '云', '贵', '川', '', '', '', '', '', '', '', '<span>x</span>'];
	var NUM = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'P', '港', '澳', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', '学', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '警', '<span>x</span>'];
	var PNUM = ['', '', '', '', '', '', '', ''];
	var pvsLength = PVS.length;
	var numLength = NUM.length;
	var pnumLength = PNUM.length;

	function parkingKeyBoard(p) {
		this.pId = doc.querySelector(p.id);
		// 获取自定义初始车牌数组
		this.pNumber = p.initNumber.split('');
		// 获取车牌框初始索引
		this.pIndex = this.pNumber.length;
		this.isShow = p.isShow;
		this.init();
	}

	parkingKeyBoard.prototype = {
		init: function() {
			this.initHtml();
			this.bindEvent();
			this.keyboardEvent();
			this.isShow ? this.show() : this.hide();
		},
		initHtml: function() {
			var _self = this;
			// 将初始车牌数组赋值给车牌数组
			for(var i=0; i<_self.pIndex; i++) {
				PNUM[i] = _self.pNumber[i];
			}
			var html = '<p>请输入车牌</p><div class="plate">';
				html += '<div class="plate-frame"></div>';
				html += '<div class="plate-button">';
				html += '<a href="javascript:;" class="queryDetail noquery">查询</a>';
				html += '</div></div>';
				html += '<div class="keyboard"><div class="shut-down"><p>确定</p></div>';
				html += '<div class="place-letter"></div>';
				html += '</div>'
			_self.pId.innerHTML = html;
			// 获取车牌框
			this.pFrame = this.pId.querySelector(".plate-frame");
			// 将初始车牌的值渲染到车牌框
			this.pFrame.innerHTML = placeStrs(PNUM);
			// 获取车牌框li
			this.pFrameLi = this.pFrame.getElementsByTagName("li");
			 // 获取键盘
			this.pLetter = this.pId.querySelector('.place-letter');
			// 渲染完成获取键盘
			this.okeyboard = this.pId.querySelector('.keyboard');
			// 获取键盘li
			this.pLetterLi = this.pLetter.getElementsByTagName('li');
			// 根据初始车牌的长度为0渲染地名键盘，否则渲染数字字母键盘
			this.pIndex == 0 ? this.pLetter.innerHTML = placeStrs(PVS) : this.pLetter.innerHTML = placeStrs(NUM);
			// 获取关闭
			this.shutDown = this.pId.querySelector('.shut-down');
			// 查询按钮
			this.queryDetail = this.pId.querySelector('.queryDetail');
			// 点击关闭隐藏键盘、车牌框显示按钮，将点击将this改变为Plate对象
			this.shutDown.addEventListener("click", function() {
				this.hide();
			}.bind(this))
			this.pFrame.addEventListener("click", function() {
				this.show();
			}.bind(this))
		},
		hide: function() {
			// 隐藏键盘
			this.okeyboard.style.display = 'none';
		},
		show: function() {
			// 显示键盘
			this.okeyboard.style.display = 'block';
		},
		// 车牌框绑定点击事件
		bindEvent: function() {
			var _self = this;
			// 车牌长度
			var len = pnumLength;
			// 初始化车牌框样式
			_self.pFrameLi[len-1].className = "new";
			_self.pFrameLi[this.pIndex].className = "active";
			for(var i=0; i<len; i++) {
				_self.pFrameLi[i].index = i;
				_self.pFrameLi[i].onclick = function() {
					_self.pIndex = this.index;
					for(var j=0; j<len-1; j++) {
						// 先清除所有车牌框的class
						_self.pFrameLi[j].className = "";
						if(_self.pFrameLi[len-1].innerHTML == '') {
							// 如果新能源车牌框为空，则不去掉class，反之去掉
							_self.pFrameLi[len-1].className = "new";
						}
						// 给点击当前车牌框加class
						this.className = "active";
						_self.showOplaceName();
						// 根据车牌框索引，改变键盘颜色
						_self.initColor(_self.pIndex);
					}
				}
			}
		},
		// 键盘绑定点击事件
		keyboardEvent: function() {
			var _self = this;
			var len = this.pLetterLi.length;
			// 最后一个添加class
			_self.pLetterLi[len-1].classList.add("lastli");
			_self.initColor(_self.pIndex);
			for (var i = 0; i < len; i++) {
				_self.pLetterLi[i].index = i;
				_self.showPlaceLetter();
				_self.pLetterLi[i].onclick = function() {
					// 判断非空非删除键
					if (this.index < len-1 && this.innerText !== "") {
						// 取值赋值
						_self.pFrameLi[_self.pIndex].innerText = this.innerText;
						_self.pFrameLi[_self.pIndex].className = "";
						// 点击到新能源前一位，索引不变
						if(_self.pIndex == pnumLength-2) {
							_self.pIndex = pnumLength-2;
							_self.hide();
						}
						// 点击到新能源，索引不变
						else if(_self.pIndex == pnumLength-1) {
							_self.pIndex = pnumLength-1;
							_self.hide();
						}
						// 其他情况索引累加
						else {
							_self.pIndex++;
						}
						// 当前添加class
						_self.pFrameLi[_self.pIndex].className = "active";
						// _self.pNumber.push(this.innerText);
						// console.log(this.innerText);
					}
					// 点击删除
					else if (this.index == len-1) {
						_self.pFrameLi[_self.pIndex].innerText = "";
						_self.pFrameLi[_self.pIndex].className = "";
						// 删除到最后一个的时候，索引不变
						if(_self.pIndex == 1 || _self.pIndex == 0) {
							_self.pIndex = 0;
						}
						else {
							_self.pIndex--;  // 索引累减
						}
						// 当前添加class
						_self.pFrameLi[_self.pIndex].className = "active";
						if(_self.pFrameLi[pnumLength-1].innerText == '') {
							// 车牌框最后一个为空的时候，添加新能源class
							_self.pFrameLi[pnumLength-1].className = "new";
						}
					}
					// 根据索引初始化键盘颜色
					_self.initColor(_self.pIndex);
					// 去除禁止点击按钮
					_self.forbidClick();
				}
			}
		},
		// 获取车牌和激活查询按钮
		forbidClick: function() {
			this.pNumber.length = 0;
			for (var j = 0; j < pnumLength-2; j++) {
				// 如果前6位车牌有空，则清空车牌
				if (this.pFrameLi[j].innerText == '') {
					this.pNumber.length = 0;
				}
			}
			// 遍历车牌框存车牌
			for (var i = 0; i < pnumLength; i++) {
				if(this.pNumber.length <= 8 && this.pFrameLi[i].innerText !== '') {
					this.pNumber.push(this.pFrameLi[i].innerText);
				}
			}
			if(this.pNumber.length > 6 && this.queryDetail.className.indexOf("noquery") == 12) {
				this.queryDetail.classList.remove("noquery");
			}
			// 车牌长度小于7位，并且没有noquery则添加noquery
			else if(this.pNumber.length < 7 && this.queryDetail.className.indexOf("noquery") == -1) {
				this.queryDetail.classList.add("noquery");
			}
		},
		// 根据键盘索引初始化键盘背景颜色
		initColor: function(index) {
			var len = this.pLetterLi.length;
			if(index == 0) {
				this.showOplaceName()
				for (var i = 0; i < len; i++) {
					clear(this.pLetterLi, i);
				}
				for (var i = 31; i < 38; i++) {
					bannedClick(this.pLetterLi, i);
				}
			}
			else if (index == 1) {
				this.showPlaceLetter();
				for (var i = 0; i < len; i++) {
					clear(this.pLetterLi, i);
				}
				bannedClick(this.pLetterLi, 18);
				bannedClick(this.pLetterLi, 19);
				bannedClick(this.pLetterLi, 29);
				bannedClick(this.pLetterLi, 37);
				for (var j = 0; j < 10; j++) {
					bannedClick(this.pLetterLi, j);
				}
			}
			else if (index > 1 && index < 6) {
				this.showPlaceLetter();
				bannedClick(this.pLetterLi, 18);
				bannedClick(this.pLetterLi, 19);
				bannedClick(this.pLetterLi, 29);
				bannedClick(this.pLetterLi, 37);
				for (var k = 0; k < 10; k++) {
					clear(this.pLetterLi, k);
				}
			}
			else if (index == 6) {
				this.showPlaceLetter();
				for (var i = 0; i < len; i++) {
					clear(this.pLetterLi, i);
				}
			}
			else if (index == 7) {
				this.showPlaceLetter();
				for (var i = 0; i < len; i++) {
					clear(this.pLetterLi, i);
				}
				bannedClick(this.pLetterLi, 18);
				bannedClick(this.pLetterLi, 19);
				bannedClick(this.pLetterLi, 29);
				bannedClick(this.pLetterLi, 37);
			}
		},
		// 循环地名简称
		showOplaceName: function() {
			for (var i = 0; i < pvsLength; i++) {
				this.pLetterLi[i].innerHTML = PVS[i];
			}
		},
		// 循环车牌字母数字
		showPlaceLetter: function() {
			for (var i = 0; i < numLength; i++) {
				this.pLetterLi[i].innerHTML = NUM[i];
			}
		}
	}
	win.parkingKeyBoard = parkingKeyBoard;
})(window, document);
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