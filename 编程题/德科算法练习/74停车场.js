/*
  特定大小的停车场 数组cars表示
  其中1表示有车  0表示没车
  车辆大小不一，小车占一个车位(长度1)
  货车占两个车位(长度2)
  卡车占三个车位(长度3)
  统计停车场最少可以停多少辆车
  返回具体的数目

  输入描述：
    整型字符串数组cars
    其中1表示有车0表示没车
    数组长度<1000

  输出描述：
    整型数字字符串
    表示最少停车数

  示例1：
    输入
      1,0,1
    输出
      2
    说明：
      一个小车占第一个车位
      第二个车位空，一个小车占第三个车位
      最少有两辆车

   示例2:
     输入：
       1,1,0,0,1,1,1,0,1
     输出：
       3
     说明：
       一个货车占第1,2个车位
       第3,4个车位空
       一个卡车占第5,6,7个车位
       第8个车位空
       一个小车占第9个车位
       最少3俩个车
   */

var parkings = [1,0,1]
let count = 0
let curNum = 0
for (let i = 0; i <= parkings.length; i++) {
    if(parkings[i] === 0 || parkings[i] === undefined){
        if(curNum > 0){
            let num = curNum
            while(num>0){
                if(num>=3){
                    count ++
                    num -= 3
                    console.log('卡车')
                }else if(num===2){
                    count ++
                    num -= 2
                    console.log('货车')
                }else{
                    count ++
                    num -= 1
                    console.log('轿车')
                }
            }
        }
        curNum = 0
    }else{
        curNum += 1
    }   
}
console.log(count)