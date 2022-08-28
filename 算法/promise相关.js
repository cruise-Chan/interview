// 测试题1
const list = [1, 2, 3]
const square = num => {
    return new Promise((resolve, reject) => {
        setTimeout(()=>{
            resolve(num * num)
        }, 1000)
    })
}
async function test(){
    var timeStart = new Date().getTime()
    // 三秒后分别打印1、4、9
    // list.forEach(async x=>{
    //     const res = await square(x)
    //     var timeEnd = new Date().getTime()
    //     console.log(timeEnd-timeStart)
    //     console.log(res)
    // })

    // 每隔一秒分别打印1、4、9
    for(let i = 0;i<list.length;i++){
        const res = await square(list[i])
        var timeEnd = new Date().getTime()
        console.log(timeEnd-timeStart)
        console.log(res)
    }
}
test()