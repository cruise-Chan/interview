Number.MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER.toString.length - 2;
Number.prototype.add = function(i=0){
    return this.valueOf() + i
}
Number.prototype.minus = function(i=0){
    return this.valueOf() - i
}
var ret = (5).add(2).minus(3)
console.log(ret,'计算结果')