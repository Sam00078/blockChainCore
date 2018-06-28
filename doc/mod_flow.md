内核模块功能流
===

示例：
```js
app.core.peer.hook('searchPossibleNode', next => {
    let is_error = false
    if ( is_error ) {
        return setImmediate(next, 'some error')
    }

    // is ok, no error
    return setImmediate(next)
}) 
```

------


## Block 区块


#### block # `requestBlockPackData`

向其他节点请求下载区块打包数据

```js
data = {
    packData: new Buffer('...'),
}
```


#### block # `requestLastBlockHeight`

向其他节点请求获取最新的区块高度

```js
data = {
    height: 123456,
}
```


------


## Peer 节点


#### peer # `searchPossibleNode`

搜索获取也许可用的节点名单

```js
data = {
    lists: [
        {
            ip: '12.204.118.160',
            http: 8001,
            ws: 8002,
            tcp: 8003,
        }
    ]
}
```
