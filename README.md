# blockChainCore
block chain core flow ware base on framework okgo 

----

### modules 所有模块

- Paramcheck      数据格式验证    （参数格式验证）
- Peer            节点           （节点发现、同步、维护）
- Connect         节点连接        （http、ws、tcp等）
- Transmission    数据传输        （数据打包、编码、压缩、传输、解压、解码、解包、到达）
- [Account](./doc/core/account.md)         账户           （加密账户、地址生成、验证）
- Asset           资产           （验证资产类型、数据类型格式、查询数据验证）
- Transaction     交易           （签名验证、联合签名验证、数据大小检查、手续费验证）
- Block           区块           （区块打包、验证、解包、对比）
- Consensus       共识           （出块共识、一致性达成）

- Storge          区块数据持久化   （贮藏区块原始数据）
- TribeDB         数据仓库        （余额、资产、历史交易、缓存及数据库，供大量查询）
    - table    [SQL]        MySQL    
    - collect  [NoSQL]      MongoDB
    - keyfix   [k/v cache]  Redis


----

### module method 模块方法
