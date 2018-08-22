



module.exports = app => {



    /**
     * 资产类型处理基类
     */
    app.core.bcc.AssetBase = class {

        constructor()
        {
            this.kind = null
            // 请求签名的地址列表
            this.requestSignAddressList = []
            // 数据格式验证器
            this.parameta = null
        }

        // 添加数据格式验证器
        // app.
        setParameta ( parameta ) {
            this.parameta = parameta
        }

        // 设置种类
        setKind (kind) {
            if( ! (kind>=1&&kind<=65535) ){ // 资产类型格式不合法
                throw new Error(`asset kind <${kind}> is not valid`)
            }
            this.kind = kind
        }

        // 添加 请求签名 的地址
        async requestSign( address )
        {
            // 判断地址是否正确
            let isok = await app.core.bcc.account.verifyAddressValid( address )
            if( ! isok ){ // 地址不合法
                throw new Error(`address <${address}> is not valid`)
            }
            // 添加
            this.requestSignAddressList.push(address)
        }

        ////////  控制方法 ////////

        // 生成 buffer 对象
        writeBufferHelp ( buflen, sourceList ) {
            if( ! sourceList instanceof Array ){
                throw new Error(`sourceList must be array`)
            }
            sourceList.unshift(this.kind)

            // let resbuf = 

            for(let i in sourceList){
                let one = sourceList[i]
                if( ['number', 'string', ].indexOf( typeof one ) == -1 ){
                    throw new Error(`sourceList item ${one} unsupported data format`)
                }
                

            }
            return resbuf
        }

        // 转换成 buffer 用于签名、计算hash等
        toBuffer( data )
        {
            return Buffer.from(this.kind)
        }

        ////////  数据验证判断逻辑  ////////


        // 数据预处理（加赋默认值等）
        preprocess ( data, callback ) {
            return callback()
        }

        // 验证数据格式
        verify (data, callback) {
            return callback()
        }

        // 数据内容核查（查数据库判断）
        inspect (data, callback) {
            return callback()
        }

        // 

    }



}