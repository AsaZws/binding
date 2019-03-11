/**
 * 只在车牌页面加载
 * 车牌数字键盘js
 * name:Asa_Zhou
 * data:2019/3/8
 * 
 */
(function($) {
  var oShut = $("#shut");         // 数字字母键盘关闭按钮
  var oShutkey = $("#shutkey");   // 数字字母键盘
  var oPli = $("#plate li");      // 车牌号码输入框
  var oOli = $("#keyboard li");   // 数字字母键盘的li
  var oArea = $("#area");         // 地名简称键盘
  var oOlia = $("#keyboarda li"); // 地名简称键盘的li
  var oShuta = $("#shuta");       // 地名简称的关闭按钮

  oShut.click(function() {    // 点击关闭，关闭数字字母键盘
    oShutkey.slideUp(100);
  });
  oShuta.click(function() {  // 点击关闭，关闭地名简称键盘
    oArea.slideUp(100);
  });
  (function() {                       // 切换车牌号码框的函数
    var oPok = 2;                     // 定义车牌框从哪个位置开始的变量
    oPli.bind("click", function() {   // 给车牌框绑定点击事件
      var index = $(this).index();    // 获取车牌框里面的索引值
      $(this).addClass("active").siblings().removeClass("active");  // 点击哪个框就给哪个框添加颜色框，并去掉其他颜色框
      oPok = index;
      function onew() {           // 隐藏新能源信息
        $(".new").show(50);
      }
      function oarea() {          // 隐藏地名简称键盘
        oArea.slideUp(200);
      }
      function oshutkey() {       // 显示数字字母键盘
        oShutkey.slideDown(200);
      }
      if (oPok === 0) {           // 当点击第一个的时候，调出地名简称键盘
        onew();
        oArea.slideDown(200);
        oShutkey.slideUp(200);
      } else if (oPok === 7) {    // 当点击最后一个的时候隐藏新能源车牌的innerText值
        $(".new").hide(100);
        oarea();
        oshutkey();
      } else if (oPok === 1) {    // 当点击第二个的时候，弹出数字字母键盘
        onew();
        oarea();
        oshutkey();
      } else if (oPok === 6) {    // 当点击第7个的时候全部显示
        onew();
        oarea();
        oshutkey();
      } else {                    // 当点击其他车牌框的时候调出数字字母键盘
        onew();
        oarea();
        oshutkey();
      }
    });
    oOli.bind("click", function() {    // 给数字字母键盘绑定点击事件
      var index = $(this).index();     // 获取键盘的索引
      oOlok = index;
      function opli() {                // 颜色框加到下一个
        oPli.eq(oPok).addClass("active").siblings().removeClass("active");
      }
      if ($(this).html() === "删除") {  // 点击删除按钮，往后回删内容
        oPli.eq(oPok).html("");
        oPok--;
        opli();
        if (oPok === 0) {              // 当回删到第一个的时候隐藏数字字母键盘，显示地名简称键盘
          oArea.slideDown(200);
          oShutkey.slideUp(200);
        } else if (oPok < 8) {
          oPli.eq(7).html('<div class="new"><span>+</span><i>新能源</i></div>');
        }
      } else {                        // 点击数字字母键盘替换获取车牌框索引值的值
        oPli.eq(oPok).html(this.innerText);
        oPok++;            // 每点击一次增加一次索引
        opli();            // 每点击一次颜色框跳转到下一个
      }
      if (oPok > 6) {     // 当颜色框达到第7个的时候隐藏颜色框，并隐藏键盘
        oShutkey.slideUp(200);
        oPli.removeClass("active");
      }
    });
    oOlia.bind("click", function() {        // 给地名简称键盘绑定点击事件
      oPli.eq(oPok).html(this.innerText);   // 点击地名简称键盘获取车牌索引值的值
      oPok++;                               // 点击一次增加一次索引
      if (oPok === 1) {
        oArea.slideUp(200);
        oShutkey.slideDown(200);
      }
      oPli.eq(oPok).addClass("active").siblings().removeClass("active");   // 点击一次颜色框跳转到下一个
    });
  })();
})(jQuery);
