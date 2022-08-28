function loadImg(url) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = function() {
            console.log(url, "加载完成");
            resolve(img);
        };
        img.onerror = function() {
            reject(new Error('Error at:' + url));
        };
        img.src = url;
    })
}
function multiRequest(urls, maxNum) {
    const firstMaxNum = urls.splice(0, maxNum);
    let promises = firstMaxNum.map((url, index)=>{
    return loadImg(url).then(()=>{
        return index
    })
})
return urls.reduce((res, cur)=>{
    return res.then(()=>{
        return Promise.race(promises)
    }).then((idx)=>{
        promises[idx] = loadImg(cur).then(()=>{
            return idx
        })
    })
}, Promise.resolve()).then(()=>{
    return Promise.all(promises)
})  
}
multiRequest(urls, 4).then(()=>{
  console.log('finish')
})