/* 
车牌数字键盘
name：Asa_Zhou
data：2019/3/25修改
*/
'use strict';
// 车牌键盘数组
var Keyboard = {
        // Place_name : [["京","津","沪","渝","蒙","新","藏","宁","桂","黑"],["吉","辽","晋","冀","青","鲁","豫","苏","皖","浙"],["闽","赣","湘","鄂","粤","琼","甘","陕","贵","云"],["川"]],
        Place_name : ["京","津","沪","渝","蒙","新","藏","宁","桂","黑","吉","辽","晋","冀","青","鲁","豫","苏","皖","浙","闽","赣","湘","鄂","粤","琼","甘","陕","贵","云","川"],
        Letter: ["1","2","3","4","5","6","7","8","9","0","Q","W","E","R","T","Y","U","I","o","P","港","澳","A","S","D","F","G","H","J","K","L","学","Z","X","C","V","B","N","M","警"],

}
var Place_name = [["京","津","沪","渝","蒙","新","藏","宁","桂","黑"],["吉","辽","晋","冀","青","鲁","豫","苏","皖","浙"],["闽","赣","湘","鄂","粤","琼","甘","陕","贵","云"],["川"]];
var Letter = [["1","2","3","4","5","6","7","8","9","0"],["Q","W","E","R","T","Y","U","P","港","澳"],["A","S","D","F","G","H","J","K","L","学"],["Z","X","C","V","B","N","M","警","删除"]];

var oLi = '';
var str = '';
function Cyclic_Li(oLi, arr) {
    for (var i in arr) {
        for (var j in arr[i]) {
            oLi += "<li>" + arr[i][j] + "</li>";
            if(j % 10 == 9) {
                oLi += "</ul><ul>";
            }
        }
    }
    str = "<ul>" + oLi + "</ul>";
}
// 获取元素
function Plate(id) {
    var Oplate = document.getElementById(id);                              // 获取对象
    this.Ovalue = Oplate.getElementsByTagName("input")[0];                 // 获取输入框
    if(this.Ovalue.value.length < 1) {
        Cyclic_Li(str, Place_name);
    } else {
        Cyclic_Li(str, Letter);
    }
    var _Okeyboard = '<div class="keyboard"> \
                    <div class="shut-down">关闭</div> \
                    <div class="place-name">'
                    + str +
                    '</div> \
                 </div>';
    // this.Oplace_name = Okeyboard.getElementsByClassName("place-name");  // 获取地名键盘
    // this.Oletter = Okeyboard.getElementsByClassName("letter");          // 获取数字字母键盘
    // this.Oshut_down = Okeyboard.getElementsByClassName("shut-down");    // 获取关闭

    // Oplate.insertAdjacentHTML("afterBegin", _Okeyboard);
    Oplate.innerHTML = Oplate.innerHTML + _Okeyboard;
    this.Okeyboard = Oplate.getElementsByClassName("keyboard")[0];          // 渲染完成获取键盘
    console.log(this.Okeyboard)
    this.PlaceNameLastLi = Oplate.getElementsByClassName("place-name")[0].lastChild.lastChild;
    this.PlaceNameLastLi.className = "lastli";
    console.log(this.PlaceNameLastLi);
}
// 点击
Plate.prototype.OkeyboardClick = function(Okey) {

}