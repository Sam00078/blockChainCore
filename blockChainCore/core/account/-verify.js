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
        // ok
        next(null, app.core.bcc.account.verifyTribeTrustAddressValid(argv.address) )

    })







}

