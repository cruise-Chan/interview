
var ids = [2,2,3,3,7,6,6,6,6,7,7,3,5,5,5]
var length = ids.length
var scoreList = [100,80,53,80,68,24,39,76,66,16,100,55,53,80,55]

function scoreSort(length,ids,scoreList){
    const map = {}
    for(let i=0;i<length;i++){
        if(!map[ids[i]]){
            map[ids[i]] = [scoreList[i]]
        }else{
            map[ids[i]].push(scoreList[i])
        }
    }
    let list = []
    for (const key in map) {
        list.push({key:key,value:map[key]})
    }
    list = list.filter((value,key)=>{
        return value.value.length >= 3
    })
    list.map(value=>{
        value.value = value.value.sort((a,b)=>b-a).splice(0,3).reduce((a,b)=>a+b)
    })
    list.sort((a,b)=>{
        if(a.value!==b.value){
            return b.value-a.value
        }
        return Number(b.key) - Number(a.key)
    })
    list.map((item,index,arr)=>{
        arr[index] = item.key
    })
    return list.join(',')
    
}
console.log(scoreSort(length,ids,scoreList))