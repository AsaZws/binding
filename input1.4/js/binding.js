/* 
车牌数字键盘
name：Asa_Zhou
data：2019/3/8修改
*/
;$(function ($) {
    var oShut = $("#shut");         // 数字字母的关闭按钮
    var oShutkey = $("#shutkey");   // 数字字母键盘
    var oPlate = $("#plate");       // 车牌输入框
    var oOli = $("#keyboard li");   // 数字字母键盘的每个li
    var oArea = $("#area");         // 地名简称键盘
    var oOlia = $("#keyboarda li"); // 地名简称键盘上的每个li
    var oShuta = $("#shuta");       // 地方简称的关闭按钮

    oShut.click(function () {   // 点击关闭，关闭数字字母键盘
        oShutkey.slideUp(100);
    });
    oShuta.click(function () {  // 点击关闭，关闭地名简称键盘
        oArea.slideUp(100);
    });

    (function () {                  // 切换车牌号码框的函数
        function oshutkey() {       // 隐藏数字拼音键盘
            oShutkey.slideUp(200);
        };
        function oarea() {          // 显示地名简称键盘
            oArea.slideDown(200);
        };

        var oarr = ["粤","B"];  // 定义车牌数组，默认为深圳牌
        var ostr;               // 定义车牌字符串
        for (var i = 0; i < oOli.length; i++) {  // 遍历数字字母车牌
            oOli[i].index = i;                   // 获取键盘li的索引
            oOli[i].onclick = function () {      // 给每个键添加点击事件
                if ( oarr.length > 7 ) {         // 当长度大于8的时候，自动删除最后一位
                    oarr.length = 7;
                };
                oarr.push(this.innerText);       // 每点击一次就把当前的值添加到后面
                ostr = oarr.join("");            // 把数组中间的逗号变空,添加到字符串
                oPlate.attr("value", ostr);      // 把新数组添加到输入框中去
                console.log(oarr);
            }
        }
        $('#delet').click(function () {  // 删除
            oarr.splice(-1,1);           // 点击删除最后一个
            console.log(oarr);
            ostr = oarr.join("");        // 删除字符串中间的逗号
            oPlate.val(ostr);            // 把字符串添加到输入框里面
            if (ostr.length<1) {         // 如果回删到只剩一位，隐藏数字字母键盘，显示地方简称键盘
                oshutkey();
                oarea();
            }
            console.log(ostr);
        })
        for (i = 0; i < oOlia.length; i++) {      // 遍历地名
            oOlia[i].onclick = function () {      // 给地名键盘绑定点击事件
                oarr.push(this.innerText);        // 每次点击都把当前点击值添加到后面
                ostr = oarr.join("");             // 把字符串中间的逗号变空
                oPlate.attr("value", ostr);       // 把新加在数组中的数添加到输入框中去
                if ( oPlate.val().length > 0 ) {  // 当输入框中长度大于1，关闭地名简称键盘，自动调出数字拼音键盘
                    oArea.slideUp(200);
                    oShutkey.slideDown(200);
                }
            }
        }
        oPlate.bind("click", function () {       // 给车牌框绑定点击事件
            if ( oPlate.val().length > 0 ) {     // 如果车牌框里面的车牌号码长度大于1，则显示数字字母键盘，隐藏地名简称键盘
                oShutkey.slideDown(200);
                oArea.slideUp(200);
            } else {
                oArea.slideDown(200);
                oShutkey.slideUp(200);
            };
        });
    })();
});