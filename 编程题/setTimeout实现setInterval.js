// 递归实现

function newSetInterval(func, time){
    function inside(){
        func();
        setTimeout(inside, time)
    }
    setTimeout(inside, time);
}

function like(){
    console.log('记得点赞哦')
}

newSetInterval(like, 1000)