
;$(function ($) {
    // 获取键盘上的关闭按钮
    var oShut = $("#shut");
    // 获取键盘的id
    var oShutkey = $("#shutkey");
    // 获取车牌输入框的id
    var oPlate = $("#plate");
    // 获取数字拼音软键盘的每个值
    var oOli = $("#keyboard li");
    // 获取地名简称软键盘的每个值
    var oOlia = $("#keyboarda li");
    // 获取地方简称键盘的id
    var oArea = $("#area");
    // 获取地方简称的关闭按钮
    var oShuta = $("#shuta");
    // 获取车牌号id
    var oBinding = $("#binding");

    // 点击关闭，关闭键盘
    oShut.click(function () {
        oShutkey.slideUp(100);
    });
    // 点击关闭，关闭地名键盘
    oShuta.click(function () {
        oArea.slideUp(100);
    });

    // 切换车牌号码框的函数
    (function () {

        // 隐藏数字拼音键盘
        function oshutkey() {
            oShutkey.slideUp(200);
        };
        // 显示地名简称键盘
        function oarea() {
            oArea.slideDown(200);
        };

        // 定义车牌数组
        var oarr = [];
        // 定义车牌字符串
        var ostr;

        // 遍历li
        for (var i = 0; i < oOli.length; i++) {
            // 获取键盘li的索引
            oOli[i].index = i;
            // 给每个li添加点击事件
            oOli[i].onclick = function () {
                // 每点击一次就把当前的值添加到后面
                oarr.push(this.innerText);
                // 把数组中间的逗号变空,添加到字符串
                ostr = oarr.join("");
                // 把新数组添加到输入框中去
                oPlate.attr("value", ostr);
                // 当长度大于7的时候，自动删除最后一位
                if ( oarr.length > 7 ) {
                    oarr.length = 7;
                };
                console.log(ostr);
            }
        }
        // 删除
        $('#delet').click(function () {
            // 点击删除最后一个
            oarr.splice(-1,1);
            // 删除字符串中间的逗号
            ostr = oarr.join("");
            // 把字符串添加到输入框里面
            oPlate.val(ostr);
            // 如果回删到
            if (ostr.length<1) {
                // 调用隐藏拼音函数
                oshutkey();
                // 调用显示地名函数
                oarea();
            }
            console.log(ostr);
        })

        // 遍历地名
        for (i = 0; i < oOlia.length; i++) {
            // 给地名键盘绑定点击事件
            oOlia[i].onclick = function () {
                // 每次点击都把当前点击值添加到后面
                oarr.push(this.innerText);
                // 把字符串中间的逗号变空
                ostr = oarr.join("")
                // 把新加在数组中的数添加到输入框中去
                oPlate.attr("value", ostr);
                // 当输入框中长度大于1，关闭地名简称键盘，自动调出数字拼音键盘
                if ( ostr.length > 0 ) {
                    oArea.slideUp(200);
                    oShutkey.slideDown(200);
                }
            }
        }
        
        // 给车牌框绑定点击事件
        oPlate.bind("click", function () {
            if ( oarr.length > 0 ) {
                oShutkey.slideDown(200);
                oArea.slideUp(200);
            } else {
                // 调用显示数字拼音函数
                oshutkey();
                // 调用隐藏地名简称函数
                oarea();
            };
        });

        // 点击获取输入的车牌号
        oBinding.click(function () {
            // 获取到车牌号码
            // oPlateNum.text(ostr);
        });
    })();
});