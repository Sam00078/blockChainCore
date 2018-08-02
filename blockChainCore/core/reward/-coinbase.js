/**
 * 共识机制，时间相关
 */



const CONSTANTS = require("../-constants")




module.exports = app => {



    app.core.bcc.reward = Object.assign(app.core.bcc.reward, {

        /**
         * 通过区块高度获取区块奖励数量
         */
        async getBlockCoinbaseByHeight ( block_height ) {
            return app.core.bcc.help.returnAmtRunFlowPromise(this, 'rewardGetBlockCoinbaseByHeight', {}, {block_height})
        }

    })




    /////////////////// 核心方法 ///////////////////




    /**
     * 从黄金分割数列的第47位开始，约每三年(每50万个区块)，向前移动一位(46,45,44...)
     * 一直到第一位，以后永久给第一位的数量（就是1）
     */
    app.core.bcc.reward.amt.it( CONSTANTS.amtfns.rewardGetBlockCoinbaseByHeight, {
        id: CONSTANTS.amtfnids.tribetrustUsed // id
    }, function(argv, next){
        // block_height

        let coinbase_length = 47 // 2971215073 数量开始
        let block_span = 500000 // 50万个区块 2.89年
        let block_base = coinbase_length - parseInt( argv.block_height / block_span )
        if( block_base < 1 ){
            block_base = 1
        }

        // 获取黄金分割数列值
        let value = app.help.bccalgorithm.getGoldSplitNumListValue( block_base )

        // ok
        next(null, {
            amount: value
        })

    })









}

