/**
 * 创建账户
 */


const bitcoin = require("bitcoinjs-lib")


module.exports = app => {


    class Account 
    {
        constructor () {

            this.bus = new app.okgo.MessageBus() // 消息系统
            this.amt = new app.okgo.FlowMount() // 挂载系统

        }

        /**
         * 检查 TribeTrust 账户有效性
         * return boolean
         */
        verifyTribeTrustAddressValid( address )
        {
            let adds = address + ''
    
            if( adds.startsWith('2') ){
                adds = '1' + adds.substr(1) // 支持以 2 开头的组合地址
            }
            if( adds.endsWith(' ') ){
                adds = adds.replace(/\s+$/ig, '') // 去除末尾空格
            }
    
            try{
                // 验证
                let decode = bitcoin.address.fromBase58Check(adds)
    
            }catch(e){
                // console.log(e)
                return false // 解析失败
            }

            // 检查成功
            return true

        }

    }



    // 注册核心
    app.core.bcc.account = new Account()


    //////////////////// 加载相关核心 ////////////////////


    app.core.bcc.help.loadingCoreModels('account', [
        'create',
        'verify',
        'signature',
    ])

}

