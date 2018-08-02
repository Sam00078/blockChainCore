

const CONSTANTS = require("../-constants")





module.exports = app => {



    app.core.bcc.consensus = Object.assign(app.core.bcc.consensus, {

        /**
         * 
         */
        async __ (__) {
            return app.core.bcc.help.returnAmtRunFlowPromise(this, '__', {}, {__})
        }

    })




    /////////////////// 核心方法 ///////////////////




    /**
     * 验证地址是否可用
     */
    app.core.bcc.consensus.amt.it( CONSTANTS.amtfns.__, {
        id: CONSTANTS.amtfnids.__ // id
    }, function(argv, next){

        // ok
        next(null, true)

    })







}

