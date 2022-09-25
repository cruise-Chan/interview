 /*
  某学校举行运动会,学生们按编号（1、2、3.....n)进行标识,
  现需要按照身高由低到高排列，
  对身高相同的人，按体重由轻到重排列，
  对于身高体重都相同的人，维持原有的编号顺序关系。
  请输出排列后的学生编号
  输入描述：
     两个序列，每个序列由N个正整数组成，(0<n<=100)。
     第一个序列中的数值代表身高，第二个序列中的数值代表体重，
  输出描述：
     排列结果，每个数据都是原始序列中的学生编号，编号从1开始，
  实例一：
     输入:
      4
      100 100 120 130
      40 30 60 50
     输出:
      2134
  */
 var n = 4
 var aHigh = [100,100,120,130]
 var aWeight = [40, 30, 60, 50]
aMessage = []
for(let i = 0; i<n; i++) {
    aMessage.push([aHigh[i],aWeight[i], i + 1])
}
aMessage.sort((a, b) => {
    if(a[0]!==b[0]){
        return a[0] - b[0]
    }else{
        return a[1] - b[1]
    }
})
const result = aMessage.map(message => {
    return message[2]
}).join('')
console.log(result, 'result')
