# 1、websocket应用
## 创建服务
```javascript
const WebSoket = require('ws')
const wss = new WebSockte.Server({ port: 3000});

wss.on('connection',ws => {   // 监听接入
    console.log('有人接入进来了')

    ws.on('message', data=>{
        ws.send(data + '举头望明月')
    })

    ws.on('close',()=>{            // 监听离开，注意是在单个连接里监听，而不是在WSS实例上
        console.log('断开连接')
    })
})
```
前端不会主动连接，还需要再HTML文件的script标签中添加如下代码：
```javascript
    const ws = new WebSocket('ws://localhost:3000')

    ws.addEventListener('open', ()=>{
        console.log('连接上服务器了')
        ws.send('床前明月光')
    })
    ws.addEventListener('message', ({data}) =>{
        console.log(data)
    })
```