/**
 * 创建账户
 */


const bitcoin = require("bitcoinjs-lib")


const CONSTANTS = require("../-constants")


// console.log(bitcoin)



module.exports = app => {


    app.core.bcc.account = Object.assign(app.core.bcc.account, {

        /**
         * 
         * 通过密码创建钱包
         * 
         * return = {
         *     password: "..."
         *     publicKey: "..."
         *     privateKey: "..."
         *     address: "..."
         * }
         * 
         */
        async createByPassword (secretStr) {
            return app.core.bcc.help.returnAmtRunFlowPromise(this, 'accountCreateByPassword', {}, {secretStr})
        }

    })




    /////////////////// 核心方法 ///////////////////





    /**
     * 使用比特币算法生成钱包账户
     */
    app.core.bcc.account.amt.it( CONSTANTS.amtfns.accountCreateByPassword, {
        id: CONSTANTS.amtfnids.bitcoinUsed // id
    }, function(argv, next){
        let secretStr = argv.secretStr


        const hash = bitcoin.crypto.sha256(Buffer.from( secretStr ))
        const keyPair = bitcoin.ECPair.fromPrivateKey(hash)
        // app.log.debug(keyPair)
        const finres  = bitcoin.payments.p2pkh({ pubkey: keyPair.publicKey })
        // app.log.debug(finres)


        // 0x9B257AD1E78C14794FBE9DC60B724B375FDE5D0FB2415538820D0D929C4AD436
        // 032b4c06c06c3ec0b7fa29519dfa5aae193ee2cc35ca127f29f14ec605d62fb63d
        // 03a96076f81d82c1dceecfc427fe08ded4574e0db8246972e46e99544db5f56b1a
        // 18E14A7B6A307F426A94F8114701E7C8E774E7F9A47E2C2035DB29A206321725

        // 1CCvA7HjMBw9gE59LqkYPxXGeEKNbW9Zi1

        // ok
        next(null, {
            secret: secretStr,
            privateKey: keyPair.privateKey,
            publicKey: keyPair.publicKey,
            // privateKeyStr: keyPair.privateKey.toString('hex'),
            // publicKeyStr: keyPair.publicKey.toString('hex'),
            address: finres.address,
        })

    })







}

