

// 自己探索的简易版本
Array.prototype.myReduce = function(fn,initialValue){
    const that = this
    this.length = that.length
    this.value = initialValue || that[0]
    let i = initialValue?0:1
    for(i; i < this.length; i++){
        this.value = fn(this.value,that[i])
    }
    return this.value
}

// 测试代码
const res = [1,2,3,4].myReduce((a,b)=>{
    return a + b
})  

const res2 = [1,2,3,4].myReduce((a,b)=>{
    return a + b
},10)  
// console.log(res,res2)

// 网上版本
Array.prototype.myReduce2 = function(fn, initialValue) {
    for(let i=0; i<this.length; i++) {
        if (typeof initialValue === 'undefined') {
            initialValue = fn(this[i], this[i+1], i+1, this);
            i++;
        } else {
            initialValue = fn(initialValue, this[i], i, this);
        }
    }
    return initialValue;
}

const res3 = [1,2,3,4].myReduce2((a,b)=>{
    return a + b
})  
console.log(res3)
