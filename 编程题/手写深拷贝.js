// 广度优先法
function deepClone(obj, tempNodes=[]) {
    if(obj === null) return null;   // 第一步：判断边界条件，如果为空则返回null。
    if(typeof obj !== 'object') return obj; // 第二步：如果不为引用数据类型，则将其返回。
    if(obj.constructor === Date) return new Date(obj); // 第三步：如果为日期类型，则返回new Date()。

    const newObj = new obj.constructor();  // 第四步： 如果是引用数据内型，则加入队列依次处理
    for(let key in obj){
        if(obj.hasOwnProperty(key)){
            const value = obj[key];
            if(typeof value === 'object'){
                newObj[key] = null;
                tempNodes.push([newObj, key, value])
            }else{
                newObj[key] = value
            }
        }
    }
    while (tempNodes.length) {   // 第五步： 清空引用数据类型队列
        let currentNodes = tempNodes.shift();
        currentNodes[0][currentNodes[1]] = deepClone(currentNodes[2], tempNodes)
    }
    return newObj;
}

// 测试代码
var originObj = {
    name: 'Tom',
    age: 22,
    date:　new Date().getTime(),
    children: [
        {id:1,age:12,name:'jam'},
        22
    ],
    other:{
        hobby:'bascketboll',
        major:'computer'
    }
}

// console.log(originObj, 'originObj')
// var result;
// setTimeout(()=>{
//     result = deepClone(originObj);
//     // result = Object.assign(originObj);
//     result.a = '112';
//     result.children[1] = 33
//     console.log(originObj, 'originObj2')
//     console.log(result, 'result')
// },3000)

// 广度优先拷贝2
let cloneObject = function(source) {
    let target = {};
    for (let key in source){
        if(source.hasOwnProperty(key)) {
            let itemType = Object.prototype.toString.call(source[key]).slice(8,-1);
            switch (itemType){
                case 'Object':
                    target[key] = cloneObject(source[key]);
                    break;
                case 'Array':
                    let temp = [];
                    for (let i = 0; i < source[key].length; i++) {
                        temp.push(cloneObject(source[key][i]));
                    }
                    target[key] = temp;
                    break;
                default:
                    target[key] = source[key];
            }
        }
    }   
    return target; 
}

console.log(originObj, 'originObj')
var result;
setTimeout(()=>{
    result = cloneObject(originObj);
    // result = Object.assign(originObj);
    result.a = '112';
    result.children[0].name = 'kangkang';
    result.children[1] = 33
    console.log(originObj, 'originObj2')
    console.log(result, 'result')
},3000)

// 深度优先遍历法
function getEmpty(o){
    if(Object.prototype.toString.call(o)==='[object Object]') return {};
    if(Object.prototype.toString.call(o)==='[object Array]') return [];
    return o;
}   
function deepCopyDFS(origin){
    let stack = [];
    let map = new Map(); // 记录出现过的对象，用于处理环。

    let target = getEmpty(origin);
    if(target !== origin){
        stack.push([origin, target]);
        map.set(origin, target);
    }

    while(stack.length){
        let [ori, tar] = stack.pop();
        for (const key in ori) {
            // 处理环状
            if(map.get(ori[key])){
                tar[key] = map.get(ori[key]);
                continue;
            }

            tar[key] = getEmpty(ori[key]);
            if(tar[key] !== ori[key]){
                stack.push([ori[key], tar[key]]);
                map.set(ori[key], tar[key])
            }
        }
    }
    return target
}

// lodash 实现深拷贝
// https://github.com/yygmind/blog/issues/31