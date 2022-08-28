// 定时器
const sleep = (time) =>{
    var now = +Date.now()
    while (+Date.now() - now <= time){}
    return
}

console.log(111)
sleep(3000)
console.log(222)

// async promise 的方式
function sleep2(time) {
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            resolve()
        },time)
    })
}

async function output(){
    let out = await sleep2(2000)
    console.log(1);
    return out;
}
console.log('sleep2开始')
output()
console.log('sleep2结束')
