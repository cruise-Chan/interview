var sortArray = function (nums) {
    const n = nums.length;
    if (n < 2) return nums;
    return mergeSort(nums);
};
function mergeSort(nums) {
    const n = nums.length;
    if (n <= 1) {
        return nums;
    }
    const mid = n >> 1;
    return merge(mergeSort(nums.slice(0, mid)), mergeSort(nums.slice(mid)));
}
function merge(arr1, arr2) {
    const m = arr1.length;
    const n = arr2.length;
    let i = 0;
    let j = 0;
    const ans = [];
    while (i < m && j < n) {
        if (arr1[i] < arr2[j]) {
            ans.push(arr1[i++]);
        } else {
            ans.push(arr2[j++]);
        }
    }
    while (i < m) {
        ans.push(arr1[i++]);
    }
    while (j < n) {
        ans.push(arr2[j++]);
    }
    return ans;
}
