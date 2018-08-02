/**
 * 三元签名（三重签名）
 */

const CONSTANTS = require("../-constants")

const secp256k1 = require('secp256k1')




// console.log(bitcoin)



module.exports = app => {


    app.core.bcc.multisign = Object.assign(app.core.bcc.multisign, {

        /**
         * 处理三重签名
         */
        async handlePairToSignature (pair, hash, password) {
            let tyof = typeof pair
            switch( tyof ){
                case 'string' :
                    pair = JSON.parse(pair)
                    break
                case 'object':
                    break
                default:
                    throw new Error('pair type not available')
            }
            // 创建
            return app.core.bcc.help.returnAmtRunFlowPromise(this, 'multisignHandlePairToSignature', {}, {pair, hash, password})
        },




    })




    /////////////////// 核心方法 ///////////////////





    /**
     * 创建双重签名公钥脚本
     */
    app.core.bcc.multisign.amt.it( CONSTANTS.amtfns.multisignHandlePairToSignature, {
        id: CONSTANTS.amtfnids.tribetrustUsed
    }, async function(argv, next){
        // pair, hash, password

        if( ! pair.sourceHashStr ){
            pair.sourceHashStr = argv.hash.toString('hex')
        }else if(
            pair.sourceHashStr !== hash.toString('hex')
        ){
            return next('pair.hash and argv.hash must be equal')
        }

        // 检查 pair
        if (pair.publicKeyScript) {
            return next('pair has been processed complete')
        }
        if(
            [1,2,3].indexOf(pair.n) == -1 ||
            [2,3].indexOf(pair.m) == -1 ||
            pair.n > pair.m
        ){
            return next('pair n / m value invalid')
        }

        // 检查账户是否可用
        let account = await app.core.bcc.account.createByPassword( arg.password )
        let publicKeyStr = account.publicKey.toString('hex')
        if ( pair.publicKeyStrList.indexOf(publicKeyStr) == -1 ) {
            return next( 'Prohibition of use of accounts' )
        }

        // 开始签名/加密
        let encode = secp256k1.ecdh()










        /*
        let pair = {
            address: address, // 2xxxxxxx...
            password: password,
            publicKeyStrList: publicKeyStrList,
            n: argv.n,
            m: argv.m,
            publicKeyScript: '', // 完成时写入
            sourceHash: null,
            cryptoStepResults: [], // 每次加密后的 { publicKey, stepBuffer }
        }
        */


        // ok
        next(null, pair)

    })







}

