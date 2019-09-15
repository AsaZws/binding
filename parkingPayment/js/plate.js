/* 车牌数字键盘 name：Asa_Zhou data：2019/7/03修改完成 */
var place_name = ['京', '津', '沪', '渝', '蒙', '新', '藏', '宁', '桂', '黑', '吉', '辽', '晋', '冀', '青', '鲁', '豫', '苏', '皖', '浙', '闽', '赣', '湘', '鄂', '琼', '甘', '陕', '粤', '云', '贵', '川', '', '', '', '', '', '', '', '<span>x</span>'];
var letter = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'P', '港', '澳', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', '学', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '警', '<span>x</span>'];
var plate_umber = ['粤', 'B', '', '', '', '', '', ''];
function Plate(id) {
	this._plate = document.getElementById(id);                   // 获取对象
	var _this = this;                                            // 保存this
	this.plateNumber = "粤B";
	var plateFrame = _this._plate.getElementsByClassName("plate-frame")[0];  // 车牌框

	// 循环数组遍历到dom中
	function placeStrs(arr) {
		var placeStr = '';
		for (var i in arr) {
			placeStr += '<li>' + arr[i] + '</li>';
		}
		placeStr = '<ul>' + placeStr + '</ul>';
		return placeStr;
	}
	plateFrame.innerHTML =  placeStrs(plate_umber);

	var plateFrameLi = plateFrame.getElementsByTagName("li");

	function cyclicLi() {                 // 存循环键盘数组的值
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
	_this._plate.insertAdjacentHTML('beforeend', cyclicLi());              // 将循环的键循环进去
	var okeyboard = _this._plate.getElementsByClassName('keyboard')[0];         // 渲染完成获取键盘
	var placeLetter = _this._plate.getElementsByClassName('place-letter')[0];   // 获取地名键盘
	var oplaceName = _this._plate.getElementsByClassName('place-name')[0];      // 获取数字键盘
	var placeLetterLi = placeLetter.getElementsByTagName('li');           // 获取所有地名li
	var placeNameLi = oplaceName.getElementsByTagName('li');              // 获取所有地名li
	var shutDown = _this._plate.getElementsByClassName('shut-down')[0];         // 获取关闭
	
	function judgingLength() {                                          // 判断车牌长度该显示哪个键盘
		if (_this.plateNumber.length < 1) {
			showOplaceName()
		} else {
			showPlaceLetter()
		}
	}
	judgingLength();
	// 显示地名键盘
	function showOplaceName() {
		show();
		placeLetter.style.display = 'none';
		oplaceName.style.display = 'block';
	}
	// 显示地名键盘
	function showPlaceLetter() {
		show();
		oplaceName.style.display = 'none';
		placeLetter.style.display = 'block';
	}
	// 显示键盘的方法
	function show() {
		okeyboard.style.display = 'block';
	}
	// 隐藏键盘的方法
	function hide() {
		okeyboard.style.display = 'none';
	}
	shutDown.onclick = function () {            // 给关闭按钮添加点击事件
		hide();
	}
	// 创建键盘框
	// showPlateFrame();
	var plateIndex = 2;
	for(var i=0; i<plateFrameLi.length; i++) {
		plateFrameLi[i].index = i;
		plateFrameLi[plateIndex].className = "active";
		plateFrameLi[plateFrameLi.length-1].className = "new";
		plateFrameLi[i].onclick = function() {
			var index = this.index;
			plateIndex = index;
			if( index == 0 ) {
				showOplaceName();
			} else {
				showPlaceLetter();
			}
			// 去掉所有的class
			for(var j=0; j<plateFrameLi.length-1; j++) {
				plateFrameLi[j].className = "";
			}
			plateFrameLi[7].className = "new";
			this.className = "active";
		}
	}
	for (var i = 0; i < placeNameLi.length; i++) {
		placeNameLi[i].index = i;
		var plength = placeNameLi.length - 1;          // 获取循环中最后的一个索引
		placeNameLi[plength].classList.add("lastli");

		placeNameLi[i].onclick = function () {  // 给循环的每个li添加点击事件，并将值添加到输入框中
			if (this.index == plength) {               // 当键盘最后一位为删除的时候就自动删除车牌键盘的最后一位
				_this.plateNumber = _this.plateNumber.substring(0, _this.plateNumber.length - 1)
			} else {
				_this.plateNumber += this.innerHTML;		
				init();
			}
			if (_this.plateNumber.length > 0) { judgingLength(); }
		}
	}
	for (var i = 0; i < placeLetterLi.length; i++) {        // 循环数字键盘
		placeLetterLi[i].index = i;
		var plength = placeLetterLi.length - 1;          // 获取循环中最后的一个索引
		placeLetterLi[plength].classList.add("lastli");
		init();                                        // 当车牌初次循环出来的时候，初始化这个函数
		placeLetterLi[i].onclick = function () {       // 给循环的每个li添加点击事件，并将值添加到输入框中 
			if (this.index < plength) {                      // 点击车牌键盘就把键盘值添加到车牌输入框里面
				_this.plateNumber += this.innerHTML;
				init();
			} else if (this.index == plength) {             // 当键盘最后一位为删除的时候就自动删除车牌键盘的最后一位
				_this.plateNumber = _this.plateNumber.substring(0, _this.plateNumber.length - 1)
				init();
				if (_this.plateNumber.length < 1) { judgingLength(); } // 当删除到最后一位的时候，就隐藏数字键盘，弹起地名键盘
			};
			if (_this.plateNumber.length > 7) {                           // 当车牌长度大于7位的时候就自动删除最后一位
				_this.plateNumber = _this.plateNumber.substring(0, _this.plateNumber.length - 1);
				init();
			};
			if (_this.plateNumber.length > 6) {                           // 当车牌长度大于6位的时候就隐藏键盘
				hide();
			};
			// 把点击键盘上的值给车牌框
			plateFrameLi[plateIndex].innerHTML = this.innerHTML;
			plateFrameLi[plateIndex].className = "";
			if(plateIndex == 6) {
				plateIndex = 6
			} else {
				plateIndex++;
			}
			plateFrameLi[plateIndex].className = "active";
			console.log(plateIndex);
			
		}
	}
	function tab(item) {                     // 键盘的背景颜色改变
		placeLetterLi[item].classList.add("place-color");
	}
	function clear(num) {                    // 清除键盘背景颜色
		placeLetterLi[num].classList.remove("place-color");
	}
	// 初始化键盘颜色
	function init() {
		if (_this.plateNumber.length == 1) {
			tab(18);
			tab(19);
			tab(29);
			tab(37);
			for (var j = 0; j < 10; j++) {
				tab(j);
			}
		} else if (_this.plateNumber.length == 2) {
			for (var k = 0; k < 10; k++) {
				clear(k);
			}
		} else if (_this.plateNumber.length == 6) {
			clear(18);
			clear(19);
			clear(29);
			clear(37);
		} else if (_this.plateNumber.length == 7) {
			tab(18);
			tab(19);
			tab(29);
			tab(37);
		}
	}
}