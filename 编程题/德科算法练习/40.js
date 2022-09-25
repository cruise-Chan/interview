/*
    幼儿园两个班的小朋友排队时混在了一起
    每个小朋友都知道自己跟前面一个小朋友是不是同班
    请你帮忙把同班的小朋友找出来
    小朋友的编号为整数
    与前面一个小朋友同班用Y表示
    不同班用N表示
    输入描述：
    输入为空格分开的小朋友编号和是否同班标志
    比如 6/N 2/Y 3/N 4/Y
    表示一共有4位小朋友
    2和6是同班 3和2不同班 4和3同班
    小朋友总数不超过999
        0< 每个小朋友编号 <999
        不考虑输入格式错误

        输出两行
        每一行记录一班小朋友的编号  编号用空格分开
        并且
        1. 编号需要按照大小升序排列，分班记录中第一个编号小的排在第一行
        2. 如果只有一个班的小朋友 第二行为空
        3. 如果输入不符合要求输出字符串ERROR

        示例：
        输入
        1/N 2/Y 3/N 4/Y
        输出
        1 2
        3 4
        说明：2的同班标记为Y因此和1同班
            3的同班标记位N因此和1,2不同班
            4的同班标记位Y因此和3同班
        */


var str = '1/N 2/Y 3/N 4/Y'
var stus = str.split(" ");

// try {

    var c1 = new Set();
    var c2 = new Set();

    let is1 = true;
    for (let i = 0; i < stus.length; i++) {
        var split = stus[i].split("/");
        var id = split[0];
        var same = split[1];
        if (i == 0) {
            c1.add(parseInt(id));
            continue;
        }
        if ("N" == same) is1 = !is1;
        (is1 ? c1 : c2).add(parseInt(id));
    }

    var b1 = '';
    for (let id of [...c1]) {
        b1 += (id + " ");
    }
    var _c2 = [...c2]
    if (_c2.length > 0) {
        var b2 = '';
        for (let id of _c2){
            b2 += (id + " ");
        }
        if (c1[0] < _c2[0]) {
            console.log(b1.trim(),'111');
            console.log(b2.trim(),'222');
        } else {
            console.log(b2.trim(),'333');
            console.log(b1.trim(),'444');
        }
    } else {
        console.log(b1.trim(),'555');
    }

// } catch ( e) {
    // console.log("ERROR");
// }
