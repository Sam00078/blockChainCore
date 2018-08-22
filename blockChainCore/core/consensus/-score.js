/**
 * 共识机制，得分计算
 */



const CONSTANTS = require("../-constants")




module.exports = app => {



    app.core.bcc.consensus = Object.assign(app.core.bcc.consensus, {

        /**
         * 通过时间戳，获取区块槽序（非区块高度）
         */
        // async getBlockSlot ( timestamp ) {
        //     return app.core.bcc.help.returnAmtRunFlowPromise(this, 'consensusGetBlockSlot', {}, {timestamp})
        // }

    })




    /////////////////// 核心方法 ///////////////////




    /**
     * 获取区块槽序
     */
    // app.core.bcc.consensus.amt.it( CONSTANTS.amtfns.consensusGetBlockSlot, {
    //     id: CONSTANTS.amtfnids.tribetrustUsed // id
    // }, function(argv, next){
    //     // timestamp

    //     // app.log.debug(app.constant)

    //     let timestamp = argv.timestamp || parseInt(new Date().getTime()/1000)
    //     , block_span = app.constant.bcc.core.block_span
    //     , slot_num =  parseInt(timestamp / block_span)

    //     // ok
    //     next(null, {
    //         slot: slot_num
    //     })

    // })







}

