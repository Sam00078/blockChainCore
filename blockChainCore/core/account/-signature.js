/**
 * 账户签名
 */


const bitcoin = require("bitcoinjs-lib")


const CONSTANTS = require("../-constants")


// console.log(bitcoin)



module.exports = app => {



    app.core.bcc.account = Object.assign(app.core.bcc.account, {


        /**
         * 为签名而hash
         * return hash.Buffer
         */
        async hashForSign (dataStr) {
            return app.core.bcc.help.returnAmtRunFlowPromise(this, 'accoundHashForSign', {}, {dataStr})
        },


        /**
         * 用私钥签名一段数据
         */
        // 签名 hash
        async signByPrivateKey (hash, privateKey) {
            return app.core.bcc.help.returnAmtRunFlowPromise(this, 'accoundSignByPrivateKey', {}, {hash, privateKey})
        },
        


        /**
         * 用公钥检查签名是否通过
         * return true/false
         */
        // 验证 hash
        async verifySignatureByPublicKey (hash, signature, publicKey) {
            return app.core.bcc.help.returnAmtRunFlowPromise(this, 'accoundVerifySignatureByPublicKey', {}, {hash, signature, publicKey})
        },
        

    })




    /////////////////// 核心方法 ///////////////////




    app.core.bcc.account.amt.it( CONSTANTS.amtfns.accoundHashForSign, {
        id: CONSTANTS.amtfnids.bitcoinUsed // id
    }, function(argv, next){
        // dataStr

        // app.log.warn('hashForSign it')

        let hash = bitcoin.crypto.sha256( Buffer.from( argv.dataStr ) )

        return next(null, hash)

    })




    /**
     * 用私钥签名一段数据
     * return = {
     *      hash: Buffer.hex
     *      signature: Buffer.hex
     * }
     */
    app.core.bcc.account.amt.it( CONSTANTS.amtfns.accoundSignByPrivateKey, {
        id: CONSTANTS.amtfnids.bitcoinUsed // id
    }, function(argv, next){
        // hash, privateKey

        // 支持 String 或 Buffer 形式的 key
        if( typeof argv.privateKey == 'string' ) {
            argv.privateKey = Buffer.from(argv.privateKey, 'hex')
        }

        let signature

        try{

            let pair = bitcoin.ECPair.fromPrivateKey( argv.privateKey )
            // app.log.debug(pair)
    
            signature = pair.sign( argv.hash )
            // app.log.debug(signature.toString('hex'))    

        }catch(e){
            return next(e)
        }

        if( ! signature){
            return next('signature fail')
        }

        // ok
        next(null, signature)

    })






    /**
     * 用公钥检查签名是否通过
     */
    app.core.bcc.account.amt.it( CONSTANTS.amtfns.accoundVerifySignatureByPublicKey, {
        id: CONSTANTS.amtfnids.bitcoinUsed // id
    }, function(argv, next){
        // hash, signature, publicKey

        if( typeof argv.hash == 'string' ) {
            argv.hash = Buffer.from(argv.hash, 'hex')
        }
        if( typeof argv.publicKey == 'string' ) {
            argv.publicKey = Buffer.from(argv.publicKey, 'hex')
        }
        if( typeof argv.signature == 'string' ) {
            argv.signature = Buffer.from(argv.signature, 'hex')
        }

        let isok

        try{
            
            let pair = bitcoin.ECPair.fromPublicKey( argv.publicKey )
            // app.log.debug(pair)

            isok = pair.verify(argv.hash, argv.signature)
            // app.log.debug(isok)

        }catch(e){
            return next(e)
        }


        // ok
        next(null, isok ? true : false)

    })







}

