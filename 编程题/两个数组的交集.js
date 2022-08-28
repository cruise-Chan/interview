const intersect = (nums1, nums2) => {
    const map = {}
    const res = []
    for (const n of nums1) {
        if(map[n]){
            map[n]++
        } else {
            map[n] = 1
        }
    }
    for (const n of nums2) {
        if(map[n] > 0){
            res.push(n)
            map[n]--
        }
    }
    return res
}
var nums1 = [1,1]
var nums2 = [1]
var result = intersect(nums1, nums2)
console.log(result,'result')