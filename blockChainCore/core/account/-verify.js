/**
 * 检验账户
 */


const bitcoin = require("bitcoinjs-lib")


const CONSTANTS = require("../-constants")


// console.log(bitcoin)



module.exports = app => {



    app.core.bcc.account = Object.assign(app.core.bcc.account, {

        /**
         * 是否为合法可用的钱包地址
         */
        async verifyAddressValid (address) {
            return app.core.bcc.help.returnAmtRunFlowPromise(this, 'accountVerifyAddressValid', {}, {address})
        }

    })




    /////////////////// 核心方法 ///////////////////




    /**
     * 验证地址是否可用
     */
    app.core.bcc.account.amt.it( CONSTANTS.amtfns.accountVerifyAddressValid, {
        id: CONSTANTS.amtfnids.bitcoinUsed // id
    }, function(argv, next){

        let adds = argv.address + ''

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
            return next(null, false)
        }

        // app.log.debug()

        // ok
        next(null, true)

    })







}

