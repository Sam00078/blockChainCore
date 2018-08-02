/**
 * 共识机制，时间相关
 */



const CONSTANTS = require("../-constants")




module.exports = app => {



    app.core.bcc.____ = Object.assign(app.core.bcc.____, {

        /**
         */
        async ____ ( timestamp ) {
            return app.core.bcc.help.returnAmtRunFlowPromise(this, '____', {}, {timestamp})
        }

    })




    /////////////////// 核心方法 ///////////////////




    /**
     */
    app.core.bcc.____.amt.it( CONSTANTS.amtfns.____, {
        id: CONSTANTS.amtfnids.tribetrustUsed // id
    }, function(argv, next){
        // timestamp

        // ok
        next(null, {})

    })







}

