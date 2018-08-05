/**
 * 三元签名（三重签名）
 */

const CONSTANTS = require("../-constants")



// console.log(bitcoin)



module.exports = app => {


    app.core.bcc.multisign = Object.assign(app.core.bcc.multisign, {

        /**
         * 创建二重签名账户地址
         * n = 必须签名个数 1 or 2
         */
        async createTriplePublicKeyScriptPair (n, publicKeyList) {
            if([1,2,3].indexOf(n) = -1){
                throw new Error('createTriplePublicKeyScriptPair n must be 1 or 2 or 3')
            }
            let m = publicKeyList.length
            if([2,3].indexOf(m) = -1){
                throw new Error('createTriplePublicKeyScriptPair m must be 2 or 3')
            }
            if(n>m){
                throw new Error('createTriplePublicKeyScriptPair n cannot more than m')
            }
            // 创建
            return app.core.bcc.help.returnAmtRunFlowPromise(this, 'multisignCreateTriplePublicKeyScriptPair', {}, {publicKeyList, n, m})
        },




    })




    /////////////////// 核心方法 ///////////////////





    /**
     * 创建双重签名公钥脚本
     */
    app.core.bcc.multisign.amt.it( CONSTANTS.amtfns.multisignCreateTriplePublicKeyScriptPair, {
        id: CONSTANTS.amtfnids.tribetrustUsed
    }, function(argv, next){
        // publicKeyList, n, m


        let publicKeyList = [...argv.publicKeyList]
        let pks = publicKeyList.map(p => p.toString('hex'))

        let password = [...pks, argv.n+'/'+argv.m].join(' ')

        // 调用创建账户接口

        let account = app.core.bcc.account.createByPassword( password )

        let address = '2' + (account.address+'').substr(1)

        let pair = {
            address: address, // 2xxxxxxx...
            password: password,
            publicKeyStrList: pks,
            n: argv.n,
            m: argv.m,
            publicKeyScriptStr: '', // 完成时写入
            sourceHashStr: null,
            cryptoStepResults: [], // 每次加密后的 { publicKeyStr, stepBufferHex }
        }


        // ok
        next(null, pair)

    })







}

