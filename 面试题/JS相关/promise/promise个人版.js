const { resolve } = require("path");

class MyPromise {
    static PENDING = '准备'
    static FULFILLED = '成功'
    static REJECTED = '失败'
    constructor(fun) {
        this.value = null;
        this.reason = null;
        this.status = MyPromise.PENDING;
        this.onFulfilledCallbacks = [];
        this.onRejectedCallbacks = [];
        try {
            fun(this.resolve.bind(this), this.reject.bind(this))
        } catch (error) {
            this.reject(error)
        }
    }
    resolve(result) {
        if (this.status === MyPromise.PENDING) {
            this.value = result
            this.status = MyPromise.FULFILLED;
            setTimeout(() => {
                this.onFulfilledCallbacks.forEach(fn => fn(this.value))
            })
        }
    }
    reject(result) {
        if (this.status === MyPromise.PENDING) {
            this.reason = result
            this.status = MyPromise.REJECTED
            setTimeout(() => {
                this.onRejectedCallbacks.forEach(fn => fn(this.reason))
            })
        }
    }
    then(onFULFILLED, onREJECTED) {
        return new MyPromise(() => {
            onFULFILLED = typeof onFULFILLED === 'function' ? onFULFILLED : () => { }
            onREJECTED = typeof onREJECTED === 'function' ? onREJECTED : () => { }
            // 处理异步
            if (this.status === MyPromise.PENDING) {
                this.onFulfilledCallbacks.push(onFULFILLED)
                this.onRejectedCallbacks.push(onREJECTED)
            }
            // 保留下面两个是因为如果resolve是同步的话要立即执行
            if (this.status === MyPromise.FULFILLED) {
                setTimeout(() => {
                    onFULFILLED(this.value)
                })
            }
            if (this.status === MyPromise.REJECTED) {
                setTimeout(() => {
                    onREJECTED(this.reason)
                })
            }
        })
    }
}


console.log('第一步')
const fun = new Promise((resolve, reject) => {
    // resolve('成功了哦')
    // throw new Error('xxx')
    // reject('拒绝了哦')
    console.log('第二步')
    // resolve('成功了哦')
    setTimeout(() => {
        resolve('成功了哦')
    }, 2000)
})
fun.then(res => {
    console.log(res, '结果')
}).finally(res => {
    console.log(res, '最终')
})

console.log('第三步')




// 实现Promise.all()

function myALL(arr) {
    return new Promise((resolve, reject) => {
        const result = []
        let count = 0
        let len = arr.length
        for (let i = 0; i < len; i++) {
            Promise.resolve(arr[i]).then(res => {
                result[i] = res
                count++
                if (count === len) {
                    resolve(result)
                }
            }).catch(err => {
                reject(err)
            })
        }
    })
}

// 实现Promise.race()
function myRace(arr) {
    return new Promise((resolve, reject) => {
        const result = []
        let len = arr.length
        for (let i = 0; i < len; i++) {
            Promise.resolve(arr[i]).then(res => {
                resolve(res)
            }).catch(err => {
                reject(err)
            })
        }
    })
}